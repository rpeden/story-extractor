import React from "react";
import AppBar from "material-ui/AppBar";
import PropTypes from "prop-types";

export default class TitleBar extends React.Component {

  lastUpdated() {
    if (this.props.lastUpdated) {
      return (
            <div className="title-bar-update-container">
                <div className="title-bar-update-text">
                    <span>
                    Last Updated: {this.props.lastUpdated}
                    </span>
                </div>
            </div>
      );
    }

    return <span />;
  }

  render() {
    return (
            <AppBar
              iconElementLeft={<span />}
              iconElementRight={this.lastUpdated()}
              title={<div style={{fontFamily: "Orbitron"}}>StoryGrabber</div>}
              className="title-bar"
            />
    );
  }
}

TitleBar.propTypes = {
  lastUpdated: PropTypes.string.isRequired
};
