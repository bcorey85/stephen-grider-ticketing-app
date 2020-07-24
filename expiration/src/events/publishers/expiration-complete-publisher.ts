import {
	Publisher,
	ExpirationCompleteEvent,
	Subjects
} from '@bctickets/common';

export class ExpirationCompletePublisher extends Publisher<
	ExpirationCompleteEvent
> {
	subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
