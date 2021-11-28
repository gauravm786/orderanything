const mongoose = require ('mongoose');

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true
        },
        products:[
            {
                productId: {
                    type:String,
                },
                quantity: {
                    type:Number,
                    default:1,
                }
            }
        ],
        amount:{type:String,required:true },
        address:{type:String,required:true},
        status:{type:String,default:"pending"}
    
 }, {timestamp:true}

);
module.exports = mongoose.model("order",orderSchema);