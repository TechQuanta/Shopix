import React, { useContext, useEffect, useState } from 'react'

import './style.css'
import { useParams } from 'react-router-dom';
import SummaryApi from '../../utils/apiUrls';
import { toast } from 'react-toastify';
import { ValuesContext } from '../../App';
import ProductItem from '../../components/productitem/ProductItem';

const Search = () => {

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { query } = useParams();
    const context = useContext(ValuesContext);

    useEffect(() => {
        fetchData();
    }, [query])

    const fetchData = async () => {
        setIsLoading(true)
        context.setProgress(19)
        const fetchData = await fetch(SummaryApi.getSearchedProducts.url + `?q=${query}`, {
            method: SummaryApi.getSearchedProducts.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setData(dataResponse?.data);
            setTimeout(() => {
                context.setProgress(100)
                setIsLoading(false)
            }, 1000)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
            setTimeout(() => {
                context.setProgress(100)
                setIsLoading(false)
            }, 1000)
        }
    }



    return (
        <>
            <section className="section searchpagemain">
                <div className="container searchpagewrapper">
                    <h2 className="hd mb-2">Searched Results of query '{query}'</h2>
                    <hr />
                    <div className="productitemssearchwrapper mt-2">
                        {data && data?.map((item, index) => {
                            return (
                                <ProductItem key={index} products={item} />
                            )
                        })}
                        {data?.length === 0 && <div>
                            No results Found, try Something else.
                        </div>}
                    </div>
                </div>
            </section>
            {isLoading === true && <div className="loading"></div>
            }
        </>
    )
}

export default Search