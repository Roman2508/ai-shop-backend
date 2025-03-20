declare class OrderItems {
    quantity: number;
    price: number;
    productId: string;
}
export declare class CreatePaymentDto {
    name: string;
    price: number;
    userId: string;
    items: OrderItems[];
}
export {};
