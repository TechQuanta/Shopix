import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import SummaryApi from '../../utils/apiUrls';
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../../atom (global state)/userAtom';
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';
import { ValuesContext } from './../../App';
import cartAtom from '../../atom (global state)/cartAtom';

const UserOrders = () => {

    const [ordersData, setOrdersData] = useState();
    const [seeProducts, setSeeProducts] = useState(false);
    const [products, setProducts] = useState();
    const context = useContext(ValuesContext);
    const [isLoading, setIsLoading] = useState(false);

    const User = useRecoilValue(userAtom);
    const setCart = useRecoilState(cartAtom);

    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
        fetchOrders();
    }, [])

    const fetchOrders = async () => {
        setIsLoading(true);
        context.setProgress(20)
        const fetchData = await fetch(SummaryApi.getOrdersByUser.url + `?userid=${User?._id}`, {
            method: SummaryApi.getOrdersByUser.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setOrdersData(dataResponse?.data);
            setTimeout(() => {
                context.setProgress(100)
                setIsLoading(false)
            }, 1000)
            setCart(ordersData?.length)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
            setTimeout(() => {
                context.setProgress(100)
                setIsLoading(false)
            }, 1000)
        }
    }
    return (
        <>
            <section className="section cartpage">
                <div className="container cartb">
                    <span className=''>
                        <h2 className='hd mb-0'>Your Orders</h2>
                        <p>There are <b className='redt'>{ordersData && ordersData?.length}</b> orders in your account.</p>
                    </span>

                    <div className="table-responsive orderTable mt-3">
                        <table className="table table-striped table-bordered">
                            <thead className='thead-dark'>
                                <tr>
                                    <th>Payment Id</th>
                                    <th>Products</th>
                                    <th>Customer Name</th>
                                    <th>Mobile Number</th>
                                    <th>Pin Code</th>
                                    <th>Total Amount</th>
                                    <th>Payment Method</th>
                                    <th>Email</th>
                                    <th>Order Status</th>
                                    <th>Date</th>
                                    <th>Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ordersData && ordersData?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td><span className='text-blue'>{item?.paymentid}</span></td>
                                            <td><span onClick={() => {
                                                setSeeProducts(!seeProducts);
                                                setProducts(item?.products);
                                                toast.info("Scroll down to see Products.")
                                            }} className='text-blue pointer'>Click here to view</span></td>
                                            <td>{item?.name}</td>
                                            <td>{item?.phonenumber}</td>
                                            <td>{item?.pincode}</td>
                                            <td>{item?.amount}</td>
                                            <td>{item?.paymentmethod}</td>
                                            <td>{item?.email}</td>
                                            <td>{item?.status === 'pending' ? <span className='badge badge-danger'>{item?.status}</span> : <span className='badge badge-success'>{item?.status}</span>}</td>
                                            <td>{format(new Date(item?.date), 'dd/MM/yyyy')}</td>
                                            <td>{item?.address}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    {seeProducts === true && <div className="table-responsive orderTable mt-4">
                        <span className=''>
                            <h4 className='hd mb-0'>Products</h4>
                            <p>There are <b className='redt'>{products && products?.length}</b> products in your order.</p>
                        </span>
                        <table className="table table-striped table-bordered mt-3">
                            <thead className='thead-light'>
                                <tr>
                                    <th>Product Id</th>
                                    <th>Product Name</th>
                                    <th>Product Image</th>
                                    <th>Product Quantity</th>
                                    <th>Product Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products && products?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td><span className='text-blue pointer' onClick={() => navigate(`/product/${item?.productid}`)}>{item?.productid}</span></td>
                                            <td><span className='text-blue pointer' onClick={() => navigate(`/product/${item?.productid}`)}>{item?.producttitle}</span></td>
                                            <td><span className='proimgorder'><img src={item?.image} alt="" /></span></td>
                                            <td>{item?.quantity}</td>
                                            <td>{item?.price}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>}
                </div>
            </section>
            {isLoading === true && <div className="loading"></div>
            }
        </>
    )
}

export default UserOrders