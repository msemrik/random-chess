const MovementGenerator = require('../../MovementsGenerator')
const Piece = require('../../Domain/Piece')
const Board = require('../../Domain/Board')
const Movement = require('../../Domain/Movement')
const TestUtils = require('./TestUtils')

let board = undefined
let isWhite = true

describe("KING MOVEMENT TEST", () => {

    beforeEach(() => {
        board = new Board(createBoard())
        isWhite = true
    })

    it("free move", () => {
        const piece = new Piece('K', true, 2, 2)
        board.addPiece(piece)
        const arrayOfMovements = MovementGenerator.getAllMovements(isWhite, board.board)
        expect(arrayOfMovements).toHaveLength(8)
        const stringifiedMovements = arrayOfMovements.map(movement => JSON.stringify(movement))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 3, 2)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 3, 3)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 2, 3)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 1, 3)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 1, 2)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 1, 1)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 2, 1)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 3, 1)))
    });

    it("no move", () => {
        const piece = new Piece('K', true, 2, 2)
        board.addPiece(piece)
        board.addPiece(new Piece('P', true, 3, 2))
        board.addPiece(new Piece('P', true, 3, 3))
        board.addPiece(new Piece('P', true, 2, 3))
        board.addPiece(new Piece('P', true, 1, 3))
        board.addPiece(new Piece('P', true, 1, 2))
        board.addPiece(new Piece('P', true, 1, 1))
        board.addPiece(new Piece('P', true, 2, 1))
        board.addPiece(new Piece('P', true, 3, 1))
        let arrayOfMovements = MovementGenerator.getAllMovements(isWhite, board.board)
        arrayOfMovements = TestUtils.filterOnlyPieceMovements(piece, arrayOfMovements)
        expect(arrayOfMovements).toHaveLength(0)
    });

    it("corner no move", () => {
        const piece = new Piece('K', true, 0, 0)
        board.addPiece(piece)
        board.addPiece(new Piece('P', true, 0, 1))
        board.addPiece(new Piece('P', true, 1, 1))
        board.addPiece(new Piece('P', true, 1, 0))
        let arrayOfMovements = MovementGenerator.getAllMovements(isWhite, board.board)
        arrayOfMovements = TestUtils.filterOnlyPieceMovements(piece, arrayOfMovements)
        expect(arrayOfMovements).toHaveLength(0)
    });

    it("only eating", () => {
        const piece = new Piece('K', true, 2, 2)
        board.addPiece(piece)
        board.addPiece(new Piece('P', false, 3, 2))
        board.addPiece(new Piece('P', false, 3, 3))
        board.addPiece(new Piece('P', false, 2, 3))
        board.addPiece(new Piece('P', false, 1, 3))
        board.addPiece(new Piece('P', false, 1, 2))
        board.addPiece(new Piece('P', false, 1, 1))
        board.addPiece(new Piece('P', false, 2, 1))
        board.addPiece(new Piece('P', false, 3, 1))
        let arrayOfMovements = MovementGenerator.getAllMovements(isWhite, board.board)
        arrayOfMovements = TestUtils.filterOnlyPieceMovements(piece, arrayOfMovements)
        const stringifiedMovements = arrayOfMovements.map(movement => JSON.stringify(movement))
        expect(arrayOfMovements).toHaveLength(8)
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 3, 2)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 3, 3)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 2, 3)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 1, 3)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 1, 2)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 1, 1)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 2, 1)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 3, 1)))
    });

    it("only eating and one movement", () => {
        const piece = new Piece('K', true, 2, 2)
        board.addPiece(piece)
        board.addPiece(new Piece('P', false, 3, 2))
        board.addPiece(new Piece('P', false, 2, 3))
        board.addPiece(new Piece('P', false, 1, 3))
        board.addPiece(new Piece('P', false, 1, 2))
        board.addPiece(new Piece('P', false, 1, 1))
        board.addPiece(new Piece('P', false, 2, 1))
        board.addPiece(new Piece('P', false, 3, 1))
        let arrayOfMovements = MovementGenerator.getAllMovements(isWhite, board.board)
        arrayOfMovements = TestUtils.filterOnlyPieceMovements(piece, arrayOfMovements)
        const stringifiedMovements = arrayOfMovements.map(movement => JSON.stringify(movement))
        expect(arrayOfMovements).toHaveLength(8)
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 3, 2)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 3, 3)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 2, 3)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 1, 3)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 1, 2)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 1, 1)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 2, 1)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 3, 1)))
    });
})

