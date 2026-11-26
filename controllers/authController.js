import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//Register user
export const registerUser = async (req, res) => {
    try{
        const { name, email, password } = req.body;
        //check required fields
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Please provide name, email and password"
            });
        }

        //check existing user
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create new user
        const newuser = await User.create({
            name,
            email,
            password:hashedPassword
        });
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user:{
                id: newuser._id,
                name: newuser.name,
                email: newuser.email,
                role: newuser.role,
            },

        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// Register Customer
export const registerCustomer = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingCustomer = await User.findOne({ email });

    if (existingCustomer) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "customer",
    });

    res.status(201).json({
      success: true,
      message: "Customer registration successful",
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        role: customer.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//Login user
export const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        //check required fields
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            });
        }
        //find user
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid emil or password"
            });
        }

        //generate jwt token
        const token = jwt.sign(
            {
            id: user._id,
            role: user.role,
        }, 
        process.env.JWT_SECRET, 
        {expiresIn: "1d"});
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}