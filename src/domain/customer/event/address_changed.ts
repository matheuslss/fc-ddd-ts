import EventInterface from "../interface";

export default class AddressChangedEvent implements EventInterface {
  dateOccurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dateOccurred = new Date();
    this.eventData = eventData;
  }
}
