//const express = require('express')
//const cors = require('cors')

const app = require("./app");
require('dotenv').config();

// middleware
// routers




//port

const PORT = process.env.PORT;

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})