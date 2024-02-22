import { Sequelize } from "sequelize-typescript";
import ProductModel from "../db/sequelize/model/product";
import Product from "../../domain/product/entity/product";
import ProductRepository from "./product";

describe("Product repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "123" } });
    expect(productModel.toJSON()).toStrictEqual({
      id: "123",
      name: "Product 1",
      price: 10,
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);

    await productRepository.create(product);

    product.changeName("Product 2");
    product.changePrice(20);

    await productRepository.update(product);

    const productModel = await ProductModel.findOne({ where: { id: "123" } });
    expect(productModel.toJSON()).toStrictEqual({
      id: "123",
      name: "Product 2",
      price: 20,
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);

    await productRepository.create(product);

    const foundProduct = await productRepository.findById("123");
    expect(foundProduct).toEqual(product);
  });

  it("should throw an error when product is not found", async () => {
    const productRepository = new ProductRepository();
    expect(async () => {
      await productRepository.findById("123");
    }).rejects.toThrow("Product not found");
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product("123", "Product 1", 10);
    const product2 = new Product("456", "Product 2", 20);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();
    expect(foundProducts).toEqual([product1, product2]);
  });
});
