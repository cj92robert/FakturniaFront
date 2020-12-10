import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SERVER_API_URL} from '../appcostants';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }
  url = SERVER_API_URL + 'api/v1/customer/';


  addCustomer(customer): Observable<any> {
    return this.httpClient.post(this.url, customer);
  }
  getCustomers(page: number, size: number): Observable<any>{
    return this.httpClient.get(this.url + '?page=' + page + '&size=' + size);
  }
}
