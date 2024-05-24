let ownFigures = []

socket.emit("newUser", {name, room})

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

    addFigure(figure)
})

socket.on("editFigure", (figure) => {
    if (ownFigures.find(id => id === figure.id)) return

    editFigure(figure)
})



window.onbeforeunload = event => {
    socket.emit("disconnectUser", {name})
}



drawingPlaceSvg.addEventListener("mousedown", event => {
    mousedown = true
    ++userObjectsCounter
    nowWorkingObjectId = generateId()
    startX = event.offsetX
    startY = event.offsetY
    const globalAttributes = {
        "fill": activeColor,
        "stroke": activeStrokeColor,
        "stroke-width": activeStrokeWidth
    }

    if (activeTool === "square") socket.emit("addFigure", squareMousedown(event, globalAttributes), room)
    if (activeTool === "ellipse") socket.emit("addFigure", ellipseMousedown(event, globalAttributes), room)
    if (activeTool === "polygon") socket.emit("addFigure", polygonMousedown(event, globalAttributes), room)
    if (activeTool === "line") socket.emit("addFigure", lineMousedown(event, globalAttributes), room)
    if (activeTool === "pen") socket.emit("addFigure", penEvents(event, "mousedown"), room)

    nowWorkingObject = document.getElementById(nowWorkingObjectId)

    // ownFigures.push(nowWorkingObjectId)

    // actionsStack.addAction({
    //     id: nowWorkingObjectId,
    //     html: ""
    // })
})

drawingPlaceSvg.addEventListener("mousemove", event => {
    if (!mousedown) return

    if (activeTool === "square") editFigureSend(squareMousemove(event), room)
    if (activeTool === "ellipse") editFigureSend(ellipseMousemove(event), room)
    if (activeTool === "polygon") editFigureSend(polygonMousemove(event), room)
    if (activeTool === "line") editFigureSend(lineMousemove(event), room)
    if (activeTool === "pen") socket.emit("addFigure", penEvents(event, "mousemove"), room)
    
})

document.addEventListener("mouseup", event => {
    if (mousedown === false) return
    mousedown = false

    switch (activeTool) {
        case "select":
            selectObject(event.target)
            break
        default:
            // rotation.show({
            //         center: {
            //             x: nowWorkingObject.dataset.x,
            //             y: nowWorkingObject.dataset.y
            //         }
            //     },
            //     getCoords(rotation.rotationSlider),
            //     nowWorkingObject.dataset.rotation
            // )
            break
    }
})



document.addEventListener("keypress", event => {
    switch (event.code) {
        case "KeyF":
            if (anglesQuantity >= 30) break
            anglesQuantity++
            break
        case "KeyG":
            if (anglesQuantity < 3) anglesQuantity = 3 
            if (anglesQuantity <= 3) break
            anglesQuantity--
            break
    }
})


function changeTool(toolName) {
    switch (toolName) {
        case "settings":
            openPopup(settingsPopup)
            break

        case "clearAll":
            openPopup(acceptPopup)
            break

        case "undo":
            actionsStack.undo()
            break

        case "redo":
            actionsStack.redo()
            break

        case "upload": 
            openPopup(uploadPopup)
            break

        default:
            activeTool = toolName
            break
    }
}
