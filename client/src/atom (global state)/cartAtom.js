import { atom } from "recoil";

const cartAtom = atom({
    key: "cartAtom",
    default: 0,
});

export default cartAtom;