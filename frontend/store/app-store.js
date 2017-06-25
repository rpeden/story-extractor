import { observable } from "mobx";

class AppStore {
    @observable stories = []
    @observable lastUpdated = "";
    @observable currentlyUpdating = false;
}

const appStore = new AppStore();
export default appStore;
