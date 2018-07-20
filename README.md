# RNDMTWTR

Live App- https://claytonweller.github.io/RNDMTWTR/

Link to Node server code - https://github.com/claytonweller/p-tweet-server

## Marketing Description

_Infinite RANDOM SILLY Tweets_

### Why?

The world doesn't make sense any more. So why should YOU have to? RNDMTWTR gives you a limitless supply of incomprehensible (and hilarious) tweets!

### But HOW?

You enter any topic. Then RNDMTWTR will scrape information together from all over the internet, put it in a big shaker, and out pops some delightfully random connection.

More specifically, we put the text from news headlines, other tweets, and wikpedia articles into an algorithm which jumbles up the best words into "sentences", creates some hashtags, and pairs it all with a GiF. Hopefully you laugh, or at least chuckle. But if not, you can make it even better by:

* Choosing the an even better image
* Changing the text to whatever you want
* Insantly create a new tweet using the same topic
* When you're satisfied. Tweet it directly fromRNDMTWTR

Plus we'll show you all of the information we used to make your completely unique tweet. YOU'RE WELCOME!

## Technical description

The users lands on the main page. There are only 2 things they can do.
1. Scroll down
2. Enter a topic and press GO!

![Screenshot of the start page of the app](https://raw.githubusercontent.com/claytonweller/RNDMTWTR/master/assets/images/readme/01-enter-topic.jpg)

After the search button is pressed the topic is sent to Giphy, Wikipedia, Twitter, and NewsAPI. The app populates the main paig as the information returns. Once all of the text based APIs return with info (everything other than giphy), the app creates a 'Perfect Tweet'. This is done in a couple of stages
1. All the text is broken down into individual words.
2. Words less than 4 letters long are removed. As are banned words (words that are either boring, or offensive)
3. It picks a 'Good Start', then creates 1-4 randome sentences of made up of 2-8 words each.
4. it finishes off by adding 3 hash tags, and @someUser.
5. It will be paired with some image from the giphy search.

At this point they can:
1. Start over
2. Redo the tweet with the same info
3. Edit the text directly
4. Pick one of the 4 images to be part of the tweet.
5. Tweet it!
6. Scroll down and look at the info that was used to populate the tweet.

![Screenshot of the perfect tweet page of the app](https://raw.githubusercontent.com/claytonweller/RNDMTWTR/master/assets/images/readme/02-perfect-tweet.jpg)

On scroll down the top bar of the app will shrink and become fixed to the top. At any time the user can click on it or scroll back to the top and it will expand again.

![A screenshot showing the collapsing of the top bar of the app](https://raw.githubusercontent.com/claytonweller/RNDMTWTR/master/assets/images/readme/03-colapse.jpg)

Also, if you keep 'Redo'ing the tweet. Eventually the twitter bot will 'become sentient'.

## Technology used

HTML, CSS, JavaScript, Jquery, NodeJS, Heroku

## APIS used

* Wikipedia
* Giphy
* NewsAPI
* Twitter Intents - This is front end API that allows you to prepopulate a tweet in another tab/window
* Twitter Search - This is a back end API which searches tweets from the past 7 days.