const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "./config.env" });

const UserRouter = require("./Routes/UserRouter");

const app = express();
app.use(express.json());

app.use(cors({
    origin: "*"
}));

app.use("/", UserRouter);

let DB = process.env.URL.replace("<password>", process.env.password);
mongoose.connect(DB).then(() => console.log("Database Connected")).catch((err) => console.log("Database not Connected"));

let port = process.env.port;
app.listen(port, () => {
    console.log(`Port is running on ${port}`);
})