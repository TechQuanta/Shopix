import React from 'react'
import ordersuccess from '../../assets/ordersuccess.gif';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
    const navigate = useNavigate()
    return (
        <>
            <section className="section cartpage">
                <div className="container cartb">
                    <div className="ordersuccessgif">
                        <img src={ordersuccess} alt="" />
                        <span className="ordersucctitle">Your Order Placed Succesfully.</span>
                        <Button onClick={() => navigate('/')} className='btn-bg buttsuccorder'>Return To Shopping</Button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default OrderSuccess