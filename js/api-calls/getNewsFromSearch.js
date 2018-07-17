const EVERYTHING_SEARCH_URL = "https://newsapi.org/v2/everything";
const GOOD_SEARCH_URL = "https://newsapi.org/v2/top-headlines";
const NEWS_API_KEY = "d57b057c68454414bd4d1d8aa9986a98";

//These are the AJAX calls for the NewsAPI.

const getNewsFromSearch = search => {
  const query = {
    q: truncateLongSearchString(search),
    apiKey: NEWS_API_KEY,
    pageSize: 3,
    sortBy: "popularity"
  };
  getGoodNewsFromSearch(query)
};

//First it looks for 'Good' Articles on the topic. These are onese for reputable news sources like The NY Times.

const getGoodNewsFromSearch = (query) => {
  query.country = "us"
  $.getJSON(GOOD_SEARCH_URL, query, results => {
    STATE.news = results.articles;
    if (typeof STATE.news[0] === 'object') {
      populateNews()
      allCallsDone('News')
    } else {
      delete query.country
      getEverythingFromSearch(query);
    }
  });
}

//Then if there are no 'Good' returns it goes to the more general 'everything search. 
// Which in the craziest situation will return deviant art pages.

const getEverythingFromSearch = (query) => {
  query.language = "en"
  $.getJSON(EVERYTHING_SEARCH_URL, query, results => {
    if (typeof results.articles[0] === 'object') {
      STATE.news = results.articles
      populateNews()
      allCallsDone('News')
    } else {
      getNewsFromSearch('perfect')
    }

  });
}

//Once we've got some objects in the STATE we can populate some articles.

const populateNews = () => {
  var renderedNews = STATE.news.map(item => createSingleNewsArticle(item));
  $(".all-articles").html(renderedNews);
  $(".js-topic").html(STATE.topic);
};

const createSingleNewsArticle = result => {
  return `
    <article class="news-article">
      <header class="news-headline">
        <a href="${result.url}"><h2>${result.title}</h2></a>
        <h3>${result.source.name} - by ${result.author}</h3>
      </header>
      <div class="news-text">
        <p>${result.description}</p>
      </div>
    </article>
    `;
};