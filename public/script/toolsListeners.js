function squareMousedown(event) {
    const html = `
        <rect 
        x="${event.offsetX}" 
        y="${event.offsetY}" 
        width="1" 
        height="1" 
        id="${nowWorkingObjectId}" 
        data-x="${event.offsetX + 0.5}"
        data-y="${event.offsetY + 0.5}"
        data-right="1337" />
    `
    drawingPlaceSvg.innerHTML += html

    return {
        html,
        id: nowWorkingObjectId
    }
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
        html: nowWorkingObject.outerHTML,
        id: nowWorkingObjectId
    }
}

function ellipseMousedown(event) {
    const html = `
        <circle 
        cx="${startX}" 
        cy="${startY}" 
        r="1" 
        id="${nowWorkingObjectId}" 
        data-x="${startX}"
        data-y="${startY}"
        data-right="1337" />
    `
    drawingPlaceSvg.innerHTML += html

    return {
        html,
        id: nowWorkingObjectId
    }
}

function ellipseMousemove(event) {
    const offset = getOffset(event)

    nowWorkingObject.setAttribute("r", offset)

    return {
        html: nowWorkingObject.outerHTML,
        id: nowWorkingObjectId
    }
}



function polygonMousedown(event) {
    const html = `
        <polygon 
        points="${startX + 1},${startY} ${startX},${startY + 1} ${startX + 1},${startY + 1}" 
        id="${nowWorkingObjectId}" 
        data-x="${startX}"
        data-y="${startY}"
        data-right="1337" />
    `

    drawingPlaceSvg.innerHTML += html

    return {
        html,
        id: nowWorkingObjectId
    }
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
        html: nowWorkingObject.outerHTML,
        id: nowWorkingObjectId
    }
}


function lineMousedown(event) {
    const html = `
        <line 
        x1="${startX}"
        y1="${startY}"
        x2="${startX + 1}"
        y2="${startY + 1}"
        id="${nowWorkingObjectId}" 
        data-x="${startX}"
        data-y="${startY}"
        data-right="1337" />
    `

    drawingPlaceSvg.innerHTML += html

    return {
        html,
        id: nowWorkingObjectId
    }
}



function lineMousemove() {
    nowWorkingObject.setAttribute("x2", event.offsetX)
    nowWorkingObject.setAttribute("y2", event.offsetY)

    return {
        html: nowWorkingObject.outerHTML,
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