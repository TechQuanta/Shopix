import React from 'react'

import Dashhead from './../../components/dashhead/Dashhead';
import TransactionsTable from './../../components/transactions/TransactionsTable.jsx/TransactionsTable';

const Transactions = () => {
    return (
        <div className="content-area">
            <Dashhead />
            <TransactionsTable />
        </div>
    )
}

export default Transactions