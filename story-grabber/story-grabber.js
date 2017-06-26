const _ = require("lodash");
const parsers = require("./parser-definitions.js");
const cheerio = require("./cheerio-bundle.js");
require("isomorphic-fetch");

const hackerNewsParser = (dom, promise, minPoints, logo) => {
  if (dom.err) { promise.reject({ site: "Hacker News", stories: []}); }
  const $ = dom.document;//jQuery(dom.window);
    // get the list of stories
  const stories = $(".athing");
  const hnBaseUrl = "https://news.ycombinator.com";
  const parsedStories = [];
    // extract what we need from each story
  _.forEach(stories, (story) => {
    // extract div containing story
    const storyAnchor = $(story).find(".title a").first();
    // extract url
    let address = storyAnchor.attr("href");
    if (!address.startsWith("http")) {
      address = `${hnBaseUrl}/${address}`;
    }
    // extract story title
    const title = storyAnchor.text();
    //get element with story metadata
    const metaData = $(story).next();
    // extract score/points
    const points = parseInt(metaData.find(".score").text()) || 0;
    //get comments link and count
    const commentsAnchor = $(_.last(metaData.find("a")));
    const commentsAddress = `${hnBaseUrl}/${commentsAnchor.attr("href")}`;
    const commentsCount = parseInt(commentsAnchor.text()) || 0;

    if (points >= minPoints) {
      parsedStories.push({
        title,
        address,
        points,
        commentsCount,
        commentsAddress
      });
    }
  });
  promise.resolve({site: "Hacker News", stories: parsedStories, logo});
};

const makeHNParser = (minimumPoints, logo) => {
  return new Promise((resolve, reject) => {
    fetch("https://news.ycombinator.com")
      .then((response) => {
        return response.text();
      })
      .then((body) => {
        const doc = cheerio.load(body);
        hackerNewsParser({err: null, document: doc}, {resolve, reject}, minimumPoints, logo);
      })
      .catch((error) => reject(error));
  });
};

const redditParser = (dom, promise, title, minPoints, logo) => {
  if (dom.err) { promise.reject([]); }
  const $ = dom.document;//jQuery(dom.window);
  // extract the stories
  const stories = $(".link");
  const parsedStories = [];

    // extract what we need from each story
  _.each(stories, (story) => {
    //extract title
    const titleAnchor = $(story).find(".title").find(".title");
    const titleText = titleAnchor.text();
    // extract URL
    let address = titleAnchor.attr("href") || "";
    if (!address.startsWith("http")) {
      address = `https://www.reddit.com${address}`;
    }
    // extract score/points
    const points = parseInt($(story).find(".likes").text()) || 0;
    // extract comments count and link
    const commentsAnchor = $(story).find("a[data-event-action=comments]");
    const commentsCount = parseInt(commentsAnchor.text());
    let commentsAddress = commentsAnchor.attr("href");
    if (!commentsAddress.startsWith("http")) {
      commentsAddress = `https://www.reddit.com${address}`;
    }

    if (points >= minPoints) {
      parsedStories.push({
        title: titleText,
        address,
        points,
        commentsAddress,
        commentsCount
      });
    }
  });
  promise.resolve({ site: title, stories: parsedStories, logo});
};

const makeRedditParser = (subReddit, title, minimumPoints, logo) => {
  return new Promise((resolve, reject) => {
    fetch(`https://www.reddit.com/r/${subReddit}`)
      .then((response) => response.text())
      .then((body) => {
        const doc = cheerio.load(body);
        redditParser({ err: null, document: doc},
                     { resolve, reject },
                     title, minimumPoints, logo);
      })
      .catch((error) => reject(error));
  });
};

const createParser = (parserInfo) => {
  switch (parserInfo.type) {
  case "HackerNews":
    return makeHNParser(parserInfo.minimumScore, parserInfo.logo);
  case "Reddit":
    return makeRedditParser(parserInfo.subReddit, parserInfo.title,
                            parserInfo.minimumScore, parserInfo.logo);
  default:
    return Promise.resolve();
  }
};

const getStories = () => {
  return Promise.all(parsers.map(createParser));
};

module.exports = {
  getStories
};
