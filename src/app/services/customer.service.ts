import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }
  url = 'http://localhost:80/api/v1/customer/';


  addCustomer(customer): Observable<any> {
    return this.httpClient.post(this.url, customer);
  }
  getCustomers(page: number, size: number): Observable<any>{
    return this.httpClient.get(this.url + '?page=' + page + '&size=' + size);
  }
}
