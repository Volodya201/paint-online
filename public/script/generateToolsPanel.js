const tools = [
    {
        name: "square",
        title: "Прямоугольник",
        iconSrc: "/public/textures/square.svg"
    },
    {
        name: "ellipse",
        title: "Круг",
        iconSrc: "/public/textures/ellipse.svg"
    },
    {
        name: "polygon",
        title: "Многоугольник",
        iconSrc: "/public/textures/polygon.svg"
    },
    {
        name: "line",
        title: "Линия",
        iconSrc: "/public/textures/line.svg"
    },
    {
        name: "pen",
        title: "Ручка",
        iconSrc: "/public/textures/pen.svg"
    },
    {
        name: "select",
        title: "Выделение и редактирование",
        iconSrc: "/public/textures/select.svg"
    },
    {
        name: "clearAll",
        title: "Стереть всё",
        iconSrc: "/public/textures/clear.svg"
    }
]



const toolsPanel = document.getElementById("toolsPanel")


for (let toolIndex = 0; toolIndex < tools.length; toolIndex++) {
    const tool = tools[toolIndex]

    let toolHTML = generatePanelElement(tool)

    //if (toolIndex !== tools.length - 1)
    toolHTML += `<hr class="panel-hr"></hr>`

    toolsPanel.innerHTML += toolHTML
}

toolsPanel.innerHTML += `
    <div class="panel-element"> <div id="colorPicker"></div> </div>

    <span>Обводка</span>

    
`



function generatePanelElement(elementData) {
    return `
        <div class="panel-element" title="${elementData.title}" onclick="changeTool('${elementData.name}')">
            <img class="panel-icon" src="${elementData.iconSrc}">
        </div>
    `
}