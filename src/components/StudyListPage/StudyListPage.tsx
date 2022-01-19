import { IUser } from "../../interfaces/IUser";
import "../../components/styles/StudyList.css";
// import { IResource } from "../../interfaces/IResource";
import { IStudyListResource } from "../../interfaces/IResource";
import { useCallback, useEffect, useState } from "react";
// import timestampConverterToGB from "../../utils/timestampConverter";
// import ReactTooltip from "react-tooltip";
import axios from "axios";
// import { IComment } from "../../interfaces/IComment";
// import timestampConverter from "../../utils/timestampConverter";
import StudyListResource from "./StudyResource";

interface StudyListPageProps {
  currentUser: IUser | undefined;
}
export default function StudyListPage({ currentUser }: StudyListPageProps) {
  const [studyListResources, setStudyListResources] =
    useState<IStudyListResource[]>();
  const [selectedResource, setSelectedResource] =
    useState<IStudyListResource>();

  const baseUrl = process.env.REACT_APP_API_URL ?? "https://localhost:4000";

  const getStudyList = useCallback(
    async (endpoint: string) => {
      if (currentUser) {
        const res = await axios.get(`${baseUrl}/${endpoint}/${currentUser.id}`);
        setStudyListResources(res.data.data);
      }
    },
    [baseUrl, currentUser]
  );

  useEffect(() => {
    getStudyList("study_list");
    setSelectedResource(undefined);
  }, [getStudyList]);

  function handleClickOnResource(resource: IStudyListResource) {
    setSelectedResource(resource);
  }

  return (
    <>
      {currentUser && studyListResources ? (
        <>
          <div className="container title">
            <h1>My Study List</h1>
          </div>
          <div className="parent-container">
            <div className="study-list-container">
              <div className="to-study-container">
                <h4>Resources to study</h4>
                {studyListResources.length === 0 ? (
                  <div style={{ marginTop: "10px" }}>
                    <h6>
                      <em>To see study list item, add them from home page </em>
                    </h6>
                  </div>
                ) : (
                  <ol className="list-group list-group-item-action overflow-auto">
                    {studyListResources
                      .filter(
                        (studyListResource) =>
                          studyListResource.studied === false
                      )
                      .map((studyListResource) => {
                        return (
                          <li
                            key={studyListResource.id}
                            className={
                              "list-group-item d-flex justify-content-between align-items-start " +
                              (selectedResource &&
                              selectedResource.id === studyListResource.id
                                ? "active"
                                : "")
                            }
                            onClick={() =>
                              handleClickOnResource(studyListResource)
                            }
                          >
                            <div className="ms-2 me-auto snippet-list">
                              <div className="fw-bold ">
                                {studyListResource.title}
                              </div>
                              <p
                                className={
                                  "monospace-text snippet-fragment " +
                                  (selectedResource &&
                                  selectedResource.id === studyListResource.id
                                    ? "active"
                                    : "")
                                }
                              >
                                {studyListResource.description}
                              </p>
                            </div>
                            <small>
                              <em>{studyListResource.type}</em>
                            </small>
                          </li>
                        );
                      })}
                  </ol>
                )}
              </div>
              <div className="resources-studied-container">
                <h4>Resources already studied</h4>
                <ol className="list-group list-group-item-action overflow-auto">
                  {studyListResources
                    .filter((studyListResource) => studyListResource.studied)
                    .map((studyListResource) => {
                      return (
                        <li
                          key={studyListResource.id}
                          className={
                            "list-group-item d-flex justify-content-between align-items-start " +
                            (selectedResource &&
                            selectedResource.id === studyListResource.id
                              ? "active"
                              : "")
                          }
                          onClick={() =>
                            handleClickOnResource(studyListResource)
                          }
                        >
                          <div className="ms-2 me-auto snippet-list">
                            <div className="fw-bold ">
                              {studyListResource.title}
                            </div>
                            <p className="description">
                              {studyListResource.description}
                            </p>
                          </div>
                          <small>
                            <em>{studyListResource.type}</em>
                          </small>
                        </li>
                      );
                    })}
                </ol>
              </div>
            </div>
            {selectedResource ? (
              <div className="resource-view-container">
                <StudyListResource
                  currentUser={currentUser}
                  selectedResource={selectedResource}
                  getStudyList={getStudyList}
                />
              </div>
            ) : (
              <div className="resource-empty-container">
                <h2>⬅️ Click on a resource to see the details!</h2>
              </div>
            )}
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
