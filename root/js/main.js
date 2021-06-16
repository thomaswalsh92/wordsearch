//GLOBAL VARS

let wordNames = ['apple', 'banana', 'apricot', 'kiwi', 'peach'];
// ! DO NOT CHANGE BOARD SIZE, AS WILL CAUSE CONFLICT WITH EXISTING OBJECT STRUCTURE ! 
// ! Will be refactored later ! 
// ! UI also needs to be redesigned to account for anything other than a 10 x 10 grid ! 
let boardSize = 10;


//CLASS CONSTRUCTORS 
let Word = class {
    constructor (word) {
        this.direction = Word.randomDirection();
        this.text = word.toUpperCase();
        this.startPos = randomBoardSquare();
        this.coordinates = this.createCoordinates();
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

    createCoordinates () {
        let result = []
        let printDir = getPrintDirection(this)
        let startPos = this.startPos
        let coord = {x: startPos.x, y: startPos.y}
        for (let i = 0; i < this.text.length; i++) {
            result.push ({x: coord.x, y: coord.y})
            coord.x = coord.x + printDir.x
            coord.y = coord.y + printDir.y
        }
        return result
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

        // Init board method can now place random letters instead of spaces
        // by uncommenting below line. 
    initBoard () {
        let board = []
        for (let i = 0; i < boardSize; i++) {
            board.push([])
            for (let j = 0; j < boardSize; j++) {
                //board[i].push(randomLetter())
                board[i].push (' ')
            }
        }
        return board 
    }

    placeWords (params) {
        let board = params.state.board
        let words = params.words
        for (let i = 0; i < words.length; i++) {
            let thisWord = words[i]    
            let startPos = thisWord.startPos
            let coord = {x: startPos.x, y: startPos.y}
            let printDir = getPrintDirection(thisWord)
            for (let j = 0; j < thisWord.text.length; j++) {
                board[coord.x][coord.y] = thisWord.text[j]
                coord.x = coord.x + printDir.x
                coord.y = coord.y + printDir.y
            }
        }
        return board
    }
}
    


//MAIN FUNCTIONS - these are used for general program actions e.g. creating /processing word data. 

    // uses an array to create a set of words.
function createWords (arr) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        let thisWord = new Word(arr[i])
        if ((!clearBoardEdges(thisWord))) {
            i --
            console.log ('board edges fail')
        } else if ((!clearOtherWords(thisWord, result))) {
            i --
            console.log ('other words fail')
        } else {
            result.push (thisWord)
        }
    }
    return result
} 
    // adds a words object created in createWords to create a new board state
function addWordsToBoard (state, words) {
    let newBoard = new BoardState ('placeWords', {state: state, words: words})
    return newBoard
}
    
function printStateToDom (state) {
    let board = document.getElementsByClassName("word-board-container")
    for (let i = 0; i < boardSize; i++) {
        let x = board[0].children[i]
        for (let j = 0; j < boardSize; j++) {
            let revCount = boardSize - (j + 1)
            let y = x.children[j]
            let thisLetter = state.board[i][j]
            y.innerText = thisLetter
        }
    }
}

//UTILITY FUNCTIONS > 

    //used to find a random co-ordinate on the board
function randomBoardSquare () {
    let x = Math.floor(Math.random() * boardSize)
    let y = Math.floor(Math.random() * boardSize)
    return {x: x, y: y}
}

function randomLetter () {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let num = Math.floor(Math.random() * chars.length)
    let choice = chars[num]
    return choice
}


    //returns true if a word clears the boards edge
function clearBoardEdges (word) {
    switch(word.direction) {
        case 'ttb':    
            if ((word.startPos.y + 1 + word.text.length) <= boardSize) {
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
            if (word.text.length <= word.startPos.y + 1) {
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

    //returns true as long as a word is not sharing any 
    //coordinates with another word
function clearOtherWords (word, array) {
    for (let j = 0; j < array.length; j++) {
        let compare = array[j]
        for (let k = 0; k < word.coordinates.length; k++) {
            let wordCoord = word.coordinates[k]
            for (let l = 0; l < compare.coordinates.length; l++) {
                let compareCoord = compare.coordinates[l]
                if ((wordCoord.x === compareCoord.x) && (wordCoord.y === compareCoord.y)) {
                    return false
                }
            }
        }
    }
    return true 
}
    //when provided a word, this returns an object which provides
    //the amount to change co-ordinates by per iteration to allow printing
    //onto the board.
function getPrintDirection (word) {
    switch(word.direction) {
        case 'ttb': 
        return {x: 0, y: 1}   
        case 'rtl': 
        return {x: -1, y: 0}   
        case 'btt':
        return {x: 0, y: -1}   
        case 'ltr':
        return {x: 1, y: 0}     
        default:
        throw new Error ('There was an issue with getPrintDirection')
    }
}


    // RUN --> this will need to be a function that can be triggered
    // after async action when API is integrated.
let words = createWords(wordNames)
console.log ('inital value of words is: ', words)
//let pear = new Word ("pear")
//console.log (pear)
//console.log(clearOtherWords(pear, words))
let init = new BoardState('init')
let wordsAdded = addWordsToBoard(init, words)
printStateToDom (wordsAdded)


