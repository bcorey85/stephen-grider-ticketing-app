import { Publisher, Subjects, TicketUpdatedEvent } from '@bctickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
	readonly subject = Subjects.TicketUpdated;
}
