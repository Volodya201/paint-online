function squareMousedown(event) {
    const html = `
        <rect 
        x="${event.offsetX}" 
        y="${event.offsetY}" 
        width="1" 
        height="1" 
        id="${nowWorkingObjectId}" 
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

    if (xOffset < 0) {
        nowWorkingObject.setAttribute("x", event.offsetX)
        nowWorkingObject.setAttribute("width", startX - event.offsetX)
    } else {
        nowWorkingObject.setAttribute("x", startX)
        nowWorkingObject.setAttribute("width", xOffset)
    }

    if (yOffset < 0) {
        nowWorkingObject.setAttribute("y", event.offsetY)
        nowWorkingObject.setAttribute("height", startY - event.offsetY)
    } else {
        nowWorkingObject.setAttribute("y", startY)
        nowWorkingObject.setAttribute("height", yOffset)
    }

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
        data-right="1337" />
    `
    drawingPlaceSvg.innerHTML += html

    return {
        html,
        id: nowWorkingObjectId
    }
}

function ellipseMousemove(event) {
    let xOffset = Math.pow(Math.abs(event.offsetX - startX), 2)
    let yOffset = Math.pow(Math.abs(event.offsetY - startY), 2)
    let offset = Math.floor(Math.sqrt(xOffset + yOffset))
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
        data-right="1337" />
    `

    drawingPlaceSvg.innerHTML += html

    return {
        html,
        id: nowWorkingObjectId
    }
}
let smth = 60
function polygonMousemove(event) {
    console.log(event)
    lastEvent = event

    let xOffset = Math.pow(Math.abs(event.offsetX - startX), 2)
    let yOffset = Math.pow(Math.abs(event.offsetY - startY), 2)
    let offset = Math.floor(Math.sqrt(xOffset + yOffset))

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



function selectObject(target) {
    if(target.dataset.right !== "1337") return
    //target.style.fill = "green"
}



function getCos(degrees) {
    return (Math.cos(degrees * Math.PI/180))
}

function getSin(degrees) {
    return (Math.sin(degrees * Math.PI/180))
}