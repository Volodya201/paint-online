let uploadFileInput = document.getElementById("uploadFile")
let error = document.getElementById("uploadError")
let jsonGeneration = document.querySelector('input[name="upload-type"]:checked')
let json = []

uploadFileInput.addEventListener("change", function(event) {
    error.innerText = ""
    const uploadedFile = uploadFileInput.files[0]

    if (!['application/json'].includes(uploadedFile.type)) {
        uploadFileInput.value = ""
        error.innerText = "Используйте json файл!"
        return
    }

    if (uploadedFile.size > 2 * 1024 * 1024) {
        error.innerText = "Размер файла не должен привышать 2 мегабайта"
        return
    }

    let render = new FileReader()
    render.onload = function(f) {
        json = JSON.parse(render.result)
        console.log(json)
    }
    render.onerror = function(f) {
        alert("ОШИБКА!")
    }

    render.readAsText(uploadedFile)
})


function uploadConfirm() {
    if (!uploadFileInput.value) {
        error.innerText = "Загрузите файл"
        return 
    }

    console.log(json.length)

    try {
        let generate
        if (jsonGeneration.id === "uploadThis") {
            generate = generateThisFigures
        } else {
            generate = generateGeometrizeFigures
        }

        closePopup(uploadPopup)

        let figureIndex = 0

        let interval = setInterval(() => {
            if (figureIndex >= json.length) {
               clearInterval(interval) 
               json = []
                uploadFileInput.value = ""
               return
            }

            const runFigure = json[figureIndex]

            console.log("index: " + (figureIndex + 1) + "/" + json.length)
            generate(runFigure)

            figureIndex++
        }, 5)
        
    } catch (error) {
        error.innerText = "Загрузите правильный файл"
        return 
    }
}

function generateGeometrizeFigures(figure) {
    const color = `rgba(${figure.color[0]}, ${figure.color[1]}, ${figure.color[2]})`

    nowWorkingObjectId = generateId()

    let generatingFigureConfig = {
        type: figure.type,
        attributes: {
            "fill": color,
            "stroke": color,
            "fill-opacity": 1 - figure.score,
            "id": nowWorkingObjectId
        },
        dataAttributes: {
            "right": 1337
        },
        id: nowWorkingObjectId
    }

    if (figure.type === 0 || figure.type === 1) {
        generatingFigureConfig.attributes.x = figure.data[0]
        generatingFigureConfig.attributes.y = figure.data[1]
        generatingFigureConfig.attributes.width = figure.data[2] - figure.data[0]
        generatingFigureConfig.attributes.height = figure.data[3] - figure.data[1]

        generatingFigureConfig.dataAttributes.x = figure.data[0] + (figure.data[2] - figure.data[0]) / 2
        generatingFigureConfig.dataAttributes.y = figure.data[1] + (figure.data[3] - figure.data[1]) / 2

        if (figure.type === 1) generatingFigureConfig.rotate = figure.data[4]
    } else if(figure.type === 2) {
        generatingFigureConfig.attributes.points = `${figure.data[0]},${figure.data[1]} ${figure.data[2]},${figure.data[3]} ${figure.data[4]},${figure.data[5]} `
    } else if (figure.type === 3 || figure.type === 4) {
        generatingFigureConfig.attributes.cx = figure.data[0]
        generatingFigureConfig.attributes.cy = figure.data[1]
        generatingFigureConfig.attributes.rx = figure.data[2]
        generatingFigureConfig.attributes.ry = figure.data[3]

        generatingFigureConfig.dataAttributes.x = figure.data[0]
        generatingFigureConfig.dataAttributes.y = figure.data[1]

        if (figure.type === 4) generatingFigureConfig.rotate = figure.data[4]
    } else if (figure.type === 5) {
        generatingFigureConfig.attributes.cx = figure.data[0]
        generatingFigureConfig.attributes.cy = figure.data[1]
        generatingFigureConfig.attributes.r = figure.data[2]

        generatingFigureConfig.dataAttributes.x = figure.data[0]
        generatingFigureConfig.dataAttributes.y = figure.data[1]
    } else if (figure.type === 6) {
        generatingFigureConfig.attributes.strokeWidth = 1
        generatingFigureConfig.attributes.x1 = figure.data[0]
        generatingFigureConfig.attributes.y1 = figure.data[1]
        generatingFigureConfig.attributes.x2 = figure.data[2]
        generatingFigureConfig.attributes.y2 = figure.data[3]

        generatingFigureConfig.dataAttributes.x = figure.data[0]
        generatingFigureConfig.dataAttributes.y = figure.data[1]
    } else if (figure.type === 7) {
        generatingFigureConfig.attributes.strokeWidth = 1
        generatingFigureConfig.attributes.fill = "none"
        generatingFigureConfig.attributes.d = `M${figure.data[0]} ${figure.data[1]} Q ${figure.data[2]} ${figure.data[3]} ${figure.data[4]} ${figure.data[5]}`
    }

    socket.emit("addFigure", generatingFigureConfig)
}


function generateThisFigures(figure) {
    console.log(figure)
}
    
