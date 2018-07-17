const GIF_SEARCH_URL = "https://api.giphy.com/v1/gifs/search";
const GIPHY_API_KEY = "lkdzgGGUC5PbHv3W33MJbdvhSMA1u4Qc";

// This is the call to the Giphy API. It's a simple GET request. Ang it returns an array of objects

getGiphyFromSearch = (search) => {
  const query = {
    q: search,
    api_key: GIPHY_API_KEY,
    limit: 4
  };
  $.getJSON(GIF_SEARCH_URL, query, populateGiphy);
}

const populateGiphy = results => {
  STATE.giphy = results.data;
  let output = results.data.map(renderGiphyObject);
  $(".giphy-gifs").html(output);
}

// We always render all 4 of the images in the app.
const renderGiphyObject = item => `
    <button class="gif-block">
        <img src="${item.images.original.url}" alt="${item.title}" />
    </button>`;
