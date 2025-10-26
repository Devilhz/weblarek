import { ensureElement } from "../../../utils/utils.ts";
import { Card, ICardActions } from "./Card.ts";

interface ICardBusket {
    title: string;
    price: string | number | null;
    index:number;
}

export class CardBasket extends Card<ICardBusket> {
    protected _index: HTMLElement;
    protected _deleteButton: HTMLButtonElement;

    constructor(protected container: HTMLElement, actions?: ICardActions) {
        super(container);
        
        this._index = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this._deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
        
        if (actions?.onClick) {
            this._deleteButton.addEventListener('click', actions.onClick);
        }
    }

    set index(value: number) {
        this._index.textContent = String(value);
    }
}