//global vars -->

let wordNames = ['apple', 'banana', 'apricot', 'kiwi', 'strawberry'];
let boardSize = 10;


let Word = class {
    constructor (word) {
        this.direction = Word.getDirection();
        this.word = word
        this.startPos = {x: null, y: null}
    }

    static getDirection () {
        let value = Math.floor(Math.random()*4)
        switch(value) {
            case 0:
            return "ttb"
            case 1:
            return "rtl"
            case 2:
            return "btt"
            case 3:
            return "ltr"
        }
    }
}



// takes an array and creates 
function createWords (arr) {
    let result = []
    for (let e in arr) {
        result.push (new Word (arr[e]))
    }
    return result
}

function createBoard (boardSize) {
    let result = {
        rows: []
    }
    for (i = 0; i < boardSize; i++) {
        result.rows.push([])
    }
    for (j = 0; j < boardSize; j++) {
        let thisRow = result.rows[j]
        for (k = 0; k < boardSize; k++) { 
            thisRow.push(k)
        }
    }
    return result
}

function randomBoardSquare (boardSize) {
    let x = Math.floor(Math.random() * boardSize)
    let y = Math.floor(Math.random() * boardSize)
    return {x: x, y: y}
}

function directionHelper (word) {
    switch(word.directionHelper) {
        case 'ttb':
    
        break;
        case 'rtl':

        break;
        case 'btt':

        break;
        case 'ltr':

        break;
        default:
    // code block
}
    
}
function clearBoardEdges (word, startPos) {
    let dir = directionHelper(word)

}


function placeWord (wordsArr, boardSize) { 
    for (word in wordsArr) {
        wordsArr[word].startPos = randomBoardSquare(boardSize)
        // checks for board edges next
        // then checks for conflicts with other words and slides if poss/
        // if a false is received for either above, the function calls recursively
        // and tries again to place the word. 

    }
}

let words = createWords(wordNames)
console.log(placeWord(words, 10))



