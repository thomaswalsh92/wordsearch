//global vars -->

let wordNames = ['apple', 'banana', 'apricot', 'kiwi', 'peach'];
// ! DO NOT CHANGE BOARD SIZE, AS WILL CAUSE CONFLICT WITH EXISTING OBJECT STRUCTURE !
let boardSize = 10;


let Word = class {
    constructor (word) {
        this.direction = Word.randomDirection();
        this.text = word
        this.startPos = randomBoardSquare();
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

        if (action === 'placeWord') {
            this.board = this.placeWord(params)
        }
    }

    initBoard () {
        return [
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null]
        ]
    }

    placeWord (params) {
        this.board = params.state
        let word = params.word
        console.log ('the word being placed is: ' + word)
        while (clearBoardEdges(word) === false) {
            word = new Word (word.text)
        }
        let startPosX = word.startPos.x
        let startPos = startPosX[word.startPos.y]
        this.board[startPos] = word.text[0]

    }
}
    // board state class needs to keep track of the changing state of the 
    //board. 

    // first it will need to be initialised to a blank grid according to the boardsize
    //variable. This will be made from a nested object. 

    //Then, it will need to generate new BoardStates as new words are added and moved to 
    //accomodate each other. 

// takes an array and creates word objects from them
function createWords (arr) {
    let result = []
    for (let e in arr) {
        result.push (new Word (arr[e]))
    }
    return result
}

function addWords (state, words) {
    for (let word in words) {
        let newBoard = new BoardState ('placeWord', {word: words[word], state: state})
        state = newBoard
    }
    return state
}

//UTILITY FUNCTIONS > 

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

//when provided a word, this returns an object which provides
//the amount to change co-ordinates by per iteration.
function getPrintDirection (word) {
    switch(word.direction) {
        case 'ttb': 
        return {x: 0, y: -1}   
        case 'rtl': 
        return {x: -1, y: 0}   
        case 'btt':
        return {x: 0, y: 1}   
        case 'ltr':
        return {x: 1, y: 0}     
        default:
        throw new Error ('There was an issue with getPrintDirection')
    }
}



// RUN --> this will need to be a function that can be triggered
// after async action when API is integrated.
let words = createWords(wordNames)
let init = new BoardState('init')

console.log (addWords(init, words))
