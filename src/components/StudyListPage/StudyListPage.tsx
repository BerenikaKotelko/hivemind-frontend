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

// const DummyResourceData = [
//   {
//     id: 1,
//     author_id: 1,
//     title: "CSS tricks",
//     description: "A great website for styling up your apps.",
//     type: "Article",
//     recommended: "Un-bee-table",
//     url: "https://css-tricks.com/",
//     week: "Week 1 Git",
//     date_added: 1642437294,
//     name: "Berenika",
//     is_faculty: false,
//     likes: 2,
//     dislikes: 1,
//     studied: false,
//     tags: [
//       { tag_id: 1, tag_name: "Hooks", tag_colour: "#4b6cdb" },
//       { tag_id: 2, tag_name: "React", tag_colour: "#15aca6" },
//       { tag_id: 3, tag_name: "Testing", tag_colour: "#7d9681" },
//     ],
//   },
//   {
//     id: 2,
//     author_id: 1,
//     title: "My first resource",
//     description: "Updating the description",
//     type: "Article",
//     recommended: "Un-bee-liveable",
//     url: "www.google.com",
//     week: "Week 1 Git",
//     date_added: 1642437294,
//     name: "Berenika",
//     is_faculty: false,
//     likes: 0,
//     dislikes: 0,
//     studied: false,
//     tags: [
//       { tag_id: 4, tag_name: "SQL", tag_colour: "#ad0052" },
//       { tag_id: 5, tag_name: "FrontEnd", tag_colour: "#786b6f" },
//       { tag_id: 6, tag_name: "BackEnd", tag_colour: "#7fde25" },
//     ],
//   },
//   {
//     id: 3,
//     author_id: 4,
//     title: "Battle practice",
//     description:
//       "A truly magnificent website for practicing your code warfare skills. Find your own Austerlitz on codewars!",
//     type: "Article",
//     recommended: "Un-bee-table",
//     url: "https://www.codewars.com",
//     week: "Week 1 Git",
//     date_added: 1642437294,
//     name: "Hanna",
//     is_faculty: false,
//     likes: 0,
//     dislikes: 0,
//     studied: false,
//     tags: [],
//   },
//   {
//     id: 4,
//     author_id: 1,
//     title: "Beri rules",
//     description: "LOL",
//     type: "Article",
//     recommended: "May-bee",
//     url: "www.youtube.com",
//     week: "Week 1 Git",
//     date_added: 1642437294,
//     name: "Berenika",
//     is_faculty: false,
//     likes: 1,
//     dislikes: 0,
//     studied: true,
//     tags: [],
//   },
//   {
//     id: 5,
//     author_id: 2,
//     title: "Computer programming",
//     description:
//       "Computer programming is the process of designing and building an executable computer program to accomplish a specific computing result or to perform a particular task. Programming involves tasks such as analysis, generating algorithms, profiling algorithms accuracy and resource consumption, and the implementation of algorithms in a chosen programming language (commonly referred to as coding)",
//     type: "Article",
//     recommended: "Un-bee-lieveable",
//     url: "www.google.com",
//     week: "Week 1 Git",
//     date_added: 1642437294,
//     name: "Christopher",
//     is_faculty: false,
//     likes: 3,
//     dislikes: 1,
//     studied: true,
//     tags: [],
//   },
// ];

export default function StudyListPage({ currentUser }: StudyListPageProps) {
  // const [studyListResources, setStudyListResources] =
  //   useState<IStudyListResource[]>(DummyResourceData);
  // const [selectedResource, setSelectedResource] = useState<IStudyListResource>(
  //   studyListResources[0]
  // );

  const [studyListResources, setStudyListResources] =
    useState<IStudyListResource[]>();
  const [selectedResource, setSelectedResource] =
    useState<IStudyListResource>();

  const baseUrl = process.env.REACT_APP_API_URL ?? "https://localhost:4000";

  const getStudyList = useCallback(
    async (endpoint: string) => {
      console.log("Running getStudyList");
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
