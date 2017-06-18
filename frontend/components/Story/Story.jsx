import React from "react";
import styles from "../../utils/styles";
import { extractDomain } from "../../utils/string-utils";

const openStoryLink = (event, link) => {
    event.preventDefault();
    window.open(link);
}

const Story = ({story}) => {
    return (
      <div key={story.address} style={{ marginBottom: "10px" }}>
        <div style={styles.story.points}>
          {story.points}
        </div>
        <div style={styles.story.title}>
          <a href={story.address}
            onClick={(event) => openStoryLink(event, story.address)}>
            {story.title}
          </a>
          <span style={styles.story.domain}> ({extractDomain(story.address)})</span>
        </div>
      </div>
    );
}

export default Story;