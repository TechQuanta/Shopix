import React from 'react'
import Dashhead from '../../components/dashhead/Dashhead'
import UsersTable from './../../components/Users/UsersTable/UsersTable';


const Users = () => {
    return (
        <div className="content-area">
            <Dashhead />
            <UsersTable />
        </div>
    )
}

export default Users