import React, { useEffect, useState } from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";


import "./footer.css";

const Footer = () => {

    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer");
    };

    const location = useLocation();

    const [showFooter, setShowFooter] = useState(false);

    useEffect(() => {
        if (window.location.pathname === "/admin/dashboard") {
            setShowFooter(true);
        } else if (window.location.pathname === "/admin/users") {
            setShowFooter(true);
        } else if (window.location.pathname === "/admin/products") {
            setShowFooter(true);
        } else if (window.location.pathname === "/admin/transactions") {
            setShowFooter(true);
        } else if (window.location.pathname === "/admin/profile") {
            setShowFooter(true);
        } else if (window.location.pathname === "/admin/orders") {
            setShowFooter(true);
        } else if (window.location.pathname === "/admin/category") {
            setShowFooter(true);
        } else if (window.location.pathname === "/") {
            setShowFooter(false);
        }
    }, [location, window.location.pathname])

    return (
        <footer className={`footer ${showFooter ? "hide" : ""}`}>
            <div className="container">
                <ul className="menuItems">
                    <NavLink to='/orders' className="menuItem">Orders </NavLink>
                    <NavLink to='/wishlist' className="menuItem">Wishlist</NavLink>
                    <NavLink to='/' className="menuItem">Home Page</NavLink>
                    <NavLink to='/cart' className="menuItem">Cart</NavLink>
                    <NavLink to='/admin/dashboard' className="menuItem">Admin Dashboard</NavLink>
                </ul>
                <div className="infoText">
                    This Product is developed by <b> &nbsp;Balram Dhakad</b>.
                </div>
                <div className="infoText">
                    This Single page application focuses on exploring, searching, adding to cart, add to wishlist, order products by online and cod modes, filter products <br />. This Application also includes admin Dashboard with all the tools and features integrated in it.
                </div>
                <div className="socialIcons">
                    <span className="icon" onClick={() => openInNewTab("https://www.facebook.com/balram.dhakad.3551?mibextid=ZbWKwL")}>
                        <FaFacebookF />
                    </span>
                    <span className="icon" onClick={() => openInNewTab("https://instagram.com/balramdhakad12_?igshid=OGQ5ZDc2ODk2ZA==")}>
                        <FaInstagram />
                    </span>
                    <span className="icon" onClick={() => openInNewTab("https://twitter.com/BalramD42013703?t=rRs-EpG6nl6V5N0Ys8jcAA&s=09")}>
                        <FaTwitter />
                    </span>
                    <span className="icon" onClick={() => openInNewTab("https://www.linkedin.com/in/balram-dhakad-2a9110210?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app")}>
                        <FaLinkedin />
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
