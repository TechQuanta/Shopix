import React, { useState } from 'react'
import { MdAddCircleOutline } from "react-icons/md";
import ProductAddPopup from './../productAddPopup/ProductAddPopup';

const ButtonEdit = ({ user, getproducts }) => {

    const [showProductEdit, setShowProductEdit] = useState(false);

    return (
        <>
            <button className="productsheadmuibutton" onClick={() => setShowProductEdit(true)} >
                <span className="iconpromuihead"> <MdAddCircleOutline /> </span>
                <span className="titlebuttonpromui">Add</span>
            </button>
            <ProductAddPopup getproducts={getproducts} user={user} show={showProductEdit} setShow={setShowProductEdit} />
        </>
    )
}

export default ButtonEdit