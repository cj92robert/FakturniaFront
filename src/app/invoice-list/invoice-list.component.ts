import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {InvoiceService} from '../services/invoice.service';
import {Invoice} from '../Models/Invoice';
import {filter} from 'rxjs/operators';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
   paramQuery: string;
   listInvoice: Array<Invoice>;
  amountOfInvoice = 0;
  invoiceToDelete: Invoice = null;
  private page = 0;
  private size = 10;
  constructor( private activatedRoute: ActivatedRoute, private router: Router, private invoiceService: InvoiceService, private messageService: MessageService) {
    this.listInvoice = new Array<Invoice>();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => this.paramQuery = data.filter);
    this.getAllInvoiceParam();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (this.paramQuery === 'paid'){
          this.getAllInvoicePaid();
        }else if (this.paramQuery === 'notpaid'){
          this.getAllInvoiceNotPaid();
        }else{
          this.getAllInvoice();
        }
      });
  }

  private getAllInvoiceParam(): void {
    if (this.paramQuery === 'paid') {
      this.getAllInvoicePaid();
    } else if (this.paramQuery === 'notpaid') {
      this.getAllInvoiceNotPaid();
    } else {
      this.getAllInvoice();
    }
  }

  private getAllInvoice(): void {
    this.invoiceService.getInvoices(this.page, this.size).subscribe(res => {
      this.listInvoice = res.content;
      console.log(res);
      this.amountOfInvoice = res.totalElements;
    }, error => {
      console.log(error);
    });
  }
  private getAllInvoicePaid(): void {
    this.invoiceService.getInvoicesPaid(this.page, this.size).subscribe(res => {
      this.listInvoice = res.content;
      console.log(res);
      this.amountOfInvoice = res.totalElements;
    }, error => {
      console.log(error);
    });
  }

  private getAllInvoiceNotPaid(): void {
    this.invoiceService.getInvoicesNotPaid(this.page, this.size).subscribe(res => {
      this.listInvoice = res.content;
      console.log(res);
      this.amountOfInvoice = res.totalElements;
    }, error => {
      console.log(error);
    });
  }
  totalValue(): number{
    return this.listInvoice.map(x => x.totalValue).reduce((total, price) => total + price, 0);
  }

  paginate($event: any): void {
    this.page = $event.page;
    this.size = $event.rows;
    this.getAllInvoiceParam();
  }

  statusPayment(statusOfPayment: 'ISNOTPAID' | 'PAID'): string {
    return statusOfPayment === 'ISNOTPAID' ? 'Nie zapłacona' : 'Zapłacona';
  }

  clickDelete(invoice: Invoice): void {
    this.invoiceToDelete = invoice;
  }

  deleteInvoice(): void {
    this.invoiceService.deleteInvoice(this.invoiceToDelete.id).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Usuniety', detail: 'Faktura została usunięta'});
      this.getAllInvoiceParam();
    } , error => {
      this.messageService.add({ severity: 'error', summary: 'Blad', detail: 'Nie udało sie usunąć'});
      this.getAllInvoiceParam();
    });

  }
}
