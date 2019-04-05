const express = require("express");
const app = express();
const path = require("path");

app.get("/app.js", (req, res, next) =>
  res.sendFile(path.join(__dirname, "dist", "main.js"))
);

app.get("/", (req, res, next) =>
  res.sendFile(path.join(__dirname, "index.html"))
);

app.get("/api/users", (req, res, next) => {
  User.findAll().then(users => res.send(users));
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
