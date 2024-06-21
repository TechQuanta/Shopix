import React, { useContext, useEffect, useRef, useState } from 'react'
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import { RxCross2 } from "react-icons/rx";
import { ValuesContext } from '../../App';
import Rating from '@mui/material/Rating';
import { FaRegHeart } from "react-icons/fa6";
import { DiGitCompare } from "react-icons/di";
import { FaCartShopping } from "react-icons/fa6";

import './style.css';
import QuantityBox from '../quantitybox/QuantityBox';
import ProductZoom from '../productzoom/ProductZoom';
import userAtom from '../../atom (global state)/userAtom';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import SummaryApi from '../../utils/apiUrls';
import { FaHeart } from "react-icons/fa";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProductModal = ({ product, open, setOpen }) => {

    const context = useContext(ValuesContext);
    const [liked, setLiked] = useState(false);
    const [trigger, setTrigger] = useState(false);

    const handleClose = () => {
        setOpen(false);
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
    const [productQuantity, setProductQuantity] = useState()
    const [cartFields, setCartFields] = useState({});
    const User = useRecoilValue(userAtom);

    useEffect(() => {
        setProductQuantity(context?.productQuantity)
    }, [context?.productQuantity])

    const addToCart = (product) => {
        if (User?._id) {
            cartFields.producttitle = product?.name
            cartFields.image = product?.images[0]
            cartFields.price = product?.sellingprice
            cartFields.quantity = productQuantity
            cartFields.subtotal = parseInt(product?.sellingprice * productQuantity)
            cartFields.productid = product?._id
            cartFields.userid = User?._id
            context.addToCart(cartFields);
        } else {
            toast.info("User must be logged In to continue.")
        }
    }

    useEffect(() => {
        checkLiked(product?._id)
    }, [trigger, liked])

    const addToMyList = async (id) => {
        if (User?._id) {
            const fetchData = await fetch(SummaryApi.createMYListItem.url, {
                method: SummaryApi.createMYListItem.method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productid: id, userid: User?._id, producttitle: product?.name, productimage: product?.images[0], productprice: product?.sellingprice }),
            },
            );

            const dataResponse = await fetchData.json()

            if (dataResponse?.success) {
                checkLiked(id)
                setTrigger(true)
                toast.success("Product Added to WishList Successfully.")
            }

            if (dataResponse.error) {
                toast.info(dataResponse.message)
            }
        } else {
            toast.info("User must be logged In to continue.")
        }
    }

    const checkLiked = async (id) => {
        if (User?._id) {
            const fetchData = await fetch(SummaryApi.getMyList.url + `?userid=${User?._id}&productid=${id}`, {
                method: SummaryApi.getMyList.method,
                headers: { "Content-Type": "application/json" },
            },
            );

            const dataResponse = await fetchData.json()

            if (dataResponse?.success) {
                if (dataResponse?.data?.length !== 0) {
                    setLiked(true);
                }
            }
        } else {
            toast.info("User must be logged In to continue.")
        }
    }

    return (
        <div>
            <Dialog
                open={open}
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
                    <Rating name="read-only" value={4} readOnly size="small" precision={0.5} />
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
                            <Button onClick={() => addToCart(product)} className='btn-blue btn-lg btn-big btn-round ml-3'><FaCartShopping /> &nbsp; {context?.addingInCart === true ? 'Adding...' : 'Add To Cart'}</Button>
                        </div>
                        <div className="d-flex align-items-center mt-5 actions">
                            <Button onClick={() => addToMyList(product?._id)} variant='outlined' className='btn-round btn-sml'>{liked ? <FaHeart /> : <FaRegHeart />} &nbsp; ADD TO WATCHLIST</Button>
                            <Button variant='outlined' className='btn-round btn-sml ml-3'><DiGitCompare /> &nbsp; Campare</Button>
                        </div>
                    </div>
                </div>

            </Dialog>
        </div>
    )
}

export default ProductModal