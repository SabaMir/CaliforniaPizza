import express from 'express';
import order from '../Controllers/order';


const ordersRouter = express.Router();
ordersRouter.post('/placeOrder', order.placeOrder);

ordersRouter.get('/getOrders/All', order.getOrders);
ordersRouter.get('/SingleOrder/:eid', order.getSingleOrder);

ordersRouter.delete('/deleteOrder/:id', order.deleteOrder);

export default ordersRouter;