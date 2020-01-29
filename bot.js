console.log('Hello Brendan');

//Imports----------------------------------
var config = require ('./config') //file containing twitter api keys
var Twit = require('twit')
const wordOfTheDay = require('words-of-the-day')
//-----------------------------------------

//Variables
var T = new Twit(config);

//setInterval(postTweet,1000*60*60*24)

postTweet()

//Connects to WordThink API and retrieves word, type, and definition
function postTweet(){
    wordOfTheDay.wordThink().then(data =>{

        var tweet = {
            status: data.word + ' (' + GetWordType(data.meaning) + '.)' + ':' + '\n' +  TrimDefinition(data.meaning)
        }
        console.log(tweet.status)

        //Posts to twitter
        T.post('statuses/update', tweet, function(err, data, response) {
            console.log(data)
        })
    })
}





//Because the word, definition, and type are all in one string, we have to extract the word type from the string
function GetWordType(definition){
    var typeLong = definition.substr(0,definition.indexOf('.'))
    var wordArray = new Array
    wordArray.push(typeLong.split('  '))
    var word = wordArray[0][1]
    console.log(word)
    return word
}

//Because the word, definition, and type are all in one string, we trim it down to only have the definition.
function TrimDefinition(definition){
    var startingIndex = definition.indexOf('.')
    var trimmedDefinition = definition.slice(startingIndex + 2,(definition.length))
    return trimmedDefinition
}