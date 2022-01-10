import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
// the component to test
import AddResourcePage from "../AddResourcePage";
import { render, screen } from "@testing-library/react";

const props = {
  tags: [
    { tag_id: 1, tag_name: "React" },
    { tag_id: 2, tag_name: "Javascript" },
    { tag_id: 3, tag_name: "Bootstrap" },
    { tag_id: 4, tag_name: "Express" },
  ],
};

test("loads items eventually", () => {
  const div = document.createElement("div");
  //bob?
  ReactDOM.render(<AddResourcePage {...props} />, div);
});

it("renders Test resource as text on page", () => {
  render(<AddResourcePage {...props} />);
  const header = screen.getByTestId("add-resource-header");
  expect(header).toHaveTextContent("Add a Resource");
});
