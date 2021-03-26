const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  static async create({ quantity }) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}`
    );

    const order = await Order.insert({ quantity });

    return order;
  }
  static async getOrders(){
    const orders = await Order.fetch();
    return orders;
  }
  static async getOrderById(id){
    const order = await Order.getSingleOrder(id);
    return order;
  }
  static async updateOrder(id,quantity){
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order update quantity ${quantity}`
    )
    const order = await Order.updateQuantity(id, quantity);
    return order;
  }
  static async deleteOrder(id){
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Your order was deleted`
    )
    const order = await Order.deleteRow(id);
    return order;
  }
};

