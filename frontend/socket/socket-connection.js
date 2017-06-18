import appStore from "../store/app-store";
import moment from "moment";

const socket = io(window.location.href);

socket.on("stories", (data) => {
      // eslint-disable-next-line no-console,prefer-template
      //console.log(JSON.stringify(data));
      appStore.stories = data;
      appStore.lastUpdated = moment().format("h:mm a");
      appStore.currentlyUpdating = false;       
});

export default socket;