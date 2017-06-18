import React from "react";
import Paper from "material-ui/Paper";
import _ from "lodash";

import Story from "../Story/Story.jsx";
import styles from "../../utils/styles";



const StoryGroup = ({storyGroup}) => {
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
              {sortedStories.map((story) => <Story story={story} /> )}
            </div>
          </div>
        </Paper>
    );
}

export default StoryGroup;