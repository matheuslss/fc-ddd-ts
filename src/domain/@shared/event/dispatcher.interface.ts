import HandlerInterface from "./handler.interface";
import EventInterface from "./interface";

export default interface EventDispatcherInterface {
  notify(event: EventInterface): void;
  register(eventName: string, handler: HandlerInterface): void;
  unregister(eventName: string, handler: HandlerInterface): void;
  unregisterAll(): void;
}
