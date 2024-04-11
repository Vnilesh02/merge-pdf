const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 1234;
app.use(express.json());



app.get("/", (req, res) => {
  res.json({
    message: "server is listning",
  });
});
app.use("/api", require("./mergingPdf/router"))
app.listen(PORT, () => {
  console.log(`server is running on the port = ${PORT}`);
});