import EventHandlerInterface from "../../handler.interface";

export default class SendFirstLogHandler implements EventHandlerInterface {
  handle(): void {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated");
  }
}
