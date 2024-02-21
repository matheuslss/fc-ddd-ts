import Product from "../entity/product";
import RepositoryInterface from "./interface";

export default interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
