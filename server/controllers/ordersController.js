import orderSchema from "../models/ordersSchema.js";

export const getOrders = async (req, res) => {
    try {
        const orders = await orderSchema.find().sort({ _id: -1 });

        res.json({
            message: "orders fetched successfully.",
            data: orders,
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
};

export const getOrdersLatest = async (req, res) => {
    try {
        const orders = await orderSchema.find().sort({ _id: -1 });

        res.json({
            message: "orders fetched successfully.",
            data: orders,
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
};

export const getOrderById = async (req, res) => {
    try {

        const order = await orderSchema.findById(req.query.id);

        res.json({
            message: "order fetched successfully.",
            data: order,
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
};

export const getOrdersByUser = async (req, res) => {
    try {

        let orders = [];

        orders = await orderSchema.find({ userid: req.query.userid }).sort({ _id: -1 });

        res.json({
            message: "orders fetched successfully.",
            data: orders,
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
};

export const createOneOrder = async (req, res) => {
    try {

        const order = await orderSchema.find({ userid: req.body.userid, productid: req.body.productid });

        // if (order?.length === 0) {
        let myOrder = new orderSchema({
            name: req.body.name,
            userid: req.body.userid,
            phonenumber: req.body.phonenumber,
            address: req.body.address,
            pincode: req.body.pincode,
            amount: req.body.amount,
            paymentid: req.body.paymentid,
            email: req.body.email,
            products: req.body.products,
            paymentmethod: req.body.paymentmethod,
        })

        if (!myOrder) {
            res.status(500).json({
                success: false,
                error: true
            })
        }

        myOrder = myOrder.save();

        res.json({
            message: "myOrder created successfully.",
            data: myOrder,
            success: true,
            error: false
        })
        // }
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
};

export const createOneOrderCash = async (req, res) => {
    try {

        const order = await orderSchema.find({ userid: req.body.userid, productid: req.body.productid });

        // if (order?.length === 0) {
        let myOrder = new orderSchema({
            name: req.body.name,
            userid: req.body.userid,
            phonenumber: req.body.phonenumber,
            address: req.body.address,
            pincode: req.body.pincode,
            amount: req.body.amount,
            paymentmethod: req.body.paymentmethod,
            email: req.body.email,
            products: req.body.products,
        })

        if (!myOrder) {
            res.status(500).json({
                success: false,
                error: true
            })
        }

        myOrder = myOrder.save();

        res.json({
            message: "myOrder created successfully.",
            data: myOrder,
            success: true,
            error: false
        })
        // }
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
};

export const deleteOrder = async (req, res) => {
    try {

        const order = await orderSchema.findById(req.query.id);

        if (!order) {
            res.status(500).json({ error: true, success: false, message: "order not found" })
        }

        const deletedOrderItem = await orderSchema.deleteOne({ _id: req.query.id });

        res.json({
            message: "order deleted successfully.",
            data: deletedOrderItem,
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
};

export const updateOrder = async (req, res) => {
    try {

        let order = await orderSchema.findById(req.params.id);
        if (!order) return res.status(400).json({ error: "order not found" });

        order.status = req.body.status || order.status;

        order = await order.save();

        res.json({
            message: "order updated Successfully",
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
};