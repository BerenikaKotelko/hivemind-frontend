import { ITag } from "../../interfaces/ITag";
import "../styles/SearchBar.css";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  unselectedTags: ITag[];
  selectedTags: ITag[];
  handleTagClick: (tag: ITag) => void;
  handleRemoveTagClick: (tag: ITag) => void;
  handleContentTypeClick: (checked: boolean, contentType: string) => void;
  handleRecommendationClick: (checked: boolean, recommendation: string) => void;
  contentType: { [key: string]: boolean };
  recommendationValue: { [key: string]: boolean };
  handleResetFilters: () => void;
}

// const contentType = [
//   "Video",
//   "Article",
//   "Ebook",
//   "Podcast",
//   "Exercise",
//   "Exercise Set",
//   "Software Tool",
//   "Course",
//   "Diagram",
//   "Cheat-Sheet",
//   "Reference",
//   "Resource List",
//   "Youtube Channel",
//   "Organisation",
// ];

// const recommendationValue = ["Un-bee-table", "May-bee", "Buzzkill"];

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  unselectedTags,
  selectedTags,
  handleTagClick,
  handleRemoveTagClick,
  handleContentTypeClick,
  handleRecommendationClick,
  recommendationValue,
  contentType,
  handleResetFilters,
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
          data-cy="search-bar"
        />
        <button
          className="btn btn-outline-primary filter-btn"
          type="submit"
          data-bs-toggle="modal"
          data-bs-target="#filterModal"
          data-cy="filter"
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
                <h5 className="modal-title" id="staticBackdropLabel" data-cy="filter-modal-title">
                  Set Filters
                </h5>
                {/* <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button> */}
              </div>
              <div className="modal-body">
                <h6>Resource Type</h6>
                <div className="filterType" data-cy="content-type-filter-list">
                  {Object.entries(contentType).map(
                    ([contentKey, contentValue], index) => {
                      return (
                        <div
                          key={index}
                          className="form-check form-check-inline contentType"
                        >
                          <input
                            onChange={(e) =>
                              handleContentTypeClick(
                                e.currentTarget.checked,
                                contentKey
                              )
                            }
                            className="form-check-input"
                            type="checkbox"
                            id={`typecheckbox${index}`}
                            value={contentKey}
                            checked={contentValue}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`typecheckbox${index}`}
                          >
                            {contentKey}
                          </label>
                        </div>
                      );
                    }
                  )}
                </div>
                <h6>Recommendation Value</h6>
                <div className="filterRecommendations"
                data-cy="recommendation-value-list-filter">
                  {Object.entries(recommendationValue).map(
                    ([recKey, recValue], index) => {
                      return (
                        <div
                          key={index}
                          className="form-check form-check-inline"
                        >
                          <input
                            onChange={(e) =>
                              handleRecommendationClick(
                                e.currentTarget.checked,
                                recKey
                              )
                            }
                            className="form-check-input"
                            type="checkbox"
                            id={`reccheckbox${index}`}
                            value={recKey}
                            checked={recValue}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`reccheckbox${index}`}
                          >
                            {recKey}
                          </label>
                        </div>
                      );
                    }
                  )}
                </div>
                <hr className="dropdown-divider" />
                <div className="filterTags"
                data-cy="unselected-tags-list-filter">
                  {unselectedTags.map((tag, index) => (
                    <span
                      key={index}
                      className="tag-badge badge rounded-pill"
                      role="button"
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
                      role="button"
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
                  onClick={handleResetFilters}
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
