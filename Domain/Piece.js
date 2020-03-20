const piecesObject = require('../Pieces/piecesObject')
const Empty = require('../Pieces/Empty')

function Piece(type, isWhite, row, column) {
    this.type = piecesObject[type]
    this.isWhite = isWhite
    this.row = row
    this.column = column

    this.getMovements = function(isWhite, board) {
        return this.type.getMovements(this.row, this.column, board, isWhite)
    }

    this.isEmpty = function() {
        return this.type === Empty
    }

    this.clone = function() {
        return new Piece(this.type.symbol, this.isWhite, this.row, this.column)
    }
}

module.exports = Piece