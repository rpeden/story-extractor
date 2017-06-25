import React from "react";
import Story from ".Story.jsx";
import renderer from "react-test-renderer";

test("Story displays as expected", () => {
  const testStory = {
    title: "Test Title",
    points: 50,
    domain: "http://nowhere.com"
  };

  const component = renderer.create(
    <Story story={testStory} />
  );
  const story = component.toJSON();
  expect(story).toMatchSnapshot();
});
