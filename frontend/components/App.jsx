import "babel-polyfill";

import React from "react";
import { Component } from "react";
import ReactDOM from "react-dom";

import TitleBar from "./TitleBar/TitleBar.jsx";
import Paper from "material-ui/Paper";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import _ from "lodash";

import theme from "../utils/theme";
import styles from "../utils/styles";
import { extractDomain } from "../utils/string-utils";

import appStore from "../store/app-store";
import socket from "../socket/socket-connection";
import { Provider, observer } from "mobx-react";

@observer
class StoryApp extends Component {

  constructor(props, context) {
    super(props, context);
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
    const stories = appStore.stories;
    if (stories.length === 0) {
      return <div>Loading stories...</div>;
    } else {
      return stories.map((storyGroup) => {
        return this.renderStoryGroup(storyGroup);
      });
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div style={styles.container}>
          <TitleBar />
          <div style={styles.listContainer}>
            {this.renderStories()}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(
  <Provider appStore={appStore}>
    <StoryApp />
  </Provider>, 
  document.getElementById("story-app"));
