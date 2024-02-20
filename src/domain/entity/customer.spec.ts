import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Customer("", "John");
    }).toThrow("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Customer("123", "");
    }).toThrow("Name is required");
  });

  it("should create a customer", () => {
    const customer = new Customer("123", "John");
    expect(customer.id).toBe("123");
    expect(customer.name).toBe("John");
  });

  it("should throw error when change name with an empty name", () => {
    expect(() => {
      const customer = new Customer("123", "John");
      customer.changeName("");
    }).toThrow("Name is required");
  })

  it("should change name", () => {
    const customer = new Customer("123", "John");
    customer.changeName("Jane");
    expect(customer.name).toBe("Jane");
  });

  it("should activate customer", () => {
    const customer = new Customer("123", "John");
    const address = new Address("Street 1", 123, "12345-678", "City");
    customer.Address = address;
    customer.activate();
    expect(customer.active).toBeTruthy();
  });

  it("should throw error when address is undefined when activate a customer", () => {
    expect(() => {
      const customer = new Customer("123", "John");
      customer.activate();
    }).toThrow("Address is mandatory to activate a customer");
  });

  it("should deactivate customer", () => {
    const customer = new Customer("123", "John");
    customer.deactivate();
    expect(customer.active).toBeFalsy();
  });
});
