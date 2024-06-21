import myListSchema from "../models/myList.js";

export const getMyList = async (req, res) => {
    try {

        const myList = await myListSchema.find(req.query);

        res.json({
            message: "myList fetched successfully.",
            data: myList,
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

export const getMyListById = async (req, res) => {
    try {

        const myList = await myListSchema.findById(req.query.id);

        res.json({
            message: "myList fetched successfully.",
            data: myList,
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

export const getMyListByUser = async (req, res) => {
    try {

        let myList = [];

        myList = await myListSchema.find({ userid: req.query.userid });

        res.json({
            message: "myList fetched successfully.",
            data: myList,
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

export const createOneList = async (req, res) => {
    try {

        const List = await myListSchema.find({ userid: req.body.userid, productid: req.body.productid });

        if (List?.length === 0) {
            let myList = new myListSchema({
                productid: req.body.productid,
                userid: req.body.userid,
                producttitle: req.body.producttitle,
                productimage: req.body.productimage,
                productprice: req.body.productprice,
            })

            if (!myList) {
                res.status(500).json({
                    success: false,
                    error: true
                })
            }

            myList = myList.save();

            res.json({
                message: "myList created successfully.",
                data: myList,
                success: true,
                error: false
            })
        } else {
            res.json({
                message: "Product already in the List.",
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

export const deleteMyList = async (req, res) => {
    try {

        const myList = await myListSchema.findById(req.query.id);

        if (!myList) {
            res.status(500).json({ error: true, success: false, message: "list not found" })
        }

        const deletedListItem = await myListSchema.deleteOne({ _id: req.query.id });

        res.json({
            message: "myList deleted successfully.",
            data: deletedListItem,
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

export const updateMyList = async (req, res) => {
    try {

        let myList = await myListSchema.findById(req.params.id);
        if (!myList) return res.status(400).json({ error: "Review not found" });

        myList.productid = req.body.productid || myList.productid;
        myList.userid = req.body.userid || myList.userid;
        myList.producttitle = req.body.producttitle || myList.producttitle;
        myList.productimage = req.body.productimage || myList.productimage;
        myList.productprice = req.body.productprice || myList.productprice;

        myList = await myList.save();

        res.json({
            message: "myList updated Successfully",
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