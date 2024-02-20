import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("should trow error when id is empty", () => {
    expect(() => {
      new Order("", "123", []);
    }).toThrow("Id is required");
  });

  it("should trow error when customerId is empty", () => {
    expect(() => {
      new Order("123", "", []);
    }).toThrow("CustomerId is required");
  });

  it("should trow error when items is empty", () => {
    expect(() => {
      new Order("123", "123", []);
    }).toThrow("Items list must have at least one item");
  });

  it("should create an order", () => {
    const item = new OrderItem("123", "123", 2, 10);
    const order = new Order("123", "123", [item]);
    expect(order.id).toBe("123");
    expect(order.customerId).toBe("123");
    expect(order.items.length).toBe(1);
  });

  it("should calculate total", () => {
    const item1 = new OrderItem("123", "123", 2, 10);
    const item2 = new OrderItem("123", "123", 2, 20);
    const order = new Order("123", "123", [item1, item2]);
    expect(order.total()).toBe(60);
  })
});
