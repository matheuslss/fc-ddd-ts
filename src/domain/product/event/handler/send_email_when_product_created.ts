import EventHandlerInterface from "../../handler.interface";
import ProductCreatedEvent from "../product_created";

export default class SendEmailWhenProductCreatedHandler
  implements EventHandlerInterface
{
  handle(event: ProductCreatedEvent): void {
    if (event.eventData?.email) {
      console.log(`Send email to ${event.eventData.email}`);
      return;
    }

    console.log(`Sending email...`);
  }
}
