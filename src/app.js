const express = require('express');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require("./routes/user.routes")
const cookieparser = require('cookie-parser')

const app = express();
app.use(express.json()) //midlware to parse json bodies
app.use(cookieparser())//midlware to cookie parser


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);


module.exports = app;