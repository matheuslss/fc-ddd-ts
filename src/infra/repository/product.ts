import Product from "../../domain/entity/product";
import ProductRepositoryInterface from "../../domain/repository/product";
import ProductModel from "../db/sequelize/model/product";

export default class ProductRepository implements ProductRepositoryInterface {
  async create(product: Product) {
    await ProductModel.create({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  }

  async update(product: Product) {
    await ProductModel.update(
      {
        name: product.name,
        price: product.price,
      },
      {
        where: {
          id: product.id,
        },
      }
    );
  }

  async findById(id: string): Promise<Product> {
    try {
      const productModel = await ProductModel.findOne({ where: { id } });
      return new Product(
        productModel.id,
        productModel.name,
        productModel.price
      );
    } catch (error) {
      throw new Error("Product not found");
    }
  }

  async findAll(): Promise<Product[]> {
    const productModels = await ProductModel.findAll();
    return productModels.map(
      (productModel) =>
        new Product(productModel.id, productModel.name, productModel.price)
    );
  }
}
