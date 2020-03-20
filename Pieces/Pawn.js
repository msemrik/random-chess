const Movement = require('./../Domain/Movement')
const CoronatingMovement = require('./../Domain/Movement').CoronatingMovement
const EatingMovement = require('./../Domain/Movement').EatingMovement

function getMovements(row, column, board, isWhite) {
    let movements = []


    // TODO Pawn= add special eating movement when on box 4 and performs special init
    movements = movements.concat(getMovementForSpecialInitialPosition(row, column, board, isWhite))

    movements = movements.concat(getNonEatingMovement(row, column, board, isWhite))
    movements = movements.concat(getEatingMovement(row, column, board, isWhite))

    return movements
}

function getMovementForSpecialInitialPosition(row, column, board, isWhite) {
    const movements = []

    if (isWhite && row === 1 && board[2][column].isEmpty() && board[3][column].isEmpty()) {
        movements.push(new Movement(row, column, row + 2, column))
    }

    if (!isWhite && row === 6 && board[5][column].isEmpty() && board[4][column].isEmpty()) {
        movements.push(new Movement(row, column, row - 2, column))
    }

    return movements
}

function getNonEatingMovement(row, column, board, isWhite) {
    const movements = []
    const sumPerColour = isWhite ? 1 : -1

    if (board[row + sumPerColour][column].isEmpty()) {
        if(row + sumPerColour === 0 || row + sumPerColour === 7) {
            movements.push(new CoronatingMovement(row, column, row + sumPerColour, column))
        } else {
            movements.push(new Movement(row, column, row + sumPerColour, column))
        }


    }

    return movements
}

function getEatingMovement(row, column, board, isWhite) {
    const movements = []

    const adjacents = []
    if (isWhite) {
        adjacents.push(board[row + 1][column + 1])
        adjacents.push(board[row + 1][column - 1])
    } else {
        adjacents.push(board[row - 1][column + 1])
        adjacents.push(board[row - 1][column - 1])
    }

    for(let i  = 0; i < 2; i++) {
        if(adjacentIsEatable(adjacents[i], isWhite)) {
            if(adjacents[i].row === 0 || adjacents[i].row === 7) {
                movements.push(new CoronatingMovement(row, column, adjacents[i].row, adjacents[i].column))
            } else {
                movements.push(new EatingMovement(row, column, adjacents[i].row, adjacents[i].column))
            }
        }

    }

    return movements
}

function adjacentIsEatable(adjacent, isWhite) {
    return adjacent && !adjacent.isEmpty() && adjacent.isWhite !== isWhite
}

module.exports.getMovements = getMovements
module.exports.symbol = 'P'
