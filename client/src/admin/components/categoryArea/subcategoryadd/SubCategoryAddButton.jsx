import React, { useState } from 'react'
import { MdAddCircleOutline } from "react-icons/md";
import SubCategoryAddPopup from './SubCategoryAddPopup';

const SubCategoryAddButton = ({ category }) => {

    const [showCategoryEdit, setShowCategoryEdit] = useState(false);

    return (
        <>
            <button className="productsheadmuibutton" onClick={() => setShowCategoryEdit(true)} >
                <span className="iconpromuihead"> <MdAddCircleOutline /> </span>
                <span className="titlebuttonpromui">Add</span>
            </button>
            <SubCategoryAddPopup category={category} show={showCategoryEdit} setShow={setShowCategoryEdit} />
        </>
    )
}

export default SubCategoryAddButton