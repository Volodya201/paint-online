function addFigure(figureConfig) {
    let newFigure = document.createElementNS(xmlns, typeTranscript[figureConfig.type])

    newFigure = setAttributes(newFigure, figureConfig.attributes, figureConfig.dataAttributes)

    newFigure.style.transform = "rotate(" + figureConfig.rotate + "deg)"
    newFigure.style.transformOrigin = figureConfig.dataAttributes.x + "px " + figureConfig.dataAttributes.y + "px"

    drawingPlaceSvg.appendChild(newFigure)
}

function editFigureSend(figure) {
    const now = Date.now()

    if ((now - lastEmit) >= 40) {
        socket.emit("editFigure", figure)
        lastEmit = now
    } else {
        editFigure(figure)
    }
}

function editFigure(figure) {
    const workingFigure = document.getElementById(figure.id)
    if (!workingFigure) {
        // :( 
        return 
    }
    
    setAttributes(workingFigure, figure.attributes, figure.dataAttributes)
}


function getCoords(elem) {
    let box = elem.getBoundingClientRect()
  
    return {
      y: box.top + scrollY,
      x: box.left + window.scrollX
    }
}


function setAttributes(target, attributes, dataAttributes) {
    for (const attribute in attributes) {
        if (Object.hasOwnProperty.call(attributes, attribute)) {
            const attributeValue = attributes[attribute]
            
            target.setAttribute(attribute, attributeValue)
        }
    }

    for (const dataAttribute in dataAttributes) {
        if (Object.hasOwnProperty.call(dataAttributes, dataAttribute)) {
            const dataAttributeValue = dataAttributes[dataAttribute]
            
            target.dataset[dataAttribute] = dataAttributeValue
        }
    }

    return target
}


function generateId() {
    let code = ""
    for (let index = 0; index < 7; index++) {
        code += Math.floor(Math.random() * 10)
    }

    return Number(code)
}
