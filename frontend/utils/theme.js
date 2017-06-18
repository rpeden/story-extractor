import getMuiTheme from "material-ui/styles/getMuiTheme";
import { red500, red700 } from "material-ui/styles/colors";
import injectTapEventPlugin from "react-tap-event-plugin";

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: red500,
    primary2Color: red700
  }
});

export default muiTheme;
