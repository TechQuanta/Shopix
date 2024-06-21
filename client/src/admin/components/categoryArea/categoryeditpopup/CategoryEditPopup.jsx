import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { RxCross2 } from "react-icons/rx";

import './ProductEditPopup.scss'
import { toast } from 'react-toastify';
import SummaryApi from '../../../../utils/apiUrls';
import { useState } from 'react';
import Loader from '../../../../utils/Loader';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: '#162938',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    zIndex: 9999999999,
};

export default function CategoryEditPopup({ show, setShow, category, fetchCategories }) {

    const [CategoryName, setCategoryName] = useState("");
    const [image, setImage] = useState("");
    const [color, setColor] = useState("");

    const [loading, setLoading] = useState(false);

    const handleClose = () => setShow(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const fetchData = await fetch(SummaryApi.updateCategory.url + category?._id, {
            method: SummaryApi.updateCategory.method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: CategoryName, color: color }),
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.error) {
            toast.error(dataResponse.message)
            fetchCategories();
            return;
        }

        if (dataResponse.success) {
            fetchCategories();
            toast.success(`Category updated Successfully.`)
            setLoading(false)
        }
        setLoading(false)
        setShow(false);
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={show}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={show}>
                    <Box sx={style} borderRadius={5}>
                        <div className='UserProductPopupmainareaedit'>
                            <div className='UserProductPopupmainareaheadedit'>
                                <span>Category</span>
                                <span className='crosseditproductupclose' onClick={() => setShow(false)}><RxCross2 /></span>
                            </div>
                            <div className='UserProductPopupupmainareadetailsedit'>


                                <form className='producteditpopformeditcated' onSubmit={handleSubmit}>
                                    <label htmlFor='productName'>Category Name :</label>
                                    <input
                                        type='text'
                                        id='productName'
                                        placeholder='enter product name'
                                        name='productName'
                                        value={CategoryName || category.name}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        className='producteditpopforminputedit'
                                        required
                                    />

                                    <label htmlFor='productImage' style={{ marginTop: "12px" }}>Product Image :</label>

                                    <div>
                                        <div className='uplimgseditpopedit'>
                                            <div className='uplimgseditpopbedit'>
                                                <img
                                                    src={category.image}
                                                    alt={""}
                                                    width={80}
                                                    height={80}
                                                    className='uplimgseditpopcedit'
                                                />

                                            </div>

                                        </div>
                                    </div>

                                    <label htmlFor='productName'>Color Value :</label>
                                    <input
                                        type='text'
                                        id='productName'
                                        placeholder='enter product name'
                                        name='productName'
                                        value={color || category.color}
                                        onChange={(e) => setColor(e.target.value)}
                                        className='producteditpopforminputedit'
                                        required
                                    />

                                    <Loader onClick={handleSubmit} loading={loading} title={'Update Category'} />
                                </form>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
