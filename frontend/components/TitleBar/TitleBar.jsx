import React from "react";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";
import { inject, observer } from "mobx-react";

@inject("appStore")
@observer
export default class TitleBar extends React.Component {
    lastUpdated() {
        const appStore = this.props.appStore;

        if (appStore.lastUpdated) {
        const buttonLabel = appStore.currentlyUpdating ? "Updating..." : "Update Now";

        return (
            <div style={{ marginTop: "5px" }}>
            <div style={{ color: "white", marginRight: "15px", display: "inline-block" }}>
                <span>
                Last Updated: {appStore.lastUpdated}
                </span>
            </div>
            <FlatButton
                style={{ color: "white", marginRight: "10px", width: "150px" }}
                label={buttonLabel}
                onClick={() => {
                socket.emit("update-stories");
                appStore.currentlyUpdating = true;
                }}
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
                style={{ position: "fixed", top: "0px", left: "0px" }}
            />
        );
    }
}