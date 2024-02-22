import Address from "../value_object/address";
import Customer from "../entity/customer";
import EventDispatcher from "../../@shared/event/dispatcher";
import AddressChangedEvent from "./address_changed";
import CustomerCreatedEvent from "./customer_created";
import SendFirstLogHandler from "./handler/send_first_log";
import SendLogWithCustomerDataHandler from "./handler/send_log_with_customer_data";
import SendSecondLogHandler from "./handler/send_second_log";

describe("Customer domain events unit tests", () => {
  it("should notify when a customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const sendFirstLog = new SendFirstLogHandler();
    const spyFirstLog = jest.spyOn(sendFirstLog, "handle");
    const sendSecondLog = new SendSecondLogHandler();
    const spySecondLog = jest.spyOn(sendSecondLog, "handle");

    eventDispatcher.register("CustomerCreatedEvent", sendFirstLog);
    eventDispatcher.register("CustomerCreatedEvent", sendSecondLog);

    expect(eventDispatcher.getHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getHandlers["CustomerCreatedEvent"].length).toBe(2);
    expect(eventDispatcher.getHandlers["CustomerCreatedEvent"][0]).toBe(
      sendFirstLog
    );
    expect(eventDispatcher.getHandlers["CustomerCreatedEvent"][1]).toBe(
      sendSecondLog
    );

    const customer = new Customer("1", "Customer 1");
    const customerCreatedEvent = new CustomerCreatedEvent(customer);

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyFirstLog).toHaveBeenCalled();
    expect(spySecondLog).toHaveBeenCalled();
  });

  it("should notify when an address is changed", () => {
    const eventDispatcher = new EventDispatcher();
    const sendLog = new SendLogWithCustomerDataHandler();
    const spyLog = jest.spyOn(sendLog, "handle");

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "12345-678", "São Paulo");
    customer.changeAddress(address);

    eventDispatcher.register("AddressChangedEvent", sendLog);

    const changeCustomerAddressEvent = new AddressChangedEvent(customer);

    eventDispatcher.notify(changeCustomerAddressEvent);

    expect(spyLog).toHaveBeenCalled();
  });
});
