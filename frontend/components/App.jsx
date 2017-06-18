import "babel-polyfill";

import React from "react";
import { Component } from "react";
import ReactDOM from "react-dom";

import TitleBar from "./TitleBar/TitleBar.jsx";
import StoryGroup from "./StoryGroup/StoryGroup.jsx";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import theme from "../utils/theme";
import styles from "../utils/styles";

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

  renderStories() {
    const stories = appStore.stories;
    if (stories.length === 0) {
      return <div>Loading stories...</div>;
    } else {
      return stories.map((storyGroup) => {
        return <StoryGroup storyGroup={storyGroup} />;
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
