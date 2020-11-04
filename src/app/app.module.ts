import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import {RouterModule} from '@angular/router';
import {HashLocationStrategy, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { StartComponent } from './start/start.component';
import { ContactComponent } from './contact/contact.component';
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './auth.interceptor';
import {ToastModule} from 'primeng/toast';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    StartComponent,
    ContactComponent,
    NewInvoiceComponent,
    ViewInvoiceComponent,
    RegisterComponent,
    LoginComponent,
    PageNotFoundComponent,
    NewCustomerComponent,
    CustomerListComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule
  ],
  providers: [
    {      provide: LocationStrategy, useClass: PathLocationStrategy},
    {provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
