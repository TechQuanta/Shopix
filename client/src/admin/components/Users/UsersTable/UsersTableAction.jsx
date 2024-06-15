import { useEffect, useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import usersAtom from "../../../../atom (global state)/usersAtom";
import SummaryApi from "../../../../utils/apiUrls";
import UserViewPopup from './../UserViewPopup/UserViewPopup';
import ChangeRolePopup from "./changerolepopup/ChangeRolePopup";

const UsersTableAction = ({ user }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUserView, setShowUserView] = useState(false);
  const [changeRoleShow, setChangeRoleShow] = useState(false);
  const [userId, setUserId] = useState(user?._id)

  const [users, setUsers] = useRecoilState(usersAtom);

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

  const deleteUser = async (e) => {
    e.preventDefault();
    setUserId(user?._id);

    if (!window.confirm("Are you sure you want to delete this user?")) return;
    const fetchData = await fetch(SummaryApi.deleteUser.url, {
      method: SummaryApi.deleteUser.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId }),
    },
    );

    const dataResponse = await fetchData.json()

    if (dataResponse.error) {
      toast.error(dataResponse.message)
      return;
    }

    if (dataResponse.success) {
      toast.success(`User ${user?.username} deleted successfully.`)
    }

    setUsers(users.filter((p) => p._id !== user._id));
  }

  return (
    <>
      <button
        type="button"
        className="action-dropdown-btn"
        onClick={handleDropdown}
      >
        <HiDotsHorizontal size={18} />
        {showDropdown && (
          <div className="action-dropdown-menu" ref={dropdownRef}>
            <ul className="dropdown-menu-list">
              <li className="dropdown-menu-item">
                <span className="dropdown-menu-link" onClick={() => setShowUserView(true)}>
                  View
                </span>
              </li>
              <li className="dropdown-menu-item">
                <span className="dropdown-menu-link" onClick={(e) => deleteUser(e)}>
                  Delete
                </span>
              </li>
              <li className="dropdown-menu-item" onClick={() => setChangeRoleShow(true)}>
                <span className="dropdown-menu-link">
                  Change Role
                </span>
              </li>
            </ul>
          </div>
        )}
        <UserViewPopup
          show={showUserView}
          setShow={setShowUserView}
          user={user}
        />
        <ChangeRolePopup
          show={changeRoleShow}
          setShow={setChangeRoleShow}
          user={user}
        />
      </button>
    </>
  );
};

export default UsersTableAction;
