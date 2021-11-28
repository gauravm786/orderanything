const router = require ('express').Router();
const {verifyToken,verifyTokenAndAuthorisation,verifyTokenAndAdmin}= require('./verifyToken')
const Order = require ('../models/order.js')

//Create 
router.post("/",verifyToken, async (req,res)=>{
const newOrder = new Order(req.body)
try{
const savedProducts= await newOrder.save();
res.status(200).json(savedProducts)
}
catch(err){
    res.status(500).json(err)
}
} )


// update
router.put("/:id",verifyTokenAndAdmin ,async(req,res)=>{
    try {
        const updateOrder = await newOrder.findByIdAndUpdate(req.params.id,{
         $set:req.body
        }, {new:true})
        res.status(200).json(updateCart)
    }catch(err){
        res.status(500).json(err)
}
}
)

// Delete
router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
await Order.findByIdAndDelete(req.params.id)
res.send(200).json("Order has been deleted")
    }
    catch(err){
        res.send(500).json(err)
    }
} )

// //Get User Orders
router.get("/:userId", verifyTokenAndAuthorisation,async(req,res)=>{
    // const query=req.query.new
    try{
const orders= await Order.findOne({userId:req.params.userId})
res.status(200).json(orders);
    }
    catch(err){
        res.send(500).json(err)
    }
} )



// //get all orders
router.get("/", verifyTokenAndAdmin , async (req, res) => {
    try {
        const orders= await Order.find()
        res.status(200).json(orders)
    }
    catch(err){
        res.status(500).json(err)
    }
})



module.exports = router