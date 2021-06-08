//global vars -->

let wordNames = ['apple', 'banana', 'apricot', 'kiwi', 'strawberry'];
let boardSize = 10;


let Word = class {
    constructor (word) {
        this.direction = Word.randomDirection();
        this.text = word
        this.startPos = {x: null, y: null}
    }

    static randomDirection () {
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


// takes an array and creates word objects from them
function createWords (arr) {
    let result = []
    for (let e in arr) {
        result.push (new Word (arr[e]))
    }
    return result
}

// builds a board based on the boardSize global var
function createBoard () {
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

//used to find a random co-ordinate on the board
function randomBoardSquare () {
    let x = Math.floor(Math.random() * boardSize)
    let y = Math.floor(Math.random() * boardSize)
    return {x: x, y: y}
}

//returns true if a word clears the boards edge
function clearBoardEdges (word) {
    switch(word.direction) {
        case 'ttb':    
            if (((word.startPos.y + 1) + word.text.length) >= boardSize) {
                return true
            } else {
                return false
            }
        case 'rtl':
            if (((word.startPos.x + 1) + word.text.length) >= boardSize) {
                return true
            } else {
                return false
            }
        case 'btt':
            if (((word.startPos.y + 1) + word.text.length) < boardSize) {
                return true
            } else {
                return false
            }
        case 'ltr':
            if (((word.startPos.y + 1) + word.text.length) < boardSize) {
                return true
            } else {
                return false
            }
        default:
            throw new Error ('There was an issue with clearBoardEdges')
    }
}

function checkWordConflict (word) {
    
}

// if both clear board edge and no word conflict functions eval as true, then function
// can 'write' the word to the board state. 

// if eval as false, function needs to re randomise position and try again. 
function placeWord (wordsArr) { 
    for (i = 0; i < wordsArr.length; i++) {
        let thisWord = wordsArr[word]
        thisWord.startPos = randomBoardSquare(boardSize)
        if (clearBoardEdges(thisWord))  {
            if (noWordConflict(thisWord)) {
                //write to board state here
            }
            // check and slide function would happen here
        }
        // randomise position would happen here
    }
}

let words = createWords(wordNames)
placeWord(words, boardSize)
let testWord = words[0]
createBoard()
console.log (testWord)
console.log (clearBoardEdges (testWord, boardSize))
