//GLOBAL VARS

let wordNames = ['apple', 'banana', 'apricot', 'kiwi', 'peach'];
// ! DO NOT CHANGE BOARD SIZE, AS WILL CAUSE CONFLICT WITH EXISTING OBJECT STRUCTURE ! 
// ! Will be refactored later ! // 
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

    // BoardState class and associated methods are used only to generate new states board state objects. 
    // Checking should be done by functions with the assumption that BoardState constructor always handed
    // valid data. 
let BoardState = class {
    constructor (action, params) {
        if (action === 'init') {
            this.board = this.initBoard()
        }

        if (action === 'placeWords') {
            this.board = this.placeWords(params)
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

  
        // placeWord can now place words in the words object based on their randomly generated
        // start position and direction. One draw back of the method at the moment is that when
        // it encouters a word conflict it will overwrite words. 
    placeWords (params) {
        let board = params.state.board
        let words = params.words
        for (let i = 0; i < words.length; i++) {
            let thisWord = words[i]    
            let coOrd = thisWord.startPos
            let printDir = getPrintDirection(thisWord)
            for (let j = 0; j < thisWord.text.length; j++) {
                console.log ('j loop')
                board[coOrd.x][coOrd.y] = thisWord.text[j]
                coOrd.x = coOrd.x + printDir.x
                coOrd.y = coOrd.y + printDir.y
            }
        }
        console.log (board)
    }
}
    


//MAIN FUNCTIONS - these are used for general program actions e.g. creating /processing word data. 

    // uses an array to create a set of words.
function createWords (arr) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        let thisWord = new Word(arr[i])
        if (!clearBoardEdges(thisWord)) {
            console.log (`arr${i} failed: trying again`)
            i --
        } else if (clearBoardEdges(thisWord)) {
            result.push(thisWord)
            console.log (`arr${i} passed, pushed to array`)
        } 
    }
    return result
} 
    // adds a words object created in createWords to create a new board state
function addWords (state, words) {
    let newBoard = new BoardState ('placeWords', {state: state, words: words})
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
            if (word.text.length <= word.startPos.y + 1) {
                return true
            } else {
                return false
            }
        case 'rtl':
            if (word.text.length <= word.startPos.x + 1) {
                return true
            } else {
                return false
            }
        case 'btt':
            if ((word.startPos.y + 1 + word.text.length) <= boardSize) {
                return true
            } else {
                return false
            }
        case 'ltr':
            if ((word.startPos.x + 1 + word.text.length) <= boardSize) {
                return true
            } else {
                return false
            }
        default:
            throw new Error ('There was an issue with clearBoardEdges')
    }
}

    //when provided a word, this returns an object which provides
    //the amount to change co-ordinates by per iteration to allow printing
    //onto the board.
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
