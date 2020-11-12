import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    itemName:String,
    itemType:String,
    description:String,
    flavour:String,
    size:String,
    price:String

});

export default mongoose.model('items',itemSchema);