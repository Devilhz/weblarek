import { Component } from '../../base/Component.ts';
import { ensureElement } from '../../../utils/utils.ts';
import { IEvents } from '../../base/Events.ts';


interface IForm {
    valid: boolean;
    errors: string;
}

export abstract class Form extends Component<IForm> {
    protected submitButton: HTMLButtonElement;
    protected errorsElement: HTMLElement;

    constructor(protected events: IEvents, container: HTMLElement, protected formEventName: string) {
        super(container);
        
       this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);
        this.errorsElement = ensureElement<HTMLElement>('.form__errors', this.container);
        
        this.container.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            this.events.emit(`${this.formEventName}:submit`);
        });
    }

    set valid(value: boolean) {
        this.submitButton.disabled = !value;
    }

    set errors(value: string) {
        this.errorsElement.textContent = value;
    }
}