import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { RxCross2 } from "react-icons/rx";

import './ProductEditPopup.scss'
import { toast } from 'react-toastify';
import SummaryApi from '../../../../utils/apiUrls';
import productCategory from '../../../../utils/productCategory';
import Loader from '../../../../utils/Loader';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: '#162938',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    zIndex: 9999999999,
};

export default function ProductEditPopup({ show, setShow, product }) {

    const [productName, setProductName] = React.useState("");
    const [brandName, setBrandName] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [stock, setStock] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [sellingPrice, setSellingPrice] = React.useState("");
    const [featured, setFeatured] = React.useState("");
    const [ram, setRam] = React.useState("");
    const [size, setSize] = React.useState("");
    const [weight, setWeight] = React.useState("");
    const [subcat, setSubcat] = React.useState("");

    const [loading, setLoading] = React.useState(false);

    const handleClose = () => setShow(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const fetchData = await fetch(SummaryApi.updateProduct.url, {
            method: SummaryApi.updateProduct.method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: productName, brandname: brandName, category: category, price: price, sellingprice: sellingPrice, description: description, stock: stock, productId: product._id, isFeatured: featured, rams: ram, weight: weight, size: size, subcat: subcat }),
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.error) {
            toast.error(dataResponse.message)
            setLoading(false)
            return;
        }

        if (dataResponse.success) {
            toast.success(`Product updated Successfully.`)
            setLoading(false)
        }
        setLoading(false)
        setShow(false);
    }

    const [allCategories, setAllCategories] = React.useState()
    const [allSUbCategories, setAllSUBCategories] = React.useState()

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

    React.useEffect(() => {
        fetchCategories();
        fetchSubCategories();
    }, [])

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={show}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={show}>
                    <Box sx={style} borderRadius={5}>
                        <div className='UserProductPopupmainareaedit'>
                            <div className='UserProductPopupmainareaheadedit'>
                                <span>User Details</span>
                                <span className='crosseditproductupclose' onClick={() => setShow(false)}><RxCross2 /></span>
                            </div>
                            <div className='UserProductPopupupmainareadetailsedit'>


                                <form className='producteditpopformeditpred' onSubmit={handleSubmit}>
                                    <label htmlFor='productName'>Product Name :</label>
                                    <input
                                        type='text'
                                        id='productName'
                                        placeholder='enter product name'
                                        name='productName'
                                        value={productName || product.name}
                                        onChange={(e) => setProductName(e.target.value)}
                                        className='producteditpopforminputedit'
                                        required
                                    />


                                    <label htmlFor='brandName' style={{ marginTop: "12px" }}>Brand Name :</label>
                                    <input
                                        type='text'
                                        id='brandName'
                                        placeholder='enter brand name'
                                        value={brandName || product.brandname}
                                        name='brandName'
                                        onChange={(e) => setBrandName(e.target.value)}
                                        className='producteditpopforminputedit'
                                        required
                                    />

                                    <label htmlFor='category' style={{ marginTop: "12px" }}>Category :</label>
                                    <select required value={category || product.category} name='category'
                                        onChange={(e) => setCategory(e.target.value)}
                                        className='producteditpopforminputedit'>
                                        <option value={""}>Select Category</option>
                                        {
                                            allCategories?.map((el, index) => {
                                                return (
                                                    <option onChange={() => setCategory(el?.name)} value={el.name} key={index}>{el?.name}</option>
                                                )
                                            })
                                        }
                                    </select>

                                    <label htmlFor='category' style={{ marginTop: "12px" }}>Sub-Category :</label>
                                    <select required value={subcat || product.subcat} name='subcategory'
                                        onChange={(e) => setSubcat(e.target.value)}
                                        className='producteditpopforminputedit'>
                                        <option value={""}>Select Sub-Category</option>
                                        {
                                            allSUbCategories?.map((el, index) => {
                                                return (
                                                    <option onChange={() => setCategory(el?.name)} value={el.name} key={index}>{el?.name}</option>
                                                )
                                            })
                                        }
                                    </select>

                                    <label htmlFor='productImage' style={{ marginTop: "12px" }}>Product Image :</label>

                                    <div>
                                        {
                                            product?.images.length > 1 ? (
                                                <div className='uplimgseditpopedit'>
                                                    {
                                                        product?.images.map((el, index) => {
                                                            return (
                                                                <div className='uplimgseditpopbedit' key={index}>
                                                                    <img
                                                                        src={el}
                                                                        alt={el}
                                                                        width={80}
                                                                        height={80}
                                                                        className='uplimgseditpopcedit'
                                                                    />

                                                                </div>

                                                            )
                                                        })
                                                    }
                                                </div>
                                            ) : (
                                                <div className='uplimgseditpopbedit'>
                                                    <img
                                                        src={product.images}
                                                        alt={""}
                                                        width={80}
                                                        height={80}
                                                        className='uplimgseditpopcedit'
                                                    />

                                                </div>
                                            )
                                        }

                                    </div>
                                    <label htmlFor='price' style={{ marginTop: "12px" }}>Price :</label>
                                    <input
                                        type='number'
                                        id='price'
                                        placeholder='enter price'
                                        value={price || product.price}
                                        name='price'
                                        onChange={(e) => setPrice(e.target.value)}
                                        className='producteditpopforminputedit'
                                        required
                                    />
                                    <label htmlFor='sellingPrice' style={{ marginTop: "12px" }}>Selling Price :</label>
                                    <input
                                        type='number'
                                        id='sellingPrice'
                                        placeholder='enter selling price'
                                        value={sellingPrice || product.sellingprice}
                                        name='sellingPrice'
                                        onChange={(e) => setSellingPrice(e.target.value)}
                                        className='producteditpopforminputedit'
                                        required
                                    />
                                    <label htmlFor='sellingPrice' style={{ marginTop: "12px" }}>Stock Available :</label>
                                    <input
                                        type='number'
                                        id='stock'
                                        placeholder='enter availability'
                                        value={stock || product.stock}
                                        name='sellingPrice'
                                        onChange={(e) => setStock(e.target.value)}
                                        className='producteditpopforminputedit'
                                        required
                                    />

                                    <label htmlFor='category' style={{ marginTop: "12px" }}>Featured :</label>
                                    <select required value={featured || product.isFeatured} name='featured'
                                        onChange={(e) => {
                                            setFeatured(e.target.value);
                                        }}
                                        className='producteditpopforminputedit'>
                                        <option value={""}>Select</option>
                                        <option value={'true'}>True</option>
                                        <option value={'false'}>False</option>
                                    </select>

                                    <label htmlFor='category' style={{ marginTop: "12px" }}>Product RAM:</label>
                                    <select required value={ram || product.rams} name='ram'
                                        onChange={(e) => {
                                            setRam(e.target.value);
                                        }}
                                        className='producteditpopforminputedit'>
                                        <option value={""}>Select</option>
                                        <option value={'3gb'}>3gb</option>
                                        <option value={'4gb'}>4gb</option>
                                        <option value={'6gb'}>6gb</option>
                                        <option value={'8gb'}>8gb</option>
                                        <option value={'12gb'}>12gb</option>
                                    </select>

                                    <label htmlFor='category' style={{ marginTop: "12px" }}>Product Size:</label>
                                    <select required value={size || product.size} name='size'
                                        onChange={(e) => {
                                            setSize(e.target.value);
                                        }}
                                        className='producteditpopforminputedit'>
                                        <option value={""}>Select</option>
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
                                        value={weight || product.weight}
                                        name='Weight'
                                        onChange={(e) => setWeight(e.target.value)}
                                        className='producteditpopforminputedit'
                                    />


                                    <label htmlFor='description' style={{ marginTop: "12px" }}>Description :</label>
                                    <textarea
                                        className='producteditpopformtextaraeedit'
                                        placeholder='enter product description'
                                        rows={3}
                                        onChange={(e) => setDescription(e.target.value)}
                                        name='description'
                                        value={description || product.description}
                                    >
                                    </textarea>
                                    <Loader onClick={handleSubmit} loading={loading} title={'Update Product'} />
                                </form>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
