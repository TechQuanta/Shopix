import React, { useContext, useEffect, useState } from 'react'
import SubCategoryAddButton from './subcategoryadd/SubCategoryAddButton'
import SummaryApi from '../../../utils/apiUrls'
import { toast } from 'react-toastify'
import { Box, Button, Pagination } from '@mui/material';
import SubCategoryTableAction from './subcategoryadd/SubCategoryTableAction';
import { RxCross2 } from "react-icons/rx";
import { ValuesContext } from '../../../App';
import avatar from "../../../assets/admin/avatar.png";

const TABLE_HEADS = [
    "S.No",
    "ID",
    "Category Image",
    "Category",
    "SubCategory",
    "Action",
];

const SubCategoryarea = ({ category }) => {

    const [allCategories, setAllCategories] = useState()

    const [totalPages, setTotalPages] = useState()
    const [totalPosts, settotalPosts] = useState()

    const fetchCategories = async () => {

        const fetchData = await fetch(SummaryApi.getsubcategoriespage.url + category?._id, {
            method: SummaryApi.getsubcategoriespage.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setAllCategories(dataResponse?.data);
            setTotalPages(dataResponse?.totalPages);
            settotalPosts(dataResponse?.totalPosts);
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }

    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const { setSubCat } = useContext(ValuesContext);

    const handleChange = async (event, value) => {

        const fetchData = await fetch(SummaryApi.getsubcategoriespage.url + category?._id + `?page=${value}`, {
            method: SummaryApi.getsubcategoriespage.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setAllCategories(dataResponse?.data);
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }
    };

    return (
        <section className="subcatmain">
            <div className="Headercategory mb-3">
                <Box display="flex">
                    <div className="productsdashheadarea">
                        <span className="productsheadmui">Sub Categories of Category {category.name}</span>
                        <SubCategoryAddButton category={category} />
                        <Button className='closesubcat' onClick={() => setSubCat(false)} ><RxCross2 /></Button>
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
                                        <td><img className="tableimageuserspage" src={category?.image ? category?.image : avatar} alt="" /></td>
                                        <td>{category?.name}</td>
                                        <td>{dataItem?.name}</td>
                                        <td className="dt-cell-action">
                                            <SubCategoryTableAction category={dataItem} />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        {allCategories?.length <= 0 && <div className='nodatasubcat'><h2 className=''>No SubCategory Available</h2></div>}
                    </table>
                </div>
                <div className="categorypagination">
                    <span>
                        <p>showing <b>{allCategories?.length}</b> of <b>{totalPosts}</b> results</p>
                    </span>
                    <Pagination count={totalPages} variant="outlined" showFirstButton showLastButton onChange={handleChange} />
                </div>
            </section>
        </section>
    )
}

export default SubCategoryarea