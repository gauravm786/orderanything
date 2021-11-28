const router = require ('express').Router();
const {verifyToken,verifyTokenAndAuthorisation,verifyTokenAndAdmin}= require('./verifyToken')
const product = require ('../models/product.js')

//Create 
router.post("/",verifyTokenAndAdmin, async (req,res)=>{
const newProduct = new Product(req.body)
try{
const savedProducts= await newProduct.save();
res.status(200).json(savedProducts)
}
catch(err){
    res.status(500).json(err)
}
} )


//update
router.put("/:id",verifyTokenAndAdmin ,async(req,res)=>{
    try {
        const updateProduct = await newProduct.findByIdAndUpdate(req.params.id,{
            $set:req.body
        }, {new:true})
        res.status(200).json(updateProduct)
    }catch(err){
        res.status(500).json(err)
}
}
)

router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
await Product.findByIdAndDelete(req.params.id)
res.send(200).json("user has been deleted")
    }
    catch(err){
        res.send(500).json(err)
    }
} )

//Get product
router.get("/", async(req,res)=>{
    const query=req.query.new
    try{
const product= query? await Product.findById().sort({_id:-1}).limit(5) : await User.find()
res.status(200).json(product);
    }
    catch(err){
        res.send(500).json(err)
    }
} )

//get all products
router.get("/", async(req,res)=>{
    const qnew=req.query.new
    const qcategory= req.body.category;

    try{
let products;
if(qnew){
    products=await Product.find().sort({created_at:-1}).limit(5)

}else if(qcategory){
    products=await Product.find({
        categories:{
            $in : [qcategory],
    }})
}else{
    products= await Product.find;
}
res.send(200).json(products);
}

catch(err){
        res.send(500).json(err)
    }
} )



module.exports = router