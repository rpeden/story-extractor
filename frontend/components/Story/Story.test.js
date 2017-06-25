import React from "react";
import Story from "./Story.jsx";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";

test("Story snapshot works", () => {
  const testStory = {
    title: "Test Title",
    points: 50,
    address: "http://nowhere.com"
  };

  const component = renderer.create(
    <Story story={testStory} />
  );
  const story = component.toJSON();
  expect(story).toMatchSnapshot();
});

test("Story renders as expected", () => {

});
