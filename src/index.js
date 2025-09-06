import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/db.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8080;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running port ${PORT}`);
    });
  })
  .catch(error, () => {
    console.log("Mongodb connection error ", error);
    process.exit(1);
  });
