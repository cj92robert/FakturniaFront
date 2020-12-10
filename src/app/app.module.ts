import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

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
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {ToastModule} from 'primeng/toast';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import {PaginatorModule} from 'primeng/paginator';
import {registerLocaleData} from '@angular/common';
import localPl from '@angular/common/locales/pl';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';


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
    CustomerListComponent,
    InvoiceListComponent,
    EditInvoiceComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    PaginatorModule
  ],
  providers: [
    {      provide: LocationStrategy, useClass: PathLocationStrategy},
    {provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true},
    {provide: LOCALE_ID, useValue: "pl"}],
  bootstrap: [AppComponent]
})
export class AppModule { }
registerLocaleData(localPl, "pl");
