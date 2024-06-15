import { Outlet } from "react-router-dom";
import Sidebar from './../components/sidebar/Sidebar';
import { useContext } from "react";
import { SidebarContext } from "../../context/SidebarContext";

const BaseLayout = () => {

  const { isSidebarOpen } = useContext(SidebarContext);

  return (
    <main className="page-wrapper">
      {/* left of page */}
      <Sidebar />
      {/* right side/content of the page */}
      <div className={`content-wrapper ${isSidebarOpen ? "sidebar-show" : ""}`}>
        <Outlet />
      </div>
    </main>
  );
};

export default BaseLayout;
