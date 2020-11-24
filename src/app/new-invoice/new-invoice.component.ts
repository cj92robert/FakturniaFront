import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {PositionOnInvoice} from '../Models/PositionOnInvoice';
import {Invoice} from '../Models/Invoice';
import {InvoiceService} from '../services/invoice.service';
import {MessageService} from 'primeng/api';
import {DateCompany} from '../Models/DateCompany';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css']
})
export class NewInvoiceComponent implements OnInit {
  public listItem: Array<PositionOnInvoice>;
  public  invoice;
  constructor(private invoiceService: InvoiceService, private messageService: MessageService) {
    this.invoice = new Invoice();
    this.invoice.sellerData = new DateCompany();
    this.invoice.customerDate = new DateCompany();
    this.listItem = new Array<PositionOnInvoice>();
  }

  ngOnInit(): void {
   this.addItem();
  }

  addInvoice(newInvoiceForm: NgForm): void {

  }

  addItem(): void {
    const positionOnInvoice = new PositionOnInvoice();
    positionOnInvoice.taxRate = 1;
    positionOnInvoice.priceForUnit = 0;
    positionOnInvoice.quantity = 0;
    positionOnInvoice.typeUnit = 'kg';
    positionOnInvoice.name = '';
    this.listItem.push(positionOnInvoice);

  }
  totalBrutto(): number{
     return this.listItem.map(val => {
      return val.quantity * val.priceForUnit * val.taxRate;
    }).reduce((acc, cur) => acc + cur);
  }

  totalNetto(): number{
    return this.listItem.map(val => {
      return val.quantity * val.priceForUnit;
    }).reduce((acc, cur) => acc + cur);
  }

  newInvoice(): void{
    this.invoice.positionOnInvoiceList = this.listItem.map(r => {
      r.taxRate = Math.round((r.taxRate - 1) * 100);
      return r;
    });
    this.invoiceService.addInvoice(this.invoice).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Dodano', detail: 'Dodano nową fakture.'});
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Błąd', detail: 'Nie udało się dodać faktury.'});
    });
  }
}
