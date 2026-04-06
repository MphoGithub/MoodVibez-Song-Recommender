import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
    const { full_name, email, username, password } = req.body;

    if (!full_name || !email || !username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const userExists = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        });

        if (userExists) {
            if (userExists.email == email) {
                return res.status(400).json({ message: "Email is already in use" })
            }
            else {
                return res.status(400).json({ message: "Email is already in use" })
            }
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            full_name,
            email,
            username,
            password: hashedPassword
        })

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.full_name,
                username: newUser.username,
                email: newUser.email

            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const loginUser = async (req,res) =>
{
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({email})

        if(!user)
        {
            return res.status(400).json({message:"User not found"});
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(!isPasswordValid)
        {
            return res.status(401).json({message:"Invalid or incorrect password"})
        }

        const token = generateToken(user._id,user.email)

        return res.status(200).json({
            message:"User logged in successfully",
            token:token,
            user:{
                id:user._id,
                full_name:user.full_name,
                username:user.username,
                email:user.email
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Internal Server Error"});
    }
}

export const deleteUser = async (req,res) =>
{
    try {
        const user = await User.findByIdAndDelete(req.userId);

        if(!user)
        {
            return res.status(404).json({message:"User not found"});

        }
        return res.status(200).json({message:"User deleted successfully"});
    } catch (error) {
        console.error(error);
         return res.status(500).json({message:"Internal Server Error"});
    }
}