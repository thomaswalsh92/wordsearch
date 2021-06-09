//global vars -->

let wordNames = ['apple', 'banana', 'apricot', 'kiwi', 'strawberry'];
// DO NOT CHANGE BOARD SIZE, AS WILL CAUSE CONFLICT WITH EXISTING OBJECT STRUCTURE
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

let BoardState = class {
    constructor (action, params) {
        if (action === 'init') {
            this.board = this.initBoard()
        }

        if (action === 'moveWord') {
            this.board = params.state()
            this.board
        }
    }
    initBoard () {
        return {
        x0: {y0: undefined,
            y1: undefined,
            y2: undefined,
            y3: undefined,
            y4: undefined,
            y5: undefined,
            y6: undefined,
            y7: undefined,
            y8: undefined
            },
        x1: {y0: undefined,
            y1: undefined,
            y2: undefined,
            y3: undefined,
            y4: undefined,
            y5: undefined,
            y6: undefined,
            y7: undefined,
            y8: undefined
            },
        x2: {y0: undefined,
            y1: undefined,
            y2: undefined,
            y3: undefined,
            y4: undefined,
            y5: undefined,
            y6: undefined,
            y7: undefined,
            y8: undefined
            },
        x3: {y0: undefined,
            y1: undefined,
            y2: undefined,
            y3: undefined,
            y4: undefined,
            y5: undefined,
            y6: undefined,
            y7: undefined,
            y8: undefined
        },
        x4: {y0: undefined,
            y1: undefined,
            y2: undefined,
            y3: undefined,
            y4: undefined,
            y5: undefined,
            y6: undefined,
            y7: undefined,
            y8: undefined
            },
        x5: {y0: undefined,
            y1: undefined,
            y2: undefined,
            y3: undefined,
            y4: undefined,
            y5: undefined,
            y6: undefined,
            y7: undefined,
            y8: undefined
            },
        x6: {y0: undefined,
            y1: undefined,
            y2: undefined,
            y3: undefined,
            y4: undefined,
            y5: undefined,
            y6: undefined,
            y7: undefined,
            y8: undefined
            },
        x7: {y0: undefined,
            y1: undefined,
            y2: undefined,
            y3: undefined,
            y4: undefined,
            y5: undefined,
            y6: undefined,
            y7: undefined,
            y8: undefined
            },
        x8: {y0: undefined,
            y1: undefined,
            y2: undefined,
            y3: undefined,
            y4: undefined,
            y5: undefined,
            y6: undefined,
            y7: undefined,
            y8: undefined,
            }
        }
    } 
}
    
    // village state class needs to keep track of the changing state of the 
    //board. 

    // first it will need to be initialised to a blank grid according to the boardsize
    //variable. This will be made from a nested object. 

    //Then, it will need to generate new BoardStates as new words are added and moved to 
    // accomodate each other. 
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
        let thisWord = wordsArr[i]
        thisWord.startPos = randomBoardSquare(boardSize)
        if (clearBoardEdges(thisWord))  {
            console.log ()
        }
    }
}

let words = createWords(wordNames)
placeWord(words, boardSize)
let testWord = words[0]
console.log (testWord)
console.log (clearBoardEdges (testWord, boardSize))


let gameBoard = new BoardState('init')
console.log (gameBoard.board.x4.y4)
