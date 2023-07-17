require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

const router = require("./router/index");
const errorHandling = require("./middleware/errorHandling");
const OrchestraController = require("./controller/orchestraController");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
