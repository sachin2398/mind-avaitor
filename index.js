const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const config = require("./config/config");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(config.mongouri)
.then(()=> console.log("mongoDB connected "))
    .catch((err) => {
        console.log(err);
})
app.get("/", (req, res) => {
    res.send("hi buddy we are on port 50000")
})
app.use("/auth", authRoutes);
app.use("/api", productRoutes);


app.listen(config.port, () => {
    console.log(`server is running on PORT ${config.port}`)
});



