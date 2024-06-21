import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { ValuesContext } from '../../App';
import { Button } from '@mui/material';
import SummaryApi from '../../utils/apiUrls';
import { toast } from 'react-toastify';
import userAtom from '../../atom (global state)/userAtom';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const CheckOut = () => {
    const [formFields, setFormFields] = useState({
        fullname: "",
        country: "",
        streetAddress1: "",
        streetAddress2: "",
        city: "",
        state: "",
        zipcode: "",
        phoneNumber: "",
        email: ""
    });
    const [cartdata, setCartData] = useState()
    const User = useRecoilValue(userAtom);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('online');
    const context = useContext(ValuesContext);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCartData()
    }, [])

    const fetchCartData = async () => {
        setIsLoading(true)
        context.setProgress(19)
        const fetchData = await fetch(SummaryApi.getcartList.url + `?userid=${User?._id}`, {
            method: SummaryApi.getcartList.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setCartData(dataResponse?.data);
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

    const onChangeInput = (e) => {
        setFormFields(() => ({
            ...formFields,
            [e.target.name]: e.target.value
        }))
    }

    const checkOut = () => {
        if (formFields.fullname === "") {
            toast.error("Please fill the full name");
            return false
        }
        if (formFields.email === "") {
            toast.error("Please fill the email");
            return false
        }
        if (formFields.phoneNumber === "") {
            toast.error("Please fill the phoneNumber");
            return false
        }
        if (formFields.zipcode === "") {
            toast.error("Please fill the zipcode");
            return false
        }
        if (formFields.state === "") {
            toast.error("Please fill the state");
            return false
        }
        if (formFields.city === "") {
            toast.error("Please fill the city");
            return false
        }
        if (formFields.streetAddress2 === "") {
            toast.error("Please fill the streetAddress2");
            return false
        }
        if (formFields.streetAddress1 === "") {
            toast.error("Please fill the streetAddress1");
            return false
        }
        if (formFields.country === "") {
            toast.error("Please fill the country");
            return false
        }

        if (paymentMethod === 'online') {
            const addressInfo = {
                name: formFields.fullname,
                phoneNumber: formFields.phoneNumber,
                address: formFields.streetAddress1 + formFields.streetAddress2 + ', ' + formFields.city + ', ' + formFields.state + ', ' + formFields.country,
                pincode: formFields.zipcode,
                paymentmethod: paymentMethod,
                date: new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                )
            }

            var options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                key_secret: import.meta.env.VITE_RAZORPAY_KEY_SECRET,
                amount: parseInt(total * 100),
                currency: "INR",
                order_receipt: 'order_receipt' + formFields.fullname,
                name: 'Shopix',
                description: "E-Commerce Platform",
                handler: function (response) {
                    const paymentId = response.razorpay_payment_id

                    const payLoad = {
                        data: {
                            name: addressInfo.name,
                            phoneNumber: addressInfo.phoneNumber,
                            address: addressInfo.address,
                            pincode: addressInfo.pincode,
                            amount: parseInt(total),
                            paymentId: paymentId,
                            email: User?.email,
                            userid: User?._id,
                            paymentmethod: addressInfo.paymentmethod,
                            products: cartdata,
                            date: new Date().toLocaleString(
                                "en-US",
                                {
                                    month: "short",
                                    day: "2-digit",
                                    year: "numeric",
                                }
                            )
                        }
                    }
                    createOneOrder(payLoad);
                },
                theme: {
                    color: "#3339cc"
                }
            };

            var pay = new window.Razorpay(options);
            pay.open();
        } else {
            const payLoad = {
                data: {
                    name: formFields.fullname,
                    phoneNumber: formFields.phoneNumber,
                    address: formFields.streetAddress1 + formFields.streetAddress2 + ', ' + formFields.city + ', ' + formFields.state + ', ' + formFields.country,
                    pincode: formFields.zipcode,
                    amount: parseInt(total),
                    email: User?.email,
                    userid: User?._id,
                    paymentmethod: paymentMethod,
                    products: cartdata,
                }
            }
            createOneOrderCash(payLoad);
        }
    }

    const createOneOrder = async (payload) => {
          setIsLoading(true)
        context.setProgress(19)
        const fetchData = await fetch(SummaryApi.createOneOrder.url, {
            method: SummaryApi.createOneOrder.method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ products: payload?.data?.products, userid: payload?.data?.userid, email: payload?.data?.email, paymentid: payload?.data?.paymentId, amount: payload?.data?.amount, pincode: payload?.data?.pincode, address: payload?.data?.address, phonenumber: payload?.data?.phoneNumber, name: payload?.data?.name, paymentmethod: payload?.data?.paymentmethod }),
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
              setTimeout(() => {
                context.setProgress(100)
                setIsLoading(false)
            }, 1000)
            navigate('/checkout/success')
            updateOrderCount(payload?.data?.userid);
        }

        if (dataResponse.error) {
              setTimeout(() => {
                context.setProgress(100)
                setIsLoading(false)
            }, 1000)
            toast.error(dataResponse.message)
        }
    }

    const createOneOrderCash = async (payload) => {
        setIsLoading(true)
        const fetchData = await fetch(SummaryApi.createOneOrderCash.url, {
            method: SummaryApi.createOneOrderCash.method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ products: payload?.data?.products, userid: payload?.data?.userid, email: payload?.data?.email, amount: payload?.data?.amount, pincode: payload?.data?.pincode, address: payload?.data?.address, phonenumber: payload?.data?.phoneNumber, name: payload?.data?.name, paymentmethod: payload?.data?.paymentmethod }),
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            updateOrderCount(payload?.data?.userid);
            setTimeout(() => {
                setIsLoading(false)
                navigate('/checkout/success')
            }, 1000)
        }

        if (dataResponse.error) {
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
            toast.error(dataResponse.message)
        }
    }

    const updateOrderCount = async (userid) => {
        const fetchData = await fetch(SummaryApi.updateUserOrderCount.url + `?userid=${userid}`, {
            method: SummaryApi.updateUserOrderCount.method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderCount: 1 }),
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }
    }

    const [subTotal, setSubTotal] = useState();
    const [total, setTotal] = useState();

    useEffect(() => {
        let subtotal = cartdata && cartdata?.map(item => parseInt(item?.price) * item?.quantity).reduce((total, value) => total + value, 0)
        setSubTotal(subtotal)
        setTotal(subTotal);
    }, [subTotal, cartdata])

    const filterByPayment = (method) => {
        setPaymentMethod(method)
    }

    return (
        <>
            <section className="section cartpage">
                <div className="container cartb">
                    <form className='checkoutform'>
                        <div className="row">
                            <div className="col-md-8">
                                <h2 className="hd mb-4">BILLING DETAILS</h2>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6>Full Name *</h6>
                                        <div className="form-group mt-2">
                                            <TextField label="Full Name" variant="outlined" className='w-100' size='small' name='fullname' onChange={onChangeInput} />
                                        </div>
                                    </div>
                                    <div className="col-md-6 h-100">
                                        <h6>Country *</h6>
                                        <div className="form-group mt-2">
                                            <TextField label="Country" variant="outlined" className='w-100' size='small' name='country' onChange={onChangeInput} />
                                        </div>
                                    </div>
                                </div>
                                <h6>Street Address *</h6>
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <TextField label="House number and street name" variant="outlined" className='w-100' size='small' name='streetAddress1' onChange={onChangeInput} />
                                        </div>
                                        <div className="form-group">
                                            <TextField label="Apartment, suite, unit, etc. (optional)" variant="outlined" className='w-100' size='small' name='streetAddress2' onChange={onChangeInput} />
                                        </div>
                                    </div>
                                </div>
                                <h6>State / Country *</h6>
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <TextField label="State" variant="outlined" className='w-100' size='small' name='state' onChange={onChangeInput} />
                                        </div>
                                    </div>
                                </div>
                                <h6>Town / City *</h6>
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <TextField label="town / city" variant="outlined" className='w-100' size='small' name='city' onChange={onChangeInput} />
                                        </div>
                                    </div>
                                </div>
                                <h6>ZIP Code *</h6>
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <TextField label="ZIP Code" variant="outlined" className='w-100' size='small' name='zipcode' onChange={onChangeInput} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <h6>Phone *</h6>

                                        <div className="form-group mt-3">
                                            <TextField label="Phone No." variant="outlined" className='w-100' size='small' name='phoneNumber' onChange={onChangeInput} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <h6>Email address *</h6>

                                        <div className="form-group mt-3">
                                            <TextField label="Email address." variant="outlined" className='w-100' size='small' name='email' onChange={onChangeInput} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="orderinfo card">
                                    <h4 className="hd">YOUR ORDER</h4>
                                    <div className="table-responsive mt-3">
                                        <table className="table table-borderless" >
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>SubTotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartdata && cartdata?.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{item?.producttitle.length >= 20 ? item?.producttitle.substr(0, 20) + '...' : item?.producttitle} <b>x {item?.quantity}</b></td>
                                                            <td>Rs.{item?.subtotal}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                        <span className="paymentmethcheckout">
                                            <h6>PRODUCT SUB-CATEGORIES</h6>
                                            <div className="scroll mt-2">
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    name="radio-buttons-group"
                                                    value={paymentMethod}
                                                >
                                                    <ul>
                                                        <li>  <FormControlLabel value={'cod'} className='w-100' control={<Radio onChange={() => filterByPayment('cod')} />} label={'Cash On Delivery'} /></li>
                                                        <li>  <FormControlLabel value={'online'} className='w-100' control={<Radio onChange={() => filterByPayment('online')} />} label={'Online Payments'} /></li>
                                                    </ul>

                                                </RadioGroup>

                                            </div>
                                        </span>
                                        <span className='subtotalorderinfo'>
                                            <span>SubTotal:</span>
                                            <span>Rs.{subTotal}</span>
                                        </span>
                                        <span className='subtotalorderinfo mt-2'>
                                            <span>Total:</span>
                                            <span>Rs.{total}</span>
                                        </span>
                                        <Button onClick={() => checkOut()} className='btn-bg checkbut'>Place Order</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            {isLoading === true && <div className="loading"></div>
            }
        </>
    )
}

export default CheckOut
