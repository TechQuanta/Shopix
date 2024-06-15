import React, { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { FaAngleDown } from "react-icons/fa6";
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { ValuesContext } from '../../../App';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CountryDropdown = () => {

    const context = useContext(ValuesContext);

    const [open, setOpen] = React.useState(false);
    const [selectedTab, setSelectedTab] = useState();
    const [countryList, setCountryList] = useState(context?.countryList);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setCountryList(context?.countryList);
    }, [])

    const selectCountry = (index, name) => {
        context.setSelectedCountry(name);
        setSelectedTab(index);
        handleClose();
    }

    const filterlist = (e) => {
        const keyword = e.target.value.toLowerCase();

        if (keyword !== '') {
            const list = countryList?.filter((item) => {
                return item?.country.toLowerCase().includes(keyword);
            });
            setCountryList(list);
        } else {
            setCountryList(context.countryList);
        }
    }

    return (
        <div>
            <Button variant="text" className='countrydrop' onClick={handleClickOpen}>
                <div className="info d-flex flex-column">
                    <span className='label'>Your Location</span>
                    <span className='name'>{context?.selectedCountry.length > 10 ? context?.selectedCountry.substr(0, 10) + "..." : ''}</span>
                </div>
                <span className='ml-auto'><FaAngleDown /></span>
            </Button>


            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                className='locationmodel'
            >
                <span className='closedel' onClick={handleClose}><Button><RxCross2 /></Button></span>
                <DialogTitle className='title'>{"Choose your delivery location"}</DialogTitle>
                <p>Select your country.</p>
                <div className="headersearch w-100">
                    <input type="text" placeholder='Search your area...' onChange={filterlist} />
                    <Button><IoSearch /></Button>
                </div>
                <ul className='countrylist mt-4'>
                    {countryList?.length !== 0 && countryList?.map((item, index) => {
                        return (
                            <li key={index} onClick={() => selectCountry(index, item.country)}><Button className={`${selectedTab === index ? 'active' : ''}`}>{item.country}</Button></li>
                        )
                    })}

                </ul>
            </Dialog>
        </div>
    )
}

export default CountryDropdown