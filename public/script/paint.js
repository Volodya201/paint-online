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
rotation.init(getCoords(drawingPlaceSvg))

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
    if (activeTool === "line") socket.emit("addFigure", lineMousedown(event))

    nowWorkingObject = document.getElementById(nowWorkingObjectId)

    nowWorkingObject.setAttribute("fill", activeColor)
    nowWorkingObject.setAttribute("stroke", activeStrokeColor)
    nowWorkingObject.setAttribute("stroke-width", activeStrokeWidth)
})

drawingPlaceSvg.addEventListener("mousemove", event => {
    if (!mousedown) return

    if (activeTool === "square") socket.emit("editFigure", squareMousemove(event))
    if (activeTool === "ellipse") socket.emit("editFigure", ellipseMousemove(event))
    if (activeTool === "polygon") socket.emit("editFigure", polygonMousemove(event))
    if (activeTool === "line") socket.emit("editFigure", lineMousemove(event))
    
})

document.addEventListener("mouseup", event => {
    if (mousedown === false) return
    mousedown = false

    switch (activeTool) {
        case "select":
            selectObject(event.target)
            break
        default:
            rotation.show({
                    center: {
                        x: nowWorkingObject.dataset.x,
                        y: nowWorkingObject.dataset.y
                    }
                },
                getCoords(rotation.rotationSlider),
                nowWorkingObject.dataset.rotation
            )
            break
    }
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
    if (toolName === "settings") {
        openPopup()
        return
    }


    switch (toolName) {
        case "settings":
            openPopup()
            break

        case "clearAll":
            socket.emit("clearAll")
            break

        default:
            activeTool = toolName
            break
    }
}
