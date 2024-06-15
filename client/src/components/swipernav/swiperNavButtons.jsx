import { Button } from '@mui/material';
import React from 'react';
import { useSwiper } from 'swiper/react';
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

export const SwiperNavButtons = ({ right }) => {
    const swiper = useSwiper();

    return (
        <div className="swiper-nav-btns">
            <Button className='swiperprev navbuttons' onClick={() => swiper.slidePrev()}><FaAngleLeft /></Button>
            <Button className={`swipernext navbuttons ${right === 'related' ? 'related' : ''} ${right === 'list3' ? 'list3' : ''} `} onClick={() => swiper.slideNext()}><FaAngleRight /></Button>
        </div>
    );
};