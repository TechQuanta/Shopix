import { Button, Rating } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { FaRegHeart } from "react-icons/fa6";
import ProductModal from '../productmodal/ProductModal';
import { Link, useNavigate } from 'react-router-dom';
import userAtom from '../../atom (global state)/userAtom';
import { useRecoilValue } from 'recoil';
import { ValuesContext } from '../../App';
import { AiOutlineFullscreen } from "react-icons/ai";
import SummaryApi from '../../utils/apiUrls';
import { toast } from 'react-toastify';
import { FaHeart } from "react-icons/fa";

const ProductItem = ({ itemView, products, height, width, css }) => {

    const [rating, setRating] = useState(0);
    const [discount, setDiscount] = useState();
    const [openProductModal, setOpenProductModal] = useState(false);
    const [liked, setLiked] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const discount = products?.price - products?.sellingprice;

        const disPercent = (discount / products?.price) * 100;
        setDiscount(disPercent.toString().substr(0, 4));
    }, [])

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };

    const [productQuantity, setProductQuantity] = useState()
    const context = useContext(ValuesContext)
    const [cartFields, setCartFields] = useState({});
    const User = useRecoilValue(userAtom);

    useEffect(() => {
        setProductQuantity(context?.productQuantity)
    }, [context?.productQuantity])

    const addToCart = (products) => {
        if (User?._id) {
            cartFields.producttitle = products?.name
            cartFields.image = products?.images[0]
            cartFields.price = products?.sellingprice
            cartFields.quantity = productQuantity
            cartFields.subtotal = parseInt(products?.sellingprice * productQuantity)
            cartFields.productid = products?._id
            cartFields.userid = User?._id
            context.addToCart(cartFields);
        } else {
            toast.info("User must be logged In to continue.")
        }
    }

    const addToMyList = async (id) => {
        if (User?._id) {
            const fetchData = await fetch(SummaryApi.createMYListItem.url, {
                method: SummaryApi.createMYListItem.method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productid: id, userid: User?._id, producttitle: products?.name, productimage: products?.images[0], productprice: products?.sellingprice }),
            },
            );

            const dataResponse = await fetchData.json()

            if (dataResponse?.success) {
                toast.success("Product Added to WishList Successfully.")
                checkLiked(products?._id)
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

        <>
            <div className={`item productItem ${itemView} ${css}`} style={{ height: height === 'list3' ? '402px' : "393px", width: width === 'catlist' && '100%' }} onMouseEnter={() => checkLiked(products?._id)}>
                <div className="imgwrapper" style={{ marginBottom: height === 'list3' ? '20px' : "7px" }}>
                    <img className='w-100' src={products?.images[0]} alt="" />
                    <span className="badge badge-primary">{discount}%</span>
                    <div className="actions">
                        <Button onClick={(e) => {
                            setOpenProductModal(!openProductModal);
                        }}><AiOutlineFullscreen /></Button>
                        <Button className={`${liked && 'liked'}`} onClick={() => addToMyList(products?._id)}>{liked ? <FaHeart /> : <FaRegHeart />}</Button>
                    </div>
                </div>
                <div className="info" onClick={() => {
                    navigate(`/product/${products?._id}`);
                }}>
                    <h4 className='redh' style={{ height: "40px" }}>{products?.name.length >= 20 ? products?.name.substr(0, 20) + '...' : products?.name}</h4>
                    <span className='text-success d-block'>{products?.stock > 0 ? "In Stock" : "Out Of Stock"}</span>
                    <Rating className='mt-2 mb-2' name="read-only" value={products?.ratings?.length <= 0 ? 0 : rating} readOnly size="small" precision={0.5} />
                    <span className='d-flex'>
                        <span className="oldprice ">Rs.{products?.price}</span>
                        <span className="newprice text-danger ml-2">Rs.{products?.sellingprice}</span>
                    </span>
                </div>
                <div className="butcart">
                    <Button onClick={() => addToCart(products)} className='cartbut'>Add To Cart</Button>
                </div>
            </div>
            <ProductModal product={products} open={openProductModal} setOpen={setOpenProductModal} />
        </>
    )
}

export default ProductItem