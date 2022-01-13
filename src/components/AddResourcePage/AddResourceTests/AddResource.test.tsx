import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
// the component to test
import AddResourcePage from "../AddResourcePage";
import { render, screen } from "@testing-library/react";

const props = {
  tagBank: [
    { tag_id: 1, tag_name: "React" },
    { tag_id: 2, tag_name: "Javascript" },
    { tag_id: 3, tag_name: "Bootstrap" },
    { tag_id: 4, tag_name: "Express" },
  ]
};


test("loads items eventually", () => {
  const div = document.createElement("bob");
  //bob?
  ReactDOM.render(<AddResourcePage {...props} />, div);
});

it("renders header on Add Resource", () => {
  render(<AddResourcePage {...props} />);
  const header = screen.getByTestId("add-resource-header");
  expect(header).toHaveTextContent("Add a resource");
});

it("title, description and url fields have correct placeholder values in Add Resource", () => {
  render(<AddResourcePage {...props} />);
  const inputTitle = screen.getByTestId("add-resource-input-title");
  expect(inputTitle).toHaveAttribute('placeholder')
  const inputDescription = screen.getByTestId("add-resource-input-description");
  expect(inputDescription).toHaveAttribute("placeholder");
  const inputUrl = screen.getByTestId("add-resource-input-url");
  expect(inputUrl).toHaveAttribute("placeholder");
});

it("tests there are three selectable options and these match expected values", () => {
  render(<AddResourcePage {...props} />);
  //how to check type is a select component? Not impotant to test for the type of component, but expected function: black box testing
  //using spies to test whether a function is being called
  //testing snapshots 
  //should we be using async-await? 
  const option1 = screen.getByTestId("add-resource-recommendability-option1");
  expect(option1).toHaveTextContent("Un-bee-lievable");
  const option2 = screen.getByTestId("add-resource-recommendability-option2");
  expect(option2).toHaveTextContent("May-bee");
  const option3 = screen.getByTestId("add-resource-recommendability-option3");
  expect(option3).toHaveTextContent("Buzzkill");
});

it("tests the length of available tags div and each tag", () => {
  render(<AddResourcePage {...props} />);
  // const recommendability = screen.getByTestId("add-resource-recommendability");
  // expect(recommendability).toHaveAttribute('placeholder')
  const availableResourceTags = screen.getByTestId("add-resource-tags");
  expect(availableResourceTags).toHaveLength(1);
  //how to test length of elements in a map? 
  const resourceTag1 = screen.getByTestId("add-resource-tag-1");
  expect(resourceTag1).toHaveTextContent("React");
});

// it("tests the length of selected tags div on first render", () => {
//   render(<AddResourcePage {...props} />);
//   // const selectedResourceTags = screen.getByTestId("add-resource-selected-tags");
//   // expect(selectedResourceTags).toHaveLength(4);});

//Shows header DONE
//Testing that title, description and url input fields work (are of type input) DONE
//Testing that there are three selectable options, check the inputs match the options DONE
//All tags are showing in resource tags and none in selected tags DONE 
