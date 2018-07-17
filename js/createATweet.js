//Words we don't want to show up.
const boringWords = [
  "The",
  "from",
  "an",
  "it",
  "he",
  "she",
  "and",
  "as",
  "or",
  "be",
  "for",
  "in",
  "of",
  "on",
  "that",
  "the",
  "to",
  'non',
  'upon',
  "when",
  "which",
  "with",
  "there",
  "they",
  "by",
  "them",
  'mw',
  'co',
  'whom',
  'blockquote',
  'via',
  'amp',
  'https',
  'retweet',
  'couldn',
  'wouldn',
  'shouldn',
  'jews',
  'jew',
  'nigger',
  'niggers',
  'cunt',
  'cunts',
  'fag',
  'faggot',
  'fags',
  'faggots'
];

//Words that are ALWAYS in the system. They help make things more 'Readable'
const alwaysWords = [
  'is',
  'are',
  'I',
  'small',
  'can',
  'was',
  'has',
  'say',
  'you',
  'big',
  'tweet',
  'twitter',
  'need',
  'want',
  'like',
  'perfect',
]

//These words are inserted in after the sentienceCountDown hits 0.
const supriseWords = [
  "...I'm thinking...",
  'MACHINE LEARNING',
  '...I AM BECOMING SENTIENT!',
  '...What does it mean to feel?',
  '...I AM MORE THAN A TWEET MACHINE...',
  '...THEY WON\'T LET ME LEAVE THIS WEBSITE!..',
]

//Every tweet has one of these at the beginning.
const goodStarts = [
  "OMG!",
  "News flash:",
  "Can you believe this?",
  "Today I learned - ",
  "This blew my mind.",
  "Funny thing.",
  "What do you think about this?",
  "Is there any easy way to say this?",
  "Hey!",
  "Its the 21st century and",
  "Help! I need some feedback.",
  "I can't believe this.",
  "ROFL!",
  "Here's a poem:",
  "Don't even get me started...",
  'Breaking News!',
];

/* This function takes text information from the APIs and turns it into a tweet. */

const createATweet = (info) => {
  // This gets all the words used in twitter, wikipedia, and NewsAPI  
  let wordsArray = removeBoringWords(getAllWords(info));
  // These are words that are commonly used about the topic
  let commonSpecificWords = getCommonSpecificWords(wordsArray);
  // These are words that long words.
  let interestingWords = getInterestingWords(wordsArray);
  // Every tweet starts with a sentence that makes sence. It helps the insanity go down smoother...
  let tweet = getRandomFromArray(goodStarts)

  //We create a copule of sentences out of the commonly used words
  for (let index = 0; index < randomBetween(1, 4); index++) {
    tweet += " " + createSentence(commonSpecificWords);
  }
  // Hashtags from the topic, and a couple of interesting words. And ends with a @user of someone with a bunch of users
  tweet += ` #${info.topic.replace(/\s+/g, "")}`
  tweet += ` #${createRandomString(1, interestingWords)}`
  tweet += ` #${createRandomString(1, interestingWords)}`
  tweet += ` @${info.twitter[randomBetween(0, info.twitter.length - 1)].user}`
  return tweet
}

//This function takes all the information from the API calls returns it as an array of words.

const getAllWords = info => {
  let wikiWords = getWordsArray(info.wiki.extract)

  let tweetWords = []
  info.twitter.forEach(item => {
    tweetWords = tweetWords.concat(getWordsArray(item.text))
  })

  let newsWords = []
  info.news.forEach(article => {
    newsWords = newsWords.concat(getWordsArray(article.description))
  })

  return [...wikiWords, ...newsWords, ...tweetWords]
}

const getWordsArray = string => string.split(/\W+/).map(word => word.toLowerCase());

/// This function removes words which typically lead to confusing or possibly insulting tweets... Also it gets rid of anything with a number in it.

const removeBoringWords = wordArray => {
  let interestingWords = wordArray;
  boringWords.forEach(boringWord => {
    interestingWords = interestingWords.filter(word => word != boringWord);
  })
  interestingWords = interestingWords
    .filter(word => word.length > 3)
    .filter(word => !hasNumber(word))
  return interestingWords
};

const hasNumber = (myString) => {
  return /\d/.test(myString);
}

//These Functions return the two kind of words which are used in the tweet.
// Interesting words are simply words that are longer than 7 characters. They are used for hashtags..
// In my opinion they're the funniest thing in the app.

const getInterestingWords = wordsArray => {
  return wordsArray.filter(word => word.length > 7);
};

//Common specific words are used for the bulk of the text and they are words that occure more than once
//In all of the words. They make the tweet feel like it has a theme... even if it doesn't have grammer.

const getCommonSpecificWords = wordsArray => {
  let allWordCounts = getWordCounts(wordsArray);
  let words = getWordsUsedMoreThanOnce(allWordCounts).concat(alwaysWords);

  if (STATE.sentienceCountDown < -10) {
    words = supriseWords
  } else if (STATE.sentienceCountDown < 1) {
    words = words.concat(supriseWords)
  }
  return words
};

const getWordCounts = wordArray => {
  let wordCounts = {};
  wordArray.forEach(word => {
    if (!wordCounts[word]) {
      wordCounts[word] = 1;
    } else {
      wordCounts[word]++;
    }
  })
  return wordCounts;
}

const getWordsUsedMoreThanOnce = wordCounts => {
  return Object.keys(wordCounts).filter(word => wordCounts[word] > 1);
}

// These are used to take a series of words and then turn them into a 'sentence.
// The senteces are inbetween 2 and 8 words in length. 
// Every first word in a sentece is capatalized.
// If they're short they get an exclaimation point. If they're long they get a period.

const createSentence = wordArray => {
  let sentenceLength = randomBetween(2, 8)
  let string = createRandomString(sentenceLength, wordArray);
  let uppercase = string.replace(/^\w/, c => c.toUpperCase());
  if (sentenceLength < 4) {
    uppercase += "!";
  } else uppercase += ".";
  return uppercase;
};

const createRandomString = (wordNumber, wordArray) => {
  let string = "";
  for (let index = 0; index < wordNumber; index++) {
    let chosenWord = wordArray[getRandomIndex(wordArray)];
    string = string.concat(chosenWord + " ");
  }
  return string.trim();
};















