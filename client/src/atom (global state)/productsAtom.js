import { atom } from "recoil";

const productsAtom = atom({
    key: "productsAtom",
    default: [],
});

export default productsAtom;
