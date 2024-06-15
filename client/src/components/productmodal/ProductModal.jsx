import React, { useContext, useEffect, useRef, useState } from 'react'
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import { RxCross2 } from "react-icons/rx";
import { ValuesContext } from '../../App';
import { AiOutlineFullscreen } from "react-icons/ai";
import Rating from '@mui/material/Rating';
import { FaRegHeart } from "react-icons/fa6";
import { DiGitCompare } from "react-icons/di";

import './style.css';
import QuantityBox from '../quantitybox/QuantityBox';
import ProductZoom from '../productzoom/ProductZoom';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProductModal = ({ product }) => {

    const context = useContext(ValuesContext);
    const [productModalOpen, setProductModalOpen] = useState(false);


    const handleClickOpen = () => {
        setProductModalOpen(true);
    };

    const handleClose = () => {
        setProductModalOpen(false);
    };

    const [rating, setRating] = useState(0);
    const [discount, setDiscount] = useState();

    useEffect(() => {
        const discount = product?.price - product?.sellingprice;

        const disPercent = (discount / product?.price) * 100;
        setDiscount(disPercent.toString().substr(0, 4));
    }, [])

    const selectedItem = async (item, quantity) => {

    }

    return (
        <div>
            <Button onClick={() => setProductModalOpen(true)}><AiOutlineFullscreen /></Button>
            <Dialog
                open={productModalOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                className='productmodal'
            >
                <span className='closedelpm' onClick={handleClose}><Button><RxCross2 /></Button></span>
                <h4 className="mb-1 h4head">{product?.name}</h4>
                <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center mr-2">
                        <span>{product?.brandname}</span>
                        <span className='ml-2'>|</span>
                        <span className='ml-2' >{product?.category}</span>
                        <span className='ml-2'>|</span>
                    </div>
                    <Rating name="read-only" value={product?.ratings?.length <= 0 ? 0 : rating} readOnly size="small" precision={0.5} />
                </div>

                <hr />
                <div className="row mt-2 productdetailsmodal">
                    <div className="col-md-5">
                        <ProductZoom images={product?.images} discount={discount} />
                    </div>
                    <div className="col-md-7 modaldetailsarea">
                        <div className="d-flex align-items-center info mb-3" >
                            <span className="oldprice mr-2 lg">Rs. {product?.price}</span>
                            <span className="newprice text-danger lg">Rs. {product?.sellingprice}</span>
                        </div>
                        <span className="badge bg-success">{product?.stock > 0 ? "In Stock" : "Out Of Stock"}</span>
                        <p className='mt-3'>{product?.description}</p>
                        <div className="d-flex align-items-center mt-5">
                            <QuantityBox selectedItem={selectedItem} />
                            <Button className='btn-blue btn-lg btn-big btn-round ml-3'>Add to Cart</Button>
                        </div>
                        <div className="d-flex align-items-center mt-5 actions">
                            <Button variant='outlined' className='btn-round btn-sml'><FaRegHeart /> &nbsp; ADD TO WATCHLIST</Button>
                            <Button variant='outlined' className='btn-round btn-sml ml-3'><DiGitCompare /> &nbsp; Campare</Button>
                        </div>
                    </div>
                </div>

            </Dialog>
        </div>
    )
}

export default ProductModal