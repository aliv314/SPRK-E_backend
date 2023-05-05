const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const userRoute = require("./routes/userRoute");
const entryRoute = require("./routes/entryRoute");
const emotionRoute = require("./routes/emotionRoute")

app.use("/", express.static("public/images"));

app.use("/api/user", userRoute);

app.use("/api/entry", entryRoute);

app.use("/api/emotions", emotionRoute);


app.listen(PORT, () => {
    console.log(`This server is running in port ${PORT}`);
})