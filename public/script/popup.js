const blackout = document.getElementById("blackout")
const settingsPopup = document.getElementById("settingsPopup")
const acceptPopup = document.getElementById("acceptPopup")
const uploadPopup = document.getElementById("uploadPopup")


function openPopup(popup) {
    blackout.style.display = "block"
    blackout.style.opacity = "1"

    popup.style.display = "block"

    blackout.addEventListener("click", () => closePopup(popup)) 
}


function closePopup(popup) {
    blackout.style.display = "none"
    blackout.style.opacity = "0"

    popup.style.display = "none"

    blackout.removeEventListener("click", () => closePopup(popup))
}