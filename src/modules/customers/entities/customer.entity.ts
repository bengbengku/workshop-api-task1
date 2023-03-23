export interface CustomerInterface {
  name?: string;
  phone?: string;
}

export const restricted = [];

export class CustomerEntity {
  public customer: CustomerInterface;

  constructor(customer: CustomerInterface) {
    this.customer = customer;
  }
}
