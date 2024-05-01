const blackout = document.getElementById("blackout")
const settingsPopup = document.getElementById("settingsPopup")
let isPopupOpen = false

function openPopup() {
    blackout.style.display = "block"
    blackout.style.opacity = "1"

    settingsPopup.style.display = "block"

    isPopupOpen = true

    blackout.addEventListener("click", closePopup) 
}


function closePopup(event) {
    blackout.style.display = "none"
    blackout.style.opacity = "0"

    settingsPopup.style.display = "none"

    isPopupOpen = false

    blackout.removeEventListener("click", closePopup)
}





function getCoords(elem) {
    let box = elem.getBoundingClientRect()
  
    return {
      y: box.top + scrollY,
      x: box.left + window.scrollX
    }
}


const socket = io()

const drawingPlaceSvg = document.getElementById("drawingPlaceSvg")
const name = document.getElementById("name").innerText
const userList = document.getElementById("userList")
let activeColor = "#000000"
let activeStrokeColor = "#000000"
let activeStrokeWidth = 0
let anglesQuantity = 4

const colorPickerSettings = {
    classname: '',
    theme: 'dark',
    toggle: true,
    popover: true,
    position: 'left-end',
    margin: 16,
    preset: true,
    color: '#000',
    default: '#000',
    disabled: false,
    format: 'rgb',
    singleInput: false,
    inputs: {
        rgb: true,
        hex: true,
        hsl: false,
    },
    opacity: true,
    preview: true,
    closeOnScroll: false,
    copy: true,
    swatches: ["#ff0000", "#00ff00", "#0000ff"],
    toggleSwatches: false, 
    shared: false, 
    closeOnScroll: false,
}


const colorPicker = new Alwan('#colorPicker', {...colorPickerSettings, id: 'colorPicker'})
colorPicker.on('change', (color) => {activeColor = color.rgb})

const strokeColorPicker = new Alwan('#strokeColorPicker', {...colorPickerSettings, id: 'strokeColorPicker'})
strokeColorPicker.on('change', (color) => {activeStrokeColor = color.rgb})





const strokeWidthChanger = document.getElementById("strokeWidthChanger")

strokeWidthChanger.addEventListener("change", (event) => {
    activeStrokeWidth = event.target.value
})

toolsPanel.addEventListener("mouseleave", () => {
    strokeWidthChanger.blur()
})
