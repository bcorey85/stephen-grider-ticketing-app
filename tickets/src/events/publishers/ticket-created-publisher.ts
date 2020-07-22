import { Publisher, Subjects, TicketCreatedEvent } from '@bctickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
	readonly subject = Subjects.TicketCreated;
}
