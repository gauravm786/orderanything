const mongoose = require ('mongoose');

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        desc: {
            type: String,
            required: true,},
        img: {
                type: String,
                required: true}, 
         categories: {type:Array},
        size: {type: String,
                required: true}, 
        price: {type: Number,
                    required: true}, 

        
      

 }, {timestamp:true}

);
module.exports = mongoose.model("product",productSchema);