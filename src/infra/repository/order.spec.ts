import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import Product from "../../domain/entity/product";
import CustomerModel from "../db/sequelize/model/customer";
import ProductModel from "../db/sequelize/model/product";
import OrderItemModel from "../db/sequelize/model/order_item";
import OrderModel from "../db/sequelize/model/order";
import CustomerRepository from "../repository/customer";
import ProductRepository from "../repository/product";
import OrderRepository from "./order";

describe("Order repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("p1", "Product 1", 10);
    await productRepository.create(product);

    const item = new OrderItem(
      "i1",
      product.name,
      product.id,
      10,
      product.price
    );

    const order = new Order("123", customer.id, [item]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: "123" },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          order_id: order.id,
          product_id: item.productId,
        },
      ],
    });
  });

  it("should update a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product1 = new Product("p1", "Product 1", 10);
    await productRepository.create(product1);

    const product2 = new Product("p2", "Product 2", 20);
    await productRepository.create(product2);

    const item1 = new OrderItem(
      "i1",
      product1.name,
      product1.id,
      10,
      product1.price
    );

    const order = new Order("123", customer.id, [item1]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const item2 = new OrderItem(
      "i2",
      product2.name,
      product2.id,
      20,
      product2.price
    );
    order.addItem(item2);
    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: { id: "123" },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: item1.id,
          name: item1.name,
          price: item1.price,
          quantity: item1.quantity,
          order_id: order.id,
          product_id: item1.productId,
        },
        {
          id: item2.id,
          name: item2.name,
          price: item2.price,
          quantity: item2.quantity,
          order_id: order.id,
          product_id: item2.productId,
        },
      ],
    });
  });

  it("should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("p1", "Product 1", 10);
    await productRepository.create(product);

    const item = new OrderItem(
      "i1",
      product.name,
      product.id,
      10,
      product.price
    );

    const order = new Order("123", customer.id, [item]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: "123" },
      include: ["items"],
    });

    const orderResult = await orderRepository.findById(order.id);

    expect(order).toStrictEqual(orderResult);
  });

  it("should throw an error when order is not found", async () => {
    const orderRepository = new OrderRepository();
    expect(async () => await orderRepository.findById("123")).rejects.toThrow(
      "Order not found"
    );
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("p1", "Product 1", 10);
    await productRepository.create(product);

    const item1 = new OrderItem(
      "i1",
      product.name,
      product.id,
      10,
      product.price
    );

    const item2 = new OrderItem(
      "i2",
      product.name,
      product.id,
      10,
      product.price
    );

    const order1 = new Order("123", customer.id, [item1]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order1);

    const order2 = new Order("456", customer.id, [item2]);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();

    expect(orders).toHaveLength(2);
    expect(orders).toContainEqual(order1);
    expect(orders).toContainEqual(order2);
  });
});
