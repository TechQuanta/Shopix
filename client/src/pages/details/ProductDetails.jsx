import React, { useContext, useEffect, useState } from 'react'

import './details.css'
import ProductZoom from '../../components/productzoom/ProductZoom'
import Rating from '@mui/material/Rating';
import QuantityBox from '../../components/quantitybox/QuantityBox';
import { Button } from '@mui/material';
import { FaRegHeart } from "react-icons/fa6";
import { DiGitCompare } from "react-icons/di";
import { FaCartShopping } from "react-icons/fa6";
import RelatedProducts from './relatedproducts/RelatedProducts';
import NewsLetter from '../../components/newsletter/NewsLetter';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../../utils/apiUrls';
import RecommendedProducts from './recommendedproducts/RecommendedProducts';
import { ValuesContext } from '../../App';
import userAtom from '../../atom (global state)/userAtom';
import { useRecoilValue } from 'recoil';
import { format } from "date-fns";
import { MdDeleteForever } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

const ProductDetails = () => {
    const context = useContext(ValuesContext)
    const [activeSize, setActiveSize] = useState(null);
    const [activeRam, setActiveRam] = useState(null);
    const [activetabs, setActiveTabs] = useState(4.5);
    const [productData, setProductdata] = useState();
    const [rating, setRating] = useState(0);
    const [discount, setDiscount] = useState();
    const [cartFields, setCartFields] = useState({});
    const User = useRecoilValue(userAtom);
    const [productQuantity, setProductQuantity] = useState()
    const [tabError, setTabError] = useState(false);
    const [review, setReview] = useState();
    const [cusName, setCusName] = useState();
    const [cusRating, setCusRating] = useState();
    const [liked, setLiked] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const { id } = useParams();

    const isActiveSize = (index) => {
        setActiveSize(index);
    }

    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0);
        getData();
        getReviewData(id);
        checkLiked(id);
    }, [id, location])

    useEffect(() => {
        const discount = productData?.price - productData?.sellingprice;

        const disPercent = (discount / productData?.price) * 100;
        setDiscount(disPercent.toString().substr(0, 4));

        const rat = productData?.ratings > 0 && productData?.ratings
    }, [productData])

    const getData = async () => {
        const fetchData = await fetch(SummaryApi.ProductById.url + id, {
            method: SummaryApi.ProductById.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse?.success) {
            setProductdata(dataResponse?.data);
            checkLiked(id);
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }
    }

    useEffect(() => {
        setProductQuantity(context.productQuantity)
    }, [context.productQuantity])

    const isActivesize = (index, val) => {
        setActiveSize(index)
        setTabError(false)
    }

    const setActiveram = (index, val) => {
        setActiveRam(index)
        setTabError(false)
    }

    const addToCart = (data) => {
        if (User?._id) {
            if (activeSize !== null) {
                cartFields.producttitle = productData?.name
                cartFields.image = productData?.images[0]
                cartFields.price = productData?.sellingprice
                cartFields.quantity = productQuantity
                cartFields.subtotal = parseInt(productData?.sellingprice * productQuantity)
                cartFields.productid = productData?._id
                cartFields.userid = User?._id
                context.addToCart(cartFields);
            } else if (activeRam !== null) {
                cartFields.producttitle = productData?.name
                cartFields.image = productData?.images[0]
                cartFields.price = productData?.sellingprice
                cartFields.quantity = productQuantity
                cartFields.subtotal = parseInt(productData?.sellingprice * productQuantity)
                cartFields.productid = productData?._id
                cartFields.userid = User?._id
                context.addToCart(cartFields);
            } else {
                setTabError(true);
            }
        } else {
            toast.info("User must be logged In to continue.")
        }
    }

    const selectedItem = async (item, quantity) => {

    }
    const [loading, setLoading] = useState(false);
    const [reviewsData, setReviewsData] = useState();

    const getReviewData = async (id) => {
        const fetchData = await fetch(SummaryApi.getReviewsByProduct.url + `?productid=${id}`, {
            method: SummaryApi.getReviewsByProduct.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse?.success) {
            setReviewsData(dataResponse?.data);
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }
    }

    const addReview = async () => {
        if (User?._id) {
            setLoading(true)
            const fetchData = await fetch(SummaryApi.createReview.url, {
                method: SummaryApi.createReview.method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productid: productData?._id, customername: cusName + `(${User?.username})`, review: review, customerrating: cusRating, customerid: User?._id, customerimage: User?.profilePic }),
            },
            );

            const dataResponse = await fetchData.json()

            if (dataResponse.success) {
                toast.success(`Review Posted Successfully.`)
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
                getReviewData();
                setReview("")
                setCusRating("")
                setCusName("")
            }

            if (dataResponse.error) {
                toast.error(dataResponse.message)
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
                getReviewData();
            } else {
                toast.info("User must be logged In to continue.")
            }
        }
    }

    const deleteReview = async (id) => {
        setLoading(true)
        const fetchData = await fetch(SummaryApi.deleteReview.url + `?id=${id}`, {
            method: SummaryApi.deleteReview.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse?.success) {
            toast.success("Review Deleted Successfully!");
            setTimeout(() => {
                setLoading(false)
                getReviewData();
            }, 1000)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        }
    }

    const addToMyList = async (id) => {
            const fetchData = await fetch(SummaryApi.createMYListItem.url, {
                method: SummaryApi.createMYListItem.method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productid: id, userid: User?._id, producttitle: productData?.name, productimage: productData?.images[0], productprice: productData?.sellingprice }),
            },
            );

            const dataResponse = await fetchData.json()

            if (dataResponse?.success) {
                setTrigger(true)
                checkLiked(id)
                toast.success("Product Added to WishList Successfully.")
            }

            if (dataResponse.error) {
                toast.info(dataResponse.message)
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
            <section className="section productdetails">
                <div className="container cont">
                    <h2 className='hd text-capitalize'>{productData?.name}</h2>
                    <ul className="list list-inline">
                        <li className="list-inline-item">
                            <div className="d-flex align-items-center">
                                <span className="text-light mr-2">Brands:</span>
                                <span className='mr-2'>{productData?.brandname}</span>
                                <span className="verline"></span>
                                <span className="text-light mr-2 ml-2">SKU:</span>
                                <span className='mr-2'>ZU49VOR</span>
                            </div>
                        </li>
                    </ul>
                    <hr />
                    <div className="row rowarea">
                        <div className="col-md-4">
                            <ProductZoom images={productData?.images} discount={discount} right={"details"} />
                        </div>
                        <div className="col-md-7 ml-5 detailsright">
                            <span className='rattext mb-5'>Rating:</span>

                            <span className="rating d-flex align-items-center mt-1">
                                <Rating name="read-only" value={4.5} readOnly size="large" precision={0.5} />
                            </span>

                            <div className="d-flex align-items-center info mb-3 mt-3" >
                                <span className="oldprice mr-2 lg">Rs. {productData?.price}</span>
                                <span className="newprice text-danger lg">Rs. {productData?.sellingprice}</span>
                            </div>
                            <span className="badge bg-success">{productData?.stock > 0 ? "In Stock" : "Out Of Stock"}</span>
                            <p className='mt-3 mb-3'>{productData?.description}</p>
                            {productData?.size !== 'None' && (<div className="productSize d-flex align-items-center">
                                <span>Size :</span>
                                <ul className={`list list-inline mb-0 pl-4 ${tabError === true && 'error'}`}>
                                    <li className='list-inline-item' onClick={() => isActivesize(0, 'S')}><a className={`tag ${activeSize === 0 ? 'active' : ''}`}>S</a></li>
                                    <li className='list-inline-item' onClick={() => isActivesize(1, 'M')}><a className={`tag ${activeSize === 1 ? 'active' : ''}`}>M</a></li>
                                    <li className='list-inline-item' onClick={() => isActivesize(2, 'L')}><a className={`tag ${activeSize === 2 ? 'active' : ''}`}>L</a></li>
                                    <li className='list-inline-item' onClick={() => isActivesize(3, 'X')}><a className={`tag ${activeSize === 3 ? 'active' : ''}`}>X</a></li>
                                    <li className='list-inline-item' onClick={() => isActivesize(4, 'XL')}><a className={`tag ${activeSize === 4 ? 'active' : ''}`}>XL</a></li>
                                </ul>
                            </div>)}
                            {productData?.rams !== 'None' && (<div className="productSize d-flex align-items-center">
                                <span>RAM :</span>
                                <ul className={`list list-inline mb-0 pl-4 ${tabError === true && 'error'}`}>
                                    <li className='list-inline-item' onClick={() => setActiveram(0, '3GB')}><a className={`tag ${activeRam === 0 ? 'active' : ''}`}>3GB</a></li>
                                    <li className='list-inline-item' onClick={() => setActiveram(1, '4GB')}><a className={`tag ${activeRam === 1 ? 'active' : ''}`}>4GB</a></li>
                                    <li className='list-inline-item' onClick={() => setActiveram(2, '6GB')}><a className={`tag ${activeRam === 2 ? 'active' : ''}`}>6GB</a></li>
                                    <li className='list-inline-item' onClick={() => setActiveram(3, '8GB')}><a className={`tag ${activeRam === 3 ? 'active' : ''}`}>8GB</a></li>
                                    <li className='list-inline-item' onClick={() => setActiveram(4, '12GB')}><a className={`tag ${activeRam === 4 ? 'active' : ''}`}>12GB</a></li>
                                </ul>
                            </div>)}
                            <div className="d-flex align-items-center mt-3">
                                <QuantityBox selectedItem={selectedItem} />
                                <Button onClick={() => addToCart(productData)} className='btn-blue btn-lg btn-big btn-round ml-3 text-capitalize'><FaCartShopping /> &nbsp; {context.addingInCart === true ? 'Adding...' : 'Add To Cart'}</Button>
                            </div>
                            <div className="d-flex align-items-center mt-5 actions">
                                <Button onClick={() => addToMyList(productData?._id)} variant='outlined' className='btn-round btn-sml'>{liked ? <FaHeart /> : <FaRegHeart />} &nbsp; ADD TO WATCHLIST</Button>
                                <Button variant='outlined' className='btn-round btn-sml ml-3'><DiGitCompare /> &nbsp; Campare</Button>
                            </div>
                            <ul className="list list-inline mt-5">
                                <li className="list-inline-item justify-content-start">
                                    <div className="d-flex flex-column">
                                        <span className='d-flex mb-2'>
                                            <span className="text-light mr-2">Categories:</span>
                                            <span className='mr-2'>{productData?.category}</span>
                                        </span>
                                        <span className='d-flex mb-2'>
                                            <span className="text-light mr-2">Sub-Categories:</span>
                                            <span className='mr-2'>{productData?.subcat}</span>
                                        </span>
                                        <span className='d-flex'>
                                            <span className="text-light mr-2">Tags:</span>
                                            <span className='mr-2'>{productData?.category},&nbsp; {productData?.subcat},&nbsp; {productData?.brandname}</span>
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container reviews">
                    <div className="card detailspagetabs">
                        <div className="customtabs">
                            <ul className="list list-inline">
                                <li className='list-inline-item'>
                                    <Button className={`${activetabs === 0 && 'active'}`} onClick={() => {
                                        setActiveTabs(0)
                                    }}>Description</Button>
                                </li>
                                <li className='list-inline-item'>
                                    <Button className={`${activetabs === 1 && 'active'}`} onClick={() => {
                                        setActiveTabs(1)
                                    }}>Additional Information</Button>
                                </li>
                                <li className='list-inline-item'>
                                    <Button className={`${activetabs === 2 && 'active'}`} onClick={() => {
                                        setActiveTabs(2)
                                        getReviewData(id)
                                    }}>Reviews</Button>
                                </li>
                            </ul>
                            <hr />
                            <br />
                            {activetabs === 0 &&
                                <div className="tabcontent">
                                    <p>{productData?.description}</p>
                                </div>
                            }

                            {activetabs === 1 &&
                                <div className="tabcontent">
                                    <div className="table-responsive">
                                        <table className='table table-bordered'>
                                            <tbody>
                                                <tr className="stand-up">
                                                    <th>Stand Up</th>
                                                    <td>
                                                        <p>35'L x 24'W x 37-45'H(front to back wheel)</p>
                                                    </td>
                                                </tr>
                                                <tr className="folded-wo-wheels">
                                                    <th>Folded(w/o wheels)</th>
                                                    <td>
                                                        <p>35'L x 24'W x 37-45'H</p>
                                                    </td>
                                                </tr>
                                                <tr className="folded-w-wheels">
                                                    <th>Folded(w/o wheels)</th>
                                                    <td>
                                                        <p>35'L x 24'W x 37-45'H</p>
                                                    </td>
                                                </tr>
                                                <tr className="door-pass-through">
                                                    <th>Door Pass through</th>
                                                    <td>
                                                        <p>24</p>
                                                    </td>
                                                </tr>
                                                <tr className="frame">
                                                    <th>Frame</th>
                                                    <td>
                                                        <p>Alluminium</p>
                                                    </td>
                                                </tr>
                                                <tr className="folded-wo-wheels">
                                                    <th>Weight(w/o wheels)</th>
                                                    <td>
                                                        <p>20lbs</p>
                                                    </td>
                                                </tr>
                                                <tr className="weigth-capacity">
                                                    <th>Weight Capacity</th>
                                                    <td>
                                                        <p>20 lbs</p>
                                                    </td>
                                                </tr>
                                                <tr className="width">
                                                    <th>Width</th>
                                                    <td>
                                                        <p>24''</p>
                                                    </td>
                                                </tr>
                                                <tr className="handle-height-ground-to-handle">
                                                    <th>Handle height (ground to handle)</th>
                                                    <td>
                                                        <p>37-45''</p>
                                                    </td>
                                                </tr>
                                                <tr className="wheels">
                                                    <th>Wheels</th>
                                                    <td>
                                                        <p>12'' air / wide track slick tread</p>
                                                    </td>
                                                </tr>
                                                <tr className="seat-back-height">
                                                    <th>Seat Back Height</th>
                                                    <td>
                                                        <p>24''</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            }
                            {activetabs === 2 &&
                                <div className='tabcontent'>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <h3>Customer Reviews :</h3>
                                            <br />
                                            {reviewsData?.length > 0 && reviewsData?.map((item, index) => {
                                                return (
                                                    <div key={index} className="card p-3 pl-2 reviewscard flex-row">
                                                        <div className="image">
                                                            <div className="rounded-circle">
                                                                <img src={item?.customerimage} alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="info">
                                                            <div className="d-flex align-items-center w-100">
                                                                <h5 className="text-light">{format(new Date(item?.createdAt), 'dd/MM/yyyy')}</h5>
                                                                <div className="ml-auto">
                                                                    <Rating name='half-rating-read' value={item?.customerrating} precision={0.5} readOnly />
                                                                </div>
                                                            </div>
                                                            <span className='text-g d-block font-weight-bold'>{item?.customername}</span>
                                                            <p>{item?.review}</p>
                                                        </div>
                                                        {User?._id === item?.customerid && <Button className='delrevb' onClick={() => deleteReview(item?._id)}><MdDeleteForever /></Button>}
                                                    </div>
                                                )
                                            })}
                                            {reviewsData?.length <= 0 && <div className='noprofoundinselemain'>
                                                <h1>Reviews unavailable, Add one to see here.</h1>
                                            </div>}
                                            <hr />
                                            <form className='reviewform' onSubmit={(e) => addReview(e)}>
                                                <h4>Add a review</h4>
                                                <div className="form-group mt-4">
                                                    <textarea onChange={(e) => setReview(e.target.value)} className='form-control' placeholder='Enter a review' name="review" id=""></textarea>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <input onChange={(e) => setCusName(e.target.value)} type="text" className='form-control' placeholder='Name' />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <Rating onChange={(e) => setCusRating(e.target.value)} name='rating' precision={0.5} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <Button onClick={() => addReview()} className='btn-lg btn-big btn-round btn-blue'>Submit Review</Button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="container relatedpro">
                    <RelatedProducts title={'RELATED PRODUCTS'} products={productData} />
                </div>
                <div className="container relatedpro">
                    <RecommendedProducts title={'RECOMMENDED PRODUCTS'} products={productData} />
                </div>
            </section>
            <div className='pb-3'>
                <NewsLetter />
            </div>
            {loading === true && <div className="loading"></div>
            }
        </>
    )
}

export default ProductDetails
