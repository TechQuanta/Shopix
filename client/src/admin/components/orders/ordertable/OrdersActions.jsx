import { useContext, useEffect, useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useRecoilState } from "recoil";
import ChangeStatusPopup from "./changeOrderStatus/ChangeStatusPopup";
import usersAtom from "../../../../atom (global state)/usersAtom";
import { ValuesContext } from "../../../../App";

const OrdersActions = ({ order, fetchOrders }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [changeRoleShow, setChangeRoleShow] = useState(false);

  const User = useRecoilState(usersAtom);

  const context = useContext(ValuesContext);

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className="action-dropdown-btn"
        onClick={handleDropdown}
      >
        <div className="action-dropdown-menu" ref={dropdownRef}>
          <ul className="dropdown-menu-list">
            <li className="dropdown-menu-item" onClick={() => setChangeRoleShow(true)}>
              <span className="dropdown-menu-link text-blue">
                Change Status
              </span>
            </li>
          </ul>
        </div>
      </button>
      <ChangeStatusPopup
        show={changeRoleShow}
        setShow={setChangeRoleShow}
        order={order}
        fetchOrders={fetchOrders}
      />
    </>
  );
};

export default OrdersActions;
