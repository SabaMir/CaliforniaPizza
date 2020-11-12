import express from 'express';
import deals from '../Controllers/deals';


const dealRouter = express.Router();
dealRouter.post('/add', deals.addDeals);

dealRouter.patch('/update/:id', deals.updateDeal);
dealRouter.delete('/delete/:id', deals.deleteDeal);


dealRouter.get('/getDeals', deals.getDeals);
dealRouter.get('/getDeals/Midnight', deals.getMidnightDeals);
dealRouter.get('/getDeals/RoundTheClock', deals.getRoundTheClockDeals);
dealRouter.get('/getDeals/Lunch', deals.getLunchDeals);
dealRouter.get('/single/:eid', deals.getSingleDeal);
export default dealRouter;