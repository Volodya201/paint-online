class Action {
    constructor(savedData, next = null) {
        this.savedData = savedData
        this.next = next
    }
}


class ActionsStack {
    constructor(undoTop = null, undoLength = 0, redoTop = null, redoLength = 0) {
        this.undoTop = undoTop
        this.undoLength = undoLength
        this.redoTop = redoTop
        this.redoLength = redoLength
    }


    addAction(savedData) {
        if (!this.undoTop) {
            this.undoTop = new Action(savedData)
        } else {
            const temp = new Action(savedData, this.undoTop)
            this.undoTop = temp
        }
        this.undoLength++
    }

    undo() {
        if (this.undoTop <= 0) {
            this.undoTop = 0
            return
        }
        const id = this.undoTop.savedData.id
        const element = document.getElementById(id)

        this.addUndo({id: id, html: element.outerHTML})

        element.outerHTML = this.undoTop.savedData.html

        socket.emit("editFigure", this.undoTop.savedData)

        this.undoTop = this.undoTop.next

        this.undoLength--
    }

    addUndo(savedData) {
        if (!this.redoTop) {
            this.redoTop = new Action(savedData)
        } else {
            const temp = new Action(savedData, this.redoTop)
            this.redoTop = temp
        }
        this.redoLength++
    }

    redo() {
        if (this.redoTop <= 0) {
            this.redoTop = 0
            return
        }
        const id = this.redoTop.savedData.id
        const element = document.getElementById(id)
        
        if (element) {
            this.addAction({id, html: element.outerHTML})
            element.outerHTML = this.redoTop.savedData.html
        } else {
            this.addAction({id, html: ""})
            drawingPlaceSvg.innerHTML += this.redoTop.savedData.html
        }

        socket.emit("editFigure", this.redoTop.savedData)

        this.redoTop = this.redoTop.next

        this.redoLength--
    }
}


const actionsStack = new ActionsStack()

document.addEventListener("keypress", event => {
    if (!(event.code === "KeyZ" && event.shiftKey)) return

    event.preventDefault()
    event.stopPropagation()

    actionsStack.undo()
})


document.addEventListener("keypress", event => {
    if (!(event.code === "KeyY" && event.shiftKey)) return

    event.preventDefault()
    event.stopPropagation()

    actionsStack.redo()
})