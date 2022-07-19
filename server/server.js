const app = require("./app");
require('dotenv').config()
    // middleware
    // routers




//port
const PORT = process.env.REACT_APP_PORT || 5000

//const PORT = process.env.PORT||5000;

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})