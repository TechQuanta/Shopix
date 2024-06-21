import React, { useContext, useEffect, useState } from 'react'
import HomeBanner from './homebanner/HomeBanner';
import banner1 from "../../assets/banner1.jpg";
import banner3 from "../../assets/banner3h.png";
import { BsArrowRightShort } from "react-icons/bs";
import banner2 from "../../assets/banner2.png";
import banner4 from "../../assets/banner4.png";
import banner5 from "../../assets/banner5.png";
import banner7 from "../../assets/banner7.gif";
import banner8 from "../../assets/banner8.jpg";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import './home.css'
import { Button } from '@mui/material';
import ProductCarousel1 from '../../components/productcarousel1/ProductCarousel1';
import HomeCategory from '../../components/homecategory/HomeCategory';
import NewsLetter from '../../components/newsletter/NewsLetter';
import { toast } from 'react-toastify';
import SummaryApi from '../../utils/apiUrls';
import ProductItem2 from '../../components/productitem2/ProductItem2';
import { ValuesContext } from '../../App';
import ProductCarousel2 from './../../components/productcarousel2/ProductCarousel2';

const Home = () => {

    const [featuredproducts, setFeaturedProducts] = useState([]);
    const [latestProducts, setLatestProducts] = useState([]);
    const [MobileProducts, setMobileProducts] = useState([]);
    const [catProducts, setCatProducts] = useState([]);
    const [allCat, setAllCat] = useState()
    const [loading, setLoading] = useState(false);
    const context = useContext(ValuesContext);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAllProducts = async () => {
        setIsLoading(true);
        context.setProgress(15)

        const fetchData = await fetch(SummaryApi.featuredProducts.url, {
            method: SummaryApi.featuredProducts.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse?.success) {
            setFeaturedProducts(dataResponse?.data);
            setTimeout(() => {
                context.setProgress(100)
                setIsLoading(false)
            }, 1000)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
            setTimeout(() => {
                context.setProgress(100)
                setIsLoading(false)
            }, 1000)
        }
    }

    const fetchLatestlProducts = async () => {

        const fetchData = await fetch(SummaryApi.allLatestProducts.url, {
            method: SummaryApi.allLatestProducts.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse?.success) {
            setLatestProducts(dataResponse?.data)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }
    }

    const [allSubCategories, setAllSubCategories] = useState();

    const fetchCategories = async () => {
        setIsLoading(true)

        const fetchData = await fetch(SummaryApi.getallsubcategoriess.url, {
            method: SummaryApi.getallsubcategoriess.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setAllSubCategories(dataResponse?.data);
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

    const fetchAllCategories = async () => {
        setIsLoading(true)

        const fetchData = await fetch(SummaryApi.getAllCategories.url, {
            method: SummaryApi.getAllCategories.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setAllCat(dataResponse?.data);
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

    useEffect(() => {
        fetchAllProducts();
        fetchLatestlProducts();
        fetchCategories();
        fetchAllCategories();
    }, [])

    const [selectedCat, setSelectedcat] = useState("Mobiles");
    const [selectedCat2, setSelectedcat2] = useState("Electronics");
    const [value, setValue] = useState(0);
    const [value2, setValue2] = useState(0);
    const [currentCat, setCurrentCat] = useState("Mobiles");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChange2 = (event, newValue) => {
        setValue2(newValue);
    };

    useEffect(() => {
        getMobilesList();
    }, [selectedCat, currentCat, setSelectedcat])

    useEffect(() => {
        getCatList();
    }, [selectedCat2, setSelectedcat2])

    const getMobilesList = async () => {
        setIsLoading(true)

        const fetchData = await fetch(SummaryApi.categoryProduct.url + selectedCat, {
            method: SummaryApi.categoryProduct.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse?.success) {
            setMobileProducts(dataResponse?.data);
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

    const getCatList = async () => {

        const fetchData = await fetch(SummaryApi.catProduct.url + selectedCat2, {
            method: SummaryApi.catProduct.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse?.success) {
            setCatProducts(dataResponse?.data);
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }
    }

    return (
        <>
            <div className="homepage">
                <HomeBanner />

                <HomeCategory />

                <section className='homeProducts'>
                    <div className="container">
                        <div className="row mt-2">
                            <div className="col-md-9 productrow">
                                <div className='d-flex align-items-center'>
                                    <div className="info w-75">
                                        <h3 className='mb-0 hd'>FEATURED PRODUCTS</h3>
                                        <p className='text-light text-sml mb-0'>Do not miss the current offers until the end of March.</p>
                                    </div>
                                    <Button className='viewallbtn ml-auto'>View All &nbsp; <BsArrowRightShort /></Button>
                                </div>

                                <ProductCarousel1 products={featuredproducts} loading={isLoading} />
                            </div>
                            <div className="col-md-3">
                                <div className="banner">
                                    <img src={banner1} className='cursor w-100' alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="bannerwrapper mt-3">
                            <img src={banner3} alt="" />
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-3">
                                <div className="banner" style={{ height: "452px" }}>
                                    <img src={banner2} className='cursor w-100' alt="" />
                                </div>
                                <div className="banner mt-5" style={{ height: "452px" }}>
                                    <img src={banner7} className='cursor w-100' alt="" />
                                </div>
                                <div className="banner mt-5" style={{ height: "452px" }}>
                                    <img src={banner8} className='cursor w-100' alt="" />
                                </div>
                            </div>
                            <div className="col-md-9 productrow">
                                <div className='d-flex align-items-center'>
                                    <div className="info w-75">
                                        <h3 className='mb-0 hd'>POPULAR PRODUCTS</h3>
                                        <p className='text-light text-sml mb-0'>Popular products with updated stocks.</p>
                                    </div>
                                    <div className='d-flex slectseealgerg'>
                                        <Tabs
                                            value={value2}
                                            onChange={handleChange2}
                                            variant="scrollable"
                                            scrollButtons="auto"
                                            aria-label="scrollable auto tabs example"
                                            className='filtertabsselect'
                                        >
                                            {allCat && allCat?.map((item, index) => {
                                                return (
                                                    <Tab onClick={() => {
                                                        setSelectedcat2(item?.name);
                                                    }} className='item' key={index} label={item?.name} />
                                                )
                                            })}
                                        </Tabs>
                                    </div>
                                </div>

                                <div className="product_row productrow2 w-100 mt-0 d-flex">
                                    <ProductCarousel1 products={catProducts} width={'catlist'} loading={isLoading} />
                                </div>


                                <div className='d-flex align-items-center mt-3'>
                                    <div className="info w-75">
                                        <h3 className='mb-0 hd'>NEW PRODUCTS</h3>
                                        <p className='text-light text-sml mb-0'>New products with updated stocks.</p>
                                    </div>
                                    <Button className='viewallbtn ml-auto'>View All &nbsp; <BsArrowRightShort /></Button>
                                </div>

                                <div className="product_row productrow2 w-100 mt-4 d-flex">
                                    {
                                        latestProducts && latestProducts?.slice(0, 8)?.map((item, index) => {
                                            return (
                                                <ProductItem2 products={item} key={index} />
                                            )
                                        })
                                    }
                                </div>
                                <div className="bannersec d-flex mt-4 mb-4">
                                    <div className="banner">
                                        <img src={banner4} alt="" className='cursor w-100' />
                                    </div>
                                    <div className="banner">
                                        <img src={banner5} alt="" className='cursor w-100' />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="productlist3 mt-3">
                            <div className='d-flex align-items-center justify-content-between'>
                                <div className="info w-75">
                                    <h3 className='mb-0 hd'>{currentCat + " "} Products</h3>
                                    <p className='text-light text-sml mb-0'>Select the category by searching, to see category wise products.</p>
                                </div>
                                <div className='d-flex slectseealljdf'>
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        variant="scrollable"
                                        scrollButtons="auto"
                                        aria-label="scrollable auto tabs example"
                                        className='filtertabsselect'
                                    >
                                        {allSubCategories && allSubCategories?.map((item, index) => {
                                            return (
                                                <Tab onClick={() => {
                                                    setSelectedcat(item?.name);
                                                    setCurrentCat(item?.name);
                                                }} className='item' key={index} label={item?.name} />
                                            )
                                        })}
                                    </Tabs>
                                </div>
                            </div>

                            <ProductCarousel2 products={MobileProducts} loading={isLoading} />
                        </div>

                        <div className="couponbanner mt-3">
                            <div className="container">
                                <div className="contents">
                                    <p>Super discount for <a href="">your purchase.</a></p>
                                    <Button>FREESHOPNEW</Button>
                                    <span>use discount code in checkout</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className='pb-4'>
                    <NewsLetter />
                </div>
            </div>
            {isLoading === true && <div className="loading"></div>
            }
        </>
    )
}

export default Home