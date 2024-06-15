import React from 'react'
import avatar from "../../../../assets/admin/avatar.png"
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

import './UserViewPopup.scss'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UserViewPopup = ({ show, setShow, user }) => {
    const hidePopup = () => {
        setShow(false);
    };

    return (
        <>
            <Dialog
                open={show}
                TransitionComponent={Transition}
                keepMounted
                onClose={hidePopup}
                aria-describedby="alert-dialog-slide-description"
                className='UserViewPopupdialog'
            >
                <div className='UserViewPopupmainarea'>
                    <span className="UserViewPopupcloseBtn" onClick={hidePopup}>
                        Close
                    </span>
                    <div className='UserViewPopupmainareahead'>
                        <span>User Details</span>
                    </div>
                    <div className='UserViewPopupmainareadetails'>
                        <span className='UserViewPopupmainareadetailsavatar'>
                            <img src={user?.profilePic ? user?.profilePic : avatar} alt="" />
                        </span>
                        <span className='UserViewPopupmainareadetailsareauv'>
                            <div className="wrapUserViewPopupmainareadetailsarea">
                                <span className='spandeatilsmainareapop'><b style={{ color: "#162938" }}>Username: </b> {user?.username}</span>
                                <span className='spandeatilsmainareapop'><b style={{ color: "#162938" }}>Email: </b> {user?.email}</span>
                                <span className='spandeatilsmainareapop'><b style={{ color: "#162938" }}> Gender:</b> {user?.gender ? user?.gender : "Not Given"}</span>
                                <span className='spandeatilsmainareapop'><b style={{ color: "#162938" }}>Role: </b> {user?.role}</span>
                                <span className='spandeatilsmainareapop'><b style={{ color: "#162938" }}>Address: </b> {user?.address ? user?.address : "Not Given"}</span>
                                <span className='spandeatilsmainareapop'><b style={{ color: "#162938" }}>Orders Done: </b> {user?.orders?.length}</span>
                                <span className='spandeatilsmainareapop'><b style={{ color: "#162938" }}>Reviews Written: </b> {user?.reviews?.length}</span>
                                <span className='spandeatilsmainareapop'><b style={{ color: "#162938" }}>Watchlist Products count: </b>{user?.watchlist?.length}</span>
                            </div>

                        </span>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default UserViewPopup