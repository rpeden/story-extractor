import React from "react";
import PropTypes from "prop-types";
import styles from "../../utils/styles";
import { extractDomain } from "../../utils/string-utils";

const openStoryLink = (event, link) => {
  event.preventDefault();
  window.open(link);
};

const Story = ({story}) => {
  return (
      <div key={story.address}
        style={{
          marginBottom: "10px", paddingTop: "10px",
          borderTop: "1px solid #ccc" }}
      >
        <div style={styles.story.title}>
          <a href={story.address}
            onClick={(event) => openStoryLink(event, story.address)}
          >
            {story.title}
          </a>
        </div>
        <div style={styles.story.points}>
          {story.points} points
        </div>
        <span style={styles.story.domain}> ({extractDomain(story.address)})</span>
      </div>
  );
};

Story.propTypes = {
  story: PropTypes.object.isRequired
};

export default Story;
