import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer";
import Customer from "../../domain/entity/customer";
import CustomerRepository from "./customer";
import Address from "../../domain/entity/address";

describe("Customer repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "00000-000", "City");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "123" } });
    expect(customerModel.toJSON()).toStrictEqual({
      id: "123",
      name: "Customer 1",
      street: "Street 1",
      number: 1,
      zipcode: "00000-000",
      city: "City",
      active: true,
      rewardPoints: 0,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "00000-000", "City");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    customer.changeName("Customer 2");
    customer.addRewardPoints(10);
    customer.deactivate();

    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "123" } });
    expect(customerModel.toJSON()).toStrictEqual({
      id: "123",
      name: "Customer 2",
      street: "Street 1",
      number: 1,
      zipcode: "00000-000",
      city: "City",
      active: false,
      rewardPoints: 10,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "00000-000", "City");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const foundCustomer = await customerRepository.findById("123");
    expect(foundCustomer).toEqual(customer);
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();
    expect(async () => {
      await customerRepository.findById("123");
    }).rejects.toThrow("Customer not found");
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address("Street 1", 1, "00000-000", "City");
    const customer1 = new Customer("123", "Customer 1");
    customer1.changeAddress(address);
    const customer2 = new Customer("456", "Customer 2");
    customer2.changeAddress(address);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const foundCustomers = await customerRepository.findAll();
    expect(foundCustomers).toEqual([customer1, customer2]);
  });
});
