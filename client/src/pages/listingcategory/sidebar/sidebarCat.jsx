import React, { useEffect, useState } from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { Link, useParams } from 'react-router-dom';
import banner7 from "../../../assets/banner7.gif"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Rating from '@mui/material/Rating';
import SummaryApi from '../../../utils/apiUrls';

const sidebarCat = ({ filterdata, filterByPrice, handleBrandFilter, filterByCategory }) => {
    const [value, setValue] = useState([100, 180000]);

    const [allCategories, setAllCategories] = useState()
    const [allSubCategories, setAllSubCategories] = useState()
    const [brands, setBrands] = useState([])

    const { category, catname } = useParams()

    const [endpoint, setEndpoint] = useState(catname);

    const fetchCategories = async () => {

        const fetchData = await fetch(SummaryApi.getallsubcategoriess.url, {
            method: SummaryApi.getallsubcategoriess.method,
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

    const fetchSubCategories = async () => {

        const fetchData = await fetch(SummaryApi.getAllCategories.url, {
            method: SummaryApi.getAllCategories.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setAllSubCategories(dataResponse?.data);
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }
    }

    const fetchbrands = async () => {

        const fetchData = await fetch(SummaryApi.brands.url, {
            method: SummaryApi.brands.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setBrands(dataResponse?.data);
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }
    }

    useEffect(() => {
        fetchCategories();
        fetchbrands();
        fetchSubCategories();
    }, [])

    const [valuee, setValuee] = useState();
    const [valueee, setValueee] = useState();
    const [valueeee, setValueeee] = useState();

    const filterByCat = (cat) => {
        setEndpoint('cat')
        filterdata(cat, endpoint);
        setValue([100, 180000]);
    }

    const filterBySubCat = (cat) => {
        setEndpoint('subcat')
        filterByCategory(cat, endpoint);
        setValue([100, 180000]);
    }

    const rangeslider = (value) => {
        setEndpoint('range')
        setValue(value, endpoint);
        filterByPrice(value, catname);
    }

    const BrandFilter = (brand) => {
        setEndpoint('brand')
        handleBrandFilter(brand, endpoint);
        setValue([100, 180000]);
    }
    return (
        <>
            <div className="sidebarlisting">
                <div className="filterbox">
                    <h6>PRODUCT CATEGORIES</h6>
                    <div className="scroll mt-3">
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={valueeee}
                        >
                            <ul>
                                {allSubCategories && allSubCategories?.map((item, index) => {
                                    return (
                                        <li key={index}>  <FormControlLabel value={item?.name} className='w-100' control={<Radio onChange={() => filterBySubCat(item?.name)} />} label={item?.name} /></li>
                                    )
                                })}
                            </ul>
                        </RadioGroup>

                    </div>
                </div>
                <div className="filterbox">
                    <h6>PRODUCT SUB-CATEGORIES</h6>
                    <div className="scroll mt-3">
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={valuee}
                        >
                            <ul>
                                {allCategories && allCategories?.map((item, index) => {
                                    return (
                                        <li key={index}>  <FormControlLabel value={item?.name} className='w-100' control={<Radio onChange={() => filterByCat(item?.name)} />} label={item?.name} /></li>
                                    )
                                })}
                            </ul>
                        </RadioGroup>

                    </div>
                </div>
                <div className="filterbox">
                    <h6>FILTER BY PRICE</h6>

                    <RangeSlider value={value} onInput={rangeslider} min={100} max={180000} step={5} />

                    <div className="d-flex pt-2 pb-2 pricerange">
                        <span>From: <strong className='text-dark'>Rs:  {value[0]}</strong></span>
                        <span className='ml-auto'> To: <strong className='text-dark'>Rs:  {value[1]}</strong></span>
                    </div>
                </div>
                <div className="filterbox">
                    <h6>Filter By Brand</h6>
                    <div className="scroll">
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={valueee}
                        >
                            <ul>
                                {brands && brands?.map((item, index) => {
                                    return (
                                        <li key={index}>  <FormControlLabel value={item?.brandname} className='w-100' control={<Radio onChange={() => BrandFilter(item?.brandname)} />} label={item?.brandname} /></li>
                                    )
                                })}
                            </ul>
                        </RadioGroup>
                    </div>
                </div>
                <Link to={'#'}>  <img className='w-100' src={banner7} alt="" /> </Link>
            </div>
        </>
    )
}

export default sidebarCat