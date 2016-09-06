const jsdom = require("jsdom");
const request = require("request");
const jQuery = require("jquery");
const _ = require("lodash");
const parsers = require("./parser-definitions.js");

const hackerNewsParser = (dom, promise, minPoints, logo) => {
  if (dom.err) { promise.reject({ site: "Hacker News", stories: []}); }
  const $ = jQuery(dom.window);
    // get the list of stories
  const stories = $(".athing");
  const parsedStories = [];
    // extract what we need from each story
  _.forEach(stories, (story) => {
    const storyAnchor = $(story).find(".title a").first();
    const points = parseInt($(story).next().find(".score").text()) || 0;
    const address = storyAnchor.attr("href");
    const title = storyAnchor.text();
    if (points >= minPoints) {
      parsedStories.push({
        title,
        address,
        points
      });
    }
  });
  promise.resolve({site: "Hacker News", stories: parsedStories, logo});
};

const makeHNParser = (minimumPoints, logo) => {
  return new Promise((resolve, reject) => {
    request("https://news.ycombinator.com", (error, response, body) => {
      jsdom.env(body, [], (err, window) => {
        hackerNewsParser({err, window}, {resolve, reject}, minimumPoints, logo);
      });
    });
  });
};

const redditParser = (dom, promise, title, minPoints, logo) => {
  if (dom.err) { promise.reject([]); }
  const $ = jQuery(dom.window);
    // extract the stories
  const stories = $(".link");
  const parsedStories = [];
    // extract what we need from each story
  _.each(stories, (story) => {
    const titleAnchor = $(story).find(".title").find(".title");
    const titleText = titleAnchor.text();
    const address = titleAnchor.attr("href") || "";
    const points = parseInt($(story).find(".likes").text()) || 0;
    if (points >= minPoints) {
      parsedStories.push({
        title: titleText,
        address,
        points
      });
    }
  });
  promise.resolve({ site: title, stories: parsedStories, logo});
};

const makeRedditParser = (subReddit, title, minimumPoints, logo) => {
  return new Promise((resolve, reject) => {
    request(`https://www.reddit.com/r/${subReddit}`, (error, response, body) => {
      jsdom.env(body, [], (err, window) => {
        redditParser({ err, window},
                     { resolve, reject },
                     title, minimumPoints, logo);
      });
    });
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

/*
getStories().then((results) => {
  results.forEach((result) => {
    // eslint-disable-next-line no-console,prefer-template
    console.log("\nSite: " + result.site +
                "\nStories: " + result.stories.length);
  });
});*/

module.exports = {
  getStories
};
