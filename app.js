const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const nocache = require("nocache");

// app
const app = express();
const PORT = 4000

// view engine
app.set("view engine", "ejs");
// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(nocache());
// User Data 
const user = {
    email: "nikks@gmail.com",
    password: "nikks123",
};
// Session 
app.use(
    session({
        secret: "montyxgreen",
        resave: false,
        saveUninitialized: false,
    })
);
// middleware
const sessionChecker = (req, res, next) => {
    if (req.session.user) {
        res.redirect("/home");
    } else {
        next();
    }
};
app.get("/", sessionChecker, (req, res) => {
    res.redirect("/login");
});
app.get("/login", sessionChecker, (req, res) => {
    res.render("login", { message: false });
});
app.post("/logiUser", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (user.email === email && user.password === password) {
        req.session.user = true;
        res.redirect("/home");
    } else if (user.email !== email) {
        res.render("login", { message: "User not found" });
    } else if (user.email === email && user.password !== password) {
        res.render("login", { message: "Invalid Password" });
    }
});

app.get("/home", (req, res) => {
    if (req.session.user) {
        res.render("home");
    } else {
        res.redirect("/login");
    }
});

app.get("/logout", (req, res) => {
    req.session.user = false;
    res.redirect("/login");
});

app.use((req, res) => {
    res.status(404).render("404");
});

app.listen(PORT, () => {
    console.log(`Server Started @ ${PORT}`);
});
