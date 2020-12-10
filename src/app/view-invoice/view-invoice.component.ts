import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {InvoiceService} from '../services/invoice.service';
import {Invoice} from '../Models/Invoice';
import {Location} from '@angular/common';
import {MessageService} from 'primeng/api';
import {delay} from 'rxjs/operators';

import jsPDF from 'jspdf-new';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import html2canvas from 'html2canvas';
(window as any).html2canvas = html2canvas;



@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css']
})
export class ViewInvoiceComponent implements OnInit {

  paramQuery = '';
  invoice: Invoice;
  @ViewChild('content') content: ElementRef;

  constructor(private location: Location, private activatedRoute: ActivatedRoute, private invoiceService: InvoiceService, private messageService: MessageService) {
    this.invoice = new Invoice();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => this.paramQuery = data.id);

    this.invoiceService.getInvoice(this.paramQuery).subscribe(res => {
      this.invoice = res;
    }, error => {
      console.log(error);
    });
  }

  totalNetto(): number{
    return this.invoice.positionOnInvoiceList.map(val => {
      return val.quantity * val.priceForUnit;
    }).reduce((acc, cur) => acc + cur);
  }

  totalBrutto(): number{
    return this.invoice.positionOnInvoiceList.map(val => {
      return (val.quantity * val.priceForUnit) * (1 + val.taxRate * 0.01);
    }).reduce((acc, cur) => acc + cur);
  }

  totalVat(): number{
    return this.invoice.positionOnInvoiceList.map(val => {
      return (val.quantity * val.priceForUnit) * (val.taxRate * 0.01);
    }).reduce((acc, cur) => acc + cur);
  }

  wayOfPayment(wayOfPayment: 'CASH' | 'TRANSFER'): string {
    return wayOfPayment === 'CASH' ? 'Gotówka' : 'Przelew' ;
  }

  back(): void {
   this.location.back();
  }

  deleteInvoice(): void {
    this.invoiceService.deleteInvoice(this.invoice.id).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Usuniety', detail: 'Faktura została usunięta'});
      delay(100);
      this.location.back();
    } , error => {
      this.messageService.add({ severity: 'error', summary: 'Blad', detail: 'Nie udało sie usunąć'});
    });
  }

  download(): void {
    const doc = new jsPDF();


    const pdfContent= this.content.nativeElement;

    var html = htmlToPdfmake(pdfContent.innerHTML);

    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };
    html2canvas(this.content.nativeElement,).then((canvas) => {

    var imgData = canvas.toDataURL('image/png');
    var imgHeight = canvas.height * 210 / canvas.width;
    doc.addImage(imgData, 0, 0, 210, imgHeight);
    var heightLeft = imgHeight - 290;
    var position = 0;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, 210, imgHeight);
        heightLeft -= 295;
      }
    doc.save('Faktura_Vat_nr_' + this.invoice.numberOfInvoice + '.pdf');
  });
  }
}
