import React from "react";
import Paper from "material-ui/Paper";
import _ from "lodash";

import Story from "../Story/Story.jsx";

const StoryGroup = ({storyGroup}) => {
    const sortedStories = _.orderBy(storyGroup.stories, ["points"], ["desc"]);
    return (
        <Paper key={storyGroup.site} zDepth={2} className="story-group-container">
          <div className="story-group-inner">
            <div style={{ marginBottom: "20px", verticalAlign: "middle"}}>
              <img className="story-group-logo" src={`/logos/${storyGroup.logo}`} />
              <span className="story-group-site-name">{storyGroup.site}</span>
            </div>
            <div className="story-group-points">Points</div>
            <div className="story-group-title">Title</div>
            <div style={{ marginTop: "10px" }}>
              {sortedStories.map((story) => <Story story={story} /> )}
            </div>
          </div>
        </Paper>
    );
}

export default StoryGroup;