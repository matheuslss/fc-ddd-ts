import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order";

describe("Order service unit tests", () => {
  it("should get total of all orders", () => {
    const item1 = new OrderItem("1", "pName1", "prod1", 1, 100);
    const item2 = new OrderItem("1", "pName2", "prod2", 2, 200);
    const order1 = new Order("1", "c1", [item1]);
    const order2 = new Order("2", "c1", [item2]);

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(500);
  });

  it("should place an order", () => {
    const customer = new Customer("c1", "Customer 1");
    const item1 = new OrderItem("1", "pName", "p1", 1, 10);

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });
});
