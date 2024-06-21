
import productReviewSchema from './../models/productReviewModel.js';
export const getReviews = async (req, res) => {
    try {

        const reviews = await productReviewSchema.find(req.query);

        res.json({
            message: "Reviews fetched successfully.",
            data: reviews,
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

export const getReviewsById = async (req, res) => {
    try {

        const reviews = await productReviewSchema.findById(req.query.id);

        res.json({
            message: "Reviews fetched successfully.",
            data: reviews,
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

export const getReviewsByProduct = async (req, res) => {
    try {

        let reviews = [];

        reviews = await productReviewSchema.find({ productid: req.query.productid });

        res.json({
            message: "Reviews fetched successfully.",
            data: reviews,
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

export const createReview = async (req, res) => {
    try {

        let review = new productReviewSchema({
            productid: req.body.productid,
            customername: req.body.customername,
            review: req.body.review,
            customerrating: req.body.customerrating,
            customerid: req.body.customerid,
            customerimage: req.body.customerimage,
        })

        if (!review) {
            res.status(500).json({
                success: false,
                error: true
            })
        }

        review = review.save();
        res.json({
            message: "review created successfully.",
            data: review,
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

export const deleteReview = async (req, res) => {
    try {

        const review = await productReviewSchema.findById(req.query.id);

        if (!review) {
            res.status(500).json({ error: true, success: false, message: "review not found" })
        }

        const deletedReviewItem = await productReviewSchema.deleteOne({ _id: req.query.id });

        res.json({
            message: "review deleted successfully.",
            data: deletedReviewItem,
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

export const updateReview = async (req, res) => {
    try {

        let review = await productReviewSchema.findById(req.params.id);
        if (!review) return res.status(400).json({ error: "Review not found" });

        review.productid = req.body.productid || review.productid;
        review.customername = req.body.customername || review.customername;
        review.review = req.body.review || review.review;
        review.customerrating = req.body.customerrating || review.customerrating;
        review.customerid = req.body.customerid || review.customerid;
        review.customerimage = rwq.body.customerimage || review.customerimage;

        review = await review.save();

        res.json({
            message: "Review updated Successfully",
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