const express = require("express");
const addRouter = require("./routes/add");
const searchRouter = require("./routes/search");
const { hasGoogleAplicationCredentials } = require("./utils");

if (!hasGoogleAplicationCredentials()) {
  console.error(
    "Cannot find enviornment variable GOOGLE_APPLICATION_CREDENTIALS. To take advantage of Vision API functionality in the app, please set GOOGLE_APPLICATION_CREDENTIALS. Read the README for more information."
  );
}

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
