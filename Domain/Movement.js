function Movement (prevRow, prevColumn, newRow, newColumn, eatingMovement = false, coronating = false) {
    this.prevRow = prevRow
    this.prevColumn = prevColumn
    this.newRow = newRow
    this.newColumn = newColumn
    this.coronating = coronating
    this.eatingMovement = eatingMovement

    this.isValid = function() {
        return this.newRow >= 0 && this.newRow <= 7 && this.newColumn >=0 && this.newColumn <= 7
    }
}

function CoronatingMovement (prevRow, prevColumn, newRow, newColumn, eating = false) {
    if(eating) {
        return new EatingMovement(prevRow, prevColumn, newRow, newColumn, true)
    } else {
        return new Movement(prevRow, prevColumn, newRow, newColumn, false, true)
    }
}

function EatingMovement (prevRow, prevColumn, newRow, newColumn, coronating = false) {
    return new Movement(prevRow, prevColumn, newRow, newColumn, true, coronating)
}

module.exports = Movement
module.exports.CoronatingMovement = CoronatingMovement
module.exports.EatingMovement = EatingMovement