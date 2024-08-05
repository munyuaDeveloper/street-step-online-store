/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "15mb",
    verify: (req, res, buf, encoding) => {
      // Custom function to handle limit exceeded errors
      if (buf && buf.length > 15 * 1024 * 1024) {
        // 15 MB
        throw new Error("Payload too large");
      }
    },
  })
);
app.use(cookieParser());

app.use("/api", router);

const PORT = 8080 || process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("connnect to DB");
    console.log("Server is running " + PORT);
  });
});
