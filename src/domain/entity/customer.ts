import Address from "./address";

export default class Customer {

    private _id: string;
    private _name: string = "";
    private _address: string = "";
    private _active: boolean = true;

    constructor(id: string, name: string) {
        this._id = id
        this._name = name
    }
}