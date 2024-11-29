import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'

//Placing Orders usong COD Method
const placeOrder = async (req,res) => {

    try {
        
        const {userId , items , amount , address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true,message:"Order Placed"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }

}

//Placing Orders usong Stripe Method
const placeOrderStripe = async (req,res) => {

}

//Placing Orders usong Razorpay Method
const placeOrderRazorpay = async (req,res) => {

}

//All Orders data for Admin Panel
const allOrders = async (req,res) => {

}

//User Order data for frontend
const userOrders = async (req,res) => {

}

//Update order status from adminpanel
const updateStatus = async (req,res) => {

}

export {placeOrder , placeOrderRazorpay , placeOrderStripe , allOrders , userOrders , updateStatus}