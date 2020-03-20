const Movement = require('./../Domain/Movement')
const Utils = require('./../Utils')

function getMovements(row, column, board, isWhite) {
    let movements = []

    movements = movements.concat(getAdjacentMovements(row, column, board, isWhite))
    // TODO add enroque
    return movements
}

function getAdjacentMovements(row, column, board, isWhite) {
    const movements = []

    const posibleMovements = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]]
    for (let i = 0; i < posibleMovements.length; i++) {

        let newRow = row + posibleMovements[i][0]
        let newColumn = column + posibleMovements[i][1]

        if (Utils.stillInBoard(newRow, newColumn) && (board[newRow][newColumn].isEmpty() || board[newRow][newColumn].isWhite !== isWhite)) {
            movements.push(new Movement(row, column, newRow, newColumn))
        }
    }

    return movements
}

function isInValidPosition(playWhite, kingPiece, board) {
    return !isThreatenInSquare(playWhite, kingPiece, board) && !isThreatenInDiagonal(playWhite, kingPiece, board) && !isThreatenByHorse(playWhite, kingPiece, board)
}

function isThreatenInSquare(playWhite, kingPiece, board) {

    const variables = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    for (let i = 0; i < variables.length; i++) {

        let analyzingRow = kingPiece.row + variables[i][0]
        let analyzingColumn = kingPiece.column + variables[i][1]

        let reachedAPiece = false
        while (!reachedAPiece && Utils.stillInBoard(analyzingRow, analyzingColumn)) {
            if (!board[analyzingRow][analyzingColumn].isEmpty()) {
                reachedAPiece = true
                if (board[analyzingRow][analyzingColumn].isWhite !== playWhite &&
                    isSquareThreat(board[analyzingRow][analyzingColumn], [kingPiece.row - analyzingRow, kingPiece.column - analyzingColumn])) {
                    return true
                }
            }
            analyzingRow += variables[i][0]
            analyzingColumn += variables[i][1]
        }

    }

    return false
}

function isThreatenByHorse(playWhite, kingPiece, board) {

    const variables = [[2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [-1, -2], [1, -2], [2, -1]]
    for (let i = 0; i < variables.length; i++) {

        let analyzingRow = kingPiece.row + variables[i][0]
        let analyzingColumn = kingPiece.column + variables[i][1]
        let pieceToAnalyze
        if(analyzingRow >= 0 && analyzingRow <= 7) {
            pieceToAnalyze = board[analyzingRow][analyzingColumn]
        } else {
            continue
        }


        if (Utils.stillInBoard(analyzingRow, analyzingColumn) &&
            !pieceToAnalyze.isEmpty() &&
            pieceToAnalyze.type.symbol === 'N' &&
            pieceToAnalyze.isWhite !== playWhite) {
            return true
        }
    }

    return false
}

function isThreatenInDiagonal(playWhite, kingPiece, board) {

    const variables = [[1, 1], [-1, 1], [-1, -1], [1, -1]]
    for (let i = 0; i < variables.length; i++) {

        let analyzingRow = kingPiece.row + variables[i][0]
        let analyzingColumn = kingPiece.column + variables[i][1]

        let reachedAPiece = false
        while (!reachedAPiece && Utils.stillInBoard(analyzingRow, analyzingColumn)) {
            if (!board[analyzingRow][analyzingColumn].isEmpty()) {
                reachedAPiece = true
                if (board[analyzingRow][analyzingColumn].isWhite !== playWhite &&
                    isDiagonalThreat(board[analyzingRow][analyzingColumn], [kingPiece.row - analyzingRow, kingPiece.column - analyzingColumn], playWhite)) {
                    return true
                }
            }
            analyzingRow += variables[i][0]
            analyzingColumn += variables[i][1]
        }

    }

    return false
}

function isSquareThreat(piece, distances) {
    return piece.type.symbol === 'Q' || piece.type.symbol === 'T' || (piece.type.symbol === 'K' && Math.abs(distances[0]) < 2 && Math.abs(distances[1]) < 2)
}

function isDiagonalThreat(piece, distances, playWhite) {
    return piece.type.symbol === 'Q' ||
        piece.type.symbol === 'B' ||
        (piece.type.symbol === 'K' && Math.abs(distances[0]) < 2 && Math.abs(distances[1]) < 2) ||
        (piece.type.symbol === 'P' && Math.abs(distances[1]) < 2 && ((playWhite && distances[0] === -1) || (!playWhite && distances[0] === 1)))
}

module.exports.getMovements = getMovements
module.exports.isInValidPosition = isInValidPosition
module.exports.symbol = 'K'
