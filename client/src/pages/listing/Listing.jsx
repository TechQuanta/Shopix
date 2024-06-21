import React, { useCallback, useEffect, useState } from 'react'
import Sidebar from './sidebar/Sidebar'
import { LuMenu } from "react-icons/lu";
import { CgMenuGridO } from "react-icons/cg";
import { TfiLayoutGrid4 } from "react-icons/tfi";
import { BsGridFill } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa6";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';

import './listing.css'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Button } from '@mui/material';
import ProductItem from './../../components/productitem/ProductItem';
import { toast } from 'react-toastify';
import SummaryApi from '../../utils/apiUrls';
import Spinner from '../../components/spinner/Spinner';
import NewsLetter from '../../components/newsletter/NewsLetter';

const Listing = () => {
    const [productView, setProductView] = useState('four');
    const [productCount, setProductCount] = useState(12);
    const [catv, setCatv] = useState()
    const [isLoading, setIsLoading] = useState(false);

    const { name } = useParams()

    const [endpoint, setEndpoint] = useState(name);

    useEffect(() => {
        if (productView === 'one') {
            setProductCount(6)
        } else if (productView === 'two') {
            setProductCount(6)
        } else if (productView === 'three') {
            setProductCount(9)
        } else if (productView === 'four') {
            setProductCount(12)
        }
    }, [productCount, productView, setProductView])
    const [subcatName, setSubcatName] = useState(name);

    const [anchorEl, setAnchorEl] = useState(null);
    const openDropdown = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [productData, setProductData] = useState([]);
    const [totalPages, setTotalPages] = useState()

    const getProductData = async () => {
        setCatv(name)
        setIsLoading(true)
        const fetchData = await fetch(SummaryApi.categoryProduct.url + name, {
            method: SummaryApi.categoryProduct.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse?.success) {
            setProductData(dataResponse?.data);
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }
    }

    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
        getProductData();
    }, [name, subcatName, location])

    const filterData = async (cat, endpointt) => {
        setCatv(cat)
        setIsLoading(true)
        setEndpoint(endpointt)
        const fetchData = await fetch(SummaryApi.categoryProduct.url + cat, {
            method: SummaryApi.categoryProduct.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse?.success) {
            setProductData(dataResponse?.data);
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }
    }

    const handleChange2 = async (event, value) => {

        const fetchData = await fetch(SummaryApi.subCatProductPage.url + `?category=${catv}&page=${value}`, {
            method: SummaryApi.subCatProductPage.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setProductData(dataResponse?.data);
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }
    };

    const filterByCategory = async (cat, endpointt) => {
        setIsLoading(true)
        setCatv(cat)
        setEndpoint(endpointt)
        const fetchData = await fetch(SummaryApi.catProductPage.url + `?category=${cat}`, {
            method: SummaryApi.catProductPage.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse?.success) {
            setProductData(dataResponse?.data);
            setTotalPages(dataResponse?.totalPages);
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }
    }
    const handleChange = async (event, value) => {
        setIsLoading(true)

        const fetchData = await fetch(SummaryApi.catProductPage.url + `?category=${catv}&page=${value}`, {
            method: SummaryApi.catProductPage.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setProductData(dataResponse?.data);
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }
    };

    const filterByPrice = async (value, cat, endpointt) => {
        setEndpoint(endpointt)
        setIsLoading(true)

        const fetchData = await fetch(SummaryApi.filterProduct.url + `?minPrice=${value[0]}&maxPrice=${value[1]}&subcat=${catv}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse?.success) {
            setProductData(dataResponse?.data);
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }
    }

    const handleBrandFilter = async (brand, endpointt) => {
        setCatv(catv)
        setIsLoading(true)
        setEndpoint(endpointt)

        const fetchData = await fetch(SummaryApi.filterProduct.url + `?brandname=${brand}&subcat=${catv}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse?.success) {
            setProductData(dataResponse?.data);
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }
    }
    return (
        <>
            <section className="product_listingpage">
                <div className="container">
                    <div className="productlisting d-flex">
                        <Sidebar filterdata={filterData} filterByPrice={filterByPrice} handleBrandFilter={handleBrandFilter} filterByCategory={filterByCategory} />

                        <div className="content-right">
                            <Link to={'#'}><img src="https://klbtheme.com/bacola/wp-content/uploads/2021/08/bacola-banner-18.jpg" className='w-100' alt="" style={{ borderRadius: "10px" }} /></Link>

                            <div className="showby d-flex align-items-center">
                                <div className="d-flex btnwrapper">
                                    <Button onClick={() => setProductView('one')} className={`onemenu ${productView === 'one' ? 'active' : ''}`}><LuMenu /></Button>
                                    <Button onClick={() => setProductView('two')} className={`twomenu ${productView === 'two' ? 'active' : ''}`}><BsGridFill /></Button>
                                    <Button onClick={() => setProductView('three')} className={`threemenu ${productView === 'three' ? 'active' : ''}`}><CgMenuGridO /></Button>
                                    <Button onClick={() => setProductView('four')} className={`fourmenu ${productView === 'four' ? 'active' : ''}`}><TfiLayoutGrid4 /></Button>
                                </div>
                                <div className="ml-auto showbyfilter">
                                    <Button onClick={handleClick}>Show {productCount} &nbsp; <FaAngleDown /></Button>
                                    <Menu
                                        className='w-100 showperpage'
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={openDropdown}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}>{productCount}</MenuItem>
                                        <MenuItem onClick={handleClose}>{productCount * 2}</MenuItem>
                                        <MenuItem onClick={handleClose}>{productCount * 3}</MenuItem>
                                        <MenuItem onClick={handleClose}>{productCount * 4}</MenuItem>
                                        <MenuItem onClick={handleClose}>{productCount * 5}</MenuItem>
                                    </Menu>
                                </div>
                            </div>
                            <div className={`productlisting mb-4 ${productView}`}>
                                {productData && productData?.map((item, index) => {
                                    return (
                                        <ProductItem key={index} itemView={productView} products={item} />
                                    )
                                })}

                                {productData?.length <= 0 && isLoading === false && <div className='noprofoundinselemain'>
                                    <h1>Products unavailable, Add one to see here.</h1>
                                    <Button onClick={() => navigate('/admin/products')}>Add One</Button>
                                </div>}

                                {isLoading === true && <div className='spinerrauto'>
                                    <Spinner />
                                </div>}

                            </div>
                            <hr />
                            <div className="paginationproductlisting mt-4">
                                <Pagination count={totalPages} onChange={handleChange} showFirstButton showLastButton variant="outlined" shape="rounded" size="large" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="pb-4">
                <NewsLetter />
            </div>
            {isLoading === true && <div className='loading'></div>}
        </>
    )
}

export default Listing
