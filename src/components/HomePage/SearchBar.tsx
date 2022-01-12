import { ITag } from "../../interfaces/ITag";
import "../styles/SearchBar.css";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  unselectedTags: ITag[];
  selectedTags: ITag[];
  handleTagClick: (tag: ITag) => void;
  handleRemoveTagClick: (tag: ITag) => void;
}
const contentType = [
  "Video",
  "Article",
  "Ebook",
  "Podcast",
  "Exercise",
  "Exercise Set",
  "Software Tool",
  "Course",
  "Diagram",
  "Cheat-Sheet",
  "Reference",
  "Resource List",
  "Youtube Channel",
  "Organisation",
];

const recommendationValue = ["Un-bee-lievable", "May-bee", "Buzzkill"];

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  unselectedTags,
  selectedTags,
  handleTagClick,
  handleRemoveTagClick,
}: SearchBarProps) {
  return (
    <>
      <div className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
                  <h6>Resource Type</h6>
                  {contentType.map((resourceType, index) => {
                    return (
                      <div key={index} className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`typecheckbox${index}`}
                          value={resourceType}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`typecheckbox${index}`}
                        >
                          {resourceType}
                        </label>
                      </div>
                    );
                  })}

                  <br />
                  <h6>Recommendation Value</h6>
                  {recommendationValue.map(
                    (singleRecommendationValue, index) => {
                      return (
                        <div
                          key={index}
                          className="form-check form-check-inline"
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`reccheckbox${index}`}
                            value={singleRecommendationValue}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`reccheckbox${index}`}
                          >
                            {singleRecommendationValue}
                          </label>
                        </div>
                      );
                    }
                  )}
                </div>
                <hr className="dropdown-divider" />
                <div className="filterTags">
                  {unselectedTags.map((tag, index) => (
                    <span
                      key={index}
                      className="tag-badge badge rounded-pill"
                      style={{ backgroundColor: tag.tag_colour }}
                      onClick={() => {
                        handleTagClick(tag);
                      }}
                    >
                      {tag.tag_name}
                    </span>
                  ))}
                </div>
                <hr className="dropdown-divider" />
                <div className="selectedTags">
                  <p>Selected tags: </p>
                  {selectedTags.map((tag, index) => (
                    <span
                      key={index}
                      className="tag-badge badge rounded-pill"
                      style={{ backgroundColor: tag.tag_colour }}
                      onClick={() => {
                        handleRemoveTagClick(tag);
                      }}
                    >
                      {tag.tag_name}
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
