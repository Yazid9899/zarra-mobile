require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4002;

const router = require("./routes/index");
const errorHandling = require("./middleware/errorHandling");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
