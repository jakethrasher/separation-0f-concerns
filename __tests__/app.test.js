const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order')
jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then((res) => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          quantity: 10,
        });
      });
  });

  it('ASYNC/AWAIT: creates a new order in our database and sends a text message', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });

    expect(res.body).toEqual({
      id: '1',
      quantity: 10,
    });
  });

  it('returns all orders', async () => {
    const order = await Order.insert({quantity: 10});
    const order2 = await Order.insert({quantity: 8});
    console.log(order)
    const res = await request(app)
      .get('/api/v1/orders')

    expect(res.body).toEqual([order, order2]);
  });

  it('updates an order quantity', async () => {

    const order = await Order.insert({quantity: 10});
    const order2 = await Order.insert({quantity: 8});
    
    const res = await request(app)
      .put('/api/v1/orders/2')
      .send({quantity:13})

    const updatedResponse = await request(app)
      .get('/api/v1/orders/2')
    expect(res.body).toEqual(updatedResponse.body);
  });

  it('deletes an order of matching id', async () => {

    const order = await Order.insert({quantity: 10});
    const order2 = await Order.insert({quantity: 8});
    
    const res = await request(app)
      .delete('/api/v1/orders/2')

    const updatedResponse = await request(app)
      .get('/api/v1/orders/2')

    const databaseSize = await request(app)
      .get('/api/v1/orders')

    expect(updatedResponse.body).toEqual([]);
    expect(res.body).toEqual(order2);
  });
});
