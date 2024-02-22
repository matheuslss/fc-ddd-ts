import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Product("", "Product 1", 10);
    }).toThrow("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Product("123", "", 10);
    }).toThrow("Name is required");
  });

  it("should throw error when price is less or equal zero", () => {
    expect(() => {
      new Product("123", "Product 1", 0);
    }).toThrow("Price must be greater than zero");
  });

  it("should create a product", () => {
    const product = new Product("123", "Product 1", 10);
    expect(product.id).toBe("123");
    expect(product.name).toBe("Product 1");
    expect(product.price).toBe(10);
  });

  it("should throw error when change name with an empty name", () => {
    expect(() => {
      const product = new Product("123", "Product 1", 10);
      product.changeName("");
    }).toThrow("Name is required");
  });

  it("should change name", () => {
    const product = new Product("123", "Product 1", 10);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should throw error when change price with an invalid value", () => {
    expect(() => {
      const product = new Product("123", "Product 1", 10);
      product.changePrice(-1);
    }).toThrow("Price must be greater than zero");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 10);
    product.changePrice(20);
    expect(product.price).toBe(20);
  });
});
