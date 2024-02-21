import Customer from "../entity/customer";
import RepositoryInterface from "./interface";

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
