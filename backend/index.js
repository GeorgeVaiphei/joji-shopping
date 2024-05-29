const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const port = 8080;
app.use("/", require("./router/route"));
app.listen(port, (err) => {
  console.log(`Server started at port ${port}`);
});
