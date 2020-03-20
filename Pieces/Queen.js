const Movement = require('./../Domain/Movement')
const Utils = require('./../Utils')

function getMovements(row, column, board, isWhite) {
    let movements = []

    movements = movements.concat(getDiagonalMovements(row, column, board, isWhite))
    movements = movements.concat(getSquareMovements(row, column, board, isWhite))

    return movements
}

function getDiagonalMovements(row, column, board, isWhite) {
    const movements = []

    const variables = [[1, 1], [-1, 1], [-1, -1], [1, -1]]
    for (let i = 0; i < variables.length ; i++) {

        let newRow = row + variables[i][0]
        let newColumn = column + variables[i][1]

        while (Utils.stillInBoard(newRow, newColumn)) {
            if (board[newRow][newColumn].isEmpty()) {
                movements.push(new Movement(row, column, newRow, newColumn))
            } else {
                if (board[newRow][newColumn].isWhite !== isWhite) {
                    movements.push(new Movement(row, column, newRow, newColumn))
                }
                newRow = 999
            }
            newRow += variables[i][0]
            newColumn += variables[i][1]
        }


    }

    return movements
}
function getSquareMovements(row, column, board, isWhite) {
    const movements = []

    const variables = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    for (let i = 0; i < variables.length ; i++) {

        let newRow = row + variables[i][0]
        let newColumn = column + variables[i][1]

        while (Utils.stillInBoard(newRow, newColumn)) {
            if (board[newRow][newColumn].isEmpty()) {
                movements.push(new Movement(row, column, newRow, newColumn))
            } else {
                if (board[newRow][newColumn].isWhite !== isWhite) {
                    movements.push(new Movement(row, column, newRow, newColumn))
                }
                newRow = 999
            }
            newRow += variables[i][0]
            newColumn += variables[i][1]
        }
    }


    return movements
}

module.exports.getMovements = getMovements
module.exports.symbol = 'Q'
