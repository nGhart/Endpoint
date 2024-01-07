const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const orderRoutes = require("./routes/orderRoute");

app.use(cors());

// app.use(cors({
//     origin: "https://order-list-vert.vercel.app",
//     methods: ["GET", "POST", "DELETE", "PATCH"],
//     allowedHeaders: ["Content-Type"],
//   }))

mongoose
  .connect(process.env.MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then((d) => {
    console.log("connected to DB");
  });

//connectToDB();

app.use(express.json());

app.use("/api/v1", messageRoutes);
app.use("/user", userRoutes);
app.use("/order", orderRoutes);

const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
