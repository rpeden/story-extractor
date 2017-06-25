import React from "react";
import Story from "./Story.jsx";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";

const testStory = {
  title: "Test Title",
  points: 50,
  address: "http://nowhere.com"
};

test("Story snapshot works", () => {
  const component = renderer.create(
    <Story story={testStory} />
  );
  const story = component.toJSON();
  expect(story).toMatchSnapshot();
});

test("Story renders as expected", () => {
  const story = shallow(
    <Story story={testStory} />
  );

  const storyText = story.text();
  expect(storyText).toMatch(`${testStory.points} points`);
  expect(storyText).toMatch(testStory.title);

  const storyLink = story.find("a");
  expect(storyLink.text()).toBe(testStory.title);
  expect(storyLink.prop("href")).toBe(testStory.address);
});
