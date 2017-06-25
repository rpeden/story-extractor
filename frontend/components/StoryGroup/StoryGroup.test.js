import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import theme from "../../utils/theme";

import StoryGroup from "./StoryGroup.jsx";

const testStories = [
  {
    title: "Test Title",
    points: 50,
    address: "http://nowhere.com"
  },
  {
    title: "Test Two",
    points: 55,
    address: "http://nowhere2.com"
  },
  {
    title: "Test Three",
    points: 60,
    address: "http://nowhere3.com"
  }
];

const storyGroupData = {
  stories: testStories,
  site: "Test Site",
  logo: "nothing.png"
};

test("Story group snapshot", () => {
  const component = renderer.create(
    <MuiThemeProvider muiTheme={theme}>
      <StoryGroup storyGroup={storyGroupData} />
    </MuiThemeProvider>
  );
  const storyGroup = component.toJSON();
  expect(storyGroup).toMatchSnapshot();
});

test("Site name displays correctly", () => {
  const component = shallow(
      <StoryGroup storyGroup={storyGroupData} />
  );

  const storyName = component.find(".story-group-site-name").text();
  expect(storyName).toBe(storyGroupData.site);
});

test("Correct group logo is used", () => {
  const component = shallow(
      <StoryGroup storyGroup={storyGroupData} />
  );

  const groupLogoSrc = component.find(".story-group-logo").prop("src");
  expect(groupLogoSrc).toMatch(storyGroupData.logo);
});
