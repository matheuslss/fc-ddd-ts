import Product from "../entity/product";
import RepositoryInterface from "../../@shared/repository/interface";

export default interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
