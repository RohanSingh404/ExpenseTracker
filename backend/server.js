require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

//middleware to handle cors
app.use(
    cors({
        origin: '*',
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

connectDB();


console.log("authRoutes:", typeof authRoutes);
console.log("incomeRoutes:", typeof incomeRoutes);
console.log("expenseRoutes:", typeof expenseRoutes);
console.log("dashboardRoutes:", typeof dashboardRoutes);



app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense" , expenseRoutes);
app.use("/api/v1/dashboard" , dashboardRoutes);

//serve uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});