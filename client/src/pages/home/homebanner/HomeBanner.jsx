import React from 'react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const HomeBanner = () => {

    return (
        <div className="container">
            <div className="homebannersection">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={15}
                    navigation={true}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="sliderhomebanner mySwiper"
                >
                    <SwiperSlide> <div className="item shadow">
                        <img src="https://sslimages.shoppersstop.com/sys-master/root/h99/h09/32787629309982/luxe-sunglasses-web600--2024-05-29-new-hpmepage.jpg" alt="" />
                    </div>
                    </SwiperSlide>
                    <SwiperSlide> <div className="item shadow">
                        <img src="https://sslimages.shoppersstop.com/sys-master/root/hd2/hdd/32654675640350/prada-armani-web--2024-05-09-new-.jpg" alt="" />
                    </div>
                    </SwiperSlide>
                    <SwiperSlide> <div className="item shadow">
                        <img src="https://sslimages.shoppersstop.com/sys-master/root/hd2/hdd/32654675640350/prada-armani-web--2024-05-09-new-.jpg" alt="" />
                    </div>
                    </SwiperSlide>
                    <SwiperSlide> <div className="item shadow">
                        <img src="https://sslimages.shoppersstop.com/sys-master/root/hd2/hdd/32654675640350/prada-armani-web--2024-05-09-new-.jpg" alt="" />
                    </div>
                    </SwiperSlide>
                    <SwiperSlide> <div className="item shadow">
                        <img src="https://sslimages.shoppersstop.com/sys-master/root/h99/h09/32787629309982/luxe-sunglasses-web600--2024-05-29-new-hpmepage.jpg" alt="" />
                    </div>
                    </SwiperSlide>
                    <SwiperSlide> <div className="item shadow">
                        <img src="https://sslimages.shoppersstop.com/sys-master/root/h99/h09/32787629309982/luxe-sunglasses-web600--2024-05-29-new-hpmepage.jpg" alt="" />
                    </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}

export default HomeBanner