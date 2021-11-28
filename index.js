const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require ('dotenv');
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const prodRouter = require('./routes/product.js')
const cartRouter = require('./routes/cart.js')
const orderRouter = require('./routes/order.js')

dotenv.config ();

mongoose.connect(process.env.Mongo_URL)
    .then(()=>(console.log("DB CONNECTED")))
    .catch((err)=>{console.log(err)})

app.listen(5000,()=>{
    console.log("server has started")
});

app.get("/" , (req,res)=>
{res.send("Welcome to homepage")})

app.use("/user", authRouter)
app.use("/user", userRouter)
app.use("/product", prodRouter)
app.use("/cart", cartRouter)
app.use("/order", orderRouter)