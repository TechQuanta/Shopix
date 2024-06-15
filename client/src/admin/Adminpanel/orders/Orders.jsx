import React from 'react'

import Dashhead from './../../components/dashhead/Dashhead';
import OrderTable from './../../components/orders/ordertable/OrderTable';

const Orders = () => {
    return (
        <div className="content-area">
            <Dashhead />
            <OrderTable />
        </div>
    )
}

export default Orders