module.exports.filterOnlyPieceMovements = function(piece, arrayOfMovements) {
    return arrayOfMovements.filter(movement => movement.prevRow == piece.row && movement.prevColumn == piece.column)
}