import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Customer} from '../Models/Customer';
import {CustomerService} from '../services/customer.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  constructor(private customerService: CustomerService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  addCustomer(newCustomerForm: NgForm): void{
    const customer: Customer = new Customer();
    customer.shortName = newCustomerForm.value.shortName;
    customer.longName = newCustomerForm.value.longName;
    customer.phone = newCustomerForm.value.phone;
    customer.idCardNumber = newCustomerForm.value.idCardNumber;
    customer.address = newCustomerForm.value.address;
    customer.city = newCustomerForm.value.city;
    customer.postcode = newCustomerForm.value.postcode;
    customer.email = newCustomerForm.value.email;
    customer.nip = newCustomerForm.value.nip;
    customer.regon = newCustomerForm.value.regon;
    customer.bankAccountNumber = newCustomerForm.value.bankAccount;
    customer.description = newCustomerForm.value.description;
    // ----
    this.customerService.addCustomer(customer).subscribe(success => {
      this.messageService.add({ severity: 'success', summary: 'Dodano', detail: 'Dodano nowego klienta'});
      this.router.navigate(['customerlist']);
    }, error => {
      this.messageService.add({severity: 'error', summary: 'Bład', detail: 'Nipowiodlo się dodawanie nowego klienta'});
    });
  }
}
