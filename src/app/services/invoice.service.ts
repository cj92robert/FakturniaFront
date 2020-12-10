import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Invoice} from '../Models/Invoice';
import {SERVER_API_URL} from '../appcostants';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private httpClient: HttpClient) { }
  url = SERVER_API_URL + 'api/v1/invoice/';


  addInvoice(invoice: Invoice): Observable<any> {
    return this.httpClient.post(this.url, invoice);
  }
  getInvoices(page: number, size: number): Observable<any>{
    return this.httpClient.get(this.url + '?page=' + page + '&size=' + size);
  }

  getInvoice(id): Observable<any>{
    return this.httpClient.get(this.url + id);
  }

  deleteInvoice(id): Observable<any>{
    return this.httpClient.delete(this.url + id);
  }

  getInvoicesPaid(page: number, size: number): Observable<any>{
    return this.httpClient.get(this.url + 'paid/' + '?page=' + page + '&size=' + size);
  }

  getInvoicesNotPaid(page: number, size: number): Observable<any>{
    return this.httpClient.get(this.url + 'notpaid/' + '?page=' + page + '&size=' + size);
  }
}
