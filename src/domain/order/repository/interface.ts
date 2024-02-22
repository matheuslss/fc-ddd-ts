import Order from "../entity/order";
import RepositoryInterface from "../../@shared/repository/interface";

export default interface OrderRepositoryInterface
  extends RepositoryInterface<Order> {}
