import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { IoMdClose } from "react-icons/io";

import "./style.scss";
import SummaryApi from '../../utils/apiUrls';
import { ValuesContext } from '../../App';
import { toast } from 'react-toastify';
import Spinner from './../spinner/Spinner';

function Autocomplete({ changeWord }) {
    const navigate = useNavigate();
    const [closeAuto, setCloseAuto] = useState(false);

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const context = useContext(ValuesContext);

    useEffect(() => {
        fetchData();
    }, [changeWord]);

    const fetchData = async () => {
        setIsLoading(true)
        const fetchData = await fetch(SummaryApi.getSearchedProducts.url + `?q=${changeWord}`, {
            method: SummaryApi.getSearchedProducts.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setData(dataResponse?.data);
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }
    };

    return (
        <div className={`autocomplete09 ${closeAuto ? "autocomplete09none" : ""}`}>
            <div className="autocomplete-items">
                <span className='closeAutocomple'><IoMdClose /></span>
                {!isLoading ? (<div>
                    {data && data?.slice(0, 10)?.map((item) => {
                        return (
                            <div className="autocomplete-item" key={item?._id} onClick={() => {
                                navigate(
                                    `/product/${item._id
                                    }`
                                )
                                setCloseAuto(true);
                            }}>
                                <div className="autocomplete-poster">
                                    <img src={item?.images[0]} alt="" />
                                </div>
                                <div className="autocomplete-content ml-2">
                                    <span className="autocomplete-title tt545">{item?.name?.length >= 15 ? item?.name?.substr(0, 35) + "..." : item?.name?.substr(0, 10)}</span>
                                    {item?.sellingprice && <span className="autocomplete-title tt56566 "><b className='redt'>Price: Rs.{item?.sellingprice}</b></span>}
                                    {item?.subcat && <span className="autocomplete-title tt56566">{item?.subcat + "("} {item?.category + ')'}</span>}
                                </div>
                            </div>
                        );
                    })}
                    {data?.length <= 0 && <h1 className='noresults56756'>No Results Found, Try valid names...</h1>}
                </div>) : (<div className='spinerrauto'>
                    <Spinner />
                </div>)}
            </div>
            <div className="moreresultsauto">
                <div onClick={() => {
                    navigate(`/search/${changeWord}`);
                    setCloseAuto(true);
                }} className="seemoreresulbutt">See More Results..</div>
                <div className="closeiconauto" onClick={() => setCloseAuto(true)}>Close</div>
            </div>
        </div>
    )
}

export default Autocomplete