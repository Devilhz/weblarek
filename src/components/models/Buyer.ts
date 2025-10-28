import { IBuyer, TPayment } from "../../types";
import { EventEmitter } from "../base/Events";
export class Buyer {
  private payment: TPayment;
  private email: string;
  private phone: string;
  private address: string;

  constructor(private events: EventEmitter) {
    this.payment = "" as TPayment;
    this.email = "";
    this.phone = "";
    this.address = "";
  }

 setData(data: Partial<IBuyer>): void {
  if (data.payment !== undefined) this.payment = data.payment;
  if (data.email !== undefined) this.email = data.email;
  if (data.phone !== undefined) this.phone = data.phone;
  if (data.address !== undefined) this.address = data.address;
  this.events.emit("BuyerData:changed");
}

  getData(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    };
  }

  clear(): void {
    this.payment = "" as TPayment;
    this.email = "";
    this.phone = "";
    this.address = "";
    this.events.emit("BuyerData:changed");
  }

  validate(): Partial<Record<keyof IBuyer, string>> {
    const errors: Partial<Record<keyof IBuyer, string>> = {};

    if (!this.payment) {
      errors.payment = "Выберите способ оплаты";
    }

    if (!this.address) {
      errors.address = "Введите адрес доставки";
    }

    if (!this.phone) {
      errors.phone = "Введите телефон";
    }

    if (!this.email) {
      errors.email = "Введите email";
    }
    return errors;
  }
}
