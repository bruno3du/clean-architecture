import { AddressValidatorFactory } from "../factory/address.validator.factory";

type AddressProps = {
  street: string;
  number: number;
  zipCode: string;
  city: string;
  state: string;
};

export default class Address {
  private _street: string;
  private _number: number;
  private _zipCode: string;
  private _city: string;
  private _state: string;

  constructor(props: AddressProps) {
    this._street = props.street;
    this._number = props.number;
    this._zipCode = props.zipCode;
    this._city = props.city;
    this._state = props.state;

    this.validate();
  }

  validate() {
    AddressValidatorFactory.create().validate(this);
  }

  get street() {
    return this._street;
  }

  get number() {
    return this._number;
  }

  get zipCode() {
    return this._zipCode;
  }

  get city() {
    return this._city;
  }

  get state() {
    return this._state;
  }

  toString() {
    return `${this._street}, ${this._number}, ${this._zipCode}, ${this._city}, ${this._state}`;
  }
}
