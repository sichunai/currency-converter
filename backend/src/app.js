const express = require("express"); //load express module
const cors = require("cors");
const app = express();
const currencyMiddleware = require("../src/routes/currency");
const conversonMiddleware = require("../src/routes/conversion");
app.use(cors());
app.use("/latest", currencyMiddleware);
app.use("/pair", conversonMiddleware);
app.get("/", (req, res) => {
  res.send("Hello, World!!");
});
module.exports = app;
