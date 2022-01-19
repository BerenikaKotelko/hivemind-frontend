import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
// the component to test
import HomePage from "../HomePage";
import { render, screen } from "@testing-library/react";
import { useCallback } from "react";
import axios from "axios";
// import Resource from "../Resource";
// import SearchBar from "../SearchBar";

// const tags = [
//   { tag_id: 1, tag_name: "Javascript" },
//   { tag_id: 2, tag_name: "Hooks" },
//   { tag_id: 3, tag_name: "Testing" },
// ];

const baseUrl = process.env.REACT_APP_API_URL;

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
      week: "Week 1 - Git",
      date_added: 1641832782,
      name: "Mike",
      is_faculty: true,
      type: "video",
      likes: 3,
      dislikes: 4,
      tags: [
        {
          tag_id: 1,
          tag_name: "React",
          tag_colour: "#D92626",
        },
        {
          tag_id: 2,
          tag_name: "Hooks",
          tag_colour: "#D92626",
        },
        {
          tag_id: 3,
          tag_name: "Javascript",
          tag_colour: "#D92626",
        },
      ],
    },
    {
      id: 2,
      author_id: 2,
      title: "Test resource 2",
      description: "Description 2",
      recommended: "May-bee",
      url: "www.youtube.com",
      week: "Week 2 - Html",
      date_added: 1609778382,
      name: "Simon",
      is_faculty: true,
      type: "video",
      likes: 9,
      dislikes: 7,
      tags: [
        {
          tag_id: 1,
          tag_name: "React",
          tag_colour: "#D92626",
        },
        {
          tag_id: 2,
          tag_name: "Hooks",
          tag_colour: "#D92626",
        },
        {
          tag_id: 3,
          tag_name: "Javascript",
          tag_colour: "#D92626",
        },
      ],
    },
  ],
  getResources: (endpoint: string) => {
    const str = endpoint; // random operation that doesn't return anything
  },
  // comments: [
  //   {
  //     comment_id: 5,
  //     resource_id: 1,
  //     author_id: 2,
  //     comment_text: "What a rad resource",
  //     date_added: "1641832782",
  //     name: "Katy Perry",
  //   },
  //   {
  //     comment_id: 3,
  //     resource_id: 1,
  //     author_id: 1,
  //     comment_text: "Testing endpoint comment",
  //     date_added: "1641465486",
  //     name: "Barack Obama",
  //   },
  //   {
  //     comment_id: 1,
  //     resource_id: 1,
  //     author_id: 1,
  //     comment_text: "My first comment",
  //     date_added: "1641313407",
  //     name: "Barack Obama",
  //   },
  // ],
};

// const resourceProps = {
//   currentUser: {
//     id: 1,
//     name: "Mike",
//     is_faculty: false,
//   },
//   resource: {
//     id: 1,
//     author_id: 1,
//     title: "Test resource",
//     description: "Description",
//     recommended: "Buzzkill",
//     url: "www.google.com",
//     date_added: 1641832782,
//     likes: "12",
//     name: "Mike",
//     is_faculty: true,
//   },
// };

// How do?
//const searchBarProps = {
// searchTerm: "",
// setSearchTerm: () => void
// }

//testing whether the Home Page loads and has content

//this:

test.skip("loads items eventually", async () => {
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

// it("loads comments for a specific resource", async () => {
//   render(<HomePage {...props} />);
//   const commentText = screen.getByTestId("resource1");
//   expect(commentText).toHaveTextContent("What a rad resource");
//   expect(commentText).toHaveTextContent("Katy Perry");
// });

// it('calls onClick prop when clicked', async () => {
//   const handleClick = jest.fn()
//   render(<Resource {...resourceProps}></Resource>)
//   fireEvent.click(screen.getByText(/Expand/i))
//   expect(handleClick).toHaveBeenCalledTimes(1)
// })

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
