const router = require ('express').Router();
const {verifyToken,verifyTokenAndAuthorisation,verifyTokenAndAdmin}= require('./verifyToken')


router.put("/:id",verifyTokenAndAuthorisation,async(req,res)=>{
    if(req.body.password){
        req.body.password=CryptoJS.AES.encrypt
        (req.body.password, 
        process.env.Pass_Sec).toString()

    
    }
    try {
        const updateUser= await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        }, {new:true})
        res.status(200).json(updateUser)
    }catch(err){
        res.status(500).json(err)
}
}
)

router.delete("/:id",verifyTokenAndAuthorisation,async(req,res)=>{
    try{
await User.findByIdAndDelete(req.params.id)
res.send(200).json("user has been deleted")
    }
    catch(err){
        res.send(500).json(err)
    }
} )

router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    //lh:5000? new=name
    const query=req.query.new
    try{
const users= query? await User.find().sort({_id:-1}).limit(5) : await User.find()
res.status(200).json(users);
    }
    catch(err){
        res.send(500).json(err)
    }
} )



module.exports = router