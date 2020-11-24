import { DateCompany } from './DateCompany';
import { PositionOnInvoice } from './positionOnInvoice';


export class Invoice {
  accountNumber?: string;
  customerDate?: DateCompany;
  dateOfCreation?: Date;
  dateOfPayment?: Date;
  dateOfSale?: Date;
  dayOfTransfer?: string;
  description?: string;
  descriptionOfPayment?: string;
  id?: number;
  numberOfInvoice?: string;
  paid?: number;
  placeOfCreation?: string;
  positionOnInvoiceList: Array<PositionOnInvoice>;
  sellerData?: DateCompany;
  statusOfPayment?: Invoice.StatusOfPaymentEnum;
  wayOfPayment?: Invoice.WayOfPaymentEnum;
}
// tslint:disable-next-line:no-namespace
export namespace Invoice {
  export type StatusOfPaymentEnum = 'ISNOTPAID' | 'PAID';
  export const StatusOfPaymentEnum = {
    ISNOTPAID: 'ISNOTPAID' as StatusOfPaymentEnum,
    PAID: 'PAID' as StatusOfPaymentEnum
  };
  export type WayOfPaymentEnum = 'CASH' | 'TRANSFER';
  export const WayOfPaymentEnum = {
    CASH: 'CASH' as WayOfPaymentEnum,
    TRANSFER: 'TRANSFER' as WayOfPaymentEnum
  };
}
