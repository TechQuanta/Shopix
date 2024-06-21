import { createContext, useEffect, useRef, useState } from 'react'
import { ThemeProvider } from "./context/theme-context"
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authentication from './pages/authentication/Authentication'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


import './App.css'
import Home from './pages/home/Home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Listing from './pages/listing/Listing';
import ProductDetails from './pages/details/ProductDetails';
import Cart from './pages/cart/Cart';
import Dashboard from './admin/Adminpanel/dashboard/DashboardScreen';
import Users from './admin/Adminpanel/Users/Users';
import Products from './admin/Adminpanel/Products/Products';
import Orders from './admin/Adminpanel/orders/Orders';
import Profile from './admin/Adminpanel/profile/Profile';
import BaseLayout from './admin/layout/BaseLayout';
import { useDashboardTheme } from './context/ThemeContext';
import { DARK_THEME } from './utils/themeConstants';
import { AuthContextProvider } from './context/AuthContext';
import Category from './admin/Adminpanel/category/Category';
import LoadingBar from 'react-top-loading-bar'
import SummaryApi from './utils/apiUrls';
import userAtom from './atom (global state)/userAtom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import cartAtom from './atom (global state)/cartAtom';
import ListingCat from './pages/listingcategory/ListingCat';
import WishList from './pages/wishlist/WishList';
import CheckOut from './pages/checkout/CheckOut';
import OrderSuccess from './pages/orderSuccess/OrderSuccess';
import UserOrders from './pages/orders/UserOrders';
import Search from './pages/search/Search';
import ScrollButton from './components/scrollbutton/ScrollButton';

export const ValuesContext = createContext();

function App() {

  const [isLogin, setIsLogin] = useState();

  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("Select Country")
  const [progress, setProgress] = useState(0);
  const [seeSubCat, setSeeSubCat] = useState();
  const [subcat, setSubCat] = useState(false);
  const [cartData, setCartData] = useState();
  const [cartFields, setCartFields] = useState({});
  const [productQuantity, setProductQuantity] = useState()
  const User = useRecoilValue(userAtom);
  const cart = useRecoilValue(cartAtom);
  const [addingInCart, setAddingInCart] = useState(false);
  const setCart = useSetRecoilState(cartAtom);

  useEffect(() => {
    getCountry("https://countriesnow.space/api/v0.1/countries/");
    fetchCartData();
  }, []);

  const getCountry = async (url) => {
    const response = await axios.get(url).then((res) => {
      setCountryList(res.data.data)
    })
  }

  const addToCart = async (data) => {
    setAddingInCart(true)
    const fetchData = await fetch(SummaryApi.addToCartProduct.url, {
      method: SummaryApi.addToCartProduct.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
    );

    const dataResponse = await fetchData.json()

    if (dataResponse.success) {
      setCart(cart + 1)
      toast.success(`Product Added To Cart Successfully.`)
      setAddingInCart(false)
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message)
      setAddingInCart(false)
    }
    setAddingInCart(false)
  }

  const fetchCartData = async () => {
    const fetchData = await fetch(SummaryApi.getcartList.url + `?userid=${User?._id}`, {
      method: SummaryApi.getcartList.method,
      headers: { "Content-Type": "application/json" },
    },
    );

    const dataResponse = await fetchData.json()

    if (dataResponse.success) {
      setCart(dataResponse?.data?.length);
    }
  }

  const values = {
    countryList,
    selectedCountry,
    setSelectedCountry,
    isLogin,
    setIsLogin,
    setProgress,
    progress,
    setSeeSubCat,
    seeSubCat,
    subcat,
    setSubCat,
    addToCart,
    cartData,
    setCartData,
    productQuantity,
    setProductQuantity,
    addingInCart,
    setAddingInCart
  }

  const { theme, toggleTheme } = useDashboardTheme();

  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <>
      <ThemeProvider>
        <ValuesContext.Provider value={values}>
          <LoadingBar
            color='#475be8'
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
            height={2.7}
          />
          <AuthContextProvider>
            <BrowserRouter>
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                draggablePercent={60}
                theme={"dark"}
              />
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/authenticate" element={<Authentication />} />
                <Route path="/subcat/:name" element={<Listing />} />
                <Route path="/category/:catname" element={<ListingCat />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<WishList />} />
                <Route path="/checkout" element={<CheckOut />} />
                <Route path="/checkout/success" element={<OrderSuccess />} />
                <Route path="/orders" element={<UserOrders />} />
                <Route path="/search/:query" element={<Search />} />

                <Route element={<BaseLayout />}>
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route path="/admin/users" element={<Users />} />
                  <Route path="/admin/products" element={<Products />} />
                  <Route path="/admin/orders" element={<Orders />} />
                  <Route path="/admin/profile" element={<Profile />} />
                  <Route path="/admin/category" element={<Category />} />
                </Route>

              </Routes>
              <ScrollButton />
              <Footer />
            </BrowserRouter>
          </AuthContextProvider>
        </ValuesContext.Provider>
      </ThemeProvider>
    </>
  )
}

export default App
