import { useState } from "react";
import "../styles/SearchBar.css";

export default function SearchBar() {
  const [tags, setTags] = useState<string[]>([
    "React",
    "Javascript",
    "Bootstrap",
    "Express",
    "BackEnd",
    "FrontEnd",
    "Typescript",
    "Git",
    "Cypress",
    "Testing",
    "Jest",
  ]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  function handleTagClick(tag: string) {
    setTags([...tags.filter((element) => element !== tag)]);
    setSelectedTags([...selectedTags, tag]);
  }

  function handleRemoveTagClick(tag: string) {
    setSelectedTags([...selectedTags.filter((element) => element !== tag)]);
    setTags([...tags, tag]);
  }
  return (
    <>
      <div className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button
          className="btn btn-outline-success search-btn me-2"
          type="submit"
        >
          Search
        </button>
        <button
          className="btn btn-outline-primary filter-btn"
          type="submit"
          data-bs-toggle="modal"
          data-bs-target="#filterModal"
        >
          Filter
        </button>
        <div
          className="modal fade"
          id="filterModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          aria-labelledby="filterModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Set Filters
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="filterType">
                  <div className="input-group input-group-sm mb-3">
                    <label
                      className="input-group-text"
                      htmlFor="inputGroupSelect01"
                    >
                      Resource Type
                    </label>
                    <select
                      className="form-select"
                      id="inputGroupSelect01"
                      defaultValue="0"
                    >
                      <option value="0">Choose resource...</option>
                      <option value="1">Video</option>
                      <option value="2">Podcast</option>
                      <option value="3">Exercise</option>
                    </select>
                  </div>
                  <div className="input-group input-group-sm mb-3">
                    <label
                      className="input-group-text"
                      htmlFor="inputGroupSelect02"
                    >
                      Recommendation value
                    </label>
                    <select
                      className="form-select"
                      id="inputGroupSelect02"
                      defaultValue="0"
                    >
                      <option value="0">Choose value...</option>
                      <option value="1">Un-bee-liveable</option>
                      <option value="2">Promising</option>
                      <option value="3">Buzzkill</option>
                    </select>
                  </div>
                </div>
                <hr className="dropdown-divider" />
                <div className="filterTags">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="tag-badge badge rounded-pill bg-primary"
                      onClick={() => {
                        handleTagClick(tag);
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <hr className="dropdown-divider" />
                <div className="selectedTags">
                  <p>Selected tags: </p>
                  {selectedTags.map((tag, index) => (
                    <span
                      key={index}
                      className="tag-badge badge rounded-pill bg-primary"
                      onClick={() => {
                        handleRemoveTagClick(tag);
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  data-bs-dismiss="modal"
                >
                  Reset filters
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
