import React, { useEffect, useState } from 'react'
import ProductCarousel1 from '../../../components/productcarousel1/ProductCarousel1'
import { Button } from '@mui/material'
import { BsArrowRightShort } from "react-icons/bs";
import SummaryApi from '../../../utils/apiUrls';
import { toast } from 'react-toastify';


const RelatedProducts = ({ title, products }) => {

    const [realtedData, setRelatedData] = useState();

    useEffect(() => {
        getRelatedProducts();
    }, [products])

    const getRelatedProducts = async () => {
        const fetchData = await fetch(SummaryApi.categoryProduct.url + products?.subcat, {
            method: SummaryApi.categoryProduct.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse?.success) {
            const filtereddata = dataResponse?.data?.filter(item => item?._id !== products?._id)
            setRelatedData(filtereddata);
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }
    }
    return (
        <>
            <div className="relatedproducts">
                <div className='d-flex align-items-center'>
                    <div className="info w-75">
                        <h3 className='mb-0 hd'>{title}</h3>
                    </div>
                    <Button className='viewallbtn ml-auto'>View All &nbsp; <BsArrowRightShort /></Button>
                </div>
                <ProductCarousel1 right={'related'} sliderperview={5} products={realtedData} css={'detail'} />
            </div>
        </>
    )
}

export default RelatedProducts