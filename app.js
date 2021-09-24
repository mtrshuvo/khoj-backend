const express = require("express");
const cors = require("cors");
const compression = require("compression");
const app = express();

app.use(compression());
app.use(cors());
app.use(express.json());

const userRouter = require("./routers/userRouter");
const dataRouter = require("./routers/dataRouter");

app.use("/api/user", userRouter);
app.use("/api/data", dataRouter);

//not found api url
app.use((req,res,next)=>{
    return res.status(500).json({});
})

module.exports = app