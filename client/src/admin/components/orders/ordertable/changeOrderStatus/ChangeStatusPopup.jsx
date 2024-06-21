import React, { useState } from 'react'

import './ChangeRolePopup.scss'
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../../../../../atom (global state)/userAtom';
import SummaryApi from '../../../../../utils/apiUrls';
import Loader from '../../../../../utils/Loader';

const ChangeStatusPopup = ({ show, setShow, order, fetchOrders }) => {
    const hidePopup = () => {
        setShow(false);
    };

    const User = useRecoilValue(userAtom);
    const [userId, setUserId] = useState(User?._id)
    const [status, setStatus] = useState("")

    const [loading, setLoading] = useState(false);

    const changeUserRole = async (e) => {
        e.preventDefault();
        setLoading(true)
        setUserId(User?._id);
        const fetchData = await fetch(SummaryApi.updateOrder.url + `${order?._id}`, {
            method: SummaryApi.updateOrder.method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: status }),
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.error) {
            toast.error(dataResponse.message)
            setLoading(false)
            fetchOrders();
            return;
        }

        if (dataResponse.success) {
            toast.success(`Order Status Updated SuccessFully.`)
            setLoading(false)
            fetchOrders();
        }
        setShow(false);
    }

    return (
        <div>
            <div className={`UserViewPopuprole ${show ? "visible" : ""}`}>
                <div className="UserViewPopupopacityLayerrole" onClick={hidePopup}></div>
                <div className="UserViewPopupmainrole">
                    <span className="UserViewPopupcloseBtnrole" onClick={hidePopup}>
                        Close
                    </span>
                    <div className='UserViewPopupmainarearole'>
                        <div className='UserViewPopupmainareaheadrole'>
                            <span>Change Status</span>
                        </div>
                        <div className='UserViewPopupmainareadetailsrole'>


                            <div className='maincheckboxrolerole'>
                                <div class="maincheckboxrole-arole">
                                    <form className="maincheckboxrole-formrole" onSubmit={(e) => changeUserRole(e)}>
                                        <span className="maincheckboxrole-spanrolenxlkng">
                                            <label className="maincheckboxrole-labelrole">
                                                <input className="maincheckboxrole-inputrole" type="radio" name="radio" value="pending" onChange={() => setStatus("pending")} />
                                                <span className="maincheckboxrole-spanrole">Pending</span>
                                            </label>
                                            <label className="maincheckboxrole-labelrole">
                                                <input className="maincheckboxrole-inputrole" type="radio" name="radio" value="processed" onChange={() => setStatus("processed")} />
                                                <span className="maincheckboxrole-spanrole">Processed</span>
                                            </label>
                                            <label className="maincheckboxrole-labelrole">
                                                <input className="maincheckboxrole-inputrole" type="radio" value="delivered" name="Delivered" onChange={() => setStatus("delivered")} />
                                                <span className="maincheckboxrole-spanrole">Delivered</span>
                                            </label>
                                        </span>
                                        <Loader onClick={changeUserRole} loading={loading} title={'change Status'} />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangeStatusPopup