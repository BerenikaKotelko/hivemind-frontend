import "../styles/Resource.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { IUser } from "../../interfaces/IUser";
import { IResource } from "../../interfaces/IResource";
import timestampConverter from "../../utils/timestampConverter";

interface ResourceProps {
  resource: IResource;
  currentUser: IUser | undefined;
}

const tags = [
  "React",
  "Javascript",
  "Bootstrap",
  "Git",
  "Cypress",
  "Testing",
  "Jest",
  "React",
  "Javascript",
  "Bootstrap",
  "Git",
  "Cypress",
  "Testing",
  "Jest",
  "React",
  "Javascript",
  "Bootstrap",
  "Git",
  "Cypress",
  "Testing",
  "Jest",
];

const comments = [
  "Hey! this is a really useful resource, thanks for sharing :)",
  "Wow I've never thought about it this way before.",
  "I agree, this resource is bee-rilliant",
];

function Resource({ resource, currentUser }: ResourceProps) {
  const [expanded, setExpanded] = useState(false);
  const showSignInError = (str: string) => {
    //double ?? means is undefined? then...
    currentUser ?? toast.error(str);
  };
  return (
    <div className="resource" data-testid={`resource${resource.id}`}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{resource.title}</h5>
          <p className="card-text">{resource.description}</p>
          <div className="resource-summary">
            <div>
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="tag-badge badge rounded-pill bg-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              className="expand-button btn btn-outline-primary filter-btn btn-sm"
              type="submit"
              data-bs-toggle="modal"
              data-bs-target={`#resourceModal${resource.id}`}
            >
              🎈 Expand
            </button>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id={`resourceModal${resource.id}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="filterModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{resource.title}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="resource-header">
                <p>Created {timestampConverter(resource.date_added)}</p>
                <p>Added by {resource.author_id}</p>
                <div className="header-buttons">
                  <button
                    type="button"
                    className="header-button btn btn-outline-warning"
                    onClick={() => {
                      showSignInError(
                        "You need to be authenticated to like a resource!"
                      );
                      console.log("thumbs up");
                    }}
                  >
                    👍
                  </button>
                  <button
                    type="button"
                    className="header-button btn btn-outline-warning"
                    onClick={() => {
                      showSignInError(
                        "You need to be authenticated to dislike a resource!"
                      );
                      console.log("thumbs down");
                    }}
                  >
                    👎
                  </button>
                  {/* toggle for adding to to-study list */}
                  <div className="add-study-list-toggle form-check form-switch ">
                    {currentUser ? (
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckChecked"
                        disabled
                      />
                    ) : (
                      //should disabled be below?
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckChecked"
                      />
                    )}
                    <label
                      className="form-check-label"
                      htmlFor="flexSwitchCheckChecked"
                    ></label>
                  </div>
                </div>
              </div>
              <h5>{resource.title}</h5>
              <div className="resource-details">
                <div className="tag-container">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="tag-badge badge rounded-pill bg-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p>{resource.recommended}</p>
              </div>
              <hr className="dropdown-divider" />
              <div className="resource-body">
                <a href={resource.url}>{resource.url}</a>
                <br />
                <p>{resource.description}</p>
              </div>
              <hr className="dropdown-divider" />
              <div className="resource-footer">
                <h6>Comments: </h6>
                <div className="input-group mb-3">
                  <textarea
                    className="form-control"
                    aria-label="With textarea"
                    placeholder="Add a comment.."
                    aria-describedby="button-addon2"
                  ></textarea>
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                    onClick={() => {
                      showSignInError(
                        "You need to be authenticated to post a comment!"
                      );
                    }}
                  >
                    Send
                  </button>
                </div>
                {!expanded && (
                  <>
                    <ul className="list-group comment-group">
                      {comments.slice(0, 4).map((comment, idx) => (
                        <li
                          key={idx}
                          className="list-group-item d-flex justify-content-between align-items-start"
                        >
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">Barack Obama</div>
                            {comment}
                          </div>
                          <span className="badge bg-primary rounded-pill">
                            14/10/2021
                          </span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className="comment-toggle btn btn-primary"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExample"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                      onClick={() => setExpanded(true)}
                    >
                      Show more
                      {/* chevron icon for button */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-chevron-down"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                        />
                      </svg>
                    </button>
                  </>
                )}
                {expanded && (
                  <>
                    <ul className="list-group comment-group">
                      {comments.map((comment, idx) => (
                        <li
                          key={idx}
                          className="list-group-item d-flex justify-content-between align-items-start"
                        >
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">bob</div>
                            {comment}
                          </div>
                          <span className="badge bg-primary rounded-pill">
                            14/10/2021
                          </span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className="comment-toggle btn btn-primary"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExample"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                      onClick={() => setExpanded(false)}
                    >
                      Show less
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-chevron-up"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="modal-footer">
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
  );
}

export default Resource;
