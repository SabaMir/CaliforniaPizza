import status from 'http-status';
import itemsModel from '../Models/items';

/**
 * add items to the database
 * @param {*} req 
 * @param {*} res 
 */
const addItems = (req, res) => {
    const {
        itemName,
        itemType,
        description,
        flavour,
        size,
        price
    } = req.body;

    const event = new itemsModel({
        itemName,
        itemType,
        description,
        flavour,
        size,
        price,

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
 * fetches all the items
 * @param {*} req 
 * @param {*} res 
 */
const getItems = (req, res) => {
    const { skip = 0, limit = 0, sort = '-1' } = req.query;

    itemsModel
        .find({})
        .sort({ _id: sort })
        .skip(Number(skip))
        .limit(Number(limit))
        .then((items) => {
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
/**
 * update the product
 * @param {*} req 
 * @param {*} res 
 */
const editItem = (req, res) => {
    const { id } = req.params;
    const query = { $set: req.body };
    itemsModel.findByIdAndUpdate(id, query, { new: true }, (err, result) => {
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
  /**
   * returns product on the basis of id
   * @param {*} req 
   * @param {*} res 
   */
  const getSingleItem = (req, res) => {
    const { eid } = req.params;

    itemsModel.findOne({ _id: eid })
      .then(event => {
        if (!event) {
          return res.status(status.NOT_FOUND).send({
            Message: 'product not found',
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
  const deleteItem = (req, res) => {
    const { id } = req.params;
    itemsModel.findByIdAndRemove(id, (err, result) => {
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
  /**
   * get pizzas
   * @param {*} req 
   * @param {*} res 
   */
  const getPizzas = (req, res) => {
    const { skip = 0, limit = 0, sort = '-1' } = req.query;

    itemsModel
      .find({itemType:'pizza'})
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
          message: 'No prodcts found',
          error: err
        });
      });
  };
  /**
   * returns lasagna and pasta
   * @param {*} req 
   * @param {*} res 
   */
  const getLasagnaAndPasta = (req, res) => {

    const { skip = 0, limit = 0, sort = '-1' } = req.query;

    itemsModel
      .find({ itemType: 'lasagna & pasta' })
      .sort({ _id: sort })
      .skip(Number(skip))
      .limit(Number(limit))
      .then((items) => {
        res.json({
          skip: Number(skip),
          limit: Number(limit),
          count: Number(items.length),
          items,
        });
      }).catch(err => {
        res.status(404).send({
          message: 'No prodcts found',
          error: err
        });
      });
  };
  /**
   * returns sandwichs
   * @param {*} req 
   * @param {*} res 
   */
  const getsandwiches = (req, res) => {

    const { skip = 0, limit = 0, sort = '-1' } = req.query;

    itemsModel
      .find({ itemType: 'sandwich' })
       .sort({ _id: sort })
      .skip(Number(skip))
      .limit(Number(limit))
      .then((items) => {
        res.json({
          skip: Number(skip),
          limit: Number(limit),
          count: Number(items.length),
          items,
        });
      }).catch(err => {
        res.status(404).send({
          message: 'No prodcts found',
          error: err
        });
      });
  };
  /**
   * returns sidelines
   * @param {*} req 
   * @param {*} res 
   */
  const getsidelines = (req, res) => {

    const { skip = 0, limit = 0, sort = '-1' } = req.query;

    itemsModel
      .find({ itemType: 'sidelines' })
      .sort({ _id: sort })
      .skip(Number(skip))
      .limit(Number(limit))
      .then((items) => {
        res.json({
          skip: Number(skip),
          limit: Number(limit),
          count: Number(items.length),
          items,
        });
      }).catch(err => {
        res.status(404).send({
          message: 'No prodcts found',
          error: err
        });
      });
  };
   /**
   * returns beverages
   * @param {*} req 
   * @param {*} res 
   */
  const getBeverages = (req, res) => {

    const { skip = 0, limit = 0, sort = '-1' } = req.query;

    itemsModel
      .find({ itemType: 'beverages' })
      .sort({ _id: sort })
      .skip(Number(skip))
      .limit(Number(limit))
      .then((items) => {
        res.json({
          skip: Number(skip),
          limit: Number(limit),
          count: Number(items.length),
          items,
        });
      }).catch(err => {
        res.status(404).send({
          message: 'No prodcts found',
          error: err
        });
      });
  };
   /**
   * returns deserts
   * @param {*} req 
   * @param {*} res 
   */
  const getDeserts = (req, res) => {

    const { skip = 0, limit = 0, sort = '-1' } = req.query;

    itemsModel
      .find({ itemType: 'dessert' })
      .sort({ _id: sort })
      .skip(Number(skip))
      .limit(Number(limit))
      .then((items) => {
        res.json({
          skip: Number(skip),
          limit: Number(limit),
          count: Number(items.length),
          items,
        });
      }).catch(err => {
        res.status(404).send({
          message: 'No prodcts found',
          error: err
        });
      });
  };
  const getSalads = (req, res) => {

    const { skip = 0, limit = 0, sort = '-1' } = req.query;

    itemsModel
      .find({ itemType: 'salad' })
      .sort({ _id: sort })
      .skip(Number(skip))
      .limit(Number(limit))
      .then((items) => {
        res.json({
          skip: Number(skip),
          limit: Number(limit),
          count: Number(items.length),
          items,
        });
      }).catch(err => {
        res.status(404).send({
          message: 'No prodcts found',
          error: err
        });
      });
  };
  export default {addItems,getItems,getSingleItem,editItem,deleteItem,getPizzas ,getLasagnaAndPasta,getDeserts,getsidelines,getBeverages,getsandwiches, getSalads};