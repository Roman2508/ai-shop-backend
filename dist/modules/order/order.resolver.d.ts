import { OrderService } from './order.service';
import { CreateOrderInput } from './inputs/create-order.input';
export declare class OrderResolver {
    private readonly orderService;
    constructor(orderService: OrderService);
    createPayment(userId: string, input: CreateOrderInput): Promise<boolean>;
    updateStatus(): Promise<boolean>;
}
