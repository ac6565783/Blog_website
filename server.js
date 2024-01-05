const express = require('express');
//const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//config dotenv
dotenv.config();

//router import
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
//app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blogs", blogRoutes);

//port
const PORT = process.env.PORT || 8000;

//app.listen
app.listen(PORT, () => {
    console.log(`server running on ${process.env.DEV_MODE} on port ${PORT}`.bgCyan.bgRed);
})