const mongoose = require("mongoose");
const express = require("express");
const app = express();
// const cors = require("cors");
const bodyParser = require("body-parser");
const { inspect } = require("util");
// const session = require("express-session");

// const categoryRoutes = require("./src/category/categoryRoutes");
const userRoutes = require("./src/user/userRoutes");
// const complaintRoutes = require("./src/complaint/complaintRoutes");
// const otpRoutes = require("./src/otp/otpRoutes");

mongoose
  .connect("mongodb://localhost:27017/cinemaDB")
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("not connected // error ");
    console.log(err);
  });

// app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

// app.use(
//   session({ secret: "my secret", resave: false, saveUninitialized: false })
// );

app.use("", (req, res, next) => {
  console.log(req);
  console.log(
    "========================================================================================="
  );
  console.log(
    "========================================================================================="
  );

  next();
});

// app.use("/api/category", categoryRoutes);
// app.use("/api/complaint", complaintRoutes);
// app.use("/api/otp", otpRoutes);
app.use("/user", userRoutes);

app.use("*", (req, res) => {
  res.status(400).json({ message: "path not found" });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
