import React from "react";
import renderer from "react-test-renderer";
import {mount} from "enzyme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import theme from "../../utils/theme";

import TitleBar from "./TitleBar.jsx";

test("TitleBar snapshot", () => {
  const component = renderer.create(
    <MuiThemeProvider theme={theme}>
      <TitleBar lastUpdated={"now"} />
    </MuiThemeProvider>
  );
  const titleBar = component.toJSON();
  expect(titleBar).toMatchSnapshot();
});

test("Last updated time displays correctly", () => {
  const component = mount(
    <MuiThemeProvider theme={theme}>
      <TitleBar lastUpdated={"now"} />
    </MuiThemeProvider>
  );

  const updatedText = component.find(".title-bar-update-text").text();
  expect(updatedText).toBe("Last Updated: now");
});
