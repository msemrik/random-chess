const Piece = require('./Domain/Piece')
const MovementGenerator = require('./MovementsGenerator')
const Board = require('./Domain/Board')

let sleepInMiliseconds = 1

async function main() {
    let white = 0
    let black = 0
    let tie = 0
    for(let i =0; i< 100; i++){
        const result = await playOnce()
        if(result === 'W') {white++}
        else if(result === 'B') {black++}
        else if(result === 'T') {tie++}
    }

    console.log(`Whites ${white} Black ${black} Tie ${tie}`)
}

async function playOnce() {
    let board = new Board()
    // board.printBoard()

    let playWhite = true;

    let moreThanTwoPieces = true
    let posibleMovements = true
    let counter = 0

    while (posibleMovements && moreThanTwoPieces) {
        // console.log('\n')
        const movements = MovementGenerator.getValidMovement(playWhite, board)

        if(movements.length > 0) {
            board.executeMovement(getRandomMovement(movements))
            playWhite = !playWhite
        } else {
            posibleMovements = false
        }

        // board.printBoard()
        counter++
        moreThanTwoPieces = board.moreThanTwoPieces()
        // await sleep(sleepInMiliseconds)
    }

    if(!moreThanTwoPieces) {return 'T'}
    const kingPiece = board.findKing(playWhite)
    if(kingPiece.type.isInValidPosition(playWhite, kingPiece, board.board)) {
        return 'T'
    } else {
        return playWhite ? 'B' : 'W'
    }

}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomMovement(movements) {
    return movements[Math.floor(Math.random() * movements.length)]
}
main()



