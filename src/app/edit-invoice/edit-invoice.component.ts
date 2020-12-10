import { Component, OnInit } from '@angular/core';
import {PositionOnInvoice} from '../Models/PositionOnInvoice';
import {InvoiceService} from '../services/invoice.service';
import {MessageService} from 'primeng/api';
import {Invoice} from '../Models/Invoice';
import {DateCompany} from '../Models/DateCompany';
import {formatDate} from '@angular/common';
import WayOfPaymentEnum = Invoice.WayOfPaymentEnum;
import StatusOfPaymentEnum = Invoice.StatusOfPaymentEnum;
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css']
})
export class EditInvoiceComponent implements OnInit {
  public listItem: Array<PositionOnInvoice>;
  public  invoice;
  today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  paramQuery;
  constructor(private location: Location, private activatedRoute: ActivatedRoute, private invoiceService: InvoiceService, private messageService: MessageService) {
    this.invoice = new Invoice();
    this.invoice.sellerData = new DateCompany();
    this.invoice.customerDate = new DateCompany();
    this.invoice.wayOfPayment = WayOfPaymentEnum.CASH;
    this.invoice.statusOfPayment = StatusOfPaymentEnum.PAID;
    this.invoice.dateOfSale = this.today;
    this.invoice.dateOfCreation = this.today;
    console.log(this.invoice.dateOfCreation);
    this.invoice.dateOfPayment = this.today;
    this.invoice.dayOfTransfer = this.today;
    this.invoice.numberOfInvoice = formatDate(new Date(), '/MM/yyyy', 'en');
    this.listItem = new Array<PositionOnInvoice>();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => this.paramQuery = data.id);
    this.invoiceService.getInvoice(this.paramQuery).subscribe(res => {
      this.invoice = res;
      this.listItem = this.invoice.positionOnInvoiceList;
      this.invoice.dateOfCreation = formatDate(this.invoice.dateOfCreation, 'yyyy-MM-dd', 'pl');
      this.invoice.dateOfSale = formatDate(this.invoice.dateOfSale, 'yyyy-MM-dd', 'pl');
      this.invoice.dateOfPayment = formatDate(this.invoice.dateOfPayment, 'yyyy-MM-dd', 'pl');
      this.listItem = this.listItem.map(item => {
        item.taxRate = item.taxRate * 0.01 + 1;
        return item;
      });
      console.log(res);
    });
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
      this.messageService.add({ severity: 'success', summary: 'Dodano', detail: 'Zaktualizowano fakture.'});
      this.listItem = this.listItem.map(item => {
        item.taxRate = item.taxRate * 0.01 + 1;
        return item;
      });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Błąd', detail: 'Nie udało się zaktualizować faktury.'});
    });
  }

  delete(item: PositionOnInvoice): void {
    this.listItem = this.listItem.filter( it => it !== item);
  }

  undo(): void{
    this.location.back();
  }
}
