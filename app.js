const express = require('express');
const userRoutes = require('./routes/userRoutes');
const path = require('path');

const app = express();
app.use(express.json());

app.use("/api",userRoutes);

app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname,"./public/index.html"));
});

app.get("/login",(req,res) => {
    res.sendFile(path.join(__dirname,"./public/login.html"));
});

app.listen(3000);