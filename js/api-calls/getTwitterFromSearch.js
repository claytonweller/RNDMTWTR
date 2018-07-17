const TWITTER_SEARCH_URL = "https://thawing-escarpment-24112.herokuapp.com/";

//Twitter does not allow client side API calls to their search API.
// So I set up a heroku server. Here is a link to the server code:
// https://github.com/claytonweller/p-tweet-server

const getTwitterFromSearch = (search) => {

  fetch(TWITTER_SEARCH_URL, {
    method: "post",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({ search: truncateLongSearchString(search) })
  })
    .then(res => res.json())
    .then(obj => {
      storeTwitterObject(obj);
      populateTwitter();
      allCallsDone('twitter');
    });
}

const storeTwitterObject = results => {
  STATE.twitter = results.statuses.map(item => {
    return {
      text: item.full_text,
      user: item.user.screen_name,
      followers: item.user.followers_count,
      imageURL: item.user.profile_image_url
    };
  });
};

const populateTwitter = () => {
  $(".twitter-users").html(createAllTwitterUsers());
};

// We only populate the first 3 twitter users... but we keep more in the store to create a better 'perfect tweet'

const createAllTwitterUsers = () => {
  let twitterHtml = "";
  let userCount = 3;
  if (STATE.twitter.length < 3) {
    userCount = STATE.twitter.length;
  }
  for (let index = 0; index < userCount; index++) {
    twitterHtml += createTwitterUser(STATE.twitter[index]);
  }
  return twitterHtml;
};

const createTwitterUser = obj => {
  let scaledUrl = obj.imageURL.replace("_normal", "_200x200");
  return `
    <div class="twitter-user">
      <div class="twitter-user-splash">
        <div class="twitter-user-grid">
          <div class="grid-upper-left"></div>
          <div class="grid-upper-right"></div>
          <div class="grid-lower-left"></div>
          <div class="grid-lower-right">
            <img src="${scaledUrl}" alt="profile picture of ${obj.user}">
          </div>
        </div>
        <div class="twitter-user-info">
          <div class="twitter-user-name">@${obj.user}</div>
          <div class="twitter-user-followers">${obj.followers} followers</div>
        </div>
      </div>
      <div class="twitter-user-tweet">
        <p>${obj.text}</p>
      </div>
    </div>
  `;
};

