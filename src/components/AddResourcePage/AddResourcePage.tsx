import "../styles/AddResource.css";
import { useState, useEffect } from "react";
import { ITag } from "../../interfaces/ITag";
import { INewResource } from "../../interfaces/INewResource";
import { IResource } from "../../interfaces/IResource";
import { INewTag } from "../../interfaces/INewTag";
import { IUser } from "../../interfaces/IUser";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface AddResourcePageProps {
  tagBank: ITag[];
  getTags: (endpoint: string) => void;
  baseUrl: string;
  resources: IResource[];
  currentUser: IUser | undefined;
  getResources: (endpoint: string) => void;
}

const initialResource = {
  author_id: 0,
  title: "",
  description: "",
  recommended: "",
  url: "",
  type: "",
  week: "",
};

const colourCodes = [
  { colour_name: "Red", HEX: "#D92626" },
  { colour_name: "Orange", HEX: "#F26924" },
  { colour_name: "Yellow", HEX: "#FFBF00" },
  { colour_name: "Green", HEX: "#00CC00" },
  { colour_name: "Light Blue", HEX: "#15BDD4" },
  { colour_name: "Dark Blue", HEX: "#1A76BD" },
  { colour_name: "Purple", HEX: "#6F4599" },
  { colour_name: "Pink", HEX: "#BF1D89" },
];

// export interface IResource {
//   id?: number;
//   author_id: number;
//   title: string;
//   description: string;
//   recommended: string;
//   url: string;
//   date_added?: number;
//   type: string
// }

//DONE
//post request to resources with above shape
//post request to tags table, adding the names of any additional tags created by user and refetch the table
//add option to attach a colour to your tags
//post request to resource_tags table with tag_id and resource_id
//automatic redirect to the Homepage using React router when pressing submit button

//TO DO
//add Academy week to be studied
//colour tag inside modal

