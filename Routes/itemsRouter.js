import express from 'express';
import items from '../Controllers/items';


const itemsRouter = express.Router();
itemsRouter.post('/add', items.addItems);

itemsRouter.patch('/edit/:id', items.editItem);
itemsRouter.delete('/delete/:id', items.deleteItem);

itemsRouter.get('/allItems', items.getItems);
itemsRouter.get('/:eid', items.getSingleItem);
itemsRouter.get('/getpizza/pizza', items.getPizzas);
itemsRouter.get('/getlasagna&pasta/lasagnapasta', items.getLasagnaAndPasta);
itemsRouter.get('/getsandwiches/sandwich', items.getsandwiches);
itemsRouter.get('/getsidelines/sideline', items.getsidelines);
itemsRouter.get('/getbeverages/beverages', items.getBeverages);
itemsRouter.get('/getdesserts/dessert', items.getDeserts);
itemsRouter.get('/getsalad/salads', items.getSalads);
export default itemsRouter;
