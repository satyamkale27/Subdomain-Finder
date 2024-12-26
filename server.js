const express = require("express");
const app = express();
const PORT = 8000;
const puppeteer = require("puppeteer");
const { getDomain } = require("./domains.controller");

app.get("/domains", getDomain);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
