import { IUser } from "../../interfaces/IUser";
import "../../components/styles/StudyList.css";
import { IResource } from "../../interfaces/IResource";
import { useCallback, useEffect, useState } from "react";
import timestampConverterToGB from "../../utils/timestampConverter"
import ReactTooltip from "react-tooltip";
import axios from "axios";
import { IComment } from "../../interfaces/IComment";
import timestampConverter from "../../utils/timestampConverter";

interface StudyListPageProps {
  currentUser: IUser | undefined;
  resources: IResource[];
}

function StudyListPage({ currentUser, resources }: StudyListPageProps) {
  const [selectedResource, setSelectedResource] = useState<IResource>(resources[0])
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const [commentText, setCommentText] = useState("");

  const baseUrl = process.env.REACT_APP_API_URL ?? "https://localhost:4000";

  const handleAddComment = async (commentText: string) => {
    if (currentUser) {
      await axios.post(`${baseUrl}/resources/${selectedResource.id}/comments`, {
        author_id: currentUser.id,
        comment_text: commentText,
      });
    }
    getComments(`resources/${selectedResource.id}/comments`);
    setCommentText("");
  };
  const getComments = useCallback(
    async (endpoint: string) => {
      const res = await axios.get(`${baseUrl}/${endpoint}`);
      setComments(res.data.data);
    },
    [baseUrl]
  );

  useEffect(() => {
    getComments(`resources/${selectedResource.id}/comments`);
    // For 60-63: https://stackoverflow.com/questions/54954385/react-useeffect-causing-cant-perform-a-react-state-update-on-an-unmounted-comp
    return () => {
      setComments([]);
    };
  }, [getComments, selectedResource.id]);

  return (
    <>
      {!currentUser ? (
        <>
          <div className="container title">
            <h1>My Study List</h1>
          </div>
          <div className="parent-container">
            <div className="study-list-container">
            </div>
            <div className="resource-view-container">
              <div>
                <h5 className="title">{selectedResource.title}</h5>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    Studied!
                  </label>
                </div>
                <div className="body">
                  <div className="resource-header">
                    <p>Created {timestampConverterToGB(selectedResource.date_added)}</p>
                    <p>Added by {selectedResource.name}</p>
                    <div className="header-buttons">
                      <button
                        type="button"
                        className="header-button btn btn-outline-warning"

                      >
                        {selectedResource.likes} 👍
                      </button>
                      <button
                        type="button"
                        className="header-button btn btn-outline-warning"

                      >
                        {selectedResource.dislikes} 👎
                      </button>
                      {/* toggle for adding to to-study list */}
                      <ReactTooltip delayShow={300} />
                      <div
                        className="add-study-list-toggle form-check form-switch"
                        data-tip="Toggle for adding to study list"
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          checked
                          id="flexSwitchCheckDisabled"
                          disabled
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexSwitchCheck"
                        ></label>
                      </div>
                    </div>
                  </div>
                  <h5>{selectedResource.type}</h5>
                  <p className="text-muted">
                    <small>{selectedResource.week}</small>
                  </p>
                  <div className="resource-details">
                    <div className="tag-container">
                      {selectedResource.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="tag-badge badge rounded-pill"
                          style={{ backgroundColor: tag.tag_colour }}
                        >
                          {tag.tag_name}
                        </span>
                      ))}
                    </div>
                    <p>{selectedResource.recommended}</p>
                  </div>
                  <hr className="dropdown-divider" />
                  <div className="resource-body">
                    <a href={selectedResource.url}>{selectedResource.url}</a>
                    <br />
                    <p>{selectedResource.description}</p>
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
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      ></textarea>
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        id="button-addon2"
                        onClick={() => {
                          handleAddComment(commentText);
                        }}
                      >
                        Send
                      </button>
                    </div>
                    {!expanded && (
                      <>
                        <ul className="list-group comment-group">
                          {comments.slice(0, 3).map((comment, idx) => (
                            <li
                              key={idx}
                              className="list-group-item d-flex justify-content-between align-items-start"
                            >
                              <div className="ms-2 me-auto">
                                <div className="fw-bold">{comment.name}</div>
                                {comment.comment_text}
                              </div>
                              <span className="badge bg-primary rounded-pill">
                                {timestampConverter(comment.date_added)}
                              </span>
                            </li>
                          ))}
                        </ul>
                        {comments.length > 3 && (
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
                        )}
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
                                <div className="fw-bold">{comment.name}</div>
                                {comment.comment_text}
                              </div>
                              <span className="badge bg-primary rounded-pill">
                                {timestampConverter(comment.date_added)}
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
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="container require-sign-in">
          <img
            src="https://i.pinimg.com/originals/c1/dc/25/c1dc25c150904864cc24c48e15e63b0d.gif"
            alt="Animated bee gif"
          ></img>
          <h3>Please sign in to view this page!</h3>
        </div>
      )}
    </>
  );
}

export default StudyListPage;
