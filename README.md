# The Perfect Tweet

Live App- https://claytonweller.github.io/PerfectTweet/

Link to Node server code - https://github.com/claytonweller/p-tweet-server

## Marketing Description

_Give us any topic, and using the power of MACHINE LEARNING* we will create the perfect tweet!_
_It definitely won't be terrible..._
_Probably..._

*Absolutely no machine learning is used in this app

A perfect tweet isn’t made in a vacuum. It needs information and context to exist. We get as much context as possible by scraping not just 1 source, but 4! -

Twitter logoGiphy logoNewsAPI LogoWikipedia logo
Wikipedia: Tweet smart. 
Twitter: Popular connetions. 
NewsAPI: Be current. 
Giphy: Catch the eye!

Then using a “sophisticated” Machine Learning* algorithm, we will synthesize all of this data into a tweet that will make you laugh, cry, and hopefully change the world.

*Seriously... no Machine learning. Marketing keeps telling us to put it in the copy... and then legal requires us to put another disclaimer.

## Technical description

The users lands on the main page. There are only 2 things they can do.
1. Scroll down
2. Enter a topic and press GO!

![Screenshot of the start page of the app](https://raw.githubusercontent.com/claytonweller/PerfectTweet/master/assets/images/readme/01-enter-topic.jpg)

After the search button is pressed the topic is sent to Giphy, Wikipedia, Twitter, and NewsAPI. The app populates the main paig as the information returns. Once all of the text based APIs return with info (everything other than giphy), the app creates a 'Perfect Tweet'. This is done in a couple of stages
1. All the text is broken down into individual words.
2. Words less than 4 letters long are removed. As are banned words (words that are either boring, or offensive)
3. It picks a 'Good Start', then creates 1-4 randome sentences of made up of 2-8 words each.
4. it finishes off by adding 3 hash tags, and @someUser.
5. It will be paired with some image from the giphy search.

At this point they can:
1. Start over
2. Redo the tweet with the same info
3. Tweet it!
4. Scroll down and look at the info that was used to populate the tweet.

![Screenshot of the perfect tweet page of the app](https://raw.githubusercontent.com/claytonweller/PerfectTweet/master/assets/images/readme/02-perfect-tweet.jpg)

On scroll down the top bar of the app will shrink and become fixed to the top. At any time the user can click on it or scroll back to the top and it will expand again.

![A screenshot showing the collapsing of the top bar of the app](https://raw.githubusercontent.com/claytonweller/PerfectTweet/master/assets/images/readme/03-colapse.jpg)

Also, if you keep 'Redo'ing the tweet. Eventually the twitter bot will 'become sentient'.

## Technology used

HTML, CSS, JavaScript, Jquery, NodeJS, Heroku

## APIS used

Wikipedia
Giphy
NewsAPI
Twitter Intents - This is front end API that allows you to prepopulate a tweet in another tab/window
Twitter Search - This is a back end API which searches tweets from the past 7 days.