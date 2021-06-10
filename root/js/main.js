//GLOBAL VARS

let wordNames = ['apple', 'banana', 'apricot', 'kiwi', 'peach'];
// ! DO NOT CHANGE BOARD SIZE, AS WILL CAUSE CONFLICT WITH EXISTING OBJECT STRUCTURE !
let boardSize = 10;


//CLASS CONSTRUCTORS 
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

    //place word can succesfully create a new board, but needs refactoring to 
    //allow it to create words succesfully and check against previous versions.

    placeWord (params) {
        let board = params.state.board
        console.log ('in PW, the start state is: ' + board)
        let words = params.words
        let firstWord = params.words[0].text
        console.log ('the words are: ' + words)
        console.log ('the first word is: ' + firstWord)
        for (let i = 0; i < words.length; i++) {
            for (let j = 0; j < words[i].text.length; j++) {
                board[i][j] = words[i].text[j]
            }
        }
        console.log (board)
    }
}
    // board state class needs to keep track of the changing state of the 
    //board. 

    // first it will need to be initialised to a blank grid according to the boardsize
    //variable. This will be made from a nested object. 

    //Then, it will need to generate new BoardStates as new words are added and moved to 
    //accomodate each other. 

//MAIN FUNCTIONS

    // uses an array to create a set of words.
    
function createWords (arr) {
    let result = []
    for (let e in arr) {
        result.push (new Word (arr[e]))
    }
    return result
}

function addWords (state, words) {
    let newBoard = new BoardState ('placeWord', {state: state, words: words})
}

function createNewState (state) {
    for (i = 0; i < 10; i++) {
    let newBoard = new BoardState ('createNewState', {state: state, iterator: i})

    }
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
console.log (words)
let init = new BoardState('init')
addWords(init, words)
createNewState(init)
