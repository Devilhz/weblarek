import { ensureElement } from "../../../utils/utils.ts";
import { IEvents } from "../../base/Events.ts";
import { Buyer } from "../../models/Buyer.ts";
import { Form } from "./Form.ts";

export class OrderForm extends Form {
  protected cardButton: HTMLButtonElement;
  protected cashButton: HTMLButtonElement;
  protected addressInput: HTMLInputElement;

  constructor(events: IEvents, container: HTMLElement, private buyer: Buyer) {
    super(events, container, "order");

    this.cardButton = ensureElement<HTMLButtonElement>(
      'button[name="card"]',
      this.container
    );
    this.cashButton = ensureElement<HTMLButtonElement>(
      'button[name="cash"]',
      this.container
    );
    this.addressInput = ensureElement<HTMLInputElement>(
      'input[name="address"]',
      this.container
    );

    this.cardButton.addEventListener("click", () => {
      this.events.emit("order:payment", { payment: "card" });
    });

    this.cashButton.addEventListener("click", () => {
      this.events.emit("order:payment", { payment: "cash" });
    });

    this.addressInput.addEventListener("input", () => {
      this.events.emit("order:address", { address: this.addressInput.value });
    });

    events.on("BuyerData:changed", () => {
      this.updateFormState();
    });
  }

  private updateFormState(): void {
    const data = this.buyer.getData();
    const errors = this.buyer.validate();

    this.cardButton.classList.toggle(
      "button_alt-active",
      data.payment === "card"
    );
    this.cashButton.classList.toggle(
      "button_alt-active",
      data.payment === "cash"
    );

    const orderErrors: string[] = [];
    if (errors.payment) orderErrors.push(errors.payment);
    if (errors.address) orderErrors.push(errors.address);

    this.errors = orderErrors.join(", ");
    this.valid = orderErrors.length === 0;
  }

  set address(value: string) {
    this.addressInput.value = value;
    this.events.emit("order:address", { address: value });
  }
}
