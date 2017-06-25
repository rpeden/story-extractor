import appStore from "../store/app-store";
import moment from "moment";
import io from "socket.io-client";
import { List } from "immutable";

const socket = io.connect(window.location.href);

socket.on("stories", (data) => {
  appStore.stories = List(data);
  appStore.lastUpdated = moment().format("h:mm a");
  appStore.currentlyUpdating = false;
});

export default socket;
