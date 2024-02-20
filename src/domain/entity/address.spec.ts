import Address from "./address";

describe("Address unit tests", () => {
  it("should throw error when street is empty", () => {
    expect(() => {
      new Address("", 1, "00000-000", "City");
    }).toThrow("Street is required");
  });

  it("should throw error when number is less or equal zero", () => {
    expect(() => {
      new Address("Street", 0, "00000-000", "City");
    }).toThrow("Number must be greater than zero");
  });

  it("should throw error when zip is empty", () => {
    expect(() => {
      new Address("Street", 1, "", "City");
    }).toThrow("Zip is required");
  });

  it("should throw error when city is empty", () => {
    expect(() => {
      new Address("Street", 1, "00000-000", "");
    }).toThrow("City is required");
  });
});
