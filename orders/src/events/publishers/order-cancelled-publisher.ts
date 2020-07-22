import { Publisher, OrderCancelledEvent, Subjects } from '@bctickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
	subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
