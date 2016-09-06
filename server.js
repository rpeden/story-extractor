const express = require("express");
const app = express();
const storyGrabber = require("./story-grabber/story-grabber.js");
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", `http://"${req.headers.host}':4000`);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  next();
}
);

let storyCache = [];

const sendStories = () => {
  storyGrabber.getStories().then((results) => {
    if (results && results.length > 0) {
      storyCache = results;
    }
    results.forEach((result) => {
      // eslint-disable-next-line no-console,prefer-template
      console.log("\nSite: " + result.site +
                  "\nStories: " + result.stories.length);
    });
    io.emit("stories", results);
  });
};

io.on("connection", (socket) => {
  if (storyCache.length > 0) {
    socket.emit("stories", storyCache);
  }
  socket.on("update-stories", () => {
    sendStories();
  });
});

io.on("updateStories", () => {
  sendStories();
});

server.listen(4000);
sendStories();
//update stories every 15 minutes
setInterval(sendStories, 900000);
