import "babel-polyfill";

import React from "react";
import { Component } from "react";
import ReactDOM from "react-dom";

import TitleBar from "./TitleBar/TitleBar.jsx";
import StoryGroup from "./StoryGroup/StoryGroup.jsx";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import theme from "../utils/theme";

import appStore from "../store/app-store";
import socket from "../socket/socket-connection";
import { observer } from "mobx-react";

import FloatingActionButton from "material-ui/FloatingActionButton";
import Reload from "material-ui/svg-icons/action/cached";

@observer
class StoryApp extends Component {

  constructor(props, context) {
    super(props, context);
  }

  renderStories() {
    const stories = appStore.stories;
    if (stories.length === 0) {
      return <div>Loading stories...</div>;
    } else {
      return stories.map((storyGroup) => {
        return <StoryGroup key={storyGroup.site} storyGroup={storyGroup} />;
      });
    }
  }

  handleStoryUpdate() {
    socket.emit("update-stories");
    appStore.currentlyUpdating = true;
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div className="app-container">
          <TitleBar
            lastUpdated={appStore.lastUpdated}
            currentlyUpdating={appStore.currentlyUpdating}
            onUpdateClick={this.handleStoryUpdate}
          />
          <div className="body-update-container">Last Updated: {appStore.lastUpdated}</div>
          <div className="list-container">
            {this.renderStories()}
          </div>
          <FloatingActionButton
            onClick={this.handleStoryUpdate}
            style={{ position: "fixed", bottom: 15, right: 15 }}
          >
            <Reload />
          </FloatingActionButton>
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<StoryApp />, document.getElementById("story-app"));
