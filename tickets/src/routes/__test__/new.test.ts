import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../../nats-wrapper';

it('house a route handler listening to /api/tickets for post requests', async () => {
	const response = await request(app).post('/api/tickets').send({});

	expect(response.status).not.toEqual(404);
});

it('can only be access if user is signed in', async () => {
	const response = await request(app)
		.post('/api/tickets')
		.send({})
		.expect(401);
});

it('returns status other than 401 if user is signed in', async () => {
	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', global.signin())
		.send({});

	expect(response.status).not.toEqual(401);
});

it('returns an error if invalid title is provided', async () => {
	await request(app)
		.post('/api/tickets')
		.set('Cookie', global.signin())
		.send({ title: '', price: 10 })
		.expect(400);

	await request(app)
		.post('/api/tickets')
		.set('Cookie', global.signin())
		.send({ price: 10 })
		.expect(400);
});

it('returns an error if invalid price is provided', async () => {
	await request(app)
		.post('/api/tickets')
		.set('Cookie', global.signin())
		.send({ title: 'hello', price: 'alsdkfj' })
		.expect(400);

	await request(app)
		.post('/api/tickets')
		.set('Cookie', global.signin())
		.send({ title: 'hello', price: -10 })
		.expect(400);

	await request(app)
		.post('/api/tickets')
		.set('Cookie', global.signin())
		.send({ title: 'hello' })
		.expect(400);
});

it('creates a ticket with valid inputs', async () => {
	let tickets = await Ticket.find({});
	expect(tickets.length).toEqual(0);

	await request(app)
		.post('/api/tickets')
		.set('Cookie', global.signin())
		.send({ title: 'test title', price: 20 })
		.expect(201);

	tickets = await Ticket.find({});
	expect(tickets.length).toEqual(1);
	expect(tickets[0].price).toEqual(20);
	expect(tickets[0].title).toEqual('test title');
});

it('publishes an event', async () => {
	const title = 'laksdfj';

	await request(app)
		.post('/api/tickets')
		.set('Cookie', global.signin())
		.send({ title, price: 20 })
		.expect(201);

	expect(natsWrapper.client.publish).toHaveBeenCalled();
});
