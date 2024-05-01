


const panelIcons = toolsPanel.querySelectorAll(".panel-icon")
const panelTitles = toolsPanel.querySelectorAll(".panel-title")
toolsPanel.addEventListener("mouseenter", PanelMouseenter)
toolsPanel.addEventListener("mouseleave", PanelMouseleave)




let inDetailsToollistBool = true

const inDetailsToollist = document.getElementById("inDetailsToollist")

inDetailsToollist.addEventListener("change", inDetailsToollistChange)



function PanelMouseenter(event) {
    if (!inDetailsToollistBool) return
    toolsPanel.style.cssText = `
        width: 500%;
        position: relative;
    `
    for (panelIcon of panelIcons) {
        panelIcon.style.cssText = `
            translate: 100% 0;
            margin: 0 0 0 15px;
        `
    }
    for (panelTitle of panelTitles) {
        panelTitle.style.cssText = `
            display: inline;
            width: 200px;
            margin: 0 15px 0 0;
            translate: 25% 0;
        `
    }
}

function PanelMouseleave(event) {
    if (!inDetailsToollistBool) return
    toolsPanel.style.cssText = `
        width: 100%;
        position: static;
    `
    for (panelIcon of panelIcons) {
        panelIcon.style.cssText = `
            margin: 0 0 0 0;
            translate: 0 0;
        `
    }
    for (panelTitle of panelTitles) {
        panelTitle.style.cssText = `
            display: none;
            width: auto;
            margin: 0 0 0 0;
            translate: 0 0;
        `
    }
}



function inDetailsToollistChange(event) {
    inDetailsToollistBool = inDetailsToollist.checked
    if (!inDetailsToollistBool) PanelMouseleave()
}