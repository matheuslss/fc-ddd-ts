import EventHandlerInterface from "../../handler.interface";

export default class SendSecondLogHandler implements EventHandlerInterface {
  handle(): void {
    console.log("Esse é o segundo console.log do evento: CustomerCreated");
  }
}
