import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { FaEdit } from "react-icons/fa";

import './TransactionsTable.scss'
import { mockDataTeam } from "../../../../utils/mockData";
import TransactionsActions from "./TransactionsActions";
import { useDemoData } from '@mui/x-data-grid-generator';

const TransactionsTable = () => {
    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "user",
            headerName: "User",
            type: "number",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "date",
            headerName: "Date",
            flex: 1,
        },
        {
            field: "amount",
            headerName: "Amount",
            flex: 1,
        },
        {
            field: "product",
            headerName: "Product",
            flex: 1,
        },
        {
            field: "accessLevel",
            headerName: "Actions",
            flex: 1,
            renderCell: ({ row: { access } }) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        borderRadius="4px"
                        cursor="pointer"
                    >
                        <TransactionsActions />
                    </Box>
                );
            },
        },
    ];

    const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 100,
    });

    return (
        <Box m="0px">
            <Box display="flex">
                <div className="productsdashheadarea">
                    <span className="productsheadmui">Transactions Done</span>
                    {/* <ButtonEdit user={mockDataTeam} /> */}
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
                        color: `${"#b7ebde"} !important`,
                    },
                }}
            >
                <DataGrid checkboxSelection
                    rows={mockDataTeam}
                    columns={columns}
                    getRowId={(row) => row.id}
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

export default TransactionsTable;
