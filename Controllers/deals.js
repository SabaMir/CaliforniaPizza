import status from 'http-status';
import dealsModel from '../Models/deals';


const addDeals = (req, res) => {
    const {
        dealType,
        dealName,
        items
    } = req.body;

    const event = new dealsModel({
        dealType,
        dealName,
        items

    });
    event
        .save()
        .then(savedEvent => {
            res.status(status.OK).send({
                savedEvent,
                Message: 'items saved',
                type: status.Ok,
            });

        })
        .catch(err => {
            res.status(status.INTERNAL_SERVER_ERROR).send({
                Message: 'could not save items please try again',
                err,
            });
        }).catch(err => {
            res.status(500).send(err);
        });
};

/**
 * fetches all the deals
 * @param {*} req 
 * @param {*} res 
 */
const getDeals = (req, res) => {
    const { skip = 0, limit = 0, sort = '-1' } = req.query;

    dealsModel
        .find({})
        .populate('items','itemName itemType description flavour size price')
        .sort({ _id: sort })
        .skip(Number(skip))
        .limit(Number(limit))
        .then((items) => {
            console.log(items);
            res.json({
                skip: Number(skip),
                limit: Number(limit),
                count: Number(items.length),
                items,
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
const getSingleDeal = (req, res) => {
    const { eid } = req.params;

    dealsModel.findOne({ _id: eid })
      .then(event => {
        if (!event) {
          return res.status(status.NOT_FOUND).send({
            Message: 'deal not found',
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
const getMidnightDeals = (req, res) => {
    const { skip = 0, limit = 0, sort = '-1' } = req.query;

    dealsModel
      .find({dealType:'Midnight'})
      .sort({ _id: sort })
      .skip(Number(skip))
      .limit(Number(limit))
      .then((items) => {
        console.log(items);
        res.json({
          skip: Number(skip),
          limit: Number(limit),
          count: Number(items.length),
          items,
        });
      }).catch(err => {
        res.status(404).send({
          message: 'No deals found',
          error: err
        });
      });
  };
  const getRoundTheClockDeals = (req, res) => {
    const { skip = 0, limit = 0, sort = '-1' } = req.query;

    dealsModel
      .find({dealType:'Round the clock'})
      .sort({ _id: sort })
      .skip(Number(skip))
      .limit(Number(limit))
      .then((items) => {
        console.log(items);
        res.json({
          skip: Number(skip),
          limit: Number(limit),
          count: Number(items.length),
          items,
        });
      }).catch(err => {
        res.status(404).send({
          message: 'No deals found',
          error: err
        });
      });
  };
  const getLunchDeals = (req, res) => {
    const { skip = 0, limit = 0, sort = '-1' } = req.query;

    dealsModel
      .find({dealType:'Lunch'})
      .sort({ _id: sort })
      .skip(Number(skip))
      .limit(Number(limit))
      .then((items) => {
        console.log(items);
        res.json({
          skip: Number(skip),
          limit: Number(limit),
          count: Number(items.length),
          items,
        });
      }).catch(err => {
        res.status(404).send({
          message: 'No deals found',
          error: err
        });
      });
  };
  const deleteDeal = (req, res) => {
    const { id } = req.params;
    dealsModel.findByIdAndRemove(id, (err, result) => {
      if (result) {
        res.status(status.OK).send({
          Message: ' Deleted Successfully.',
        });
      } else {
        res.status(status.INTERNAL_SERVER_ERROR).send({
          Message: 'Unable to Delete.',
          err,
        });
      }
    });
  };
  const updateDeal = (req, res) => {
    const { id } = req.params;
    const query = { $set: req.body };
    dealsModel.findByIdAndUpdate(id, query, { new: true }, (err, result) => {
      if (err) {
        res.status(status.INTERNAL_SERVER_ERROR).send({
          Message: 'Unable to Update.',
        });
      } else {
        res.status(status.OK).send({
          Message: 'Successfully Updated.',
          result,
        });
      }
    });
  };
 export default{addDeals,getDeals,getMidnightDeals,getRoundTheClockDeals,getLunchDeals,getSingleDeal,deleteDeal,updateDeal};