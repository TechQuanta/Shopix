import { useContext, useEffect, useRef } from "react";
import LogoBlue from "../../../assets/admin/logo_blue.svg";
import LogoWhite from "../../../assets/admin/logo_white.svg";
import logo from "../../../assets/shopixlogo.png"
import {
  MdOutlineClose,
  MdOutlineCurrencyExchange,
  MdOutlineGridView,
  MdOutlineLogout,
  MdOutlineSettings,
  MdOutlineShoppingBag,
} from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { TbShoppingCartCog } from "react-icons/tb";
import { FaCircleUser } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import { toast } from "react-toastify";
import { useDashboardTheme } from "../../../context/ThemeContext";
import { useAuthContext } from "../../../context/AuthContext";
import { SidebarContext } from "../../../context/SidebarContext";
import SummaryApi from "../../../utils/apiUrls";
import { LIGHT_THEME } from "../../../utils/themeConstants";
import { BiCategoryAlt } from "react-icons/bi";
import userAtom from "../../../atom (global state)/userAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import usersAtom from "../../../atom (global state)/usersAtom";

const Sidebar = () => {
  const User = useRecoilValue(userAtom);
  const { authUser, setAuthUser } = useAuthContext();
  const { isSidebarOpen, closeSidebar, setSidebarOpen } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const setUser = useSetRecoilState(userAtom);

  const navigate = useNavigate();

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
    <nav
      className={`sidebaradmin ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
      <div className="sidebar-top">
        <div className="sidebar-brand" onClick={() => navigate('/')}>
          <img src={logo} alt="" />
          <span className={`sidebar-brand-text ${isSidebarOpen ? "sidebar-show" : ""}`} >Shopix.</span>
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className={`menu-item ${isSidebarOpen ? "sidebar-show" : ""}`}>
              <NavLink to="/admin/dashboard" className={`menu-link ${isSidebarOpen ? "sidebar-show" : ""}`}>
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className={`menu-link-text ${isSidebarOpen ? "sidebar-show" : ""}`}>Dashboard</span>
              </NavLink>
            </li>
            <li className={`menu-item ${isSidebarOpen ? "sidebar-show" : ""}`}>
              <NavLink to="/admin/users" className={`menu-link ${isSidebarOpen ? "sidebar-show" : ""}`}>
                <span className="menu-link-icon">
                  <RiUserSettingsLine size={20} />
                </span>
                <span className={`menu-link-text ${isSidebarOpen ? "sidebar-show" : ""}`}>Users</span>
              </NavLink>
            </li>
            <li className={`menu-item ${isSidebarOpen ? "sidebar-show" : ""}`}>
              <NavLink to="/admin/products" className={`menu-link ${isSidebarOpen ? "sidebar-show" : ""}`}>
                <span className="menu-link-icon">
                  <TbShoppingCartCog size={20} />
                </span>
                <span className={`menu-link-text ${isSidebarOpen ? "sidebar-show" : ""}`}>Products</span>
              </NavLink>
            </li>
            <li className={`menu-item ${isSidebarOpen ? "sidebar-show" : ""}`}>
              <NavLink to="/admin/orders" className={`menu-link ${isSidebarOpen ? "sidebar-show" : ""}`}>
                <span className="menu-link-icon">
                  <MdOutlineShoppingBag size={20} />
                </span>
                <span className={`menu-link-text ${isSidebarOpen ? "sidebar-show" : ""}`}>Orders</span>
              </NavLink>
            </li>
            <li className={`menu-item ${isSidebarOpen ? "sidebar-show" : ""}`}>
              <NavLink to="/admin/transactions" className={`menu-link ${isSidebarOpen ? "sidebar-show" : ""}`}>
                <span className="menu-link-icon">
                  <MdOutlineCurrencyExchange size={18} />
                </span>
                <span className={`menu-link-text ${isSidebarOpen ? "sidebar-show" : ""}`}>Transactions</span>
              </NavLink>
            </li>
            <li className={`menu-item ${isSidebarOpen ? "sidebar-show" : ""}`}>
              <NavLink to="/admin/category" className={`menu-link ${isSidebarOpen ? "sidebar-show" : ""}`}>
                <span className="menu-link-icon">
                  <BiCategoryAlt size={20} />
                </span>
                <span className={`menu-link-text ${isSidebarOpen ? "sidebar-show" : ""}`}>Category</span>
              </NavLink>
            </li>
            {/* <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineMessage size={18} />
                </span>
                <span className="menu-link-text">Messages</span>
              </Link>
            </li> */}
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className={`menu-item ${isSidebarOpen ? "sidebar-show" : ""}`}>
              <NavLink to="/admin/profile" className={`menu-link ${isSidebarOpen ? "sidebar-show" : ""}`}>
                <span className="menu-link-icon">
                  <FaCircleUser size={20} />
                </span>
                <span className={`menu-link-text ${isSidebarOpen ? "sidebar-show" : ""}`}>Profile</span>
              </NavLink>
            </li>
            <li className={`menu-item logsidebarout ${isSidebarOpen ? "sidebar-show" : ""}`} onClick={handleLogout}>
              <span className={`menu-link ${isSidebarOpen ? "sidebar-show" : ""}`}>
                <span className="menu-link-icon">
                  <MdOutlineLogout size={20} />
                </span>
                <span className={`menu-link-text ${isSidebarOpen ? "sidebar-show" : ""}`}>Logout</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
