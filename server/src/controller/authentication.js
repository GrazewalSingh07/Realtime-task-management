

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model"); 
const { checkout } = require("../routes/auth");

// Register a new user
const register = async (req, res) => {
  try {
    // console.log("Hello")
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    
    res.status(201).json({ message: "User registered successfully",newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login a user
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
 
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
//   console.log({user})
      // Compare passwords
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Generate a JWT token
      const token = user.generateToken();
      res.cookie("token", token, {
        httpOnly: true,  
        secure: false,  
        maxAge: 3600000, // 1 hour (in milliseconds)
        sameSite: "lax", 
        path: "/",  
      });
   
      res.status(200).json({user, isAuthenticated: true });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  const logout = (req, res) => {
    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
  
    res.status(200).json({ message: "Logged out successfully" });
  };
  const checkAuth = async (req, res) => {
    try {
      const token = req.cookies.token;
        // console.log(token) 
      if (!token) {
        return res.status(200).json({ isAuthenticated: false });
      }
  
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await UserModel.findById(decoded.id);
  
      if (!user) {
        return res.status(200).json({isAuthenticated: false });
      }
      console.log(user)
  
      res.status(200).json({ isAuthenticated: true,user });
    } catch (error) {
      console.error("Error during authentication check:", error);
      res.status(200).json({ isAuthenticated: false });
    }
  };
 
// Export the functions
module.exports = { register, login,logout,checkAuth};