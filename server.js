const express = require("express");
const app = express();
const PORT = 8000;
const puppeteer = require("puppeteer");
const { PostDomain } = require("./domains.controller");
app.use(express.json());

app.post("/domains", PostDomain);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
