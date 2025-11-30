import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"

dotenv.config();

//Register : 
const registerUser = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "Request body is missing" });
        }
        const { name, email, password, mobileNo, address, description } = req.body

        if (!name || !email || !password || !mobileNo || !address) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const user = await User.create({
            name, email, password: hashedPass, mobileNo, address, description
        })

        res.json({ message: "User registered", user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Login : 
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Email & password are required !" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found with this email & password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },//Payload
            process.env.JWT_SECRET,//signature
            { expiresIn: "1d" }//payload
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobileNo: user.mobileNo,
                address: user.address,
                description: user.description || null
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// GetAll : 
const userGet = async (req, res) => {
    try {
        const user = await User.find({});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// GetById : 
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Insert User : 
const insertUser = async (req, res) => {
    try {
        const { name, email, password, mobileNo, address, description } = req.body

        if (!name || !email || !password || !mobileNo || !address) {
            res.status(401).json({ message: "Invalid credential , so try gain !" });
        }
        // check if user already exist :
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already registered !" });
        }

        // Create new user object : 
        const newUser = new User({
            name, email, password, mobileNo, address, description
        });

        const saveUser = await newUser.save();

        return res.status(201).json({
            message: "User created successfully",
            user: saveUser
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete User : 
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found !" });
        }
        await User.findByIdAndDelete(id);

        return res.status(200).json({
            message: "User deleted successfully",
            user: user   // optional: return the deleted data
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update user : 
const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found !" });
        }
        // Update user with new data
        const updatedUser = await User.findByIdAndUpdate(
            id,
            req.body,            // update fields sent in request
            { new: true }         // return updated document
        );

        return res.status(200).json({
            message: "User updated successfully!",
            user: updatedUser
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { userGet, deleteUser, updateUser, getUserById, insertUser, registerUser, loginUser }