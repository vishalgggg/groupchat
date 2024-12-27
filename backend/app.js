const express = require('express');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors({
    origin:"*"
}));

app.use(express.json());


app.use("/api",userRoutes);

app.use(express.static(path.join(__dirname,"../frontend/public")));

app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname,"../frontend/public/index.html"));
});

app.get("/login",(req,res) => {
    res.sendFile(path.join(__dirname,"./public/login.html"));
});

app.listen(3000);