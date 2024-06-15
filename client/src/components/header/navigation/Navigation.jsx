import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import { LuMenu } from "react-icons/lu";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import { IoIosShirt } from "react-icons/io";
import { GiWashingMachine } from "react-icons/gi";
import { MdOutlineBakeryDining } from "react-icons/md";
import { GiSugarCane } from "react-icons/gi";
import { RiBloggerLine } from "react-icons/ri";
import { MdConnectWithoutContact } from "react-icons/md";
import SummaryApi from '../../../utils/apiUrls';
import { toast } from 'react-toastify';


const Navigation = ({ category }) => {
    const [isOpenSidebar, setOpenSidebar] = useState(false);

    const [allSUbElectronicsCategories, setAllSUBElectronicsCategories] = useState()
    const [allSUbFashionCategories, setAllSUBFashionCategories] = useState()
    const [allSUbGroceryCategories, setAllSUBGroceryCategories] = useState()

    const fetchSubMCategories = async () => {

        const fetchData = await fetch(SummaryApi.getsubcategories.url + '66655fcc23196dc7b75b8592', {
            method: SummaryApi.getsubcategories.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setAllSUBElectronicsCategories(dataResponse?.data);
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }
    }

    const fetchSubFCategories = async () => {

        const fetchData = await fetch(SummaryApi.getsubcategories.url + '6665603f23196dc7b75b8596', {
            method: SummaryApi.getsubcategories.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setAllSUBFashionCategories(dataResponse?.data);
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }
    }

    const fetchSubGCategories = async () => {

        const fetchData = await fetch(SummaryApi.getsubcategories.url + '6665614123196dc7b75b8598', {
            method: SummaryApi.getsubcategories.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setAllSUBGroceryCategories(dataResponse?.data);
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }
    }

    useEffect(() => {
        fetchSubMCategories()
        fetchSubFCategories()
        fetchSubGCategories()
    }, [])

    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

    const controlNavbar = () => {
        if (window.scrollY > 120) {
            if (window.scrollY > lastScrollY) {
                setShow("sticky");
            } else {
                setShow("show");
            }
        }
        setLastScrollY(window.scrollY);
    };
    return (
        <nav className={`navigationwrapper ${show}`}>
            <div className='container stickynav'>
                <div className='row'>
                    <div className='col-sm-2 navpart1'>
                        <div className="catWrapper">
                            <Button className='allcattab align-items-center' onClick={() => setOpenSidebar(!isOpenSidebar)
                            }>
                                <span className='icon1 mr-2'><LuMenu /></span>
                                <span className='text'>ALL CATEGORIES</span>
                                <span className={`icon2 ml-2 ${isOpenSidebar ? "open" : ''}`}><FaAngleDown /></span>
                            </Button>
                            <div className={`sidebarnav shadow ${isOpenSidebar ? "open" : ''}`}>
                                <ul>
                                    {category && category?.map((item, index) => {
                                        return (
                                            <li key={index}><Link key={index} to={"/"}><Button>{item?.name}</Button></Link></li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-10 navpart2 d-flex align-items-center'>
                        <ul className='list list-inline ml-auto'>
                            <li className='list-inline-item'> <Link to={"/"}> <IoHomeOutline /> &nbsp; Home</Link></li>
                            <li className='list-inline-item'>
                                <Link to={"/cat/Electronics"} className="disabled-link"><GiWashingMachine /> &nbsp;Electronics&nbsp; <FaAngleDown className='navheaangdown' /></Link>
                                <div className="submenu shadow">
                                    {allSUbElectronicsCategories && allSUbElectronicsCategories?.map((item, index) => {
                                        return (
                                            <Link key={index} to={`/subcat/${item?.name}`}><Button>{item?.name}</Button></Link>
                                        )
                                    })}
                                </div>
                            </li>
                            <li className='list-inline-item'>
                                <Link to={"/cat/Fashion"} className="disabled-link">
                                    <IoIosShirt /> &nbsp;Fashion&nbsp; <FaAngleDown className='navheaangdown' /> </Link>
                                <div className="submenu shadow">
                                    {allSUbFashionCategories && allSUbFashionCategories?.map((item, index) => {
                                        return (
                                            <Link key={index} to={`/subcat/${item?.name}`}><Button>{item?.name}</Button></Link>
                                        )
                                    })}
                                </div>
                            </li>
                            <li className='list-inline-item'> <Link to={"/subcat/Mobiles"} ><MdOutlineBakeryDining /> &nbsp;Mobiles</Link></li>
                            <li className='list-inline-item'>
                                <Link to={"/cat/Groceries"} className="disabled-link"><GiSugarCane /> &nbsp;Groceries&nbsp; <FaAngleDown className='navheaangdown' /></Link>
                                <div className="submenu shadow">
                                    {allSUbGroceryCategories && allSUbGroceryCategories?.map((item, index) => {
                                        return (
                                            <Link key={index} to={`/subcat/${item?.name}`}><Button>{item?.name}</Button></Link>
                                        )
                                    })}
                                </div>
                            </li>
                            {/* <li className='list-inline-item'> <Link to={"/cat/Jewellery"} className="disabled-link"><RiBloggerLine /> &nbsp;Jewellery</Link></li> */}
                            <li className='list-inline-item'> <Link to={"/"}><MdConnectWithoutContact /> &nbsp;Contact US</Link></li>


                        </ul>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navigation