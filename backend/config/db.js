const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`mongodb connected : ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`could not connect to mongodb: ${error.message}`.red);
  }
};

// export the module
module.exports = connectDB;
