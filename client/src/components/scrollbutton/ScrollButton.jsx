import React, { useEffect, useState } from 'react'
import { FaRegArrowAltCircleUp } from "react-icons/fa";

import "./style.scss";

const ScrollButton = () => {

    const handleup = () => {
        window.scrollTo(0, 0);
    };


    return (
        <>
            <div className={`scrollbtonn4525`}>
                <span className='spanscrollbutt'>
                    <FaRegArrowAltCircleUp className='upscrollbutt' onClick={handleup} />
                </span>
            </div>
        </>
    )
}

export default ScrollButton