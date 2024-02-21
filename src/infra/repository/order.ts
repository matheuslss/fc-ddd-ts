import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order";
import OrderModel from "../db/sequelize/model/order";
import OrderItemModel from "../db/sequelize/model/order_item";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(order: Order): Promise<void> {
    await OrderModel.create(
      {
        id: order.id,
        customer_id: order.customerId,
        total: order.total(),
        items: order.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
  async update(order: Order): Promise<void> {
    try {
      const sequelize = OrderModel.sequelize;
      await sequelize.transaction(async (t) => {
        await OrderItemModel.destroy({
          where: { order_id: order.id },
          transaction: t,
        });
        const items = order.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
          order_id: order.id,
        }));
        await OrderItemModel.bulkCreate(items, { transaction: t });
        await OrderModel.update(
          { total: order.total() },
          { where: { id: order.id }, transaction: t }
        );
      });
    } catch (error) {
      throw new Error("Cannot update order");
    }
  }
  async findById(id: string): Promise<Order> {
    try {
      const orderModel = await OrderModel.findOne({
        where: { id },
        include: ["items"],
      });

      const items = orderModel.items.map((item) => {
        return new OrderItem(
          item.id,
          item.name,
          item.product_id,
          item.quantity,
          item.price
        );
      });

      return new Order(orderModel.id, orderModel.customer_id, items);
    } catch (error) {
      throw new Error("Order not found");
    }
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      include: ["items"],
    });

    return orders.map(
      (order) =>
        new Order(
          order.id,
          order.customer_id,
          order.items.map(
            (item) =>
              new OrderItem(
                item.id,
                item.name,
                item.product_id,
                item.quantity,
                item.price
              )
          )
        )
    );
  }
}
