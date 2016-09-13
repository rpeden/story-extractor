import "babel-polyfill";

import React from "react";
import { Component } from "react";
import ReactDOM from "react-dom";

import AppBar from "material-ui/AppBar";
import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import io from "socket.io-client";
import _ from "lodash";
import moment from "moment";

import theme from "./utils/theme";
import styles from "./utils/styles";
import { extractDomain } from "./utils/string-utils";

class StoryApp extends Component {

  constructor(props, context) {
    super(props, context);

    this.socket = io(window.location.href);
    this.socket.on("stories", (data) => {
      // eslint-disable-next-line no-console,prefer-template
      //console.log(JSON.stringify(data));
      this.setState({
        stories: data,
        lastUpdated: moment().format("h:mm a"),
        currentlyUpdating: false
      });
    });

    this.state = {
      stories: [],
      currentlyUpdating: false
    };
  }

  openStoryLink(event, link) {
    event.preventDefault();
    window.open(link);
  }

  renderStory(story) {
    return (
      <div key={story.address} style={{ marginBottom: "10px" }}>
        <div style={styles.story.points}>
          {story.points}
        </div>
        <div style={styles.story.title}>
          <a href={story.address}
            onClick={(event) => this.openStoryLink(event, story.address)}
          >{story.title}
          </a>
          <span style={styles.story.domain}> ({extractDomain(story.address)})</span>
        </div>
      </div>
    );
  }

  renderStoryGroup(storyGroup) {
    const sortedStories = _.orderBy(storyGroup.stories, ["points"], ["desc"]);
    return (
        <Paper key={storyGroup.site} zDepth={2} style={styles.storyGroup}>
          <div style={{ margin: "30px" }}>
            <div style={{ marginBottom: "20px", verticalAlign: "middle"}}>
              <img className="story-logo" src={`/logos/${storyGroup.logo}`} />
              <span className="story-group-title">{storyGroup.site}</span>
            </div>
            <div style={styles.story.header.points}>Points</div>
            <div style={styles.story.header.title}>Title</div>
            <div style={{ marginTop: "10px" }}>
              {sortedStories.map(this.renderStory.bind(this))}
            </div>
          </div>
        </Paper>
    );
  }

  renderStories() {
    const stories = this.state.stories;
    if (stories.length === 0) {
      return <div>Loading stories...</div>;
    } else {
      return stories.map((storyGroup) => {
        return this.renderStoryGroup(storyGroup);
      });
    }
  }

  lastUpdated() {
    if (this.state.lastUpdated) {
      const buttonLabel = this.state.currentlyUpdating ? "Updating..." : "Update Now";

      return (
        <div style={{ marginTop: "5px" }}>
          <div style={{ color: "white", marginRight: "15px", display: "inline-block" }}>
            <span>
              Last Updated: {this.state.lastUpdated}
            </span>
          </div>
          <FlatButton
            style={{ color: "white", marginRight: "10px", width: "150px" }}
            label={buttonLabel}
            onClick={() => {
              this.socket.emit("update-stories");
              this.setState({
                currentlyUpdating: true
              });
            }}
          />
        </div>
      );
    }
    return <span />;
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div style={styles.container}>
          <AppBar
            iconElementLeft={<span />}
            iconElementRight={this.lastUpdated()}
            title="Story Grabber 9000"
            style={{ position: "fixed", top: "0px", left: "0px" }}
          />
          <div style={styles.listContainer}>
            {this.renderStories()}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<StoryApp />, document.getElementById("story-app"));
