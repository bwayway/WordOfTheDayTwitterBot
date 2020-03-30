console.log('Hello Brendan');

//Imports----------------------------------
var config = require ('./config') //file containing twitter api keys
var Twit = require('twit')
const wordOfTheDay = require('words-of-the-day')
//-----------------------------------------

//Variables
var T = new Twit(config);

setInterval(postTweet,1000*60*60*24)

postTweet()

//Connects to WordThink API and retrieves word, type, and definition
function postTweet(){
    wordOfTheDay.wordThink().then(data =>{

        var wordArray = new Array
        wordArray.push(data.meaning.split(' '))
        wordTypeIndex = GetWordTypeIndex(wordArray)

        var tweet = {
            status: data.word + " " + wordArray[0][wordTypeIndex-1] + " (" + wordArray[0][wordTypeIndex].trim() + ")" + ':' + '\n' +  TrimDefinition(data.meaning,wordArray,wordTypeIndex)
        }
        console.log(tweet.status)

        //Posts to twitter
        T.post('statuses/update', tweet, function(err, data, response) {
            console.log(data)
        })
    })
}







//Because the word, definition, and type are all in one string, we trim it down to only have the definition.
function TrimDefinition(definition,wordArray,wordTypeIndex){
    if(wordArray[0][wordTypeIndex + 1] != ""){
    var trimmedDefinition = definition.substr(definition.indexOf(wordArray[0][wordTypeIndex + 1]))
    
    }

    else{
        var trimmedDefinition = definition.substr(definition.indexOf(wordArray[0][wordTypeIndex + 2]))
    }
    return trimmedDefinition
}


//Because the word, definition, and type are all in one string, we have to extract the word type from the string by grabbing its index
function GetWordTypeIndex(wordArray){
    if(wordArray[0][2].startsWith("ad")||wordArray[0][2].startsWith("v")|| wordArray[0][2].startsWith("n"))
    {
        return 2
    }
    else
    {
        return 3
    }
}