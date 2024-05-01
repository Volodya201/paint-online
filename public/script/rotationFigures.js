const rotation = {
    rotationElement: document.getElementById("rotation"),
    rotationController: document.querySelector("#rotationController"),
    rotationSlider: this.rotationController.querySelector("div"),

    isActive: false,
    showable: true,
    rotating: false,

    margin: {
        x: 0,
        y: 0
    },

    init(margin) {
        this.margin = margin
    },

    show(figure, sliderCords, figureRotation) {
        return // disabled
        if (!this.showable) return

        this.isActive = true

        this.rotationCenter = {
            x: (figure.center.x - 102.4 + this.margin.x),
            y: (figure.center.y - 102.4 + this.margin.y)
        }

        this.rotationElement.style.display = "flex"
        this.rotationElement.style.top = this.rotationCenter.y + "px"
        this.rotationElement.style.left = this.rotationCenter.x + "px"


        sliderCords.x += this.rotationSlider.offsetWidth / 2
        sliderCords.y += this.rotationSlider.offsetHeight / 2
        
        this.sliderCords = sliderCords
    },

    mousedown(event) {
        rotation.rotating = true
    },

    mousemove(event) {
        if (rotation.rotating === false) return

        //A
        const mousePositionX = event.clientX - rotation.margin.x
        const mousePositionY = event.clientY - rotation.margin.y

        //B
        rotation.rotationCenter.x
        rotation.rotationCenter.y

        //C
        rotation.sliderCords.x
        rotation.sliderCords.y

        //AB
        const AB = Math.sqrt(Math.pow((rotation.rotationCenter.x - mousePositionX), 2) + Math.pow((rotation.rotationCenter.y - mousePositionY), 2))
        const AC = Math.sqrt(Math.pow((rotation.sliderCords.x - mousePositionX), 2) + Math.pow((rotation.sliderCords.y - mousePositionY), 2))
        const BC = Math.sqrt(Math.pow((rotation.sliderCords.x - rotation.rotationCenter.x), 2) + Math.pow((rotation.sliderCords.y - rotation.rotationCenter.y), 2))


        // console.log("AB: " + AB)
        // console.log("AC: " + AC)
        // console.log("BC: " + BC)

        // cos B = (AB^2 + CB^2 - AC^2) / (2 * |AB| * |CB|)

        let rotationAngle = Math.acos((Math.pow(AB, 2) + Math.pow(BC, 2) - Math.pow(AC, 2)) / (2 * AB * BC)) * (180/Math.PI)

        if (mousePositionY < rotation.rotationCenter.y) rotationAngle *= -1

        rotation.rotationController.style.rotate = rotationAngle + "deg"
        nowWorkingObject.style.transform = `rotate(${Math.round(rotationAngle) + "deg"})`
    },

    mouseup(event) {
        rotation.rotating = false
    },
}


rotation.rotationSlider.addEventListener("mousedown", rotation.mousedown)
document.addEventListener("mousemove", rotation.mousemove)
document.addEventListener("mouseup", rotation.mouseup)