require("dotenv").config();

const path = require("path");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const app = express();
const port = Number(process.env.PORT || 3000)

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.use(helmet({
	contentSecurityPolicy: false
}));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(rateLimit({
	windowMs: 10 * 60 * 1000,
	limit: 500,
	standardHeaders: "draft-8",
	legacyHeaders: false
}));

app.get('/', (req, res) => { res.render("index"); });

app.listen(port, () => {
	console.log("ToyPad Emulator available at http://localhost:${port}");
});
