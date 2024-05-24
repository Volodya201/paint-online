function squareMousedown(event, extraAttributes = {}) {
    const squareConfig = {
        type: 0,
        attributes: {
            x: event.offsetX,
            y: event.offsetY,
            width: 1,
            height: 1,
            id: nowWorkingObjectId,
            ...extraAttributes
        },
        dataAttributes: {
            x: event.offsetX + 0.5,
            y: event.offsetY + 0.5,
            right: 1337
        },
        id: nowWorkingObjectId
    }

    addFigure(squareConfig)

    return squareConfig
}

function squareMousemove(event) {
    let xOffset = event.offsetX - startX
    let yOffset = event.offsetY - startY
    let x
    let width
    let y
    let height
    let centerX
    let centerY

    if (xOffset < 0) {
        x = event.offsetX
        width = startX - event.offsetX
        centerX = event.offsetX + (startX - event.offsetX) / 2
    } else {
        x = startX
        width = xOffset
        centerX = startX + xOffset / 2
    }

    if (yOffset < 0) {
        y = event.offsetY
        height = startY - event.offsetY
        centerY = event.offsetY + (startY - event.offsetY) / 2
    } else {
        y = startY
        height = yOffset
        centerY = startY + yOffset / 2
    }

    nowWorkingObject.setAttribute("x", x)
    nowWorkingObject.setAttribute("width", width)
    nowWorkingObject.setAttribute("y", y)
    nowWorkingObject.setAttribute("height", height)
    nowWorkingObject.dataset.x = centerX
    nowWorkingObject.dataset.y = centerY

    return {
        attributes: {
            x,
            y,
            width,
            height,
        },
        dataAttributes: {
            x: centerX,
            y: centerY,
        },
        id: nowWorkingObjectId
    }
}

function ellipseMousedown(event, extraAttributes = {}) {
    const ellipseConfig = {
        type: 5,
        attributes: {
            cx: startX,
            cy: startY,
            r: 1,
            id: nowWorkingObjectId,
            ...extraAttributes
        },
        dataAttributes: {
            x: startX,
            y: startY,
            right: 1337
        },
        id: nowWorkingObjectId
    }

    addFigure(ellipseConfig)

    return ellipseConfig
}

function ellipseMousemove(event) {
    const offset = getOffset(event)

    nowWorkingObject.setAttribute("r", offset)

    return {
        attributes: {
            r: offset
        },
        id: nowWorkingObjectId
    }
}



function polygonMousedown(event, extraAttributes = {}) {
    const polygonConfig = {
        type: 2,
        attributes: {
            points: `${startX + 1},${startY} ${startX},${startY + 1} ${startX + 1},${startY + 1}`,
            id: nowWorkingObjectId,
            ...extraAttributes
        },
        dataAttributes: {
            x: startX,
            y: startY,
            right: 1337
        },
        id: nowWorkingObjectId
    }

    addFigure(polygonConfig)

    return polygonConfig
}


function polygonMousemove(event) {
    const offset = getOffset(event)

    let points = ``
    
    for (let angleIndex = 0; angleIndex < anglesQuantity; angleIndex++) {
        let angleDegree = 360 / anglesQuantity * (angleIndex - 1)

        points += `${startX + offset * getSin(angleDegree + 180)} ${startY + offset * getCos(angleDegree + 180)},`
    }

    points = points.slice(0, -1)

    nowWorkingObject.setAttribute("points", points)

    return {
        attributes: {
            points
        },
        id: nowWorkingObjectId
    }
}


function lineMousedown(event, extraAttributes = {}) {
    const lineConfig = {
        type: 6,
        attributes: {
            x1: startX,
            y1: startY,
            x2: startX + 1,
            y2: startY + 1,
            id: nowWorkingObjectId,
            ...extraAttributes
        },
        dataAttributes: {
            x: startX,
            y: startY,
            right: 1337
        },
        id: nowWorkingObjectId
    }

    addFigure(lineConfig)

    return lineConfig
}



function lineMousemove(event) {
    nowWorkingObject.setAttribute("x2", event.offsetX)
    nowWorkingObject.setAttribute("y2", event.offsetY)

    return {
        attributes: {
            x2: event.offsetX,
            y2: event.offsetY
        },
        id: nowWorkingObjectId
    }
}


function penEvents(event) {
    nowWorkingObjectId = generateId()

    const dot = document.createElementNS(xmlns, "circle")
    dot.setAttribute("cx", event.offsetX)
    dot.setAttribute("cy", event.offsetY)
    dot.setAttribute("r", activeStrokeWidth)
    dot.setAttribute("id", nowWorkingObjectId)
    dot.dataset.x = event.offsetX
    dot.dataset.y = event.offsetY
    dot.dataset.right = "1337"

    drawingPlaceSvg.appendChild(dot)

    return {
        element: dot,
        id: nowWorkingObjectId
    }
}



function selectObject(target) {
    if(target.dataset.right !== "1337") return
}



function getCos(degrees) {
    return (Math.cos(degrees * Math.PI/180))
}

function getSin(degrees) {
    return (Math.sin(degrees * Math.PI/180))
}

function getOffset(event) {
    const xOffset = Math.pow(Math.abs(event.offsetX - startX), 2)
    const yOffset = Math.pow(Math.abs(event.offsetY - startY), 2)
    return Math.floor(Math.sqrt(xOffset + yOffset))
}