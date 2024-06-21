import React, { useEffect, useState } from 'react'

import './Profile.css'
import avatar from "../../../assets/admin/avatar.png";
import SummaryApi from '../../../utils/apiUrls';
import Dashhead from '../../components/dashhead/Dashhead';
import EditProfile from './editprofie/EditProfile';
import userAtom from '../../../atom (global state)/userAtom';
import { useRecoilValue } from 'recoil';
import { useAuthContext } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';

const Profile = () => {
    const User = useRecoilValue(userAtom);
    const { authUser, setAuthUser } = useAuthContext();

    const [user, setUser] = useState();
    const [userId, setUserId] = useState(authUser?._id);
    const [showchangeRole, setShowchangeRole] = useState(false);

    const fetchUser = async () => {
        setUserId(authUser?._id);

        const fetchData = await fetch(SummaryApi.UserDetails.url, {
            method: SummaryApi.UserDetails.method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: userId }),
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setUser(dataResponse?.data)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <div className='profiletopmainultradash'>
            <Dashhead />

            <div className="profilecardpagedashmain">
                <div class="profilecardpagedashmaincard-container">
                    <span class="profilecardpagedashmainpro">{user?.role}</span>
                    <img class="profilecardpagedashmainround" src={user?.profilePic ? user?.profilePic : avatar} alt="user" />
                    <h3 className='profilecardpagedashmainh3'>{user?.username}</h3>
                    <h6 className='profilecardpagedashmainh6'>Email: {user?.email}</h6>
                    <p className='profilecardpagedashmainp'>Gender:  {user?.gender}</p>
                    <p className='profilecardpagedashmainp'>Address:  {user?.address ? user?.address : "not set"}</p>
                    <div class="profilecardpagedashmainbuttons">
                        <Link to={'/orders'}>   <button class="profilecardpagedashmainprimary ghost">
                            Orders
                        </button></Link>
                    </div>
                    <div class="profilecardpagedashmainskills w-100">
                        <h6>Orders</h6>
                        <ul>
                            <li>Orders Count: {user?.orders}</li>
                            {user?.orders.length > 0 && <li>See Orders</li>}
                        </ul>
                    </div>
                </div>
                <div className="editprofiledashmain">
                    <EditProfile user={user} fetchUser={fetchUser} />
                </div>
            </div>
        </div>
    )
}

export default Profile