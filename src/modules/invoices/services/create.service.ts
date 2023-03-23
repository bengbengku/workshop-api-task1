import { CustomerRepository } from "@src/modules/customers/repositories/customer.repository.js";
import { InvoiceEntity, InvoiceInterface } from "../entities/invoice.entity.js";
import { InvoiceRepository } from "../repositories/invoice.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class CreateInvoiceService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(doc: InvoiceInterface, session: unknown) {
    const invoiceEntity = new InvoiceEntity({
      customer_id: doc.customer_id?.toString(),
      total: doc.total,
    });

    const invoiceRepository = new InvoiceRepository(this.db);
    const createResponse = await invoiceRepository.create(invoiceEntity.invoice, { session });
    const readResponse = await invoiceRepository.read(createResponse._id);

    const customerRepository = new CustomerRepository(this.db);
    const readCustomerId = await customerRepository.read(readResponse.customer_id as string);

    return {
      _id: readResponse._id,
      customer: {
        name: readCustomerId.name as string,
        phone: readCustomerId.phone as string,
      },
      total: readResponse.total as number,
    };
  }
}
