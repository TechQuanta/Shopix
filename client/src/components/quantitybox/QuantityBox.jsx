import React, { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { ValuesContext } from '../../App';

const QuantityBox = ({ size, quantity, item, selectedItem }) => {
    const context = useContext(ValuesContext)
    const [quantityy, setQuantity] = useState(1);

    useEffect(() => {
        if (quantity !== '' && quantity !== null && quantity !== undefined) {
            setQuantity(quantity)
        }
    }, [])

    useEffect(() => {
        context?.setProductQuantity(quantityy)
        selectedItem(item, quantityy);
    }, [quantityy])
    return (
        <>
            <div className={`quantitydrop d-flex align-items-center ${size === 'cart' && 'small'}`}>
                <Button onClick={() => {
                    if (quantityy >= 2) {
                        setQuantity((prev) => prev - 1)
                    } else {
                        setQuantity((prev) => prev)
                        toast.info("Quantity cannot be less than 1!")
                    }
                }
                }><FaMinus /></Button>
                <input type="text" value={quantityy} />
                <Button onClick={() => setQuantity((prev) => prev + 1)}><FaPlus /></Button>
            </div>
        </>
    )
}

export default QuantityBox