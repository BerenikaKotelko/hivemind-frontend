import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
// the component to test
import HomePage from "../HomePage";
import { render, screen } from "@testing-library/react";
// import SearchBar from "../SearchBar";

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
      recommended: "Buzzkill",
      url: "www.google.com",
      date_added: 1641832782,
      likes: "12",
      name: "Mike",
      is_faculty: true,
    },
    {
      id: 2,
      author_id: 2,
      title: "Test resource 2",
      description: "Description 2",
      recommended: "May-bee",
      url: "www.youtube.com",
      date_added: 1609778382,
      likes: "1",
      name: "Simon",
      is_faculty: true,
    },
  ],
};

// How do?
//const searchBarProps = {
// searchTerm: "",
// setSearchTerm: () => void
// }

//testing whether the Home Page loads and has content
test("loads items eventually", async () => {
  const div = document.createElement("div");
  //bob?
  ReactDOM.render(<HomePage {...props} />, div);
});

it("renders Test resource as text on page", () => {
  render(<HomePage {...props} />);
  const resourceText = screen.getByTestId("resource1");
  expect(resourceText).toHaveTextContent("Test resource");
  expect(resourceText).toHaveTextContent("Added by Mike");
  expect(resourceText).toHaveTextContent("Description");
  expect(resourceText).toHaveTextContent("www.google.com");
  expect(resourceText).toHaveTextContent("Buzzkill");
  expect(resourceText).toHaveTextContent("Created 10/01/2022");
  const resourceText2 = screen.getByTestId("resource2");
  expect(resourceText2).toHaveTextContent("Test resource 2");
  expect(resourceText2).toHaveTextContent("Added by Simon");
  expect(resourceText2).toHaveTextContent("Description 2");
  expect(resourceText2).toHaveTextContent("www.youtube.com");
  expect(resourceText2).toHaveTextContent("May-bee");
  expect(resourceText2).toHaveTextContent("Created 04/01/2021");
});

//Testing whether the search bar loads and has content
// test("loads items eventually", async () => {
//   const div = document.createElement("div");
//   //bob?
//   ReactDOM.render(<SearchBar {...props} />, div);
// });
// it("renders Test resource as text on page", () => {
//   render(<HomePage {...props} />);
//   const resourceText = screen.getByTestId("resource1");
//   expect(resourceText).toHaveTextContent("Test resource");
//   const resourceText2 = screen.getByTestId("resource2");
//   expect(resourceText2).toHaveTextContent("Test resource 2");
// });
