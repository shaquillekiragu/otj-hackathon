const express = require("express")
const app = express();
const port = 9090

const cors = require("cors");
app.use(cors());

// const healthcheck = require("./controllers/healthcheck.controller.ts")
app.get("/", (req, res) => {
	res.status(200).send("Hello world!");
})

module.exports = { app, port }