const form = document.getElementById("form")
const nameInput = document.getElementById("name")
const connectCodeInput = document.getElementById("connectCode")
const nameStatus = document.getElementById("status")

nameInput.addEventListener("input", event => {
    const checkName = nameInput.value
    const checkResults =  checkNameFunction(checkName)

    if (checkResults[0]) {
        nameError("", "green")
        return
    }

    nameError(checkResults[1], "red")
    
})

function nameError(errorText, color) {
    nameStatus.innerText = errorText

    nameInput.style.borderColor = color
}


function checkNameFunction(checkingName) {
    let errors = []

    // if ((typeof checkingName) !== "string") errors.push("Странное имя...")
    // if (!checkingName.match(/[a-z]/i)) errors.push("Иди учи английский")
    // if (!checkingName.match(/v/i)) errors.push("Я слишком люблю буву v")
    // if (!checkingName.match(/[а-я,ё]/i)) errors.push("Русский забыл :(")
    // if (!checkingName.match(/[0-9]/)) errors.push("Иметь цифры в имени не всем дано")

    if (errors.length === 0) return [true, []]
    else return [false, errors.join("\n")]
}



form.addEventListener("submit", event => {
    const checkName = nameInput.value
    const checkResults =  checkNameFunction(checkName)

    if (!checkResults[0]) {
        event.preventDefault()
    }
})







const info = document.getElementById("info")
const blackout = document.getElementById("blackout")
const infoPopup = document.getElementById("infoPopup")
let isPopupOpen = false

info.addEventListener("click", event => {
    blackout.style.display = "block"
    blackout.style.opacity = "1"

    infoPopup.style.display = "block"

    isPopupOpen = true

    blackout.addEventListener("click", closePopup)
})


function closePopup(event) {
    blackout.style.display = "none"
    blackout.style.opacity = "0"

    infoPopup.style.display = "none"

    isPopupOpen = false

    blackout.removeEventListener("click", closePopup)
}