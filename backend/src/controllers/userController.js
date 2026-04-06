import User from "../models/User.js";
import bcrypt from 'bcryptjs'


export const getCurrentUser = async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.full_name,
                email: user.email,
                username: user.username
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateUserProfile = async (req, res) => {
    const { full_name, username, email, password } = req.body;
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (email && email !== user.email) {
            const exists = await User.findOne({ email });
            if (exists) {
                return res.status(409).json({ message: "Email already in use" });
            }
        }

        if (username && username !== user.username) {
            const exists = await User.findOne({ username });
            if (exists) return res.status(409).json({ message: "Username already taken" });
        }
        const updateInfo = {};
        if (full_name) updateInfo.full_name = full_name;
        if (email) updateInfo.email = email;
        if (username) updateInfo.username = username;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateInfo.password = await bcrypt.hash(password, salt);
        }

        const updatedAccountInfo = await User.findByIdAndUpdate(
            user._id,
            updateInfo,
            { new: true, runValidators: true },
        ).select("-password")

        return res.status(200).json({
            message: "User Profile updated successfully",
            user: updatedAccountInfo
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getUsers = async (_, res) => {
    try {
        const users = await User.find().select("-password");

        return res.status(200).json({ users });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}