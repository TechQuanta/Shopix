import { useContext, useEffect, useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import usersAtom from './../../../atom (global state)/usersAtom';
import SummaryApi from "../../../utils/apiUrls";
import CategoryEditPopup from "./categoryeditpopup/CategoryEditPopup";
import Category from './../../Adminpanel/category/Category';
import { ValuesContext } from "../../../App";

const CategoryTableAction = ({ category, fetchCategories }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [changeRoleShow, setChangeRoleShow] = useState(false);

  const [users, setUsers] = useRecoilState(usersAtom);

  const { setSeeSubCat, setSubCat, subcat } = useContext(ValuesContext);

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

  const deleteCategory = async (e) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this Category?")) return;
    const fetchData = await fetch(SummaryApi.deleteCategory.url + category?._id, {
      method: SummaryApi.deleteCategory.method,
      headers: { "Content-Type": "application/json" },
    },
    );

    const dataResponse = await fetchData.json()

    if (dataResponse.error) {
      toast.error(dataResponse.message)
      fetchCategories();
      return;
    }

    if (dataResponse.success) {
      fetchCategories();
      toast.success(`Category ${category?.name} deleted successfully.`)
    }

  }

  const handlesubcat = () => {
    setSeeSubCat(category);
    setSubCat(!subcat);
    toast.info("Scroll down to see Subcategories!")
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
              <li className="dropdown-menu-item" onClick={() => setChangeRoleShow(true)}>
                <span className="dropdown-menu-link">
                  Edit
                </span>
              </li>
              <li className="dropdown-menu-item">
                <span className="dropdown-menu-link" onClick={(e) => deleteCategory(e)}>
                  Delete
                </span>
              </li>
              <li className="dropdown-menu-item">
                <span className="dropdown-menu-link" onClick={() => handlesubcat()}>
                  Sub Categories
                </span>
              </li>
            </ul>
          </div>
        )}
        <CategoryEditPopup
          show={changeRoleShow}
          setShow={setChangeRoleShow}
          category={category}
          fetchCategories={fetchCategories}
        />
      </button>
    </>
  );
};

export default CategoryTableAction;
