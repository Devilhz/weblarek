import { IBuyer, TPayment } from "../../types/index";

//Класс покупателя
export class Buyer {
    private data: Partial<IBuyer> = {};

    // Сохранение данных (общий метод)
    setData(data: Partial<IBuyer>): void {
        this.data = { ...this.data, ...data };
    }

    // Сохранение отдельных полей
    setPayment(payment: TPayment): void {
        this.data.payment = payment;
    }

    setEmail(email: string): void {
        this.data.email = email;
    }

    setPhone(phone: string): void {
        this.data.phone = phone;
    }

    setAddress(address: string): void {
        this.data.address = address;
    }

    // Получение всех данных
    getData(): Partial<IBuyer> {
        return { ...this.data };
    }

    // Очистка данных
    clear(): void {
        this.data = {};
    }

    // Валидация данных 
    validate(): { [key in keyof IBuyer]?: string } {
        const errors: { [key in keyof IBuyer]?: string } = {};

    const paymentValidation = this.validatePayment();
    if (paymentValidation) {
        errors.payment = paymentValidation;
    }

    const emailValidation = this.validateEmail();
    if (emailValidation) {
        errors.email = emailValidation;
    }

    const phoneValidation = this.validatePhone();
    if (phoneValidation) {
        errors.phone = phoneValidation;
    }

    const addressValidation = this.validateAddress();
    if (addressValidation) {
        errors.address = addressValidation;
    }

    return errors;
}

    // Проверка валидности всех данных
    isValid(): boolean {
        return Object.keys(this.validate()).length === 0;
    }

    // Валидация отдельных полей
    validatePayment(): string | null {
        return !this.data.payment ? 'Не выбран вид оплаты' : null;
    }

    validateEmail(): string | null {
        return !this.data.email || this.data.email.trim() === '' ? 'Укажите email' : null;
    }

    validatePhone(): string | null {
        return !this.data.phone || this.data.phone.trim() === '' ? 'Укажите телефон' : null;
    }

    validateAddress(): string | null {
        return !this.data.address || this.data.address.trim() === '' ? 'Укажите адрес' : null;
    }
}