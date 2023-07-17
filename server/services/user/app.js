require("dotenv").config();

const cors = require("cors");
const express = require("express");
const router = require("./routers/user");
const { mongoConnect } = require("./config/MongoConnection");
const app = express();

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/users", router);

(async () => {
  try {
    await mongoConnect();
    app.listen(port, (_) => console.log(`Apps is listening at port ${port}`));
  } catch (err) {
    console.log(`Failed to connect to mongodb`, err);
  }
})();
