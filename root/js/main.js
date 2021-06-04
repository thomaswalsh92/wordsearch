const APIurl = 'https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=1750&minDictionaryCount=5&minLength=3&maxLength=9&limit=50&api_key=ssueiy6cfj5zun3arboit5dht2xa81odz5k3iyrrr281zs73a'

function getRandomWord () {
    let wordsArr = fetch(APIurl)
        .then (res => res.json())
        .then (data => console.log(data));
        return wordsArr
}

let Word = class {
    constructor () {
        this.direction = Word.getDirection();
    }

    static getRandomWord () {
        let currentWord = getRandomWord()
        currentWord = getRandomWord[0]
        return currentWord.toUpperCase
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

let word1 = new Word 

console.log (word1)


