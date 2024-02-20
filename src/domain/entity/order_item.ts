export default class OrderItem {
  private _id: string;
  private _productId: string;
  private _quantity: number;
  private _price: number;

  constructor(id: string, productId: string, quantity: number, price: number) {
    this._id = id;
    this._productId = productId;
    this._quantity = quantity;
    this._price = price;
  }

  get price() {
    return this._price;
  }
}
