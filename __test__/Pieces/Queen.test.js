    const MovementGenerator = require('../../MovementsGenerator')
const Piece = require('../../Domain/Piece')
const Movement = require('../../Domain/Movement')
const TestUtils = require('./TestUtils')

let board = undefined
let isWhite = true

describe("QUEEN TEST", () => {

    beforeEach(() => {
        board = createBoard()
        isWhite = true
    })

    it("free move", () => {
        const piece = new Piece('Q', true, 1, 1)
        board[1][1] = piece
        const arrayOfMovements = MovementGenerator.getAllMovements(isWhite, board)
        expect(arrayOfMovements).toHaveLength(23)
        const stringifiedMovements = arrayOfMovements.map(movement => JSON.stringify(movement))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 1, 0)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 1, 2)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 1, 3)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 1, 4)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 1, 5)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 1, 6)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 1, 7)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 0, 1)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 2, 1)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 3, 1)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 4, 1)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 5, 1)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 6, 1)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 7, 1)))

        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 0, 0)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 2, 2)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 3, 3)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 4, 4)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 5, 5)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 6, 6)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 7, 7)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 0, 2)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 2, 0)))
    });

    it("no move", () => {
        const piece = new Piece('Q', true, 1, 1)
        board[1][1] = piece
        board[0][1] = new Piece('P', true, 0, 1)
        board[2][1] = new Piece('P', true, 2, 1)
        board[1][0] = new Piece('P', true, 1, 0)
        board[1][2] = new Piece('P', true, 1, 2)

        board[0][0] = new Piece('P', true, 0, 0)
        board[2][2] = new Piece('P', true, 2, 2)
        board[0][2] = new Piece('P', true, 0, 2)
        board[2][0] = new Piece('P', true, 2, 0)
        let arrayOfMovements = MovementGenerator.getAllMovements(isWhite, board)
        arrayOfMovements = TestUtils.filterOnlyPieceMovements(piece, arrayOfMovements)
        expect(arrayOfMovements).toHaveLength(0)
    });

    it("corner no move", () => {
        const piece = new Piece('Q', true, 0, 0)
        board[0][0] = piece
        board[0][1] = new Piece('P', true, 0, 1)
        board[1][0] = new Piece('P', true, 1, 0)
        board[1][1] = new Piece('P', true, 1, 1)
        let arrayOfMovements = MovementGenerator.getAllMovements(isWhite, board)
        arrayOfMovements = TestUtils.filterOnlyPieceMovements(piece, arrayOfMovements)
        expect(arrayOfMovements).toHaveLength(0)
    });

    it("only eating", () => {
        const piece = new Piece('Q', true, 1, 1)
        board[1][1] = piece
        board[0][1] = new Piece('P', false, 0, 1)
        board[2][1] = new Piece('P', false, 2, 1)
        board[1][0] = new Piece('P', false, 1, 0)
        board[1][2] = new Piece('P', false, 1, 2)

        board[0][0] = new Piece('P', false, 0, 0)
        board[2][2] = new Piece('P', false, 2, 2)
        board[0][2] = new Piece('P', false, 0, 2)
        board[2][0] = new Piece('P', false, 2, 0)
        let arrayOfMovements = MovementGenerator.getAllMovements(isWhite, board)
        arrayOfMovements = TestUtils.filterOnlyPieceMovements(piece, arrayOfMovements)
        const stringifiedMovements = arrayOfMovements.map(movement => JSON.stringify(movement))
        expect(arrayOfMovements).toHaveLength(8)
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 0, 1)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 2, 1)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 1, 0)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 1, 2)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 0, 0)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 2, 2)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 0, 2)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 2, 0)))
    });

    it("only eating and one movement", () => {
        const piece = new Piece('Q', true, 1, 1)
        board[1][1] = piece
        board[0][1] = new Piece('P', false, 0, 1)
        board[2][1] = new Piece('P', false, 2, 1)
        board[1][0] = new Piece('P', false, 1, 0)
        board[1][2] = new Piece('P', false, 1, 2)

        board[0][0] = new Piece('P', false, 0, 0)
        board[3][3] = new Piece('P', false, 3, 3)
        board[0][2] = new Piece('P', false, 0, 2)
        board[2][0] = new Piece('P', false, 2, 0)
        let arrayOfMovements = MovementGenerator.getAllMovements(isWhite, board)
        arrayOfMovements = TestUtils.filterOnlyPieceMovements(piece, arrayOfMovements)
        const stringifiedMovements = arrayOfMovements.map(movement => JSON.stringify(movement))
        expect(arrayOfMovements).toHaveLength(9)
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 0, 1)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 2, 1)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 1, 0)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 1, 2)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 0, 0)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 2, 2)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 3, 3)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 0, 2)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1, 1, 2, 0)))
    });
})


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