import { toast } from "react-toastify";
import "./AreaTable.scss";
import SummaryApi from "../../../utils/apiUrls";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const TABLE_HEADS = [
  "Order ID",
  "Date",
  "Customer name",
  "Status",
  "Amount",
  "Phone No.",
];

const AreaTable = () => {

  const [ordersData, setOrdersData] = useState();

  useEffect(() => {
    fetchOrders();
  }, [])

  const fetchOrders = async () => {
    const fetchData = await fetch(SummaryApi.getOrdersLatest.url, {
      method: SummaryApi.getOrdersLatest.method,
      headers: { "Content-Type": "application/json" },
    },
    );

    const dataResponse = await fetchData.json()

    if (dataResponse.success) {
      setOrdersData(dataResponse?.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message)
    }
  }
  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Latest Orders</h4>
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
            {ordersData && ordersData?.map((dataItem, index) => {
              return (
                <tr key={index}>
                  <td>{dataItem?._id}</td>
                  <td>{format(new Date(dataItem?.date), 'dd/MM/yyyy')}</td>
                  <td>{dataItem?.name}</td>
                  <td>
                    <div className="dt-status">
                      {dataItem?.status === 'pending' ? <span className="dt-status-text badge badge-danger">{dataItem?.status}</span> : <span className="dt-status-text badge badge-success">{dataItem?.status}</span>}
                    </div>
                  </td>
                  <td>Rs.{dataItem?.amount}</td>
                  <td className="dt-cell-action">
                    {dataItem?.phonenumber}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AreaTable;
