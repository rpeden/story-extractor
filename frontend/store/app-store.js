import { observable } from "mobx";
import { List } from "immutable";

class AppStore {
    @observable stories = List();
    @observable lastUpdated = "";
    @observable currentlyUpdating = false;
}

const appStore = new AppStore();
export default appStore;
