const Piece = require('./Piece')
const Pawn = require('../Pieces/Pawn')
const King = require('../Pieces/King')

const coronatingPieces = ['Q', 'T', 'N', 'B']
// TODO add a add piece that takes it's row and column and fills Board position
function Board(board) {
    this.addPiece = function(piece) {
        this.board[piece.row][piece.column] = piece
    }

    if(board) {
        this.board = board
    } else {
        this.board = createBoard()
        fillDefaultBoard(this)
    }

    this.printBoard = function () {
        for (let i = 7; i >= 0; i--) {
            let line = ""
            let pieces = []
            for (let j = 0; j < this.board[i].length; j++) {
                pieces.push(this.board[i][j].type.symbol)

                if (this.board[i][j].isEmpty()) {
                    line += FgBlack + " "
                } else {
                    if (this.board[i][j].isWhite) {
                        line += FgWhite + " "
                    } else {
                        line += FgBlack + " "
                    }
                }
            }
            console.log(line, ...pieces)
        }
    }

    this.executeMovement = function (movement) {
        let oldPiecePosition = this.board[movement.prevRow][movement.prevColumn]

        oldPiecePosition.row = movement.newRow
        oldPiecePosition.column = movement.newColumn

        if (oldPiecePosition.type === Pawn && (movement.newRow === 7 || movement.newRow === 0)) {
            oldPiecePosition = new Piece(coronatingPieces[Math.floor(Math.random() * coronatingPieces.length)], oldPiecePosition.isWhite, movement.newRow, movement.newColumn)
        }

        this.board[movement.newRow][movement.newColumn] = oldPiecePosition
        this.board[movement.prevRow][movement.prevColumn] = new Piece('-', '-', movement.prevRow, movement.prevColumn)

    }

    this.clone = function () {
        var newArray = [];

        for (var i = 0; i < this.board.length; i++) {
            newArray[i] = [];
            for (var j = 0; j < this.board[i].length; j++) {
                newArray[i][j] = this.board[i][j].clone()
            }
        }

        return newArray
    }

    this.findKing = function(isWhite) {
        for (let i = 7; i >= 0; i--) {
            for (let j = 0; j < this.board[i].length; j++) {
                if(this.board[i][j].type === King && this.board[i][j].isWhite === isWhite)
                    return this.board[i][j]
            }
        }
    }

    this.moreThanTwoPieces = function() {
        let count = 0
        for (let i = 7; i >= 0; i--) {
            for (let j = 0; j < this.board[i].length; j++) {
                if(!this.board[i][j].isEmpty()) {
                    count++
                }
            }
        }

        return count > 2
    }
}
function fillDefaultBoard(board) {
    board.addPiece(new Piece('T', true, 0, 0))
    board.addPiece(new Piece('N', true, 0, 1))
    board.addPiece(new Piece('B', true, 0, 2))
    board.addPiece(new Piece('K', true, 0, 3))
    board.addPiece(new Piece('Q', true, 0, 4))
    board.addPiece(new Piece('B', true, 0, 5))
    board.addPiece(new Piece('N', true, 0, 6))
    board.addPiece(new Piece('T', true, 0, 7))


    board.addPiece(new Piece('P', true, 1, 0))
    board.addPiece(new Piece('P', true, 1, 1))
    board.addPiece(new Piece('P', true, 1, 2))
    board.addPiece(new Piece('P', true, 1, 3))
    board.addPiece(new Piece('P', true, 1, 4))
    board.addPiece(new Piece('P', true, 1, 5))
    board.addPiece(new Piece('P', true, 1, 6))
    board.addPiece(new Piece('P', true, 1, 7))

    board.addPiece(new Piece('T', false, 7, 0))
    board.addPiece(new Piece('N', false, 7, 1))
    board.addPiece(new Piece('B', false, 7, 2))
    board.addPiece(new Piece('K', false, 7, 3))
    board.addPiece(new Piece('Q', false, 7, 4))
    board.addPiece(new Piece('B', false, 7, 5))
    board.addPiece(new Piece('N', false, 7, 6))
    board.addPiece(new Piece('T', false, 7, 7))

    board.addPiece(new Piece('P', false, 6, 0))
    board.addPiece(new Piece('P', false, 6, 1))
    board.addPiece(new Piece('P', false, 6, 2))
    board.addPiece(new Piece('P', false, 6, 3))
    board.addPiece(new Piece('P', false, 6, 4))
    board.addPiece(new Piece('P', false, 6, 5))
    board.addPiece(new Piece('P', false, 6, 6))
    board.addPiece(new Piece('P', false, 6, 7))
}

function createBoard() {
    var matrix = [];

    for (var i = 0; i < 8; i++) {
        matrix[i] = [];
        for (var j = 0; j < 8; j++) {
            matrix[i][j] = new Piece('-', '-', i, j);
        }
    }

    return matrix;
}


const FgWhite = "\x1b[30m%s\x1b[0m"
const FgBlack = "\x1b[37m%s\x1b[0m"

module.exports = Board