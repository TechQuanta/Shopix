import React from 'react'

import Dashhead from './../../components/dashhead/Dashhead';
import ProductsTable from './../../components/products/ProductsTable/ProductsTable';

const Products = () => {
    return (
        <div className="content-area">
            <Dashhead />
            <ProductsTable />
        </div>
    )
}

export default Products