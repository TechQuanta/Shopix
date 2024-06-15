import React, { useState } from 'react'
import { MdAddCircleOutline } from "react-icons/md";
import CategoryAddPopup from './CategoryAddPopup';

const ButtonEditCategory = ({ user, getproducts }) => {

    const [showCategoryEdit, setShowCategoryEdit] = useState(false);

    return (
        <>
            <button className="productsheadmuibutton" onClick={() => setShowCategoryEdit(true)} >
                <span className="iconpromuihead"> <MdAddCircleOutline /> </span>
                <span className="titlebuttonpromui">Add</span>
            </button>
            <CategoryAddPopup getproducts={getproducts} user={user} show={showCategoryEdit} setShow={setShowCategoryEdit} />
        </>
    )
}

export default ButtonEditCategory