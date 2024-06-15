import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { FaEdit } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import ButtonEditCategory from "./categoryAddPopup/ButtonEditCategory";
import SummaryApi from "../../../utils/apiUrls";
import CategoryTableAction from "./CategoryTableAction";
import avatar from "../../../assets/admin/avatar.png"
import Pagination from '@mui/material/Pagination';
import { ValuesContext } from "../../../App";

import './style.css'
import { toast } from "react-toastify";
import SubCategoryarea from "./SubCategoryarea";

const TABLE_HEADS = [
    "S.No",
    "ID",
    "Category Image",
    "Category Name",
    "Color Value",
    "Action",
];

const CategoryArea = () => {

    const context = useContext(ValuesContext);

    const [allCategories, setAllCategories] = useState()

    const [totalPages, setTotalPages] = useState()
    const [totalPosts, settotalPosts] = useState()

    const { setSeeSubCat, seeSubCat, subcat } = useContext(ValuesContext);

    const fetchCategories = async () => {

        context.setProgress(15)

        const fetchData = await fetch(SummaryApi.getCategories.url, {
            method: SummaryApi.getCategories.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setAllCategories(dataResponse?.data);
            setTotalPages(dataResponse?.totalPages);
            settotalPosts(dataResponse?.totalPosts);
            context.setProgress(100)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
            context.setProgress(100)
        }

    }

    useEffect(() => {
        fetchCategories();
    }, [])

    const handleChange = async (event, value) => {
        context.setProgress(35)

        const fetchData = await fetch(SummaryApi.getCategories.url + `?page=${value}`, {
            method: SummaryApi.getCategories.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setAllCategories(dataResponse?.data);
            context.setProgress(100)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
            context.setProgress(100)
        }
    };

    return (
        <>
            <div className="Headercategory mb-3">
                <Box display="flex">
                    <div className="productsdashheadarea">
                        <span className="productsheadmui">Categories</span>
                        <ButtonEditCategory />
                    </div>
                </Box>
            </div>
            <section className="content-area-table">
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
                            {allCategories?.map((dataItem, index) => {
                                return (
                                    <tr key={dataItem?._id}>
                                        <td>{index}</td>
                                        <td>
                                            <div className="dt-status">
                                                <span
                                                    className={`dt-status-dot dot-`}
                                                ></span>
                                                <span className="dt-status-text">{dataItem?._id}</span>
                                            </div>
                                        </td>
                                        <td><img className="tableimageuserspage" src={dataItem?.image ? dataItem?.image : avatar} alt="" /></td>
                                        <td>{dataItem?.name}</td>
                                        <td>{dataItem?.color}</td>
                                        <td className="dt-cell-action">
                                            <CategoryTableAction category={dataItem} />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="categorypagination">
                    <span>
                        <p>showing <b>{allCategories?.length}</b> of <b>{totalPosts}</b> results</p>
                    </span>
                    <Pagination count={totalPages} variant="outlined" showFirstButton showLastButton onChange={handleChange} />
                </div>
            </section>
            {subcat &&
                <SubCategoryarea category={seeSubCat} />
            }
        </>
    );
};

export default CategoryArea;
