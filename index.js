const express = require("express")
const app = express()
const http = require('http')
const server = http.createServer(app)
require("dotenv").config()

app.set('view engine', 'ejs')
app.use('/public', express.static('public'))

const router = require("./router")
app.use("/", router)



const { Server } = require("socket.io")
const io = new Server(server)

let users = []

io.on('connection', socket => {

    socket.on("newUser", (data) => {
        users.push(data.name)
        
        io.emit("refreshUsers", {users})
    })

    socket.on("disconnectUser", data => {
        users.splice(users.indexOf(data.name), 1)
        io.sockets.emit("refreshUsers", {users})
    })

    socket.on("addFigure", (figure, room) => {
        io.emit("addFigure", figure)
    })

    socket.on("editFigure", (figure, room) => {
        io.emit("editFigure", figure)
    })

    socket.on("clearAll", (room) => {
        io.emit("clearAll")
    })
  
})

try {
    server.listen(process.env.PORT, () => {
        console.log("let's write code!")
    })
} catch(error) {
    console.log(error)
}
