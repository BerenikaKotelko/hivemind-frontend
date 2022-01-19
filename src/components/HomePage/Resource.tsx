import "../styles/Resource.css";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { IUser } from "../../interfaces/IUser";
import { IResource } from "../../interfaces/IResource";
import { IComment } from "../../interfaces/IComment";
import { timestampConverterToGB } from "../../utils/timestampConverter";
import timestampConverter from "../../utils/timestampConverter";
import ReactTooltip from "react-tooltip";

interface ResourceProps {
  resource: IResource;
  currentUser: IUser | undefined;
  getResources: (endpoint: string) => void;
}

function Resource({ resource, currentUser, getResources }: ResourceProps) {
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [likeStatus, setLikeStatus] = useState<boolean | null>(null); // change naming convention to thumbs down rather than dislike
  const [addedToStudyList, setAddedToStudyList] = useState<boolean>(false);

  const baseUrl = process.env.REACT_APP_API_URL ?? "https://localhost:4000";
  const showSignInError = (str: string) => {
    //double ?? means is undefined? then...
    currentUser ?? toast.error(str);
  };

  const showUnlikeError = (str: string) => {
    currentUser && toast.error(str);
  };

  const handleAddComment = async (commentText: string) => {
    if (currentUser) {
      await axios.post(`${baseUrl}/resources/${resource.id}/comments`, {
        author_id: currentUser.id,
        comment_text: commentText,
      });
    }
    getComments(`resources/${resource.id}/comments`);
    setCommentText("");
  };

  const handleLike = async (liked: boolean) => {
    if (currentUser) {
      const res = await axios.post(
        `${baseUrl}/resources/${resource.id}/likes/${currentUser.id}`,
        { liked }
      );
      console.log(res.data.data);
      getResources("resources");
      getLikeStatus(`resources/${resource.id}/likes`);
    }
  };

  const handleUnlike = async () => {
    if (currentUser) {
      const res = await axios.delete(
        `${baseUrl}/resources/${resource.id}/likes/${currentUser.id}`
      );
      console.log(res.data.data);
      getResources("resources");
      getLikeStatus(`resources/${resource.id}/likes`);
    }
  };

  const handleThumbsUpClick = () => {
    if (likeStatus) {
      handleUnlike();
    } else {
      handleLike(true);
    }
  };

  const handleThumbsDownClick = () => {
    if (likeStatus === false) {
      handleUnlike();
    } else if (likeStatus === null) {
      handleLike(false);
    }
  };

  const handleToggleStudyList = async (added: boolean) => {
    if (currentUser) {
      if (!added) {
        const res = await axios.post(
          `${baseUrl}/study_list/${currentUser.id}`,
          {
            resource_id: resource.id,
          }
        );
        console.log(res.data.data);
      } else {
        const res = await axios.delete(
          `${baseUrl}/study_list/${currentUser.id}/${resource.id}`
        );
        console.log(res.data.data);
      }
      getStudyListStatus(`resources/${resource.id}/study_list`); // post request not working
    }
  };

  // const handleRemoveFromStudyList = () => {};

  const getComments = useCallback(
    async (endpoint: string) => {
      const res = await axios.get(`${baseUrl}/${endpoint}`);
      setComments(res.data.data);
    },
    [baseUrl]
  );

  const getLikeStatus = useCallback(
    async (endpoint: string) => {
      if (currentUser) {
        const res = await axios.get(`${baseUrl}/${endpoint}/${currentUser.id}`);
        setLikeStatus(res.data.data);
      }
    },
    [baseUrl, currentUser]
  );

  const getStudyListStatus = useCallback(
    async (endpoint: string) => {
      if (currentUser) {
        const res = await axios.get(`${baseUrl}/${endpoint}/${currentUser.id}`);
        setAddedToStudyList(res.data.data);
      }
    },
    [baseUrl, currentUser]
  );

  useEffect(() => {
    getComments(`resources/${resource.id}/comments`);
    // For 60-63: https://stackoverflow.com/questions/54954385/react-useeffect-causing-cant-perform-a-react-state-update-on-an-unmounted-comp
    getLikeStatus(`resources/${resource.id}/likes`);
    getStudyListStatus(`resources/${resource.id}/study_list`);
    return () => {
      setComments([]);
      setLikeStatus(null);
      setAddedToStudyList(false);
    };
  }, [getComments, getLikeStatus, getStudyListStatus, resource.id]);

  return (
    <div className="resource" data-testid={`resource${resource.id}`}>
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <div className="card-title-main">
              <h5>{resource.title}</h5>
              <em>
                <small className="text-muted">
                  submitted by: {resource.name}
                </small>
              </em>
            </div>
            <div className="card-title-details">
              <p>
                <em>
                  <small className="text-muted">{resource.type}</small>
                </em>
              </p>
              <p>
                <em>
                  <small className="text-muted">{resource.recommended}</small>
                </em>
              </p>
            </div>
          </div>
          <p className="card-text">{resource.description}</p>
          <div className="resource-summary">
            <div>
              {resource.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="tag-badge badge rounded-pill"
                  style={{ backgroundColor: tag.tag_colour }}
                >
                  {tag.tag_name}
                </span>
              ))}
            </div>
            <button
              className="expand-button btn btn-outline-primary filter-btn btn-sm"
              type="submit"
              data-bs-toggle="modal"
              data-bs-target={`#resourceModal${resource.id}`}
            >
              Click to expand resource
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
              {/* <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button> */}
              <div className="title-study-list-elements">
                <p className="add-to-study-list-text"> Add to study list</p>
                {/* toggle for adding to to-study list */}
                <ReactTooltip delayShow={150} />
                <div
                  className="add-study-list-toggle form-check form-switch"
                  data-tip="Toggle for adding to study list"
                >
                  {currentUser ? (
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckChecked"
                      onChange={() => {
                        console.log("posting to study list");
                        handleToggleStudyList(addedToStudyList);
                        setAddedToStudyList(!addedToStudyList);
                      }}
                      checked={addedToStudyList}
                    />
                  ) : (
                    // addedToStudyList ? (
                    //   <input
                    //     className="form-check-input"
                    //     type="checkbox"
                    //     role="switch"
                    //     id="flexSwitchCheckChecked"
                    //     onChange={() => {
                    //       console.log("posting to study list");
                    //       handleAddToStudyList();
                    //       setAddedToStudyList(false);
                    //     }}
                    //     checked={addedToStudyList}
                    //   />
                    // ) : (
                    //   <input
                    //     className="form-check-input"
                    //     type="checkbox"
                    //     role="switch"
                    //     id="flexSwitchCheckDefault"
                    //     onChange={() => {
                    //       console.log("posting to study list");
                    //       setAddedToStudyList(true);
                    //     }}
                    //   />
                    // )
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDisabled"
                      disabled
                    />
                  )}
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheck"
                  ></label>
                </div>
              </div>
            </div>
            <div className="modal-body">
              <div className="resource-header">
                <p>Created {timestampConverterToGB(resource.date_added)}</p>
                <p>Added by {resource.name}</p>
                <div className="header-buttons">
                  <button
                    type="button"
                    className="header-button btn btn-outline-warning"
                    style={{
                      color: likeStatus ? "black" : "#f7b950",
                      backgroundColor: likeStatus ? "#ffdd99" : "white",
                    }}
                    onClick={() => {
                      showSignInError(
                        "You need to be authenticated to like a resource!"
                      );
                      handleThumbsUpClick();
                      likeStatus === false &&
                        showUnlikeError("Undislike before liking!");
                    }}
                  >
                    {resource.likes} 👍
                  </button>
                  <button
                    type="button"
                    className="header-button btn btn-outline-warning"
                    style={{
                      color: likeStatus === false ? "black" : "#f7b950",
                      backgroundColor:
                        likeStatus === false ? "#ffdd99" : "white",
                    }}
                    onClick={() => {
                      showSignInError(
                        "You need to be authenticated to dislike a resource!"
                      );
                      handleThumbsDownClick();
                      likeStatus && showUnlikeError("Unlike before disliking!");
                    }}
                  >
                    {resource.dislikes} 👎
                  </button>
                </div>
              </div>
              <h5>{resource.type}</h5>
              <p className="text-muted">
                <small>{resource.week}</small>
              </p>
              <div className="resource-details">
                <div className="tag-container">
                  {resource.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="tag-badge badge rounded-pill"
                      style={{ backgroundColor: tag.tag_colour }}
                    >
                      {tag.tag_name}
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
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  ></textarea>
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                    onClick={() => {
                      showSignInError(
                        "You need to be authenticated to post a comment!"
                      );
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
