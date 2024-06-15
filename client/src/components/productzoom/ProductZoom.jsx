import React, { useEffect, useRef, useState } from 'react'
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import Slider from "react-slick";

const ProductZoom = ({ right, images, discount }) => {

    const [viewCount, setViewCount] = useState();

    useEffect(() => {
        setViewCount(images?.length);
    }, [])

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: { viewCount },
        slidesToScroll: 0,
        Fade: false,
        arrows: true,
    };

    var settings2 = {
        dots: false,
        infinite: false,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        Fade: false,
        arrows: false,
    };
    const zoomsliderbig = useRef();
    const zoomslider = useRef();

    const goto = (index) => {
        zoomslider.current.slickGoTo(index);
        zoomsliderbig.current.slickGoTo(index);
    }

    return (
        <>
            <div className="productzoom productzoombig">
                <div className="badge badge-primary position-relative" style={{ right: `${right === "details" ? "0px" : "10px"}` }}>{discount}%</div>
                <Slider {...settings2} className="zoomsliderbig" ref={zoomsliderbig}>
                    {
                        images && images.map((item, index) => {
                            return (
                                <div className="item" key={index}>
                                    <InnerImageZoom className='w-100' zoomType="hover" zoomScale={1} src={item} />
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
            <Slider {...settings} className="zoomslider w-100" ref={zoomslider}>
                {
                    images && images?.map((item, index) => {
                        return (
                            <div className="item slidedivimgbg w-100" key={index}>
                                <img src={item} alt="" className='w-100 h-100' onClick={() => goto(index)} />
                            </div>
                        )
                    })
                }
            </Slider>
        </>
    )
}

export default ProductZoom