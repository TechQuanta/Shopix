import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { BsArrowRightShort } from "react-icons/bs";
import { toast } from 'react-toastify';
import SummaryApi from '../../../utils/apiUrls';
import ProductCarousel1 from '../../../components/productcarousel1/ProductCarousel1';


const RecommendedProducts = ({ title, products }) => {

    const [recommendedData, setRecommendedData] = useState();

    useEffect(() => {
        getRecommendedProducts();
    }, [products])

    const getRecommendedProducts = async () => {
        const fetchData = await fetch(SummaryApi.catProduct.url + products?.category, {
            method: SummaryApi.catProduct.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse?.success) {
            const filtereddata = dataResponse?.data?.filter(item => item?._id !== products?._id)
            setRecommendedData(filtereddata);
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
                <ProductCarousel1 right={'related'} sliderperview={5} products={recommendedData} css={'detail'} />
            </div>
        </>
    )
}

export default RecommendedProducts