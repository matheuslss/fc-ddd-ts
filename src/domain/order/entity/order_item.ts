export default class OrderItem {
  private _id: string;
  private _name: string;
  private _productId: string;
  private _quantity: number;
  private _price: number;

  constructor(
    id: string,
    name: string,
    productId: string,
    quantity: number,
    price: number
  ) {
    this._id = id;
    this._name = name;
    this._productId = productId;
    this._quantity = quantity;
    this._price = price;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get productId() {
    return this._productId;
  }

  get price() {
    return this._price;
  }

  get quantity() {
    return this._quantity;
  }
}