function AddResourcePage({
  tagBank,
  getTags,
  baseUrl,
  resources,
  currentUser,
  getResources,
}: AddResourcePageProps): JSX.Element {
  const [newResource, setNewResource] = useState<INewResource>(initialResource);
  const [newTag, setNewTag] = useState<string>("");
  const [newTags, setNewTags] = useState<INewTag[]>([]);
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const [unselectedTags, setUnselectedTags] = useState<ITag[]>([]);
  const [modalState, setModalState] = useState<boolean>(false);
  const [newTagColour, setNewTagColour] = useState<string>("Red");
  const navigate = useNavigate();

  useEffect(() => {
    setUnselectedTags(tagBank);
  }, [tagBank]);

  //defining constants
  //onClick condition: ensure all input fields are filled out
  const ifEmptyInputs =
    newResource.title === "" ||
    newResource.description === "" ||
    newResource.recommended === "Choose a resource recommendability..." ||
    newResource.type === "Choose a resource type..." ||
    newResource.url === "" ||
    newResource.week === "Recommend a week when this should be studied..." ||
    selectedTags.length === 0;

  const contentType = [
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
    "YouTube Channel",
    "Organisation",
  ];

  const weekToStudy = [
    "Recommend a week when this should be studied...",
    "Week 1: Workflows",
    "Week 2: Typescript and Code Quality",
    "Week 3: React, HTML, CSS",
    "Week 4: React and Event handlers",
    "Week 5: React and useEffect",
    "Week 6: Frontend Consolidation",
    "Week 7: Node.js and Express",
    "Week 8: SQL and Persistence",
    "Week 9-12: Project Work",
  ];

  //selecting your tags
  function handleTagClick(tag: ITag) {
    setUnselectedTags([
      ...unselectedTags.filter((element) => element.tag_name !== tag.tag_name),
    ]);
    setSelectedTags([...selectedTags, tag]);
  }

  function handleRemoveTagClick(tag: ITag) {
    setSelectedTags([
      ...selectedTags.filter((element) => element.tag_name !== tag.tag_name),
    ]);
    setUnselectedTags([...unselectedTags, tag]);
  }

  //input handler functions
  function handleAddNewResource(property: string, value: string | number) {
    setNewResource({ ...newResource, [property]: value });
  }

  function handleNewTag(newTag: string) {
    setNewTag(newTag.replace(/\b\w/g, (c) => c.toUpperCase()));
  }

  function handleNewTagColour(newTagColour: string) {
    let newTagHex: string;
    if (newTagColour !== "Colour your new tag...") {
      for (const colourCode of colourCodes) {
        if (colourCode.colour_name === newTagColour) {
          newTagHex = colourCode.HEX;
          setNewTagColour(newTagHex);
          console.log(newTagHex);
        }
      }
    } else {
      setNewTagColour(newTagColour);
    }
  }

  function handleNewTags(newTagName: string, newTagColour: string) {
    setNewTags([
      ...newTags,
      { tag_name: newTagName, tag_colour: newTagColour },
    ]);
  }

  //toast function
  const showToastError = (str: string) => {
    toast.error(str);
  };

  //backend requests
  async function handleUpdateTagBank(
    newTags: INewTag[],
    unselectedTags: ITag[]
  ) {
    setNewTag("");
    setNewTags([]);
    console.log(newTags);
    console.log({ tags: newTags });
    console.log({ tags: [newTags] });
    await axios.post(`${baseUrl}/tags`, { tags: newTags });
    getTags("tags");
    closeModal();
    // newTags.forEach(newTag => {
    //   setSelectedTags([...selectedTags, tagBank.filter((tag) => tag.tag_name === newTag.tag_name)]}))
    //filter over the tags returned from getTags and add only the ones with same ids as newtags to setSelectedTags
  }

  async function handlePostNewResource(newResource: INewResource) {
    if (currentUser !== undefined) {
      const reqBody = { ...newResource, author_id: currentUser.id };
      console.log(`Expected resource for backend${JSON.stringify(reqBody)}`);
      const res = await axios.post(`${baseUrl}/resources`, reqBody);
      console.log("resource id:", res.data.data.id);
      await handlePostResourcesTags(selectedTags, res.data.data.id);
      getResources("resources");
    } else {
      showToastError("Please sign in to add a resource");
    }
  }

  async function handlePostResourcesTags(
    selectedTags: ITag[],
    resource_id: number
  ) {
    const reqBody = [];
    if (currentUser !== undefined) {
      console.log("I am running!");
      for (const tag of selectedTags) {
        reqBody.push(tag.tag_id);
      }
      axios.post(`${baseUrl}/resources/${resource_id}/tags`, {
        tag_ids: reqBody,
      });
      navigate("/");
    } /*else {
      showToastError("Please sign in to add a resource");
    }*/
    // const res = await axios.post(`${baseUrl}/${`resource/${resource_id}/tags`}`, reqBody);
    // console.log(`New resource added: ${res.data.data.title}`)
    console.log("Running!! ");
  }

  //modal code
  const openModal = () => setModalState(true);
  const closeModal = () => setModalState(false);

  function onClosingModal() {
    closeModal();
    setNewTag("");
    setNewTags([]);
  }

  return (
    <>
      {currentUser ? (
        <div className="container">
          <h1 data-testid="add-resource-header" style={{ textAlign: "center" }}>
            Add a resource
          </h1>
          <p style={{ color: "red", textAlign: "center" }}>
            All inputs required
          </p>
          {/* setting title to be large */}
          <div className="input_containers">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text control-label">Title</span>
              </div>
              <input
                type="text"
                className="form-control"
                aria-label="Input title"
                data-testid="add-resource-input-title"
                aria-required="true" //is this right?
                value={newResource.title}
                onChange={(e) =>
                  handleAddNewResource(
                    "title",
                    e.target.value.replace(/^\w/gm, (c) => c.toUpperCase())
                  )
                }
              />
            </div>
          </div>
          <div className="input_containers">
            <div className="input-group mb-3">
              <span className="input-group-text">Description</span>
              <textarea
                className="form-control"
                aria-label="Input description"
                data-testid="add-resource-input-description"
                value={newResource.description}
                onChange={(e) =>
                  handleAddNewResource(
                    "description",
                    e.target.value.replace(/^\w/gm, (c) => c.toUpperCase())
                  )
                }
              ></textarea>
            </div>
          </div>
          <div className="input_containers">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  URL
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                aria-label="Input URL"
                data-testid="add-resource-input-url"
                value={newResource.url}
                onChange={(e) => handleAddNewResource("url", e.target.value)}
              />
            </div>
          </div>
          <div className="input_containers">
            <div className="input-group input-group-m mb-3">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                Resource Type
              </label>
              <select
                className="form-select"
                id="inputGroupSelect01"
                defaultValue="0"
                data-testid="add-resource-type"
                onChange={(e) => handleAddNewResource("type", e.target.value)}
              >
                <option>Choose a resource type...</option>
                {contentType.map((type) => {
                  return <option key={type}>{type}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="input_containers">
            <div className="input-group input-group-m mb-3">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                Recommendability
              </label>
              <select
                className="form-select"
                id="inputGroupSelect01"
                defaultValue="0"
                data-testid="add-resource-recommendability"
                onChange={(e) =>
                  handleAddNewResource("recommended", e.target.value)
                }
              >
                <option>Choose a recommendability...</option>
                <option>Un-bee-table</option>
                <option>May-bee</option>
                <option>Buzzkill</option>
              </select>
            </div>
          </div>
          <div className="input_containers">
            <div className="input-group input-group-m mb-3">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                Recommended week to study
              </label>
              <select
                className="form-select"
                id="inputGroupSelect01"
                defaultValue="0"
                data-testid="add-resource-week"
                onChange={(e) => handleAddNewResource("week", e.target.value)}
              >
                {weekToStudy.map((week) => (
                  <option key={week}>{week}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="input_containers">
            <div className="filterTags" data-testid="add-resource-tags">
              {unselectedTags.map((tag) => (
                <span
                  data-testid={`add-resource-tag-${tag.tag_id}`}
                  key={tag.tag_id}
                  style={{ backgroundColor: tag.tag_colour }}
                  className="tag-badge badge rounded-pill"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag.tag_name}
                </span>
              ))}
              <button
                onClick={openModal}
                className="tag-badge badge rounded-pill bg-success"
              >
                +
              </button>
            </div>
            <hr className="dropdown-divider" />
            <div
              className="selectedTags"
              data-testid="add-resource-selected-tags"
            >
              <p>Selected tags: </p>
              {selectedTags.map((tag) => (
                <span
                  key={tag.tag_id}
                  style={{ backgroundColor: tag.tag_colour }}
                  className="tag-badge badge rounded-pill"
                  onClick={() => handleRemoveTagClick(tag)}
                >
                  {tag.tag_name}
                </span>
              ))}
            </div>
            <>
              <Modal show={modalState}>
                <Modal.Header
                  closeButton
                  onClick={onClosingModal}
                ></Modal.Header>
                <Modal.Body>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Input tag"
                      aria-label="Input new tag"
                      value={newTag}
                      onChange={(e) => handleNewTag(e.target.value)}
                    />
                  </div>
                  {/* <input
           placeholder="Input tag"
           type="text"
           aria-label="Add a new tag"
           value={newTag}
           onChange={(e) => handleNewTag(e.target.value)}></input> */}
                  <div className="input-group input-group-m mb-3">
                    <label
                      className="input-group-text"
                      htmlFor="inputGroupSelect01"
                    >
                      Tag colour
                    </label>
                    <select
                      className="form-select"
                      id="inputGroupSelect01"
                      defaultValue="0"
                      data-testid="add-resource-recommendability"
                      onChange={(e) => handleNewTagColour(e.target.value)}
                    >
                      <option>Colour your new tag...</option>
                      {/* how to change styling of options? */}
                      {colourCodes.map((colourCode) => (
                        <option
                          key={colourCode.colour_name}
                          style={{ backgroundColor: colourCode.HEX }}
                        >
                          {colourCode.colour_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="nav justify-content-center">
                    <button
                      className="btn btn-primary"
                      onClick={
                        newTagColour !== "Colour your new tag..."
                          ? () => handleNewTags(newTag, newTagColour)
                          : () => console.log("Add a colour to your tag, fool!")
                      }
                    >
                      Add new tag
                    </button>
                  </div>
                  {newTags.map((tag) => (
                    <span
                      key={tag.tag_name}
                      //update className
                      className="tag-badge badge rounded-pill"
                      style={{ backgroundColor: tag.tag_colour }}
                    >
                      {tag.tag_name}
                    </span>
                  ))}
                </Modal.Body>
                <Modal.Footer className="nav justify-content-center">
                  <Button
                    className="btn btn-lg"
                    onClick={() => handleUpdateTagBank(newTags, unselectedTags)}
                  >
                    Submit all tags
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          </div>

          <div className="nav justify-content-center pt-5">
            <button
              type="button"
              className="btn btn-outline-success btn-lg"
              onClick={
                ifEmptyInputs
                  ? () => showToastError("Please add inputs for every field")
                  : () => {
                      handlePostNewResource(newResource);
                      // handlePostResourcesTags(selectedTags, latestResourceId);
                    }
              }
            >
              Submit new resource
            </button>
          </div>
        </div>
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

export default AddResourcePage;
