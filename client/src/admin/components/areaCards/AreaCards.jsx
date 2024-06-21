import "./AreaCards.scss";
import AreaCard from './AreaCard';
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import SummaryApi from "../../../utils/apiUrls";

const AreaCards = () => {

  const [ordersData, setOrdersData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [totalSales, setTotalSales] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [products, setProducts] = useState();

  useEffect(() => {
    fetchOrders()
    fetchAllProducts();
    fetchCategories();
    fetchSubCategories();
    fetchAllUsers();
  }, [])

  useEffect(() => {
    ordersData?.map(item => setTotalSales(parseInt(totalSales) + parseInt(item?.amount)))
    ordersData?.map(item => setTotalProducts(parseInt(totalProducts) + parseInt(item?.products?.length)))
  }, [ordersData])

  const fetchOrders = async () => {
    setIsLoading(true);
    const fetchData = await fetch(SummaryApi.getOrders.url, {
      method: SummaryApi.getOrders.method,
      headers: { "Content-Type": "application/json" },
    },
    );

    const dataResponse = await fetchData.json()

    if (dataResponse.success) {
      setOrdersData(dataResponse?.data);
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message)
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }

  const fetchAllProducts = async () => {
    const fetchData = await fetch(SummaryApi.allProducts.url, {
      method: SummaryApi.allProducts.method,
      headers: { "Content-Type": "application/json" },
    },
    );

    const dataResponse = await fetchData.json()

    if (dataResponse?.success) {
      setProducts(dataResponse?.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message)
    }
  }

  const [allCategories, setAllCategories] = useState()

  const fetchCategories = async () => {

    const fetchData = await fetch(SummaryApi.getAllCategories.url, {
      method: SummaryApi.getAllCategories.method,
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

  }

  const [allSubCategories, setAllSubCategories] = useState()

  const fetchSubCategories = async () => {

    const fetchData = await fetch(SummaryApi.getallsubcategoriess.url, {
      method: SummaryApi.getallsubcategoriess.method,
      headers: { "Content-Type": "application/json" },
    },
    );

    const dataResponse = await fetchData.json()

    if (dataResponse.success) {
      setAllSubCategories(dataResponse?.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message)
    }

  }

  const [allUsers, setAllUsers] = useState()

  const fetchAllUsers = async () => {

    const fetchData = await fetch(SummaryApi.allUserNoPage.url, {
      method: SummaryApi.allUserNoPage.method,
      headers: { "Content-Type": "application/json" },
    },
    );

    const dataResponse = await fetchData.json()

    if (dataResponse.success) {
      setAllUsers(dataResponse?.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message)
    }

  }

  return (
    <section className="content-area-cards">
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={60}
        cardInfo={{
          title: "Todays Sales",
          value: "Rs. " + totalSales,
          text: "We have sold " + totalProducts + " items.",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={50}
        cardInfo={{
          title: "Todays Revenue",
          value: "Rs. " + parseInt(totalSales / 100 * 10),
          text: "Available to payout",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={40}
        cardInfo={{
          title: "Total Products",
          value: products?.length,
          text: "Products available.",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={40}
        cardInfo={{
          title: "Total orders",
          value: ordersData?.length,
          text: "Orders Placed till now.",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={40}
        cardInfo={{
          title: "Total Categories",
          value: allCategories?.length,
          text: "Categories available.",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={40}
        cardInfo={{
          title: "Total Sub-Categories",
          value: allSubCategories?.length,
          text: "Sub-Categories available.",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={40}
        cardInfo={{
          title: "Total User Accounts",
          value: allUsers?.length,
          text: "User Accounts available.",
        }}
      />
    </section>
  );
};

export default AreaCards;
