import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
// the component to test
import HomePage from "../HomePage";
import { render, screen } from "@testing-library/react";

const props = {
  currentUser: {
    id: 1,
    name: "Mike",
    is_faculty: false,
  },
  resources: [
    {
      id: 1,
      author_id: 1,
      title: "Test resource",
      description: "Description",
      recommended: "nope",
      url: "www.google.com",
      date_added: 1000,
      likes: "12",
      content_type: "Video",
    },
    {
      id: 2,
      author_id: 2,
      title: "Test resource 2",
      description: "Description 2",
      recommended: "yep",
      url: "www.youtube.com",
      date_added: 2000,
      likes: "1",
      content_type: "Course",
    },
  ],
};

test.skip("loads items eventually", async () => {
  const div = document.createElement("div");
  //bob?
  ReactDOM.render(<HomePage {...props} />, div);
});

it("renders Test resource as text on page", () => {
  render(<HomePage {...props} />);
  const resourceText = screen.getByTestId("resource1");
  expect(resourceText).toHaveTextContent("Test resource");
  const resourceText2 = screen.getByTestId("resource2");
  expect(resourceText2).toHaveTextContent("Test resource 2");
});
