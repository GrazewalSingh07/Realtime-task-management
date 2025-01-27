const mongoose = require('mongoose');
const dotenv = require('dotenv');
 
dotenv.config();
 
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI );
    console.log('MongoDB Connected');
  } catch (err) {
    console.log('MongoDB Connection Error:', err);
    process.exit(1); 
  }
};

// Export the connectDB function
module.exports = connectDB;