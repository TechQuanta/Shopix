import { Button } from '@mui/material';
import React from 'react';
import { useSwiper } from 'swiper/react';
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

export const SwiperNavButtons2 = () => {
    const swiper = useSwiper();

    return (
        <div className="swiper-nav-btns" style={{ top: "34%" }}>
            <Button className='swiperprevhc navbuttons' onClick={() => swiper.slidePrev()}><FaAngleLeft /></Button>
            <Button className='swipernexthc navbuttons' onClick={() => swiper.slideNext()}><FaAngleRight /></Button>
        </div>
    );
};