const router = require('express').Router();
const User= require ("../models/user.js")
const cryptoJS= require('crypto-js')
const jwt = require ('jsonwebtoken')
//Register
router.post("/register",async(req,res)=>{
    const newUser= new User({
        username: req.body.username,
        email: req.body.email,
        password:CryptoJS.AES.encrypt
        (req.body.password, 
        process.env.Pass_Sec).toString(),
       
    })
try{
const savedUser= await newUser.save();
res.status(201).json(savedUser);
console.log(savedUser);
}
catch (err)
{
 res.status(500).json(err)
}
})
//login
router.post("/login", async(req,res)=>{
try{
    const user= await User.findOne({username: req.body.username});
    !user && res.status(401).json("wrong credentials")

    const hashPass= CryptoJS.AES.decrypt(user.password,process.env.Pass_Sec)
    const orgpassword=hashPass.toString(CryptoJS.enc.Utf8)

    orgpassword !==req.body.password && 
    res.status(401).json("wrong credentials")
    const accessToken = jwt.sign({
        id:user._id, 
        isAdmin:user._isAdmin,
 }, process.env.JWTSEC,{expiresIn:"3d"}
 );
    
    const {password,...others} = user._doc
    res.status(200).json({...others,accessToken})
}catch(err){
res.status(500).json(err)
}

})
module.exports = router