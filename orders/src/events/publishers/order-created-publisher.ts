import { Publisher, OrderCreatedEvent, Subjects } from '@bctickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
	subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
