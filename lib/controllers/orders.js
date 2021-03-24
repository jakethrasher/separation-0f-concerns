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
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {})
  .put('/:id', async (req, res, next) => {})
  .delete('/:id', async (req, res, next) => {});
