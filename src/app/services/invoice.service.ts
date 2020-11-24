import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Invoice} from '../Models/Invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private httpClient: HttpClient) { }
  url = 'http://localhost:80/api/v1/invoice/';


  addInvoice(invoice: Invoice): Observable<any> {
    return this.httpClient.post(this.url, invoice);
  }
  getInvoices(page: number, size: number): Observable<any>{
    return this.httpClient.get(this.url + '?page=' + page + '&size=' + size);
  }
}
