import EventInterface from "../interface";

export default class CustomerCreatedEvent implements EventInterface {
  dateOccurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dateOccurred = new Date();
    this.eventData = eventData;
  }
}
