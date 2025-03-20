import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import router from "./routes/routes";
dotenv.config();
const PORT = process.env.PORT;
const URL = process.env.URL!;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // added to parse form submissions
app.use(express.static(path.join(__dirname, "..", "public"))); // added to serve static assets

mongoose
  .connect(URL)
  .then(() => {
    console.log("db is connected");
  })
  .catch((err) => {
    console.log(`there is an error: ${err}`);
  });

app.use(router);
app.listen(PORT, () => {
  console.log(`app is working on port ${PORT}`);
});
