import EventHandlerInterface from "../../handler.interface";
import AddressChangedEvent from "../address_changed";

export default class SendLogWithCustomerDataHandler
  implements EventHandlerInterface
{
  handle(event: AddressChangedEvent): void {
    console.log(`O endereço do cliente: ${event.eventData.id}, ${event.eventData.name}  
    foi alterado para: 
    Rua ${event.eventData.address.street}, 
    Nº ${event.eventData.address.number},
    CEP ${event.eventData.address.zip},
    ${event.eventData.address.city}`);
  }
}
