import { NgModule } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {StartComponent} from './start/start.component';
import {ContactComponent} from './contact/contact.component';
import {NewInvoiceComponent} from './new-invoice/new-invoice.component';
import {ViewInvoiceComponent} from './view-invoice/view-invoice.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {NewCustomerComponent} from './new-customer/new-customer.component';
import {CustomerListComponent} from './customer-list/customer-list.component';


const routes: Routes = [
  {path : 'start', component: StartComponent},
  {path : 'contact', component: ContactComponent},
  {path : 'generate_invoice', component: NewInvoiceComponent},
  {path : 'invoice/:id', component: ViewInvoiceComponent},
  {path : 'login' , component: LoginComponent, data: {bodyClass: 'login'}},
  {path : 'register', component: RegisterComponent},
  {path : 'newcustomer', component: NewCustomerComponent},
  {path : 'customerlist', component: CustomerListComponent},
  {path: '', redirectTo: 'start', pathMatch: 'full' },
  {path: '**', component: PageNotFoundComponent}
];


@NgModule({
  declarations: [],
  imports: [    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
