import React, { useEffect, useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import './UserEditPopup.scss';
import './style.css'
import { toast } from "react-toastify";
import { useAuthContext } from '../../../../context/AuthContext';
import productCategory from '../../../../utils/productCategory';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import SummaryApi from '../../../../utils/apiUrls';
import uploadImage from './../../../../utils/uploadImage';
import Loader from '../../../../utils/Loader';
import userAtom from '../../../../atom (global state)/userAtom';
import { useRecoilValue } from 'recoil';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProductAddPopup = ({ show, setShow, user, getproducts }) => {

    const [productName, setProductName] = useState("");
    const [brandName, setBrandName] = useState("");
    const [category, setCategory] = useState("");
    const [subCategory, setSUbCategory] = useState("");
    const [data, setData] = useState({
        productImage: [],
    })
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");
    const [featured, setFeatured] = useState("");
    const [ram, setRam] = useState("");
    const [size, setSize] = useState("");
    const [weight, setWeight] = useState("");
    const [subcat, setSubcat] = useState("");

    const [loading, setLoading] = useState(false);

    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
    const [fullScreenImage, setFullScreenImage] = useState("")

    const hidePopup = () => {
        setShow(false);
    };

    const handleDeleteProductImage = async (index) => {
        console.log("image index", index)

        const newProductImage = [...data.productImage]
        newProductImage.splice(index, 1)

        setData((preve) => {
            return {
                ...preve,
                productImage: [...newProductImage]
            }
        })

    }

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]
        const uploadImageCloudinary = await uploadImage(file)

        setData((preve) => {
            return {
                ...preve,
                productImage: [...preve.productImage, uploadImageCloudinary.url]
            }
        })
    }

    const User = useRecoilValue(userAtom);
    const { authUser, setAuthUser } = useAuthContext();
    const [userId, setUserId] = useState(authUser?._id)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        setUserId(authUser?._id);
        const fetchData = await fetch(SummaryApi.uploadProduct.url, {
            method: SummaryApi.uploadProduct.method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: productName, brandname: brandName, category: category, images: data.productImage, price: price, sellingprice: sellingPrice, description: description, userId: userId, stock: stock, isFeatured: featured, rams: ram, weight: weight, size: size, subcat: subcat }),
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            toast.success(`Product uploaded Successfully.`)
            setLoading(false)
            setPrice("")
            setBrandName("")
            setCategory("")
            setDescription("")
            setSellingPrice("")
            setBrandName("")
            setProductName("")
            setStock("")
            setWeight("")
            setSize("")
            setRam("")
            setFeatured("")
            setData({
                productImage: [],
            })
            setShow(false)
            getproducts();
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
            setLoading(false)
        }
        setLoading(false)

    }
    const [allCategories, setAllCategories] = useState()
    const [allSUbCategories, setAllSUBCategories] = useState()

    const fetchCategories = async () => {

        const fetchData = await fetch(SummaryApi.getAllCategories.url, {
            method: SummaryApi.getAllCategories.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setAllCategories(dataResponse?.data);
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }
    }

    const fetchSubCategories = async () => {

        const fetchData = await fetch(SummaryApi.subcategoriesbyname.url + category, {
            method: SummaryApi.subcategoriesbyname.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setAllSUBCategories(dataResponse?.data);
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }
    }

    useEffect(() => {
        fetchCategories();
        fetchSubCategories();
    }, [])

    return (
        <>
            <Dialog
                open={show}
                TransitionComponent={Transition}
                keepMounted
                onClose={hidePopup}
                aria-describedby="alert-dialog-slide-description"
                className='UserProductPopupmain'
            >
                <div className={`UserProductPopup ${show ? "visible" : ""}`}>
                    <div className="UserProductPopupmain">
                        <span className="UserProductPopupcloseBtn" onClick={hidePopup}>
                            Close
                        </span>
                        <div className='UserProductPopupmainarea'>
                            <div className='UserProductPopupmainareahead'>
                                <span>User Details</span>
                            </div>
                            <div className='UserProductPopupupmainareadetails'>


                                <form className='producteditpopform' onSubmit={handleSubmit}>
                                    <label htmlFor='productName'>Product Name :</label>
                                    <input
                                        type='text'
                                        id='productName'
                                        placeholder='enter product name'
                                        name='productName'
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                        className='producteditpopforminput'
                                        required
                                    />


                                    <label htmlFor='brandName' style={{ marginTop: "12px" }}>Brand Name :</label>
                                    <input
                                        type='text'
                                        id='brandName'
                                        placeholder='enter brand name'
                                        value={brandName}
                                        name='brandName'
                                        onChange={(e) => setBrandName(e.target.value)}
                                        className='producteditpopforminput'
                                        required
                                    />

                                    <label htmlFor='category' style={{ marginTop: "12px" }}>Category :</label>
                                    <select required value={category} name='category'
                                        onChange={(e) => {
                                            setCategory(e.target.value);
                                        }}
                                        className='producteditpopforminput'>
                                        <option value={""}>Select Category</option>
                                        {
                                            allCategories?.map((el, index) => {
                                                return (
                                                    <option value={el.name} key={index}>{el?.name}</option>
                                                )
                                            })
                                        }
                                    </select>

                                    <label htmlFor='category' style={{ marginTop: "12px" }}>Sub-Category :</label>
                                    <select required value={subcat} name='subcategory'
                                        onChange={(e) => setSubcat(e.target.value)}
                                        className='producteditpopforminput'>
                                        <option value={""}>Select SUbCategory</option>
                                        <option value={"none"}>None</option>
                                        {
                                            allSUbCategories?.map((el, index) => {
                                                return (
                                                    <option value={el.name} key={index}>{el?.name}</option>
                                                )
                                            })
                                        }
                                    </select>

                                    <label htmlFor='productImage' style={{ marginTop: "12px" }}>Product Image :</label>
                                    <label htmlFor='uploadImageInput'>
                                        <div className='producteditpopformimagearea'>
                                            <div className='producteditpopformimageareab'>
                                                <span style={{ fontSize: "36px", lineHeight: "40px" }}><FaCloudUploadAlt /></span>
                                                <p style={{ fontSize: "14px", lineHeight: "20px" }}>Upload Product Image</p>
                                                <input type='file' id='uploadImageInput' style={{ display: "none" }} onChange={handleUploadProduct} />
                                            </div>
                                        </div>
                                    </label>
                                    <div>
                                        {
                                            data?.productImage ? (
                                                <div className='uplimgseditpop'>
                                                    {
                                                        data?.productImage?.map((el, index) => {
                                                            return (
                                                                <div className='uplimgseditpopb' key={index}>
                                                                    <img
                                                                        src={el}
                                                                        alt={el}
                                                                        width={80}
                                                                        height={80}
                                                                        className='uplimgseditpopc'
                                                                        onClick={() => {
                                                                            setOpenFullScreenImage(true)
                                                                            setFullScreenImage(el)
                                                                        }} />

                                                                    <div className='uplimgseditpopd' onClick={() => handleDeleteProductImage(index)}>
                                                                        <MdDelete />
                                                                    </div>
                                                                </div>

                                                            )
                                                        })
                                                    }
                                                </div>
                                            ) : (
                                                <p className='uplimgseditpope'>*Please upload product image</p>
                                            )
                                        }

                                    </div>
                                    <label htmlFor='price' style={{ marginTop: "12px" }}>Price :</label>
                                    <input
                                        type='number'
                                        id='price'
                                        placeholder='enter price'
                                        value={price}
                                        name='price'
                                        onChange={(e) => setPrice(e.target.value)}
                                        className='producteditpopforminput'
                                        required
                                    />
                                    <label htmlFor='sellingPrice' style={{ marginTop: "12px" }}>Selling Price :</label>
                                    <input
                                        type='number'
                                        id='sellingPrice'
                                        placeholder='enter selling price'
                                        value={sellingPrice}
                                        name='sellingPrice'
                                        onChange={(e) => setSellingPrice(e.target.value)}
                                        className='producteditpopforminput'
                                        required
                                    />
                                    <label htmlFor='sellingPrice' style={{ marginTop: "12px" }}>Stock Available :</label>
                                    <input
                                        type='number'
                                        id='stock'
                                        placeholder='enter availability'
                                        value={stock}
                                        name='sellingPrice'
                                        onChange={(e) => setStock(e.target.value)}
                                        className='producteditpopforminput'
                                        required
                                    />

                                    <label htmlFor='category' style={{ marginTop: "12px" }}>Featured :</label>
                                    <select required value={featured} name='featured'
                                        onChange={(e) => {
                                            setFeatured(e.target.value);
                                        }}
                                        className='producteditpopforminput'>
                                        <option value={""}>Select</option>
                                        <option value={'true'}>True</option>
                                        <option value={'false'}>False</option>
                                    </select>

                                    <label htmlFor='category' style={{ marginTop: "12px" }}>Product RAM:</label>
                                    <select required value={ram} name='ram'
                                        onChange={(e) => {
                                            setRam(e.target.value);
                                        }}
                                        className='producteditpopforminput'>
                                        <option value={""}>Select</option>
                                        <option value={"None"}>None</option>
                                        <option value={'3gb'}>3gb</option>
                                        <option value={'4gb'}>4gb</option>
                                        <option value={'6gb'}>6gb</option>
                                        <option value={'8gb'}>8gb</option>
                                        <option value={'12gb'}>12gb</option>
                                    </select>

                                    <label htmlFor='category' style={{ marginTop: "12px" }}>Product Size:</label>
                                    <select required value={size} name='size'
                                        onChange={(e) => {
                                            setSize(e.target.value);
                                        }}
                                        className='producteditpopforminput'>
                                        <option value={""}>Select</option>
                                        <option value={"None"}>None</option>
                                        <option value={'S'}>S</option>
                                        <option value={'M'}>M</option>
                                        <option value={'L'}>L</option>
                                        <option value={'X'}>X</option>
                                        <option value={'XL'}>XL</option>
                                        <option value={'XXL'}>XXL</option>
                                    </select>

                                    <label htmlFor='category' style={{ marginTop: "12px" }}>Product Weight:</label>
                                    <input
                                        type='text'
                                        id='Weight'
                                        placeholder='enter availability'
                                        value={weight}
                                        name='Weight'
                                        onChange={(e) => setWeight(e.target.value)}
                                        className='producteditpopforminput'
                                    />

                                    <label htmlFor='description' style={{ marginTop: "12px" }}>Description :</label>
                                    <textarea
                                        className='producteditpopformtextarae'
                                        placeholder='enter product description'
                                        rows={3}
                                        onChange={(e) => setDescription(e.target.value)}
                                        name='description'
                                        value={description}
                                    >
                                    </textarea>
                                    <Loader onClick={handleSubmit} loading={loading} title={'Upload Product'} />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default ProductAddPopup