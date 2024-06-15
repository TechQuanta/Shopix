import React, { useRef, useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import './UserEditPopup.scss';
import './style.css'
import { toast } from "react-toastify";
import imageTobase64 from '../../../../utils/imageTobase64';
import { useAuthContext } from '../../../../context/AuthContext';
import SummaryApi from '../../../../utils/apiUrls';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Loader from '../../../../utils/Loader';
import userAtom from '../../../../atom (global state)/userAtom';
import { useRecoilValue } from 'recoil';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CategoryAddPopup = ({ show, setShow, user, getproducts }) => {

    const [CategoryName, setCategoryName] = useState("");
    const [image, setImage] = useState("");
    const [color, setColor] = useState("");

    const [loading, setLoading] = useState(false);

    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    };

    const handleDeleteProductImage = async (index) => {
        setImage("");
    }

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]
        const uploadImageCloudinary = await imageTobase64(file)

        setImage(uploadImageCloudinary)
    }

    const User = useRecoilValue(userAtom);
    const { authUser, setAuthUser } = useAuthContext();
    const [userId, setUserId] = useState(authUser?._id)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        setUserId(authUser?._id);
        if (CategoryName !== "" && color !== "" && image !== "") {
            const fetchData = await fetch(SummaryApi.addCategory.url, {
                method: SummaryApi.addCategory.method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: CategoryName, image: image, color: color }),
            },
            );

            const dataResponse = await fetchData.json()

            if (dataResponse.success) {
                toast.success(`Category uploaded Successfully.`)
                setLoading(false)
                setCategoryName("");
                setImage("");
                setColor("");
                setShow(false)
                getproducts();
            }

            if (dataResponse.error) {
                toast.error(dataResponse.message)
                setLoading(false)
            }
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
                className='UserProductPopupmain'
            >
                <div className={`UserProductPopup ${show ? "visible" : ""}`}>
                    <div className="UserProductPopupmain">
                        <span className="UserProductPopupcloseBtn" onClick={hidePopup}>
                            Close
                        </span>
                        <div className='UserProductPopupmainarea'>
                            <div className='UserProductPopupmainareahead'>
                                <span>Add New Category</span>
                            </div>
                            <div className='UserProductPopupupmainareadetails'>


                                <form className='producteditpopformcat' onSubmit={handleSubmit}>
                                    <label htmlFor='productName'>Category Name :</label>
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

                                    <label htmlFor='productImage' style={{ marginTop: "12px" }}>Category Image :</label>
                                    <label htmlFor='uploadImageInput'>
                                        <div className='producteditpopformimagearea'>
                                            <div className='producteditpopformimageareab'>
                                                <span style={{ fontSize: "36px", lineHeight: "40px" }}><FaCloudUploadAlt /></span>
                                                <p style={{ fontSize: "14px", lineHeight: "20px" }}>Upload Product Image</p>
                                                <input type='file' id='uploadImageInput' style={{ display: "none" }} onChange={handleUploadProduct} />
                                            </div>
                                        </div>
                                    </label>
                                    <div>
                                        {
                                            image ? (
                                                <div className='uplimgseditpop'>
                                                    <div className='uplimgseditpopb'>
                                                        <img
                                                            src={image}
                                                            alt={""}
                                                            width={80}
                                                            height={80}
                                                            className='uplimgseditpopc'
                                                        />

                                                        <div className='uplimgseditpopd' onClick={() => handleDeleteProductImage()}>
                                                            <MdDelete />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className='uplimgseditpope'>*Please upload Category image</p>
                                            )
                                        }

                                    </div>
                                    <label htmlFor='productName'>Color Value :</label>
                                    <input
                                        type='text'
                                        id='productName'
                                        placeholder='enter Category color value'
                                        name='productName'
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
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

export default CategoryAddPopup