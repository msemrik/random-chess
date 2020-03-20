let picesObject = {}

function getPicesObject(){
    if(Object.keys(picesObject).length === 0) {
        loadPicesObject()
    }

    return picesObject
}
getPicesObject()


async function loadPicesObject() {
    picesObject = {}

    var normalizedPath = __dirname
    await require("fs").readdirSync(normalizedPath).forEach(function (file) {
        if(file != 'piecesObject.js'){
            let piece = require('./' + file);
            picesObject[piece.symbol] = piece
        }
    });
}

module.exports = picesObject