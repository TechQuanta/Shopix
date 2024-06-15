import React, { useState } from 'react'

import './ChangeRolePopup.scss'
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAuthContext } from '../../../../../context/AuthContext';
import usersAtom from '../../../../../atom (global state)/usersAtom';
import SummaryApi from '../../../../../utils/apiUrls';
import Loader from '../../../../../utils/Loader';
import userAtom from '../../../../../atom (global state)/userAtom';

const ChangeRolePopup = ({ show, setShow, user }) => {
    const hidePopup = () => {
        setShow(false);
    };

    const User = useRecoilValue(userAtom);
    const { authUser, setAuthUser } = useAuthContext();
    const [users, setUsers] = useRecoilState(usersAtom);

    const [userId, setUserId] = useState(user?._id)
    const [role, setRole] = useState("")

    const [loading, setLoading] = useState(false);

    const changeUserRole = async (e) => {
        e.preventDefault();
        setLoading(true)
        setUserId(user?._id);
        const fetchData = await fetch(SummaryApi.changeRole.url, {
            method: SummaryApi.changeRole.method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: userId, role: role }),
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.error) {
            toast.error(dataResponse.message)
            setLoading(false)
            return;
        }

        if (dataResponse.success) {
            toast.success(`User Role Updated from ${user?.role} to ${role}`)
            setLoading(false)
        }
        const updatedUsers = users.map((us) => {
            if (us._id === user._id) {
                return { ...us, role: role };
            }
            return us;
        })

        setUsers(updatedUsers)
        setLoading(false)
        setShow(false)
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
                            <span>Change Role</span>
                        </div>
                        <div className='UserViewPopupmainareadetailsrole'>


                            <div className='maincheckboxrolerole'>
                                <div class="maincheckboxrole-arole">
                                    <form className="maincheckboxrole-formrole" onSubmit={(e) => changeUserRole(e)}>
                                        <span className="maincheckboxrole-spanrolenxlkng">
                                            {authUser?.role === "admin" && <label className="maincheckboxrole-labelrole">
                                                <input className="maincheckboxrole-inputrole" type="radio" name="radio" value="admin" onChange={() => setRole("admin")} />
                                                <span className="maincheckboxrole-spanrole">Admin</span>
                                            </label>}
                                            <label className="maincheckboxrole-labelrole">
                                                <input className="maincheckboxrole-inputrole" type="radio" name="radio" value="buyer" onChange={() => setRole("buyer")} />
                                                <span className="maincheckboxrole-spanrole">Buyer</span>
                                            </label>
                                            <label className="maincheckboxrole-labelrole">
                                                <input className="maincheckboxrole-inputrole" type="radio" value="seller" name="radio" onChange={() => setRole("seller")} />
                                                <span className="maincheckboxrole-spanrole">Seller</span>
                                            </label>
                                        </span>
                                        <Loader onClick={changeUserRole} loading={loading} title={'change'} />
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

export default ChangeRolePopup