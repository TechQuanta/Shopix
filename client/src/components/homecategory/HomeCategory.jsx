import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { SwiperNavButtons } from '../swipernav/swiperNavButtons';
import { SwiperNavButtons2 } from '../swipernav/swiperNavButtons2';
import SummaryApi from '../../utils/apiUrls';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const HomeCategory = () => {

    const [allCategories, setAllCategories] = useState()

    const fetchCategories = async () => {

        const fetchData = await fetch(SummaryApi.getAllCategories.url, {
            method: SummaryApi.getAllCategories.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setAllCategories(dataResponse?.data);
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <section className="homecat">
            <div className="container">
                <h2 className='hctitle'>FEATURED CATEGORIES</h2>

                <Swiper
                    slidesPerView={10}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    <SwiperNavButtons2 />
                    {allCategories && allCategories?.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <Link to={`/category/${item?.name}`} className="item text-center cursor homecatslider" style={{ background: item.color }}>
                                    <img src={item.image} alt="" />

                                    <h6 className='mt-3 mb-0'>{item.name}</h6>
                                </Link>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </section>
    )
}

export default HomeCategory