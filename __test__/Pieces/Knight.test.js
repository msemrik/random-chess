const MovementGenerator = require('../../MovementsGenerator')
const Piece = require('../../Domain/Piece')
const Movement = require('../../Domain/Movement')
const TestUtils = require('./TestUtils')

let board = undefined
let isWhite = true

describe("KNIGHT TEST", () => {

    beforeEach(() => {
        board = createBoard()
        isWhite = true
    })

    it("free move", () => {
        const piece = new Piece('N', true, 2, 2)
        board[2][2] = piece
        const arrayOfMovements = MovementGenerator.getAllMovements(isWhite, board)
        expect(arrayOfMovements).toHaveLength(8)
        const stringifiedMovements = arrayOfMovements.map(movement => JSON.stringify(movement))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 4, 3)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 3, 4)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 1, 4)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 0, 3)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 0, 1)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 1, 0)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 3, 0)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 4, 1)))
    });

    it("no move", () => {
        const piece = new Piece('N', true, 2, 2)
        board[2][2] = piece
        board[4][3] = new Piece('P', true, 4, 3)
        board[3][4] = new Piece('P', true, 3, 4)
        board[1][4] = new Piece('P', true, 1, 4)
        board[0][3] = new Piece('P', true, 0, 3)
        board[0][1] = new Piece('P', true, 0, 1)
        board[1][0] = new Piece('P', true, 1, 0)
        board[3][0] = new Piece('P', true, 3, 0)
        board[4][1] = new Piece('P', true, 4, 1)
        let arrayOfMovements = MovementGenerator.getAllMovements(isWhite, board)
        arrayOfMovements = TestUtils.filterOnlyPieceMovements(piece, arrayOfMovements)
        expect(arrayOfMovements).toHaveLength(0)
    });

    it("corner no move", () => {
        const piece = new Piece('N', true, 0, 0)
        board[0][0] = piece
        board[2][1] = new Piece('P', true, 2, 1)
        board[1][2] = new Piece('P', true, 1, 2)
        let arrayOfMovements = MovementGenerator.getAllMovements(isWhite, board)
        arrayOfMovements = TestUtils.filterOnlyPieceMovements(piece, arrayOfMovements)
        expect(arrayOfMovements).toHaveLength(0)
    });

    it("only eating", () => {
        const piece = new Piece('N', true, 2, 2)
        board[2][2] = piece
        board[4][3] = new Piece('P', false, 4, 3)
        board[3][4] = new Piece('P', false, 3, 4)
        board[1][4] = new Piece('P', false, 1, 4)
        board[0][3] = new Piece('P', false, 0, 3)
        board[0][1] = new Piece('P', false, 0, 1)
        board[1][0] = new Piece('P', false, 1, 0)
        board[3][0] = new Piece('P', false, 3, 0)
        board[4][1] = new Piece('P', false, 4, 1)

        let arrayOfMovements = MovementGenerator.getAllMovements(isWhite, board)
        arrayOfMovements = TestUtils.filterOnlyPieceMovements(piece, arrayOfMovements)
        const stringifiedMovements = arrayOfMovements.map(movement => JSON.stringify(movement))
        expect(arrayOfMovements).toHaveLength(8)
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 4, 3)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 3, 4)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 1, 4)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 0, 3)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 0, 1)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 1, 0)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 3, 0)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 4, 1)))
    });

    it("only eating and one movement", () => {
        const piece = new Piece('N', true, 2, 2)
        board[2][2] = piece
        board[3][4] = new Piece('P', false, 3, 4)
        board[1][4] = new Piece('P', false, 1, 4)
        board[0][3] = new Piece('P', false, 0, 3)
        board[0][1] = new Piece('P', false, 0, 1)
        board[1][0] = new Piece('P', false, 1, 0)
        board[3][0] = new Piece('P', false, 3, 0)
        board[4][1] = new Piece('P', false, 4, 1)

        let arrayOfMovements = MovementGenerator.getAllMovements(isWhite, board)
        arrayOfMovements = TestUtils.filterOnlyPieceMovements(piece, arrayOfMovements)
        const stringifiedMovements = arrayOfMovements.map(movement => JSON.stringify(movement))
        expect(arrayOfMovements).toHaveLength(8)
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 4, 3)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 3, 4)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 1, 4)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 0, 3)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 0, 1)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 1, 0)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 3, 0)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(2, 2, 4, 1)))
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