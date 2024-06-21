import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './dashhead.scss';
import SunIcon from "../../../assets/admin/icons/sun.svg";
import MoonIcon from "../../../assets/admin/icons/moon.svg";
import { useDashboardTheme } from '../../../context/ThemeContext';
import { useAuthContext } from '../../../context/AuthContext';
import { useTheme } from '../../../context/theme-context';
import { LIGHT_THEME } from '../../../utils/themeConstants';
import { SidebarContext } from '../../../context/SidebarContext';
import { RiMenuFoldFill } from "react-icons/ri";
import { RiMenuFold2Fill } from "react-icons/ri";
import Button from '@mui/material/Button';
import userAtom from '../../../atom (global state)/userAtom';
import { useRecoilValue } from 'recoil';

const Dashhead = () => {
    const { theme, toggleTheme } = useDashboardTheme();
    const User = useRecoilValue(userAtom);
    const { authUser, setAuthUser } = useAuthContext();
    const { toggleTheme: HomeThemeToggle } = useTheme();

    const [lastScrollY, setLastScrollY] = useState(0);
    const [show, setShow] = useState("top");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

    const controlNavbar = () => {
        if (window.scrollY > 40) {
            if (window.scrollY) {
                setShow("show");
            }
        } else {
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    };

    const navigate = useNavigate();

    const { isSidebarOpen, setSidebarOpen } = useContext(SidebarContext);

    return (
        <div className={`dashheada ${show}`}>
            {/* <div className="dashheadb"> */}
            <div className="dashheadlogo">
                <div className="dashheadlogoa">
                    <Button className='theme-toggle-btn-dashhead' onClick={() => setSidebarOpen(!isSidebarOpen)}>
                        {isSidebarOpen ? <RiMenuFold2Fill /> : <RiMenuFoldFill />}
                    </Button>
                </div>
            </div>

            <div className="dashheaditems">
                <span className="dashheaditemsitem" onClick={() => navigate("/")}>Home</span>
                <span className="dashheaditemsitem" onClick={() => navigate("/dashboard/profile")}>{User?.username}</span>
                <span className="dashheaditemsitem">
                    <button
                        type="button"
                        className="theme-toggle-btn-dashhead"
                        onClick={() => {
                            toggleTheme();
                            HomeThemeToggle();
                        }}
                    >
                        <img
                            className="theme-icon"
                            src={theme && theme === LIGHT_THEME ? SunIcon : MoonIcon}
                        />
                    </button>
                </span>
                {/* {User?.username &&
                    <span to={"/authenticate"} className="dashheaditemsitem">
                        <button className="dashheaditemsitemlogin" onClick={() => {
                            navigate(`/authenticate`);
                        }}>
                            Login
                        </button>
                    </span>
                } */}
            </div>
            {/* </div> */}
        </div>
    )
}

export default Dashhead