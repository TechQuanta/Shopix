import React, { useContext, useEffect, useState } from 'react'

import './cart.css'
import { Link } from 'react-router-dom'
import { Button, Rating } from '@mui/material'
import QuantityBox from '../../components/quantitybox/QuantityBox'
import { IoClose } from "react-icons/io5";
import NewsLetter from '../../components/newsletter/NewsLetter'
import SummaryApi from '../../utils/apiUrls'
import { toast } from 'react-toastify'
import userAtom from '../../atom (global state)/userAtom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { ValuesContext } from '../../App'
import cartAtom from '../../atom (global state)/cartAtom'

const Cart = () => {
    const [cartdata, setCartData] = useState()
    const User = useRecoilValue(userAtom);
    const context = useContext(ValuesContext);
    const [cartFields, setCartFields] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [subTotal, setSubTotal] = useState();
    const [total, setTotal] = useState();
    const cart = useRecoilValue(cartAtom);
    const setCart = useSetRecoilState(cartAtom);

    useEffect(() => {
        fetchCartData()
    }, [])

    const fetchCartData = async () => {
        context.setProgress(19)
        const fetchData = await fetch(SummaryApi.getcartList.url + `?userid=${User?._id}`, {
            method: SummaryApi.getcartList.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setCartData(dataResponse?.data);
            context.setProgress(100)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
            context.setProgress(100)
        }
    }

    const selectedItem = async (item, quantity) => {
        setIsLoading(true)
        cartFields.producttitle = item?.producttitle
        cartFields.image = item?.image
        cartFields.price = item?.price
        cartFields.quantity = quantity
        cartFields.subtotal = parseInt(item?.price * quantity)
        cartFields.productid = item?.productid
        cartFields.userid = User?._id

        updateCartItem(item?._id);
    }

    const updateCartItem = async (id) => {
        context.setProgress(19)
        const fetchData = await fetch(SummaryApi.updateCartProduct.url + `${id}`, {
            method: SummaryApi.updateCartProduct.method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cartFields),
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setTimeout(() => {
                context.setProgress(100)
                setIsLoading(false)
                fetchCartData()
            }, 1000)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
            setTimeout(() => {
                context.setProgress(100)
                setIsLoading(false)
                fetchCartData()
            }, 1000)
        }
    }

    const handleDelete = async (id) => {
        context.setProgress(19)
        const fetchData = await fetch(SummaryApi.deleteCartProduct.url + `?id=${id}`, {
            method: SummaryApi.deleteCartProduct.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setCart(cart - 1)
            setTimeout(() => {
                context.setProgress(100)
                setIsLoading(false)
                fetchCartData()
            }, 1000)
            toast.success("Item Deleted Successfully.")
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
            setTimeout(() => {
                context.setProgress(100)
                setIsLoading(false)
                fetchCartData()
            }, 1000)
        }
    }

    useEffect(() => {
        let subtotal = cartdata && cartdata?.map(item => parseInt(item?.price) * item?.quantity).reduce((total, value) => total + value, 0)
        setSubTotal(subtotal)
        setTotal(subTotal);
    }, [subTotal, cartdata])
    return (
        <>
            <section className="section cartpage">
                <div className="container cartb">
                    <div className='d-flex headwrappercart w-100'>
                        <span>
                            <h2 className='hd mb-0'>Your Cart</h2>
                            <p>There are <b className='redt'>{cartdata && cartdata?.length}</b> products in your cart</p>
                        </span>
                        <div className="couponareacart ml-auto">
                            <input type="text" placeholder='Enter Coupon Here...' className='mr-2 ml-1' />
                            <Button className='btn-lg button'>Apply Coupon</Button>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-8">
                            <div className="tablecart shadow">
                                <div className="table-responsive">
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th width='35%'>Product</th>
                                                <th >Unit Price</th>
                                                <th >Quantity</th>
                                                <th >Subtotal</th>
                                                <th >Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartdata && cartdata?.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td width='35%'>
                                                            <Link to={`/product/${item?.productid}`}>
                                                                <div className="d-flex align-items-center cartitemimgwrapper">
                                                                    <div className="imgwrapper">
                                                                        <img src={item?.image} className='w-100' alt="" />
                                                                    </div>
                                                                    <div className="info px-3">
                                                                        <h6>{item?.producttitle.length >= 20 ? item?.producttitle.substr(0, 20) + '...' : item?.producttitle}</h6>
                                                                        <Rating name='read-only' value={4.5} precision={0.5} size='small' readOnly />
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </td>
                                                        <td>{item?.price}</td>
                                                        <td ><QuantityBox size={'cart'} quantity={item?.quantity} item={item} selectedItem={selectedItem} /></td>
                                                        <td >{item?.subtotal}</td>
                                                        <td><span className='remove pl-2'><IoClose onClick={() => handleDelete(item?._id)} /></span></td>
                                                    </tr>
                                                )
                                            })}

                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow p-3 cartdetails">
                                <h4>Cart Totals</h4>
                                <div className="d-flex align-items-center mb-3">
                                    <span>SubTotal:</span>
                                    <span className='ml-auto text-red font-weight-bold'>Rs.{subTotal}</span>
                                </div>
                                <div className="line"></div>
                                <div className="d-flex align-items-center mb-3">
                                    <span>Shipping:</span>
                                    <span className='ml-auto '><b>Free</b></span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <span>Estimated For:</span>
                                    <span className='ml-auto'><b>India</b></span>
                                </div>
                                <div className="d-flex align-items-center mb-3 total">
                                    <span>Total:</span>
                                    <span className='ml-auto font-weight-bold'>Rs.{total}</span>
                                </div>
                                <Button className='btn-bg checkbut'>Proceed To Checkout</Button>
                            </div>
                            <div className="cartdetails">

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className='mb-3'>
                <NewsLetter />
            </div>
            {isLoading === true && <div className="loading"></div>
            }
        </>
    )
}

export default Cart