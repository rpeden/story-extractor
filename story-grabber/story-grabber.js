const _ = require("lodash");
const parsers = require("./parser-definitions.js");
const cheerio = require("cheerio");
const winston = require("winston");
const fs = require('fs');

const consoleLogger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console()
  ]
});

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

const makeHNParser = (minimumPoints, logo, logger) => {
  return new Promise((resolve, reject) => {
    fetch("https://news.ycombinator.com")
      .then((response) => {
        return response.text();
      })
      .then((body) => {
        const doc = cheerio.load(body);
        hackerNewsParser({err: null, document: doc},
                        {resolve, reject}, minimumPoints, logo, logger);
      })
      .catch((error) => {
        logger.log({
          level: "error",
          message: error
        });
        reject(error);
      });
  });
};

const redditParser = (dom, promise, title, minPoints, logo, logger) => {
  if (dom.err) {
    logger.log({
      level: "error",
      message: dom.err
    });
    promise.reject([]);
    return;
  }

  const $ = dom.document;//jQuery(dom.window);
  // extract the stories
  const stories = $(".link");
  const parsedStories = [];
  if (stories.length === 0) {
    logger.log({
      level: "error",
      message: "got zero stories"
    });
  }
    // extract what we need from each story
  _.each(stories, (story) => {
    try {
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
    } catch (e) {
      logger.log({
        level: "error",
        message: e
      });
    }
  });
  promise.resolve({ site: title, stories: parsedStories, logo});
};

const makeRedditParser = (subReddit, title, minimumPoints, logo, logger) => {
  return new Promise((resolve, reject) => {
    fetch(`https://old.reddit.com/r/${subReddit}`)
      .then((response) => response.text())
      .then((body) => {
        const doc = cheerio.load(body);
        redditParser({ err: null, document: doc},
                     { resolve, reject },
                     title, minimumPoints, logo, logger);
      })
      .catch((error) => {
        logger.log({
          level: "error",
          message: error
        });
        reject(error);
      });
  });
};

const createParser = (parserInfo) => {
  switch (parserInfo.type) {
  case "HackerNews":
    return makeHNParser(parserInfo.minimumScore, parserInfo.logo, consoleLogger);
  case "Reddit":
    return makeRedditParser(parserInfo.subReddit, parserInfo.title,
                            parserInfo.minimumScore, parserInfo.logo, consoleLogger);
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
