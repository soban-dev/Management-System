const express = require("express");
require("dotenv").config();
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoutes");
const adminRouter = require("./routes/adminRoutes");
const inventoryRouter = require("./routes/inventoryRoutes");
const profileRouter = require("./routes/profileRoutes");

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"], // Specify the frontend URL
    credentials: true, // Allow credentials to be sent
  })
);

// app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/inventory", inventoryRouter);
app.use("/api/profile", profileRouter);

app.get("/", (req, res) => {
  res.json({ message: "Bie from the server." });
});
app.get("/checking", (req, res) => {
  res.json({ message: "I am deployed" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});

// async function createHeadAdmin() {
//     try {
//       const existingAdmin = await User.findOne({ email: process.env.HEAD_EMAIL });

//       if (existingAdmin) {
//         console.log('Admin already exists!');
//         return;
//       }

//       const hashedPassword = await bcrypt.hash(process.env.HEAD_PASSWORD, 10);

//       const admin = new Employee({

//         name: 'Head Admin',
//         email: 'm.irtazabinashar@gmail.com',
//         username: process.env.HEAD_USERNAME,
//         phone: 03006650477,
//         address: "123,123,123",
//         verified: true,
//         password: hashedPassword, // Use bcrypt for security
//         role: 'admin'
//       });

//       await admin.save();
//       console.log('Head admin created successfully!');
//     } catch (err) {
//       console.error('Error creating head admin:', err);
//     } finally {
//       mongoose.connection.close();
//     }
//   }
