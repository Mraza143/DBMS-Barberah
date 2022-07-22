const app = require("./app");
require('dotenv').config()
const cloudinary = require("cloudinary")
    // middleware
    // routers



// Cloudinary
cloudinary.config({
    cloud_name: "diznq0vwe",
    api_key: "553731652955665",
    api_secret: "PovnR83-nnn8jN24HdbiEC6cyoA"
})




//port
const PORT = 5000




//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})