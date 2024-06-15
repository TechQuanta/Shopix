import React, { useContext, useEffect, useState } from 'react'
import logo from '../../assets/shopixlogo.png'

import './header.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import CountryDropdown from './countrydropdown/CountryDropdown';
import { Button } from '@mui/material';
import { FiUser } from "react-icons/fi";
import { FiShoppingBag } from "react-icons/fi";
import SearchBox from './searchbox/SearchBox';
import Navigation from './navigation/Navigation';
import { ValuesContext } from '../../App';
import Toggle from '../toggleTheme/Toggle';
import { useAuthContext } from '../../context/AuthContext';
import SummaryApi from '../../utils/apiUrls';
import { toast } from 'react-toastify';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import DashboardIcon from '@mui/icons-material/Dashboard';
import userAtom from '../../atom (global state)/userAtom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import cartAtom from '../../atom (global state)/cartAtom';
const Header = () => {

    const { setAuthUser } = useAuthContext();
    const setUser = useSetRecoilState(userAtom);
    const User = useRecoilValue(userAtom);
    const cart = useRecoilValue(cartAtom);

    const countries = useContext(ValuesContext);

    const location = useLocation();

    const [showHeader, setShowHeader] = useState(false);

    useEffect(() => {
        if (window.location.pathname === "/admin/dashboard") {
            setShowHeader(true);
        } else if (window.location.pathname === "/admin/users") {
            setShowHeader(true);
        } else if (window.location.pathname === "/admin/products") {
            setShowHeader(true);
        } else if (window.location.pathname === "/admin/transactions") {
            setShowHeader(true);
        } else if (window.location.pathname === "/admin/profile") {
            setShowHeader(true);
        } else if (window.location.pathname === "/admin/orders") {
            setShowHeader(true);
        } else if (window.location.pathname === "/admin/category") {
            setShowHeader(true);
        } else if (window.location.pathname === "/") {
            setShowHeader(false);
        }
    }, [location, window.location.pathname])

    const [allCategories, setAllCategories] = useState()

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

    useEffect(() => {
        fetchCategories();
    }, [])

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleLogout = async () => {
        try {
            const res = await fetch(SummaryApi.logout.url, {
                method: SummaryApi.logout.method,
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            localStorage.removeItem("shopix");
            setAuthUser(null);
            if (data?.message === "User logged out successfully") {
                navigate("/authenticate");
                setUser(data);
                toast.success("Logout Successfully!")
            }
        } catch (error) {
            toast.error(error);
        }

    }

    return (
        <div className={`headerWrapper ${showHeader ? 'hide' : ""}`}>
            <div className="top-strip bg-purple">
                <div className="container">
                    <p className='mb-0 mt-0 text-center'>Due to the <b>COVID</b> 19 epidemic, orders may be processed with a slight delay</p>
                </div>
            </div>

            <header className="header">
                <div className="container">
                    <div className="row">
                        <div className="logoWrapper d-flex align-items-center col-sm-2">
                            <Link to={'/'} ><img src={logo} alt="" /></Link>
                            <span className="sopixlogotitle">Shopix</span>
                        </div>
                        <div className="part2 col-sm-10 d-flex align-items-center">
                            {countries?.countryList?.length !== 0 && <CountryDropdown />}

                            <SearchBox />

                            <div className="part3 d-flex align-items-center ml-auto">
                                {User ? <div className="usermenu">
                                    <Tooltip title="Account settings">
                                        <Button onClick={handleClick} className='circle mr-3'><FiUser /></Button>
                                    </Tooltip>
                                    <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={open}
                                        onClose={handleClose}
                                        onClick={handleClose}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&::before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                        <MenuItem onClick={() => {
                                            navigate('/admin/profile')
                                        }}>
                                            <Avatar />&nbsp; {User?.username}
                                        </MenuItem>
                                        <MenuItem onClick={() => {
                                            navigate('/admin/dashboard')
                                        }}>
                                            <DashboardIcon />&nbsp; &nbsp; Admin Dashboard
                                        </MenuItem>
                                        <Divider />
                                        <MenuItem onClick={() => {
                                            navigate('/authenticate')
                                        }}>
                                            <ListItemIcon>
                                                <PersonAdd fontSize="small" />
                                            </ListItemIcon>
                                            Add another account
                                        </MenuItem>
                                        <MenuItem onClick={() => {
                                            navigate('/admin/profile')
                                        }}>
                                            <ListItemIcon>
                                                <Settings fontSize="small" />
                                            </ListItemIcon>
                                            Settings
                                        </MenuItem>
                                        <MenuItem onClick={() => {
                                            handleLogout();
                                        }}>
                                            <ListItemIcon>
                                                <Logout fontSize="small" />
                                            </ListItemIcon>
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </div> : <Link to={'/authenticate'}><Button className='btn-lg btn-blue btn-round btn-big mr-3 btn-signin'>Sign In</Button></Link>}
                                <div className='ml-auto cardtab d-flex align-items-center'>
                                    <span className='price'><Toggle /></span>
                                    <Link to={'/cart'} className='position-relative ml-2'>
                                        <Button className='circle ml-2'><FiShoppingBag /></Button>
                                        <span className="count d-flex align-items-center justify-content-center">{cart}</span>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </header>

            <Navigation category={allCategories} />

            <div className="line"></div>

        </div>
    )
}

export default Header