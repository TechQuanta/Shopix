import { Box, Typography, gridClasses } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import './ProductsTable.scss'
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from './../../../../atom (global state)/userAtom';
import ProductsActions from './ProductsActions';
import productsAtom from './../../../../atom (global state)/productsAtom';
import SummaryApi from "../../../../utils/apiUrls";
import ButtonEdit from './ButtonEdit';
import { useDemoData } from '@mui/x-data-grid-generator';
import { ValuesContext } from "../../../../App";

const ProductsTable = () => {

    const user = useRecoilValue(userAtom);

    const context = useContext(ValuesContext);

    const columns = [
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
            editable: true,
        },
        {
            field: "brandname",
            headerName: "Brand Name",
            headerAlign: "left",
            align: "left",
            cellClassName: "MuiCheckbox-root",
        },
        {
            field: "category",
            headerName: "Category",
            flex: 1,
            cellClassName: "MuiCheckbox-root",
        },
        {
            field: "subcat",
            headerName: "Sub Category",
            flex: 1,
            cellClassName: "MuiCheckbox-root",
        },
        {
            field: "price",
            headerName: "Price",
            flex: 1,
            cellClassName: "MuiCheckbox-root",
        },
        {
            field: "sellingprice",
            headerName: "Selling Price",
            flex: 1,
            cellClassName: "MuiCheckbox-root",
            editable: true,
        },
        {
            field: "stock",
            headerName: "Available Stock",
            flex: 1,
            cellClassName: "MuiCheckbox-root",
            editable: true,
        },
        {
            field: "accessLevel",
            headerName: "Actions",
            flex: 1,
            type: 'actions',
            renderCell: (params) => (
                <ProductsActions {...{ params }} />
            ),
        },
    ];

    const actionhover = {
        "&:hover": {
            backgroundColor: "#d2f1e9",
            borderRadius: "6px",
            cursor: "pointer",

        }
    }

    const [product, setProduct] = useState([]);
    const [pageSize, setPageSize] = useState(5);

    const [products, setProducts] = useRecoilState(productsAtom);

    const fetchAllProducts = async () => {
        context.setProgress(15)
        const fetchData = await fetch(SummaryApi.allProducts.url, {
            method: SummaryApi.allProducts.method,
            headers: { "Content-Type": "application/json" },
        },
        );

        const dataResponse = await fetchData.json()

        if (dataResponse?.success) {
            setProducts(dataResponse?.data);
            setProduct(dataResponse?.data);
            context.setProgress(100)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
            context.setProgress(100)
        }
    }

    useEffect(() => {
        fetchAllProducts();
    }, [])

    const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 100,
    });

    return (
        <Box m="0px">
            <Box display="flex">
                <div className="productsdashheadarea">
                    <span className="productsheadmui">Products Available</span>
                    <ButtonEdit getproducts={fetchAllProducts} />
                </div>
            </Box>
            <Box
                m="20px 0 40px 0"
                height="79vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: "#94e2cd",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#3e4396",
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: "#1F2A40",
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: "#3e4396",
                    },
                    "& .MuiCheckbox-root": {
                        color: `${"#d2f1e9"} !important`,
                    },




                }}
            >
                <DataGrid
                    rows={products}
                    columns={columns}
                    getRowId={(row) => row._id}
                    initialState={{
                        ...data.initialState,
                        pagination: { paginationModel: { pageSize: 5 } },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    getRowSpacing={(params) => ({
                        top: params.isFirstVisible ? 0 : 5,
                        bottom: params.isLastVisible ? 0 : 5,
                    })}

                />
            </Box>
        </Box>
    );
};

export default ProductsTable;
