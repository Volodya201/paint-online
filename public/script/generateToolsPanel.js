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
    // {
    //     name: "pen",
    //     title: "Ручка",
    //     iconSrc: "/public/textures/pen.svg"
    // },
    // {
    //     name: "select",
    //     title: "Выделение",
    //     iconSrc: "/public/textures/select.svg"
    // },
    {
        name: "clearAll",
        title: "Стереть всё",
        iconSrc: "/public/textures/clear.svg"
    },
    {
        name: "settings",
        title: "Настройки",
        iconSrc: "/public/textures/settings.svg"
    }
]



const toolsPanel = document.getElementById("toolsPanel")


for (let toolIndex = 0; toolIndex < tools.length; toolIndex++) {
    const tool = tools[toolIndex]

    let toolHTML = generatePanelElement(tool)

    toolHTML += `<hr class="panel-hr"></hr>`

    toolsPanel.innerHTML += toolHTML
}

toolsPanel.innerHTML += `
    <div class="panel-element">
        <div class="panel-icon" id="colorPicker"></div>
        <span class="panel-title">Цвет заливки</span>
    </div>

    <hr class="panel-hr"></hr>

    <div class="panel-element">
        <div class="panel-icon" id="strokeColorPicker"></div>
        <span class="panel-title">Цвет контура</span>
    </div>

    <hr class="panel-hr"></hr>

    <div class="panel-element">
        <input class="panel-icon" id="strokeWidthChanger" type="number" min="0" max="20" value="0">
        <span class="panel-title">Ширина контура</span>
    </div>
`



function generatePanelElement(elementData) {
    return `
        <div class="panel-element" title="${elementData.title}" onclick="changeTool('${elementData.name}')">
            <img class="panel-icon" src="${elementData.iconSrc}">
            <span class="panel-title" >${elementData.title}</span>
        </div>
    `
}