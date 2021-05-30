const apiKey = 'api_key=ssueiy6cfj5zun3arboit5dht2xa81odz5k3iyrrr281zs73a'
const baseUrl = 'https://api.wordnik.com/v4/words.json/randomWord'
const minLength = 'minLength=1'
const maxLength = 'maxLength=4'
const minCorpusCount = 'minCorpusCount=1'
const maxCorpusCount =  'maxCorpusCount=20'

const url = `${baseUrl}?${minLength}&${maxLength}&${apiKey}`
const exampleUrl = 'https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=YOURAPIKEY'
fetch(url)
    .then (res => res.json())
    .then (data => console.log(data))

    