import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import Stripe from 'stripe'
import Razorpay from 'razorpay'

// Global variables
const currency = 'inr'
const deliveryCharge = 99

// Gateway initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// FIXED: was Key_secret (capital K) — Razorpay auth was silently failing
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

// Place Order using COD
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

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
        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "Order Placed" })

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

// Place Order using Stripe
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency,
                product_data: { name: item.name },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency,
                product_data: { name: 'Delivery Charges' },
                unit_amount: deliveryCharge * 100,
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'
        })

        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

// Place Order using Razorpay
const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ success: false, message: error.error?.description || 'Razorpay error' })
            }
            res.json({ success: true, order })
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

// All orders — Admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}).lean()
        res.json({ success: true, orders })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

// Verify Stripe payment
const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body;

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

// User orders — Frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body
        const orders = await orderModel.find({ userId }).lean()
        res.json({ success: true, orders })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

// Update order status — Admin panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

// verify Razorpay
import crypto from 'crypto'
const verifyRazorpay = async (req, res) => {
    try {
        const { userId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (expectedSign === razorpay_signature) {
            const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
            if (orderInfo) {
                const orderId = orderInfo.receipt;
                await orderModel.findByIdAndUpdate(orderId, { payment: true });
                await userModel.findByIdAndUpdate(userId, { cartData: {} });
                res.json({ success: true, message: "Payment Successful" });
            } else {
                res.status(400).json({ success: false, message: "Order not found in Razorpay" });
            }
        } else {
            res.status(400).json({ success: false, message: "Invalid Signature" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export { placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay }