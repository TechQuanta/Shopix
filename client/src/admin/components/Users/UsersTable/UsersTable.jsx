import "./userstable.scss";
import avatar from "../../../../assets/admin/avatar.png";
import { useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from "recoil";
import usersAtom from './../../../../atom (global state)/usersAtom';
import UsersTableAction from './UsersTableAction';
import SummaryApi from "../../../../utils/apiUrls";
import Pagination from '@mui/material/Pagination';
import { ValuesContext } from "../../../../App";

const TABLE_HEADS = [
    "Avatar",
    "S.No",
    "Name",
    "Email ID",
    "gender",
    "Role",
    "Orders Count",
    "Action",
];

const UsersTable = () => {

    const [users, setUsers] = useRecoilState(usersAtom);
    const [totalPages, setTotalPages] = useState()

    const [allUsers, setAllUsers] = useState()
    const [totalPosts, settotalPosts] = useState()

    const context = useContext(ValuesContext);

    const fetchAllUsers = async () => {
        context.setProgress(15)

        const fetchData = await fetch(SummaryApi.allUser.url, {
            method: SummaryApi.allUser.method,
            headers: { "Content-Type": "application/json" },
        })

        const dataResponse = await fetchData.json()

        if (dataResponse?.success) {
            setAllUsers(dataResponse?.data)
            setTotalPages(dataResponse?.totalPages);
            settotalPosts(dataResponse?.totalPosts);
            context.setProgress(100)
        }

        if (dataResponse?.error) {
            toast.error(dataResponse?.message)
            context.setProgress(100)
        }
    }

    useEffect(() => {
        fetchAllUsers()
    }, []);

    const handleChange = async (event, value) => {
        context.setProgress(35)

        const fetchData = await fetch(SummaryApi.allUser.url + `?page=${value}`, {
            method: SummaryApi.allUser.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setAllUsers(dataResponse?.data);
            context.setProgress(100)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
            context.setProgress(100)
        }
    };

    return (
        <section className="content-area-table">
            <div className="data-table-info">
                <h4 className="data-table-title">Registered users</h4>
            </div>
            <div className="data-table-diagram">
                <table>
                    <thead>
                        <tr>
                            {TABLE_HEADS?.map((th, index) => (
                                <th key={index}>{th}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers?.map((dataItem, index) => {
                            return (
                                <tr key={dataItem?._id}>
                                    <td><img className="tableimageuserspage" src={dataItem?.profilePic ? dataItem?.profilePic : avatar} alt="" /></td>
                                    <td>{index}</td>
                                    <td>{dataItem?.username}</td>
                                    <td>{dataItem?.email}</td>
                                    <td>{dataItem?.gender}</td>
                                    <td>
                                        <div className="dt-status">
                                            <span
                                                className={`dt-status-dot dot-`}
                                            ></span>
                                            <span className="dt-status-text">{dataItem?.role}</span>
                                        </div>
                                    </td>
                                    <td>{dataItem?.orders}</td>
                                    <td className="dt-cell-action">
                                        <UsersTableAction user={dataItem} fetchAllUsers={fetchAllUsers} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="categorypagination">
                <span>
                    <p>showing <b>{allUsers?.length}</b> of <b>{totalPosts}</b> results</p>
                </span>
                <Pagination count={totalPages} variant="outlined" showFirstButton showLastButton onChange={handleChange} />
            </div>
        </section>
    );
};

export default UsersTable;
