import { ObjectId } from "mongodb";

export interface InvoiceInterface {
  customer_id?: string | ObjectId;
  total?: number;
}

export const restricted = [];

export class InvoiceEntity {
  public invoice: InvoiceInterface;

  constructor(invoice: InvoiceInterface) {
    this.invoice = invoice;
  }
}
