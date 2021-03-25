const { Router } = require('express');
const OrderService = require('../services/OrderService');
const Order = require('../models/Order')

module.exports = Router()
  .post('/', async (req, res, next) => {
    // OrderService
    //   .create(req.body)
    //   .then(order => res.send(order))
    //   .catch(next);
    try {
      const order = await OrderService.create(req.body);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const order = await OrderService.getOrders()
      res.send(order);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
      const order = await OrderService.getOrderById(id);
      res.send(order);
    } catch (error) {
      next(error)
    }
  })
  .put('/:id', async (req, res, next) => {
    const id = req.params.id
    const { quantity } = req.body
    try {
      const order = await OrderService.updateOrder(id, quantity);
      res.send(order);
    } catch (error) {
      next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
      const deletedOrder = await OrderService.deleteOrder(id);

      res.send(deletedOrder)
    } catch (error) {
      next(error)
    }
  });
