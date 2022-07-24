const app = require("./app");
require('dotenv').config()
const cloudinary = require("cloudinary")
// Cloudinary
cloudinary.config({
    cloud_name: "diznq0vwe",
    api_key: "553731652955665",
    api_secret: "PovnR83-nnn8jN24HdbiEC6cyoA"
})


const PORT = 5000

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})