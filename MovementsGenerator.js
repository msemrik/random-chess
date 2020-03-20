const Board = require('./Domain/Board')
function getAllMovements(whitesPlay, board) {
    let movements = []

    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            let piece = board[row][column]
            if (piece.isWhite === whitesPlay) {
                movements = movements.concat(piece.getMovements(whitesPlay, board))
            }
        }
    }

    return movements
}

function getValidMovement(playWhite, board) {
    const movements = getAllMovements(playWhite, board.board)
    return filterInvalidMovements(playWhite, movements, board)
}

function filterInvalidMovements(playWhite, movements, board) {
    return movements.filter(movement => {
        const newBoard = new Board(board.clone())
        newBoard.executeMovement(movement)
        const kingPiece = newBoard.findKing(playWhite)
        return kingPiece.type.isInValidPosition(playWhite, kingPiece, newBoard.board)
    })
}



module.exports.getValidMovement = getValidMovement
module.exports.getAllMovements = getAllMovements