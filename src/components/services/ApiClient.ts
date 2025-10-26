import { IProduct, IBuyer, IOrderResult } from "../../types";
import { Api } from "../base/Api";

interface IProductsResponse {
    total: number;
    items: IProduct[];
}



export class ApiClient extends Api {
    constructor(baseUrl: string, options: RequestInit = {}) {
        super(baseUrl, options);
    }

  getProducts(): Promise<IProduct[]> {
        return this.get<IProductsResponse>("/product/")
            .then((response) => {
                return response.items;
            });
    }

    createOrder(orderData: IBuyer): Promise<IOrderResult> {
        return this.post("/order/", orderData);
    }
}