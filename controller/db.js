const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;console.log("MONGO_URI ===>", process.env.MONGO_DB_URI);




// const mongoose = require('mongoose');
 
// const connectDB = async () => {
//   try {
//     await mongoose.connect(" mongodb+srv://hanishasarai1000:vibgyorbackend123@cluster0.5vddqna.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(" MongoDB connected successfully.");
//   } catch (err) {
//     console.error("MongoDB connection error:", err.message);
//     process.exit(1);
//   }
// };
 
// module.exports = connectDB;
