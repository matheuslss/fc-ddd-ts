import EventDispatcherInterface from "./dispatcher.interface";
import HandlerInterface from "./handler.interface";
import EventInterface from "./interface";

export default class EventDispatcher implements EventDispatcherInterface {
  private handlers: { [eventName: string]: HandlerInterface[] } = {};

  get getHandlers(): { [eventName: string]: HandlerInterface[] } {
    return this.handlers;
  }

  register(eventName: string, handler: HandlerInterface): void {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(handler);
  }

  unregister(eventName: string, handler: HandlerInterface): void {
    if (this.handlers[eventName]) {
      const index = this.handlers[eventName].indexOf(handler);
      if (index !== -1) {
        this.handlers[eventName].splice(index, 1);
      }
    }
  }

  unregisterAll(): void {
    this.handlers = {};
  }

  notify(event: EventInterface): void {
    const eventName = event.constructor.name;
    if (this.handlers[eventName]) {
      this.handlers[eventName].forEach((handler) => handler.handle(event));
    }
  }
}
