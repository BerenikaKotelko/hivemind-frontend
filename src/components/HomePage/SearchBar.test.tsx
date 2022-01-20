import SearchBar from "./SearchBar";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

const SearchBarProps = {
  searchTerm: "",
  setSearchTerm: jest.fn(),
  unselectedTags: [],
  selectedTags: [],
  handleTagClick: jest.fn(),
  handleRemoveTagClick: jest.fn(),
  handleContentTypeClick: jest.fn(),
  handleRecommendationClick: jest.fn(),
  recommendationValue: {
    "Un-bee-table": false,
    "May-bee": false,
    Buzzkill: false,
  },
  contentType: {
    Article: false,
    "Cheat-Sheet": false,
    Course: false,
    Diagram: false,
    Ebook: false,
    Exercise: false,
    "Exercise Set": false,
    Podcast: false,
    Organisation: false,
    Reference: false,
    "Resource List": false,
    "Software Tool": false,
    Video: false,
    "Youtube Channel": false,
  },
  handleResetFilters: jest.fn(),
};

it("searchbar should have value set to searchTerm", () => {
  const testProps = { ...SearchBarProps, searchTerm: "test" };
  render(
    <Router>
      <SearchBar {...testProps} />
    </Router>
  );
  const searchBarInput = screen.getByTestId("searchbar-input");
  expect(searchBarInput).toHaveValue("test");
});

it("should call setSearchTerm when user types into input", () => {
  render(
    <Router>
      <SearchBar {...SearchBarProps} />
    </Router>
  );
  const searchBarInput = screen.getByTestId("searchbar-input");
  fireEvent.change(searchBarInput, { target: { value: "a" } });
  expect(SearchBarProps.setSearchTerm).toHaveBeenCalled();
});

it("should call handleResetFilters when user clicks reset filter button", async () => {
  render(
    <Router>
      <SearchBar {...SearchBarProps} />
    </Router>
  );
  const resetFilterButton = screen.getByTestId("searchbar-reset-filter-button");
  expect(resetFilterButton).toHaveTextContent("Reset filters");
  fireEvent.click(resetFilterButton);
  expect(SearchBarProps.handleResetFilters).toHaveBeenCalled();
});
