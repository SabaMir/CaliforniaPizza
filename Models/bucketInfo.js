import mongoose from 'mongoose';

const bucketSchema = new mongoose.Schema({
    city:String,
    purchasedItems:[
     {type:mongoose.SchemaTypes.ObjectId,
        ref:'items'  }      
    ],
    dealsPurchased:[
        {type:mongoose.SchemaTypes.ObjectId,
            ref:'deals'  }  
    ],
   
    tax:{
        type:String,
        default:'0pk'
    },
    email:String,
    address:String

},
{timestamps:true}
);
export default mongoose.model('orders',bucketSchema);