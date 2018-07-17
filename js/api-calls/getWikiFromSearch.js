const WIKI_SEARCH_URL = 'https://en.wikipedia.org/w/api.php?origin=*&';

//Here we use Two of Wikipedias searches to compare and pick an article for the perfect tweet.
//First we use open search, which returns a list of wikipedia articles which apply to the topic. (But not any text.)
function getWikiFromSearch(searchTerm) {

  const query = {
    action: 'opensearch',
    // The Wikipedia API does not do well with long search strings. So we simply pick the longest word the user picks.
    search: truncateLongSearchString(searchTerm),
    limit: 5,
    namespace: 0,
    format: 'json',
  }
  $.getJSON(WIKI_SEARCH_URL, query, searchForTitles);
}

// For each of the 3 titles that we return, we dump these into a search 
// which returns a more indepth version of the article.

const searchForTitles = (result) => {
  if (typeof result[1][0] === 'string') {
    result[1].forEach(title => {
      getWikiFromTitle(title)
    })
  } else {
    getWikiFromTitle('Error_message')
  }

}

const getWikiFromTitle = (title) => {
  const query = {
    action: 'query',
    prop: 'extracts',
    exintro: true,
    titles: title,
    format: 'json',
  }
  $.getJSON(WIKI_SEARCH_URL, query, storeWikiObject);
}

//As each one comes back we compare it to the previous ones. And store the longest one in the STATE.

const storeWikiObject = (results) => {
  let pageId = Object.keys(results.query.pages)[0]

  //We store it if it is longer than the last one... AND isn't just a big reference sheet to other articles.
  if (!includesDeadEndText(results.query.pages[pageId].extract)
    && results.query.pages[pageId].extract.length > STATE.wiki.extract.length) {
    STATE.wiki.title = results.query.pages[pageId].title
    STATE.wiki.extract = results.query.pages[pageId].extract
    populateWiki()
    allCallsDone('wiki');
  }
}

const includesDeadEndText = (string) => {
  let thereIsADeadEnd = false
  deadEndText.forEach(deadEnd => {
    if (string.includes(deadEnd) || string === '') {
      thereIsADeadEnd = true
    }
  })
  return thereIsADeadEnd
}

const deadEndText = [
  'most commonly refers to',
  'may also refer to',
  'may refer to',
]

//We then populate the HTML!

const populateWiki = () => {
  $(".wiki-title").find("h1").html(STATE.wiki.title);
  $(".wiki-text").find("p").html(STATE.wiki.extract);
};









