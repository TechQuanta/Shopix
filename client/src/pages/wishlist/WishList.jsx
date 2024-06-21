import React, { useContext, useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { IoClose } from "react-icons/io5";
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import userAtom from './../../atom (global state)/userAtom';
import { ValuesContext } from './../../App';
import SummaryApi from '../../utils/apiUrls';
import NewsLetter from '../../components/newsletter/NewsLetter';
import { Button } from '@mui/material';
import { FaHome } from "react-icons/fa";
import noWishlist from '../../assets/noWishlist.png';

const WishList = () => {
    const [listdata, setListData] = useState()
    const User = useRecoilValue(userAtom);
    const context = useContext(ValuesContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchMyListData()
    }, [])

    const fetchMyListData = async () => {
        context.setProgress(19)
        const fetchData = await fetch(SummaryApi.getMyListByUser.url + `?userid=${User?._id}`, {
            method: SummaryApi.getMyListByUser.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setListData(dataResponse?.data);
            context.setProgress(100)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
            context.setProgress(100)
        }
    }

    const handleDelete = async (id) => {
        context.setProgress(19)
        const fetchData = await fetch(SummaryApi.deleteMyListItem.url + `?id=${id}`, {
            method: SummaryApi.deleteMyListItem.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setTimeout(() => {
                context.setProgress(100)
                setIsLoading(false)
                fetchMyListData()
            }, 1000)
            toast.success("Item Deleted Successfully.")
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
            setTimeout(() => {
                context.setProgress(100)
                setIsLoading(false)
                fetchMyListData()
            }, 1000)
        }
    }

    return (
        <>
            <section className="section cartpage">
                <div className="container cartb">
                    <div className='d-flex headwrappercart w-100'>
                        <span>
                            <h2 className='hd mb-0'>Your WishList</h2>
                            <p>There are <b className='redt'>{listdata && listdata?.length}</b> products in your WishList</p>
                        </span>
                    </div>
                    <div className="row mt-4">
                        <div className='w-100'>
                            <div className="tablecart shadow">
                                <div className="table-responsive">
                                    {!listdata?.length <= 0 ? (<table className='table'>
                                        <thead>
                                            <tr>
                                                <th width='60%'>Product</th>
                                                <th width='25%'>Unit Price</th>
                                                <th width='15%'>Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listdata && listdata?.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td width='50%'>
                                                            <Link to={`/product/${item?.productid}`}>
                                                                <div className="d-flex align-items-center cartitemimgwrapper wishlisttitlewrapper">
                                                                    <div className="imgwrapper">
                                                                        <img src={item?.productimage} className='w-100' alt="" />
                                                                    </div>
                                                                    <div className="info px-3">
                                                                        <h6>{item?.producttitle.length >= 60 ? item?.producttitle.substr(0, 60) + '...' : item?.producttitle}</h6>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </td>
                                                        <td width='25%'>{item?.productprice}</td>
                                                        <td width='15%'><span className='remove pl-2'><IoClose onClick={() => handleDelete(item?._id)} /></span></td>
                                                    </tr>
                                                )
                                            })}

                                        </tbody>
                                    </table>) : (<div className='nowishlistdat'>
                                        <div className="nolistitems">
                                            <img src={noWishlist} alt="" />
                                            <span>WishList is currently empty.</span>
                                            <Link to={'/'}>  <Button><FaHome /> &nbsp;
                                                Continue Shopping</Button></Link>
                                        </div>
                                    </div>)}
                                </div>
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

export default WishList