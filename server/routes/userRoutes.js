import express from "express";
import {
	changeRole,
	updateUser,
	deleteUser,
	getAllusers,
	getUser,
	loginUser,
	logoutUser,
	signupUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get('/allusers', getAllusers);
router.post('/changerole', changeRole);
router.post("/deleteuser", deleteUser);
router.post("/userdetails", getUser);
router.post("/updateuser", updateUser)

export default router;
