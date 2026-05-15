const express = require("express")
const Stripe = require("stripe")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const stripe = new Stripe("YOUR_STRIPE_SECRET_KEY")

app.post("/payment/create", async(req,res)=>{

const session = await stripe.checkout.sessions.create({

payment_method_types:["card"],

line_items:[{

price_data:{

currency:"usd",

product_data:{
name:"DHYAN Fitness Product"
},

unit_amount:2999

},

quantity:1

}],

mode:"payment",

success_url:"http://localhost:5173/success",

cancel_url:"http://localhost:5173/cancel"

})

res.json({url:session.url})

})

app.listen(5000,()=>{

console.log("Server running")

})