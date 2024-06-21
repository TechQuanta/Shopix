import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { SwiperNavButtons } from '../swipernav/swiperNavButtons';
import ProductItem from '../productitem/ProductItem';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Spinner from '../spinner/Spinner';

const ProductCarousel2 = ({ products, loading }) => {
    const navigate = useNavigate()
    return (
        <div className='product_row w-100 mt-4'>
            <Swiper
                slidesPerView={6}
                spaceBetween={5}
                pagination={{
                    clickable: true,
                }}
                modules={[Navigation]}
                className="mySwiper"
            >
                <SwiperNavButtons right={'list3'} />
                {products && products?.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <ProductItem products={item} height={'list3'} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            {products?.length <= 0 && loading === false && <div className='noprofoundinselemain'>
                <h1>Products unavailable, Add one to see here.</h1>
                <Button onClick={() => navigate('/admin/products')}>Add One</Button>
            </div>}
            {loading === true && <div className='spinerrauto'>
                <Spinner />
            </div>}
        </div>
    )
}

export default ProductCarousel2