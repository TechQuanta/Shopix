import React, { useRef, useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { toast } from "react-toastify";
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Loader from '../../../../utils/Loader';
import SummaryApi from '../../../../utils/apiUrls';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SubCategoryAddPopup = ({ show, setShow, category }) => {

    const [CategoryName, setCategoryName] = useState("");

    const [loading, setLoading] = useState(false);

    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        const fetchData = await fetch(SummaryApi.addsubcategories.url + category._id, {
            method: SummaryApi.addsubcategories.method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: CategoryName }),
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            toast.success(`Category updated Successfully.`)
            setLoading(false)
            setCategoryName("");
            setShow(false)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
            setLoading(false)
        }

        setLoading(false)

    }

    return (
        <>
            <Dialog
                open={show}
                TransitionComponent={Transition}
                keepMounted
                onClose={hidePopup}
                aria-describedby="alert-dialog-slide-description"
                className='UserProductPopupmain subcataddpop'
            >
                <div className={`UserProductPopup ${show ? "visible" : ""}`}>
                    <div className="UserProductPopupmain">
                        <span className="UserProductPopupcloseBtn" onClick={hidePopup}>
                            Close
                        </span>
                        <div className='UserProductPopupmainarea'>
                            <div className='UserProductPopupmainareahead'>
                                <span>Add New Sub-Category</span>
                            </div>
                            <div className='UserProductPopupupmainareadetails'>


                                <form className='producteditpopformcat subcataddpop' onSubmit={handleSubmit}>

                                    <span className='cnept'>SubCategory Name :</span>
                                    <input
                                        type='text'
                                        id='productName'
                                        placeholder='enter Category name'
                                        name='productName'
                                        value={CategoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        className='producteditpopforminput'
                                        required
                                    />

                                    <Loader onClick={handleSubmit} loading={loading} title={'Upload Category'} />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default SubCategoryAddPopup