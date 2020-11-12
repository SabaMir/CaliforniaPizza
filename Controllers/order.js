import status from 'http-status';
import bucketModel from '../Models/bucketInfo';

const placeOrder = (req, res) => {

    const {
        city,
        purchasedItems,
        dealsPurchased,
        email,
        address
    } = req.body;

    const event = new bucketModel({
        city,
        purchasedItems,
        dealsPurchased,
        email,
        address

    });
    event
        .save()
        .then(savedEvent => {
            res.status(status.OK).send({
                savedEvent,
                Message: ' saved',
                type: status.Ok,
            });

        })
        .catch(err => {
            console.log(err);
            res.status(status.INTERNAL_SERVER_ERROR).send({
                Message: 'could not place your order try again',
                err,
            }); 
            
        }).catch(err => {
            res.status(500).send(err);
            console.log(err);
        });
};
const getOrders = (req, res) => {
    const { skip = 0, limit = 0, sort = '-1' } = req.query;

    bucketModel
        .find({})
        .populate('purchasedItems','itemName itemType description flavour size price')
        .populate('dealsPurchased',' dealType dealName')
        .sort({ _id: sort })
        .skip(Number(skip))
        .limit(Number(limit))
        .then((orders) => {
            console.log(orders);
            res.json({
                skip: Number(skip),
                limit: Number(limit),
                count: Number(orders.length),
                orders,
            });
        }).catch(error => {
            res.status(404).send({
                Message: status.NOT_FOUND,
                error,
            });

        })
        .catch(err => {
            res.status(500).send({
                Message: status.INTERNAL_SERVER_ERROR,
                err,
            });
        });
};
const getSingleOrder = (req, res) => {
    const { eid } = req.params;

    bucketModel.findOne({ _id: eid })
      .then(event => {
        if (!event) {
          return res.status(status.NOT_FOUND).send({
            Message: 'order not found',
          });
        }
        return res.status(status.OK).send(event);
      })
      .catch(err => {
        return res.status(status.INTERNAL_SERVER_ERROR).send({
          Message: 'Internal Server Error',
          err,
        });
      });
  };
  const deleteOrder = (req, res) => {
    const { id } = req.params;
    bucketModel.findByIdAndRemove(id, (err, result) => {
      if (result) {
        res.status(status.OK).send({
          Message: 'Order Deleted Successfully.',
        });
      } else {
        res.status(status.INTERNAL_SERVER_ERROR).send({
          Message: 'Unable to Delete.',
          err,
        });
      }
    });
  };
   
 

export default {placeOrder,getOrders, getSingleOrder,deleteOrder};