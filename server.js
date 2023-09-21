const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const port = process.env.PORT || 3001;

connectDB();
const app = express();

app.use(express.json());
app.use("/api/contacts", require("./Routes/contactRoutes"));
app.use("/api/users", require("./Routes/usersRoutes.js"));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