describe("KING THREATEN TEST", () => {

    beforeEach(() => {
        board = createBoard()
        isWhite = true
    })

    it("no other piece", () => {
        const piece = new Piece('K', true, 2, 2)
        board[2][2] = piece
        expect(piece.type.isInValidPosition(isWhite, piece, board)).toBe(true)
    });

    it("vertical same color 'hiding' threat", () => {
        const piece = new Piece('K', true, 2, 2)
        board[2][2] = piece
        board[3][2] = new Piece('P', true, 3, 2)
        board[4][2] = new Piece('T', false, 4, 2)
        board[1][2] = new Piece('P', true, 1, 2)
        board[0][2] = new Piece('T', false, 0, 2)

        expect(piece.type.isInValidPosition(isWhite, piece, board)).toBe(true)
    });

    it("vertical same color 'hiding' threat", () => {
        const piece = new Piece('K', true, 2, 2)
        board[2][2] = piece
        board[3][2] = new Piece('P', true, 3, 2)
        board[4][2] = new Piece('T', false, 4, 2)
        board[1][2] = new Piece('P', true, 1, 2)
        board[0][2] = new Piece('T', false, 0, 2)

        expect(piece.type.isInValidPosition(isWhite, piece, board)).toBe(true)
    });


    it("horizontal threat", () => {
        const piece = new Piece('K', true, 2, 2)
        board[2][2] = piece
        board[2][4] = new Piece('T', false, 2, 4)
        expect(piece.type.isInValidPosition(isWhite, piece, board)).toBe(false)
    });

    it("vertical threat", () => {
        const piece = new Piece('K', true, 2, 2)
        board[2][2] = piece
        board[3][2] = new Piece('Q', false, 3, 2)
        expect(piece.type.isInValidPosition(isWhite, piece, board)).toBe(false)
    });

    it("squarly not threatened by other king", () => {
        const piece = new Piece('K', true, 2, 2)
        board[2][2] = piece
        board[4][2] = new Piece('K', false, 4, 2)
        expect(piece.type.isInValidPosition(isWhite, piece, board)).toBe(true)
    });

    it("squarly threatened by other king", () => {
        const piece = new Piece('K', true, 2, 2)
        board[2][2] = piece
        board[3][2] = new Piece('K', false, 3, 2)
        expect(piece.type.isInValidPosition(isWhite, piece, board)).toBe(false)
    });






    it("upper diagonal same color 'hiding' threat", () => {
        const piece = new Piece('K', true, 2, 2)
        board[2][2] = piece
        board[4][4] = new Piece('P', true, 4, 4)
        board[5][5] = new Piece('B', false, 5, 5)
        board[3][1] = new Piece('P', true, 3, 1)
        board[4][0] = new Piece('B', false, 4, 0)

        expect(piece.type.isInValidPosition(isWhite, piece, board)).toBe(true)
    });

    it("lower diagonal same color 'hiding' threat", () => {
        const piece = new Piece('K', true, 2, 2)
        board[2][2] = piece
        board[1][1] = new Piece('P', true, 1, 1)
        board[0][0] = new Piece('Q', false, 0, 0)
        board[1][3] = new Piece('P', true, 1, 3)
        board[0][4] = new Piece('Q', false, 0, 4)

        expect(piece.type.isInValidPosition(isWhite, piece, board)).toBe(true)
    });


    it("upper diagonal threat", () => {
        const piece = new Piece('K', true, 2, 2)
        board[2][2] = piece
        board[4][0] = new Piece('B', false, 4, 0)

        expect(piece.type.isInValidPosition(isWhite, piece, board)).toBe(false)
    });

    it("lower diagonal same color 'hiding' threat", () => {
        const piece = new Piece('K', true, 2, 2)
        board[2][2] = piece
        board[0][4] = new Piece('Q', false, 0, 4)

        expect(piece.type.isInValidPosition(isWhite, piece, board)).toBe(false)
    });

    it("diagonally not threatened by other king", () => {
        const piece = new Piece('K', true, 2, 2)
        board[2][2] = piece
        board[4][4] = new Piece('K', false, 4, 4)
        expect(piece.type.isInValidPosition(isWhite, piece, board)).toBe(true)
    });

    it("diagonally threatened by other king", () => {
        const piece = new Piece('K', true, 2, 2)
        board[2][2] = piece
        board[3][3] = new Piece('K', false, 3, 3)
        expect(piece.type.isInValidPosition(isWhite, piece, board)).toBe(false)
    });

    it("black pawns not threatening", () => {
        const piece = new Piece('K', false, 3, 3)
        board[3][3] = piece
        board[4][3] = new Piece('P', true, 4, 3)
        board[4][4] = new Piece('P', true, 4, 4)
        board[3][4] = new Piece('P', true, 3, 4)
        board[2][5] = new Piece('P', true, 2, 5)
        board[1][5] = new Piece('P', true, 1, 5)
        board[2][3] = new Piece('P', true, 2, 3)
        board[1][1] = new Piece('P', true, 1, 1)
        board[2][1] = new Piece('P', true, 2, 1)
        board[3][2] = new Piece('P', true, 3, 2)
        board[4][2] = new Piece('P', true, 4, 2)
        new Board(board).printBoard()
        expect(piece.type.isInValidPosition(false, piece, board)).toBe(true)
    });

    it("white left pawns threatening", () => {
        const piece = new Piece('K', true, 3, 3)
        board[3][3] = piece
        board[4][2] = new Piece('P', false, 4, 2)
        new Board(board).printBoard()
        expect(piece.type.isInValidPosition(isWhite, piece, board)).toBe(false)
    });

    it("white right pawns threatening", () => {
        const piece = new Piece('K', true, 3, 3)
        board[3][3] = piece
        board[4][4] = new Piece('P', false, 4, 4)
        new Board(board).printBoard()
        expect(piece.type.isInValidPosition(isWhite, piece, board)).toBe(false)
    });

    it("black left pawns threatening", () => {
        const piece = new Piece('K', false, 3, 3)
        board[3][3] = piece
        board[2][2] = new Piece('P', true, 2, 2)
        new Board(board).printBoard()
        expect(piece.type.isInValidPosition(false, piece, board)).toBe(false)
    });

    it("black right pawns threatening", () => {
        const piece = new Piece('K', false, 3, 3)
        board[3][3] = piece
        board[2][4] = new Piece('P', true, 2, 4)
        new Board(board).printBoard()
        expect(piece.type.isInValidPosition(false, piece, board)).toBe(false)
    });











    it("knights not threatening", () => {
        board = createBoard('N')
        const piece = new Piece('K', false, 3, 3)
        board[3][3] = piece
        board[5][4] = new Piece('P', true, 5, 4)
        board[4][5] = new Piece('P', true, 4, 5)
        board[2][5] = new Piece('P', true, 2, 5)
        board[1][4] = new Piece('P', true, 1, 4)
        board[1][2] = new Piece('P', true, 1, 2)
        board[2][1] = new Piece('P', true, 2, 1)
        board[4][1] = new Piece('P', true, 4, 1)
        board[5][2] = new Piece('P', true, 5, 2)
        new Board(board).printBoard()
        expect(piece.type.isInValidPosition(false, piece, board)).toBe(true)
    });

    it("knights threatening", () => {
        board = createBoard()
        const piece = new Piece('K', false, 3, 3)
        board[3][3] = piece
        board[5][4] = new Piece('N', true, 5, 4)
        expect(piece.type.isInValidPosition(false, piece, board)).toBe(false)
        board[5][4] = new Piece('-', true, 5, 4)
        expect(piece.type.isInValidPosition(false, piece, board)).toBe(true)

        board[4][5] = new Piece('N', true, 4, 5)
        expect(piece.type.isInValidPosition(false, piece, board)).toBe(false)
        board[4][5] = new Piece('-', true, 4, 5)
        expect(piece.type.isInValidPosition(false, piece, board)).toBe(true)


        board[2][5] = new Piece('N', true, 2, 5)
        expect(piece.type.isInValidPosition(false, piece, board)).toBe(false)
        board[2][5] = new Piece('-', true, 2, 5)
        expect(piece.type.isInValidPosition(false, piece, board)).toBe(true)


        board[1][4] = new Piece('N', true, 1, 4)
        expect(piece.type.isInValidPosition(false, piece, board)).toBe(false)
        board[1][4] = new Piece('-', true, 1, 4)
        expect(piece.type.isInValidPosition(false, piece, board)).toBe(true)

        board[2][1] = new Piece('N', true, 2, 1)
        expect(piece.type.isInValidPosition(false, piece, board)).toBe(false)
        board[2][1] = new Piece('-', true, 2, 1)
        expect(piece.type.isInValidPosition(false, piece, board)).toBe(true)

        board[4][1] = new Piece('N', true, 4, 1)
        expect(piece.type.isInValidPosition(false, piece, board)).toBe(false)
        board[4][1] = new Piece('-', true, 4, 1)
        expect(piece.type.isInValidPosition(false, piece, board)).toBe(true)

        board[5][2] = new Piece('N', true, 5, 2)
        expect(piece.type.isInValidPosition(false, piece, board)).toBe(false)
        board[5][2] = new Piece('-', true, 5, 2)
        expect(piece.type.isInValidPosition(false, piece, board)).toBe(true)
    });







})


function createBoard(type) {
    var matrix = [];

    for (var i = 0; i < 8; i++) {
        matrix[i] = [];
        for (var j = 0; j < 8; j++) {
            matrix[i][j] = new Piece(type? type : '-', '-', i, j);
        }
    }

    return matrix;
}