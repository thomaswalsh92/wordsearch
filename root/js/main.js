let Word = class {
    constructor (word) {
        this.direction = Word.getDirection();
        this.word = word
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

let wordNames = ['apple', 'banana', 'apricot', 'kiwi', 'strawberry']

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

console.log(createWords(wordNames))
console.log(createBoard(10))