const express = require("express");
const addRouter = require("./routes/add");
const searchRouter = require("./routes/search");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/add", addRouter);
app.use("/search", searchRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
