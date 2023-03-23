import { CustomerInterface } from "../entities/customer.entity.js";
import { CustomerRepository } from "../repositories/customer.repository.js";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";

export class ReadManyCustomerService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(query: QueryInterface) {
    const roleRepository = new CustomerRepository(this.db);
    const result = await roleRepository.readMany(query);

    return {
      customers: result.data as unknown as Array<CustomerInterface>,
      pagination: result.pagination,
    };
  }
}
