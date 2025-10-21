import { IApi, IProduct, IOrderRequest, IOrderResult, IProductsResponse } from '../../types/index';

export class ApiClient {
    constructor(private api: IApi) {}

    /**
     * Получает массив товаров с сервера
     * @returns Promise с массивом товаров
     */
    async getProducts(): Promise<IProduct[]> {
        try {
            const response = await this.api.get<IProductsResponse>('/product/');
            return response.items;
        } catch (error) {
            console.error('Ошибка при получении товаров:', error);
            throw error;
        }
    }

    /**
     * Отправляет заказ на сервер
     * @param orderData Данные заказа
     * @returns Promise с результатом создания заказа
     */
    async createOrder(orderData: IOrderRequest): Promise<IOrderResult> {
        try {
            const response = await this.api.post<IOrderResult>('/order/', orderData);
            return response;
        } catch (error) {
            console.error('Ошибка при создании заказа:', error);
            throw error;
        }
    }
}