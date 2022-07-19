const app = require("./app");
require('dotenv').config()
    // middleware
    // routers




//port
const PORT = process.env.REACT_APP_PORT || 5000

<<<<<<< HEAD
=======
//const PORT = process.env.PORT||5000;
>>>>>>> 2e2745e392ec60e3c883bb6b3d01494c9ad892ce

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})