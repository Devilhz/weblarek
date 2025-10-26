import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IGallery {
    items: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
    protected catalogElement: HTMLElement;

    constructor(protected events: IEvents, protected container: HTMLElement) {
        super(container);
        this.catalogElement = ensureElement<HTMLElement>('.gallery', this.container);
    }

    set items(items: HTMLElement[]) {
        this.catalogElement.replaceChildren(...items);
    }
}