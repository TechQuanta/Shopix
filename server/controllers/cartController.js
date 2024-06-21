import cartSchema from "../models/cartSchema.js";

export const getcartList = async (req, res) => {
    try {

        const cartList = await cartSchema.find(req.query);

        res.json({
            message: "cartList fetched successfully.",
            data: cartList,
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

export const createcartList = async (req, res) => {
    try {

        const cartItem = await cartSchema.find({ productid: req.body.productid, userid: req.body.userid });

        if (cartItem.length === 0) {
            let cartList = new cartSchema({
                producttitle: req.body.producttitle,
                image: req.body.image,
                price: req.body.price,
                quantity: req.body.quantity,
                subtotal: req.body.subtotal,
                productid: req.body.productid,
                userid: req.body.userid,
            })

            if (!cartList) {
                res.status(500).json({
                    success: false,
                    error: true
                })
            }

            cartList = cartList.save();
            res.json({
                message: "cartList created successfully.",
                data: cartList,
                success: true,
                error: false
            })
        } else {
            res.status(500).json({
                message: "Product Already added to cart.",
                success: false,
                error: true
            })
        }

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
};

export const deletecartList = async (req, res) => {
    try {

        const cartItem = await cartSchema.findById(req.query.id);

        if (!cartItem) {
            res.status(500).json({ error: true, success: false, message: "cartitem not found" })
        }

        const deletedCartItem = await cartSchema.deleteOne({ _id: req.query.id });

        res.json({
            message: "cartList deleted successfully.",
            data: deletedCartItem,
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

export const updatecartList = async (req, res) => {
    try {

        let cart = await cartSchema.findById(req.params.id);
        if (!cart) return res.status(400).json({ error: "CartProduct not found" });

        cart.producttitle = req.body.producttitle || cart.producttitle;
        cart.image = req.body.image || cart.image;
        cart.price = req.body.price || cart.price;
        cart.quantity = req.body.quantity || cart.quantity;
        cart.subtotal = req.body.subtotal || cart.subtotal;
        cart.productid = req.body.productid || cart.productid;
        cart.userid = req.body.userid || cart.userid;

        cart = await cart.save();

        res.json({
            message: "CartProduct updated Successfully",
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