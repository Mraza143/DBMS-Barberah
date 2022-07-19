const app = require("./app");
require('dotenv').config()
    // middleware
    // routers




//port
const PORT = process.env.REACT_APP_PORT || 5000

<<<<<<< HEAD
=======
const PORT = process.env.PORT||5000;
>>>>>>> 6fe39a2f59370e91b211e87de825c3bcb2df442e

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})