const socket = io()

const drawingPlaceSvg = document.getElementById("drawingPlaceSvg")
const name = document.getElementById("name").innerText
const userList = document.getElementById("userList")
let activeColor = "#000000"
let activeStrokeColor = "#000000"
let activeStrokeWidth = 0
let anglesQuantity = 4

socket.emit("newUser", {name: name})

socket.on("refreshUsers", data => {
    userList.innerHTML = ""

    for (let index = 0; index < data.users.length; index++) {
        const user = data.users[index]
        
        userList.innerHTML += `<p class="user">${user}</p>`
    }
})

socket.on("clearAll", () => {
    drawingPlaceSvg.innerHTML = ""
})

socket.on("addFigure", (figure) => {
    const workingFigure = document.getElementById(figure.id)
    if (workingFigure) {
        return
    }
    drawingPlaceSvg.innerHTML += figure.html
})

socket.on("editFigure", (figure) => {
    const workingFigure = document.getElementById(figure.id)
    if (!workingFigure) {
        // провести синхронизацию клиентов
        return
    }
    workingFigure.remove()
    drawingPlaceSvg.innerHTML += figure.html
})



window.onbeforeunload = event => {
    socket.emit("disconnectUser", {name})
}







let mousedown = false
let activeTool = "square"
let userObjectsCounter = 1
let nowWorkingObject
let nowWorkingObjectId
let startX
let startY
let lastEvent = {offsetX: 0, offsetY: 0}


function generateRandomCode() {
    let code = ""
    for (let index = 0; index < 6; index++) {
        code += Math.floor(Math.random() * 10)
    }

    return Number(code)
}


drawingPlaceSvg.addEventListener("mousedown", event => {
    mousedown = true
    ++userObjectsCounter
    nowWorkingObjectId = generateRandomCode()
    startX = event.offsetX
    startY = event.offsetY

    if (activeTool === "square") socket.emit("addFigure", squareMousedown(event))
    if (activeTool === "ellipse") socket.emit("addFigure", ellipseMousedown(event))
    if (activeTool === "polygon") socket.emit("addFigure", polygonMousedown(event))

    nowWorkingObject = document.getElementById(nowWorkingObjectId)

    nowWorkingObject.style.fill = activeColor
    nowWorkingObject.style.stroke = activeStrokeColor
    nowWorkingObject.style.strokeWidth = activeStrokeWidth
})

drawingPlaceSvg.addEventListener("mousemove", event => {
    if (!mousedown) return

    if (activeTool === "square") socket.emit("editFigure", squareMousemove(event))
    if (activeTool === "ellipse") socket.emit("editFigure", ellipseMousemove(event))
    if (activeTool === "polygon") socket.emit("editFigure", polygonMousemove(event))
    
})

document.addEventListener("mouseup", event => {
    mousedown = false

    if (activeTool === "select") selectObject(event.target)

    if (activeTool === "clearAll") socket.emit("clearAll")
})



document.addEventListener("keypress", event => {
    switch (event.code) {
        case "KeyF":
            if (anglesQuantity >= 30) break
            anglesQuantity++
            polygonMousemove(lastEvent)
            break
        case "KeyG":
            if (anglesQuantity < 3) anglesQuantity = 3 
            if (anglesQuantity <= 3) break
            anglesQuantity--
            polygonMousemove(lastEvent)
            break
    }
})


function changeTool(toolName) {
    activeTool = toolName
}








const colorPicker = new Alwan('#colorPicker', {
    id: 'colorPicker',
    classname: '',
    theme: 'dark',
    toggle: true,
    popover: true,
    position: 'left-end',
    margin: 16,
    preset: true,
    color: '#000',
    default: '#000',
    disabled: false,
    format: 'rgb',
    singleInput: false,
    inputs: {
        rgb: true,
        hex: true,
        hsl: false,
    },
    opacity: true,
    preview: true,
    closeOnScroll: false,
    copy: true,
    swatches: ["#ff0000", "#00ff00", "#0000ff"],
    toggleSwatches: false, 
    shared: false, 
    closeOnScroll: false,
    
})


colorPicker.on('change', (color) => {activeColor = color.rgb})