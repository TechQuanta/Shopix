import { atom } from "recoil";

const usersAtom = atom({
    key: "usersAtom",
    default: JSON.parse(localStorage.getItem("shopix")),
});

export default usersAtom;
