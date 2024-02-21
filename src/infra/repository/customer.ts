import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer";
import CustomerModel from "../db/sequelize/model/customer";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(customer: Customer): Promise<void> {
    await CustomerModel.create({
      id: customer.id,
      name: customer.name,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zip,
      city: customer.address.city,
      active: customer.active,
      rewardPoints: customer.rewardPoints,
    });
  }

  async update(customer: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: customer.name,
        street: customer.address.street,
        number: customer.address.number,
        zipcode: customer.address.zip,
        city: customer.address.city,
        active: customer.active,
        rewardPoints: customer.rewardPoints,
      },
      {
        where: {
          id: customer.id,
        },
      }
    );
  }

  async findById(id: string): Promise<Customer> {
    try {
      const customerModel = await CustomerModel.findOne({ where: { id } });
      const customer = new Customer(customerModel.id, customerModel.name);
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zipcode,
        customerModel.city
      );
      customer.changeAddress(address);
      return customer;
    } catch (error) {
      throw new Error("Customer not found");
    }
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();
    const customers = customerModels.map((customerModel) => {
      const customer = new Customer(customerModel.id, customerModel.name);
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zipcode,
        customerModel.city
      );
      customer.changeAddress(address);

      return customer;
    });

    return customers;
  }
}
