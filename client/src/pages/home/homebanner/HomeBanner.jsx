import React from 'react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';

const HomeBanner = () => {

    const navigate = useNavigate();

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
                    <SwiperSlide> <div className="item shadow" onClick={() => navigate('/category/Electronics')}>
                        <img src="https://www.jiomart.com/images/cms/aw_rbslider/slides/1718904790_KV_2368x400.jpg?im=Resize=(2368,400)" alt="" />
                    </div>
                    </SwiperSlide>
                    <SwiperSlide> <div className="item shadow" onClick={() => navigate('/subcat/Mobiles')}>
                        <img src="https://www.kimstore.com/cdn/shop/collections/Smartphones_banner_1920x@2x.jpg?v=1673853963" alt="" />
                    </div>
                    </SwiperSlide>
                    <SwiperSlide> <div className="item shadow" onClick={() => navigate('/subcat/Men')}>
                        <img src="https://www.jiomart.com/images/category/496/men-20200831.jpg" alt="" />
                    </div>
                    </SwiperSlide>
                    <SwiperSlide> <div className="item shadow" onClick={() => navigate('/category/groceries')}>
                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/Consumables/X-GL/Feb5/PC_Hero_1_3000._CB582457311_.jpg" alt="" />
                    </div>
                    </SwiperSlide>
                    <SwiperSlide> <div className="item shadow" onClick={() => navigate('/product/666ae122eede545c398b695e')}>
                        <img src="https://www.apple.com/v/iphone-15-pro/c/images/overview/welcome/hero__iztc7m63bfiy_large.jpg" alt="" />
                    </div>
                    </SwiperSlide>
                    <SwiperSlide> <div className="item shadow" onClick={() => navigate('/product/666ae008eede545c398b68de')}>
                        <img src="https://i.gadgets360cdn.com/large/18868_S24_Ultra__Ultra_Banner_1024x576_1710838974491.jpg" alt="" />
                    </div>
                    </SwiperSlide>
                    <SwiperSlide> <div className="item shadow" onClick={() => navigate('/subcat/Men')}>
                        <img src="https://www.jiomart.com/images/category/493/women-20200831.jpg" alt="" />
                    </div>
                    </SwiperSlide>
                    <SwiperSlide> <div className="item shadow" onClick={() => navigate('/category/groceries')}>
                        <img src="https://www.jiomart.com/images/category/2/groceries-20230228.jpeg" alt="" />
                    </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}

export default HomeBanner