import { useContext, useEffect, useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { toast } from "react-toastify";
import { ValuesContext } from "../../../../App";
import SubCategoryAddPopup from "./SubCategoryAddPopup";
import SummaryApi from "../../../../utils/apiUrls";
import SubCategoryEditPopup from "./SubCategoryEditPopup";

const SubCategoryTableAction = ({ category }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [changeRoleShow, setChangeRoleShow] = useState(false);

  const { setSeeSubCat } = useContext(ValuesContext);

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

    if (!window.confirm("Are you sure you want to delete this SubCategory?")) return;
    const fetchData = await fetch(SummaryApi.deletesubcategories.url + category?._id, {
      method: SummaryApi.deletesubcategories.method,
      headers: { "Content-Type": "application/json" },
    },
    );

    const dataResponse = await fetchData.json()

    if (dataResponse.error) {
      toast.error(dataResponse.message)
      return;
    }

    if (dataResponse.success) {
      toast.success(`Category ${category?.name} deleted successfully.`)
    }

  }

  const handlesubcat = () => {
    setSeeSubCat(category);
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
            </ul>
          </div>
        )}
        <SubCategoryEditPopup
          show={changeRoleShow}
          setShow={setChangeRoleShow}
          category={category}
        />
      </button>
    </>
  );
};

export default SubCategoryTableAction;
