import User from "../models/userModel.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../helpers/generateTokenAndSetCookie.js";

export const signupUser = async (req, res) => {
    try {
        const { username, email, password, confirmpassword, role } = req.body;
        const user = await User.findOne({ $or: [{ email }, { username }] });

        const gender = "not set";

        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        if (password === confirmpassword) {
            return res.status(400).json({ error: "passwords did not match!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role,
            gender,
        });
        await newUser.save();

        if (newUser) {
            generateTokenAndSetCookie(newUser?._id, res);

            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                username: newUser.username,
                role: newUser.role,
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in signupUser: ", err.message);
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Invalid email entered" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!isPasswordCorrect) return res.status(400).json({ error: "Invalid password" });

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            email: user.email,
            username: user.username,
            profilePic: user.profilePic,
            role: user.role,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in loginUser: ", error.message);
    }
};

export const logoutUser = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 1 });
        res.status(200).json({ message: "User logged out successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in signupUser: ", err.message);
    }
};

export const getAllusers = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const perPage = 5;
        const totalPosts = await User.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return res.status(404).json({ message: "Page not found" })
        }

        const allUsers = await User.find().skip((page - 1) * perPage).limit(perPage).exec();

        res.json({
            message: "All User ",
            data: allUsers,
            totalPages: totalPages,
            page: page,
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
};

export const changeRole = async (req, res) => {
    try {
        const { userId, role } = req.body

        const payload = {
            ...(role && { role: role }),
        }

        const user = await User.findById(userId)

        const updateUser = await User.findByIdAndUpdate(userId, payload)


        res.json({
            data: updateUser,
            message: "User Updated",
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.body

        const user = await User.findById(userId)

        const deleteUser = await User.deleteOne({ _id: userId });

        res.json({
            data: deleteUser,
            message: "User deleted",
            success: true,
            error: false
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
};

export const getUser = async (req, res) => {
    try {
        const { userId } = req.body

        const user = await User.findOne({ _id: userId });

        res.json({
            message: "User get Successfully",
            data: user,
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
};

export const updateUser = async (req, res) => {
    const { username, email, password, address, profilePic, gender, userId } = req.body;

    try {
        let user = await User.findById(userId);
        if (!user) return res.status(400).json({ error: "User not found" });

        // if (req.params.id !== userId.toString())
        // 	return res.status(400).json({ error: "You cannot update other user's profile" });

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        user.email = email || user.email;
        user.username = username || user.username;
        user.profilePic = profilePic || user.profilePic;
        user.address = address || user.bio;
        user.gender = gender || user.gender;

        user = await user.save();

        res.json({
            message: "User updated Successfully",
            data: user,
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
        console.log("Error in updateUser: ", err.message);
    }
};