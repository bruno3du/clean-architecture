import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import { ProductValidatorFactory } from "../factory/product.validator.factory";
import { ProductInterface } from "./product.interface";

type ProductProps = {
  id: string;
  name: string;
  price: number;
};

export default class Product extends Entity implements ProductInterface {
  private _name: string;
  private _price: number;

  constructor(orderItemProps: ProductProps) {
    super()
    this._id = orderItemProps.id;
    this._name = orderItemProps.name;
    this._price = orderItemProps.price;

    this.validate();
  }

  validate() {
    ProductValidatorFactory.create().validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors);
    }
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  updatePrice(price: number) {
    this._price = price;
    this.validate();
  }
}
