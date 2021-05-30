function getWords () {
    const url = 'https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=2000&maxCorpusCount=-1&minDictionaryCount=25&maxDictionaryCount=-1&minLength=3&maxLength=9&limit=10&api_key=ssueiy6cfj5zun3arboit5dht2xa81odz5k3iyrrr281zs73a'
    fetch(url)
        .then (res => res.json())
        .then (data => console.log(data))
    
    return data
}

const words = getWords()

console.log (words)
