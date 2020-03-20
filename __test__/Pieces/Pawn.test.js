const MovementGenerator = require('../../MovementsGenerator')
const Piece = require('../../Domain/Piece')
const Movement = require('../../Domain/Movement')

let board = undefined
let isWhite = true

describe("PAWN TEST WHITE", () => {

    beforeEach(() => {
        board = createBoard()
        isWhite = true
    })
    it("initial move", () => {
        board[1][7] = new Piece('P', true, 1, 7)
        const arrayOfMovements = MovementGenerator.getAllMovements(isWhite, board)
        expect(arrayOfMovements).toHaveLength(2)
        const stringifiedMovements = arrayOfMovements.map(movement => JSON.stringify(movement))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1,7,3,7)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1,7,2,7)))
    });

    it("initial move blocked on 2", () => {
        board[1][7] = new Piece('P', true, 1, 7)
        board[2][7] = new Piece('P', false, 2, 7)
        const arrayOfMovements = MovementGenerator.getAllMovements(isWhite, board)
        expect(arrayOfMovements).toHaveLength(0)
    });

    it("initial move blocked on 3", () => {
        board[1][7] = new Piece('P', true, 1, 7)
        board[3][7] = new Piece('P', false, 3, 7)
        const arrayOfMovements = MovementGenerator.getAllMovements(isWhite, board)
        const stringifiedMovements = arrayOfMovements.map(movement => JSON.stringify(movement))
        expect(arrayOfMovements).toHaveLength(1)
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1,7,2,7)))
    });

    it("test eating on both side or advancing", () => {
        board[1][7] = new Piece('P', true, 1, 6)
        board[2][5] = new Piece('P', false, 2, 5)
        board[2][7] = new Piece('P', false, 2, 7)
        const arrayOfMovements = MovementGenerator.getAllMovements(isWhite, board)
        const stringifiedMovements = arrayOfMovements.map(movement => JSON.stringify(movement))

        expect(arrayOfMovements).toHaveLength(4)
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1,6,2,5)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1,6,2,7)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1,6,2,6)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1,6,3,6)))
    });

    it("test coronating eating and not eating", () => {
        board[6][7] = new Piece('P', true, 6, 7)
        board[7][6] = new Piece('P', false, 7, 6)
        const arrayOfMovements = MovementGenerator.getAllMovements(isWhite, board)
        const stringifiedMovements = arrayOfMovements.map(movement => JSON.stringify(movement))

        expect(arrayOfMovements).toHaveLength(2)
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(6,7,7,7, true)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(6,7,7,6, true)))
    });
});


describe("PAWN TEST BLACK", () => {

    beforeEach(() => {
        board = createBoard()
        isWhite = false
    })
    it("initial move", () => {
        board[6][7] = new Piece('P', false, 6, 7)
        const arrayOfMovements = MovementGenerator.getAllMovements(isWhite, board)
        expect(arrayOfMovements).toHaveLength(2)
        const stringifiedMovements = arrayOfMovements.map(movement => JSON.stringify(movement))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(6,7,5,7)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(6,7,4,7)))
    });

    it("initial move blocked on 5", () => {
        board[6][7] = new Piece('P', false, 6, 7)
        board[5][7] = new Piece('P', true, 5, 7)
        const arrayOfMovements = MovementGenerator.getAllMovements(isWhite, board)
        expect(arrayOfMovements).toHaveLength(0)
    });

    it("initial move blocked on 4", () => {
        board[6][7] = new Piece('P', false, 6, 7)
        board[4][7] = new Piece('P', true, 4, 7)
        const arrayOfMovements = MovementGenerator.getAllMovements(isWhite, board)
        const stringifiedMovements = arrayOfMovements.map(movement => JSON.stringify(movement))
        expect(arrayOfMovements).toHaveLength(1)
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(6,7,5,7)))
    });

    it("test eating on both side or advancing", () => {
        board[6][6] = new Piece('P', false, 6, 6)
        board[5][5] = new Piece('P', true, 5, 5)
        board[5][7] = new Piece('P', true, 5, 7)
        const arrayOfMovements = MovementGenerator.getAllMovements(isWhite, board)
        const stringifiedMovements = arrayOfMovements.map(movement => JSON.stringify(movement))

        expect(arrayOfMovements).toHaveLength(4)
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(6,6,5,6)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(6,6,4,6)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(6,6,5,5)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(6,6,5,7)))
    });

    it("test coronating eating and not eating", () => {
        board[1][7] = new Piece('P', false, 1, 7)
        board[0][6] = new Piece('P', true, 0, 6)
        const arrayOfMovements = MovementGenerator.getAllMovements(isWhite, board)
        const stringifiedMovements = arrayOfMovements.map(movement => JSON.stringify(movement))

        expect(arrayOfMovements).toHaveLength(2)
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1,7,0,7, true)))
        expect(stringifiedMovements).toContain(JSON.stringify(new Movement(1,7,0,6, true)))
    });
});

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