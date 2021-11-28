const router = require ('express').Router();
const {verifyToken,verifyTokenAndAuthorisation,verifyTokenAndAdmin}= require('./verifyToken')
const Cart = require ('../models/cart.js')

//Create 
router.post("/",verifyToken, async (req,res)=>{
const newCart = new Cart(req.body)
try{
const savedProducts= await newProduct.save();
res.status(200).json(savedProducts)
}
catch(err){
    res.status(500).json(err)
}
} )


// update
router.put("/:id",verifyTokenAndAuthorisation ,async(req,res)=>{
    try {
        const updateCart = await newCart.findByIdAndUpdate(req.params.id,{
         $set:req.body
        }, {new:true})
        res.status(200).json(updateCart)
    }catch(err){
        res.status(500).json(err)
}
}
)

// Delete
router.delete("/:id",verifyToken,async(req,res)=>{
    try{
await Cart.findByIdAndDelete(req.params.id)
res.send(200).json("user has been deleted")
    }
    catch(err){
        res.send(500).json(err)
    }
} )

// //Get User Cart
router.get("/:userId", verifyTokenAndAuthorisation,async(req,res)=>{
    // const query=req.query.new
    try{
const cart= await Cart.findOne({userId:req.params.userId})
res.status(200).json(cart);
    }
    catch(err){
        res.send(500).json(err)
    }
} )



// //get all products
router.get("/", verifyTokenAndAdmin , async (req, res) => {
    try {
        const carts= await Cart.find()
        res.status(200).json(carts)
    }
    catch(err){
        res.status(500).json(err)
    }
})



module.exports = router