import Order from "../entity/order";
import RepositoryInterface from "./interface";

export default interface OrderRepositoryInterface
  extends RepositoryInterface<Order> {}
