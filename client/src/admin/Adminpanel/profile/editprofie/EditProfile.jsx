import React, { useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import './EditProfile.scss'
import { toast } from 'react-toastify';
import { useAuthContext } from '../../../../context/AuthContext';
import SummaryApi from '../../../../utils/apiUrls';
import imageTobase64 from '../../../../utils/imageTobase64';
import Loader from '../../../../utils/Loader';
import userAtom from '../../../../atom (global state)/userAtom';
import { useRecoilValue } from 'recoil';

const EditProfile = ({ user, fetchUser }) => {

    const User = useRecoilValue(userAtom);
    const { authUser, setAuthUser } = useAuthContext();
    const [userId, setUserId] = useState(authUser?._id)

    const [profilePic, setProfilePic] = useState("");
    const [username, setUsername] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        console.log(profilePic, " ", username, " ", gender, " ", password, " ", address, " ", email);

        setUserId(authUser?._id);
        const fetchData = await fetch(SummaryApi.updateUser.url, {
            method: SummaryApi.updateUser.method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password, address, gender, profilePic, userId }),
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            fetchUser();
            toast.success(`User Updated Succesfully.`)
            setLoading(false)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
            setLoading(false)
            fetchUser();
        }

    }

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]
        const uploadImageCloudinary = await imageTobase64(file)

        setProfilePic(uploadImageCloudinary)
    }

    return (
        <div>
            <div className='UserProductPopupmainareaedit'>
                <div className='UserProductPopupmainareaheadedit'>
                    <span>Edit Profile</span>
                </div>
                <div className='UserProductPopupupmainareadetailsedit'>

                    <form className='producteditpopformeditpe' onSubmit={(e) => { handleSubmit(e) }}>

                        <label htmlFor='productName'>UserName :</label>
                        <input
                            type='text'
                            id='username'
                            placeholder='enter username'
                            name='username'
                            value={username || user?.username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='producteditpopforminputedit'
                        />

                        <label htmlFor='productImage' style={{ marginTop: "12px" }}>Profile Image :</label>
                        <label htmlFor='uploadImageInput'>
                            <div className='producteditpopformimageareaedit' style={{ height: "96px" }}>
                                <div className='producteditpopformimageareabedit'>
                                    <div className="imginwrapper">
                                        <span style={{ fontSize: "36px", lineHeight: "40px" }}><FaCloudUploadAlt /></span>
                                        <p style={{ fontSize: "14px", lineHeight: "20px" }}>Upload Profile Image</p>
                                    </div>
                                    <input type='file' className='uploaddsdProfileImageInputedit' onChange={handleUploadProduct} />
                                </div>
                            </div>
                        </label>
                        <div>
                            {
                                profilePic ? (
                                    <div className='uplimgseditpopedit'>
                                        <div className='uplimgseditpopbedit'>
                                            <img
                                                src={profilePic}
                                                alt={""}
                                                width={80}
                                                height={80}
                                                className='uplimgseditpopcedit'
                                            />

                                            <div className='uplimgseditpopdedit' onClick={() => setProfilePic("")}>
                                                <MdDelete />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <p className='uplimgseditpopeedit'>*Please upload product image</p>
                                )
                            }

                        </div>

                        <label htmlFor='brandName' style={{ marginTop: "12px" }}>Email :</label>
                        <input
                            type='text'
                            id='email'
                            placeholder='enter email'
                            name='email'
                            value={email || user?.email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='producteditpopforminputedit'
                        />

                        <label htmlFor='brandName' style={{ marginTop: "12px" }}>Password :</label>
                        <input
                            type='password'
                            id='password'
                            placeholder='enter password'
                            name='password'
                            onChange={(e) => setPassword(e.target.value)}
                            className='producteditpopforminputedit'
                        />

                        <label htmlFor='category' style={{ marginTop: "12px" }}>Gender :</label>
                        <select required name='category' className='producteditpopforminputedit'
                            onChange={(e) => setGender(e.target.value)} value={gender || user?.gender}
                        >
                            <option value={""} >Select Gender</option>
                            <option value={"male"} onChange={(e) => setGender(e.target.value)}>Male</option>
                            <option value={"female"} onChange={(e) => setGender(e.target.value)}>Female</option>
                        </select>

                        <label htmlFor='description' style={{ marginTop: "12px" }}>Address :</label>
                        <textarea
                            className='producteditpopformtextaraeedit'
                            placeholder='enter Address'
                            rows={3}
                            value={address || user?.address}
                            onChange={(e) => setAddress(e.target.value)}
                            name='address'
                        >
                        </textarea>

                        <Loader onClick={handleSubmit} loading={loading} title={'Update profile'} />
                    </form>


                </div>
            </div>
        </div>
    )
}

export default EditProfile