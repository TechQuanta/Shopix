import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Rating from '@mui/material/Rating';
import { AiOutlineFullscreen } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa6";
import { Button } from '@mui/material';

import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { SwiperNavButtons } from '../swipernav/swiperNavButtons';
import ProductItem from '../productitem/ProductItem';
import Spinner from '../spinner/Spinner';

const ProductCarousel1 = ({ right, sliderperview, products, width, css, loading }) => {
    return (
        <div className='product_row w-100 mt-4'>
            <Swiper
                slidesPerView={sliderperview || 4}
                spaceBetween={width === 'catlist' ? 6 : 5}
                pagination={{
                    clickable: true,
                }}
                modules={[Navigation]}
                className="mySwiper"
            >
                <SwiperNavButtons right={right} />
                {products && products?.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <ProductItem products={item} width={width} css={css} />
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

export default ProductCarousel1