import { ensureElement } from "../../../utils/utils.ts";
import { Component } from "../../base/Component.ts";


export interface ICardActions {
  onClick?: (event: MouseEvent) => void;
}

export abstract class Card<T> extends Component<T> {
  protected _title: HTMLElement;
  protected _price: HTMLElement;

  constructor(protected container: HTMLElement, actions?: ICardActions) {
    super(container);
    this._title = ensureElement<HTMLElement>(".card__title", this.container);
    this._price = ensureElement<HTMLElement>(".card__price", this.container);
    if (actions?.onClick) {
      this.container.addEventListener("click", actions.onClick);
    }
  }

  set title(value: string) {
    this._title.textContent = value;
  }

  set price(value: string | number | null) {
    this._price.textContent = `${value} синапсов`;
  }
}