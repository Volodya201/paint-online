const socket = io()

const drawingPlaceSvg = document.getElementById("drawingPlaceSvg")
const name = document.getElementById("name").innerText
const room = document.getElementById("room").innerText
const userList = document.getElementById("userList")
let mousedown = false
let activeTool = "square"
let userObjectsCounter = 1
let nowWorkingObject
let nowWorkingObjectId
let startX
let startY
let lastEmit = 0
const xmlns = "http://www.w3.org/2000/svg"
const typeTranscript = {
    "0": "rect",
    "1": "rect", //rotated 
    "2": "polygon",
    "3": "ellipse",
    "4": "ellipse", //rotated 
    "5": "circle",
    "6": "line",
    "7": "path"
}



const windowInnerHeight = window.innerHeight
let drawingPlaceScale = 1
while((windowInnerHeight * 0.9) <= (drawingPlaceSvg.clientHeight * drawingPlaceScale)) {
    drawingPlaceScale -= 0.1
    drawingPlaceSvg.style.scale = drawingPlaceScale
}