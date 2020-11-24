import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../services/customer.service';
import {Customer} from '../Models/Customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(private customerService: CustomerService) { }

  customers: Customer[] = new Array();
  amountOfCustomer = 0;
  page = 0;
  size = 10;

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void{
    this.customerService.getCustomers(this.page, this.size).subscribe(value => {
      console.log(value);
      this.amountOfCustomer = value.totalElements;
      this.customers = value.content;
    }, error => {
      console.log(error);
    });
  }

  paginate($event: any) {
    this.page = $event.page;
    this.size = $event.rows;
    this.getCustomers();
  }
}
