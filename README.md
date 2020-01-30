# Word Of The Day Twitter Bot
Twitter bot that posts the word of the Day every day. Follow at @WOTDBBW

# Setting up

Make sure that you installed the Twit and words-of-the-day NPM packages:
-https://www.npmjs.com/package/words-of-the-day
-https://www.npmjs.com/package/twit

You will also need to create a config.js file that contains the consumer
and API keys/secrets for a developer twitter account. I used the following format:

module.exports = {
    consumer_key:         '',
    consumer_secret:      '',
    access_token:         '',
    access_token_secret:  '',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
}


For cloud platform, I personally used Heroku (www.heroku.com)
