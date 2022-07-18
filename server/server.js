const app = require("./app");
// const path = require("path")


// Handling uncaught exception
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`)
    console.log('Shutting down the server due to uncaught exception')
    process.exit(1)
})

require('dotenv').config({ path: '../.env' })


// Connecting Database
// connectDB()

PORT = 5000
    // Server Starts Listening to http://localhost:5000
const server = app.listen(PORT, () =>
    console.log(`Server started on port ${PORT}`)
)


// Handling Unhandled Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`)
    console.log('Shutting down the server due to unhandled Promise Rejection')
    server.close(() => {
        process.exit(1)
    })
})