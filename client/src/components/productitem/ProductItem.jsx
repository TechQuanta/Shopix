import { Button, Rating } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FaRegHeart } from "react-icons/fa6";
import ProductModal from '../productmodal/ProductModal';
import { Link } from 'react-router-dom';

const ProductItem = ({ itemView, products, height, width, css }) => {

    const [rating, setRating] = useState(0);
    const [discount, setDiscount] = useState();

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
    return (

        <>
            <Link to={`/product/${products?._id}`} className={`item productItem ${itemView} ${css}`} style={{ height: height === 'list3' ? '402px' : "393px", width: width === 'catlist' && '100%' }}>
                <div className="imgwrapper" style={{ marginBottom: height === 'list3' ? '20px' : "7px" }}>
                    <img className='w-100' src={products?.images[0]} alt="" />
                    <span className="badge badge-primary">{discount}%</span>
                    <div className="actions">
                        <ProductModal product={products} />
                        <Button><FaRegHeart /></Button>
                    </div>
                </div>
                <div className="info ">
                    <h4 style={{ height: "40px" }}>{products?.name.length >= 20 ? products?.name.substr(0, 20) + '...' : products?.name}</h4>
                    <span className='text-success d-block'>{products?.stock > 0 ? "In Stock" : "Out Of Stock"}</span>
                    <Rating className='mt-2 mb-2' name="read-only" value={products?.ratings?.length <= 0 ? 0 : rating} readOnly size="small" precision={0.5} />
                    <span className='d-flex'>
                        <span className="oldprice ">Rs.{products?.price}</span>
                        <span className="newprice text-danger ml-2">Rs.{products?.sellingprice}</span>
                    </span>
                    <div className="butcart">
                        <Button className='cartbut'>Add to cart</Button>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default ProductItem