const Movement = require('./../Domain/Movement')

function getMovements(row, column, board, isWhite) {
    let movements = []

    movements = movements.concat(getJumpingMovements(row, column, board, isWhite))

    return movements
}

function getJumpingMovements(row, column, board, isWhite) {
    const movements = []

    const variables = [[2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [-1, -2], [1, -2], [2, -1]]
    for (let i = 0; i < variables.length; i++) {

        let newRow = row + variables[i][0]
        let newColumn = column + variables[i][1]

        if (isInBoard(newRow, newColumn) && (board[newRow][newColumn].isEmpty() || board[newRow][newColumn].isWhite !== isWhite)) {
            movements.push(new Movement(row, column, newRow, newColumn))
        }
    }

    return movements
}

function isInBoard(row, column) {
    return row >= 0 && row <= 7 && column >= 0 && column <= 7
}

module.exports.getMovements = getMovements
module.exports.symbol = 'N'
