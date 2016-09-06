import getMuiTheme from "material-ui/styles/getMuiTheme";
import { indigo500, indigo700 } from "material-ui/styles/colors";
import injectTapEventPlugin from "react-tap-event-plugin";

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo500,
    primary2Color: indigo700
  }
});

export default muiTheme;
