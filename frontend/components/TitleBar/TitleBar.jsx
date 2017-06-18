import React from "react";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";
import { observer } from "mobx-react";

export default class TitleBar extends React.Component {

    lastUpdated() {
        if (this.props.lastUpdated) {
        const buttonLabel = this.props.currentlyUpdating ? "Updating..." : "Update Now";

        return (
            <div className="title-bar-update-container">
                <div className="title-bar-update-text">
                    <span>
                    Last Updated: {this.props.lastUpdated}
                    </span>
                </div>
                <FlatButton
                    className="title-bar-update-button"
                    label={buttonLabel}
                    onClick={this.props.onUpdateClick}
                />
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
                title="Story Grabber 9000"
                className="title-bar"
            />
        );
    }
}