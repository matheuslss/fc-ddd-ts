import EventDispatcher from "./dispatcher";
import EventHandlerInterface from "./handler.interface";
import SendEmailWhenProductCreatedHandler from "./product/handler/send_email_when_product_created";
import ProductCreatedEvent from "./product/product_created";

describe("Domain events unit tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const productEvent = new ProductCreatedEvent({
      email: "a@a.com",
    });
    const eventHandler = new SendEmailWhenProductCreatedHandler();
    eventHandler.handle(productEvent);
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getHandlers["ProductCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getHandlers["ProductCreatedEvent"][0]).toBe(
      eventHandler
    );
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getHandlers["ProductCreatedEvent"][0]).toBe(
      eventHandler
    );

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getHandlers["ProductCreatedEvent"].length).toBe(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getHandlers["ProductCreatedEvent"][0]).toBe(
      eventHandler
    );

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getHandlers["ProductCreatedEvent"]).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getHandlers["ProductCreatedEvent"][0]).toBe(
      eventHandler
    );

    const productEvent = new ProductCreatedEvent({
      email: "a@a.com",
    });
    eventDispatcher.notify(productEvent);
    expect(spyEventHandler).toHaveBeenCalled();
  });
});
