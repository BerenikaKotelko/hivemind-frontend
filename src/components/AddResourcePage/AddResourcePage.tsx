import "../styles/AddResource.css";
import { useState, useEffect } from "react";
import { ITag } from "../../interfaces/ITag";
import { INewResource } from "../../interfaces/INewResource";
import { IResource } from "../../interfaces/IResource";
import { INewTag } from "../../interfaces/INewTag";
import { IUser } from "../../interfaces/IUser";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Route } from "react-router-dom";
import HomePage from "../HomePage/HomePage"


interface AddResourcePageProps {
  tagBank: ITag[];
  getTags: (endpoint: string) => void
  baseUrl: string,
  resources: IResource[],
  currentUser: IUser | undefined
}

const initialResource = {
  author_id: 0,
  title: "",
  description: "",
  recommended: "",
  url: "",
  type: ""
}



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
//automatic redirect to the Homepage using React router when pressing submit button
//post request to resource_tags table with tag_id and resource_id

//TO DO
//don't show add resource page when visitor not signed in
//add Academy week to be studied 


function AddResourcePage({ tagBank, getTags, baseUrl, resources, currentUser }: AddResourcePageProps): JSX.Element {
  const [newResource, setNewResource] = useState<INewResource>(initialResource)
  const [newTag, setNewTag] = useState<string>("")
  const [newTags, setNewTags] = useState<INewTag[]>([])
  const [selectedTags, setSelectedTags] = useState<ITag[]>([])
  const [unselectedTags, setUnselectedTags] = useState<ITag[]>([])
  const [modalState, setModalState] = useState<boolean>(false)
  const [newTagColour, setNewTagColour] = useState<string>("Red")
  const [latestResourceId, setLatestResourceId] = useState<number>(0)


  useEffect(
    () => {
      setUnselectedTags(tagBank)
    }, [tagBank]
  )

  //defining constants
  //onClick condition: ensure all input fields are filled out
  const ifEmptyInputs =
    newResource.title !== "" ||
    newResource.description !== "" ||
    newResource.recommended !== "Choose a resource recommendability..." ||
    newResource.type !== "Choose a resource type..." ||
    newResource.url !== "" ||
    selectedTags.length === 0


  const contentType = ['Article', 'Ebook', 'Podcast', 'Exercise', 'Exercise Set',
    'Software Tool', 'Course', 'Diagram', 'Cheat-Sheet', 'Reference', 'Resource List',
    'YouTube Channel', 'Organisation']


  //selecting your tags
  function handleTagClick(tag: ITag) {
    setUnselectedTags([...unselectedTags.filter((element) => element.tag_name !== tag.tag_name)]);
    setSelectedTags([...selectedTags, tag]);
  }

  function handleRemoveTagClick(tag: ITag) {
    setSelectedTags([...selectedTags.filter((element) => element.tag_name !== tag.tag_name)]);
    setUnselectedTags([...unselectedTags, tag]);
  }


  //input handler functions
  function handleAddNewResource(property: string, value: string | number) {
    setNewResource({ ...newResource, [property]: value })
  }

  function handleNewTag(newTag: string) {
    setNewTag(newTag.replace(/\b\w/g, c => c.toUpperCase()))
  }

  function handleNewTagColour(newTagColour: string) {
    setNewTagColour(newTagColour)
  }

  function handleNewTags(newTagName: string, newTagColour: string) {
    setNewTags([...newTags, { tag_name: newTagName, tag_colour: newTagColour }])
  }


  //backend requests
  async function handleUpdateTagBank(newTags: INewTag[], unselectedTags: ITag[]) {
    await axios.post(`${baseUrl}/tags}`, newTags);
    getTags("tags")
    // newTags.forEach(newTag => {
    //   setSelectedTags([...selectedTags, tagBank.filter((tag) => tag.tag_name === newTag.tag_name)]}))
    //filter over the tags returned from getTags and add only the ones with same ids as newtags to setSelectedTags
  }

  async function handlePostNewResource(newResource: INewResource, currentUser: IUser) {
    setNewResource({ ...newResource, author_id: currentUser.id })
    const res = await axios.post(`${baseUrl}/resource}`, newResource);
    console.log(`New resource added with title: ${res.data.data.title}`)
    setLatestResourceId(res.data.data.id)
  }

  async function handlePostResourcesTags(selectedTags: ITag[], resource_id: number) {
    //do I need to make a get request for the latest Resource id? 
    let reqBody = []
    for (let tag of selectedTags) {//why using const?
      reqBody.push(tag.tag_id) //is key going to be captured here? 
    }
    const res = await axios.post(`${baseUrl}/${`resource/${resource_id}/tags`}`, reqBody);
    console.log(`New resource added: ${res.data.data.title}`)
    return (
      <Route
        path="/"
        element={<HomePage resources={resources} currentUser={currentUser} />}
      />
    )
  }


  //console.logs
  console.log(newResource)
  console.log(`new tag: ${newTag}`)
  console.log(`new tags: ${JSON.stringify(newTags)}`)
  console.log(`chosen colour: ${newTagColour}`)
  console.log(`selected tags: ${JSON.stringify(selectedTags)}`)


  //modal code
  const openModal = () => setModalState(true)
  const closeModal = () => setModalState(false)

  function onClosingModal() {
    closeModal()
    setNewTag("")
    setNewTags([])
  }

  return (
    <div className="container">
      <h1 data-testid="add-resource-header" style={{ textAlign: "center" }}>Add a resource</h1>
      {/* setting title to be large */}
      <div className="input_containers">
        <div className="input-group input-group-lg mb-3">
          <div className="input-group-prepend" >
            <span className="input-group-text" id="inputGroup-sizing-lg">Title</span>
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Input title"
            data-testid="add-resource-input-title"
            value={newResource.title}
            onChange={(e) => handleAddNewResource('title', e.target.value.replace(/^\w/gm, c => c.toUpperCase()))}
          />
        </div>
      </div>
      <div className="input_containers">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Description</span>
          </div>
          <textarea
            className="form-control"
            aria-label="Input description"
            data-testid="add-resource-input-description"
            value={newResource.description}
            onChange={(e) => handleAddNewResource('description', e.target.value.replace(/^\w/gm, c => c.toUpperCase()))}
          ></textarea>
        </div>
      </div>

      <div className="input_containers">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">URL</span>
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Input URL"
            data-testid="add-resource-input-url"
            value={newResource.url}
            onChange={(e) => handleAddNewResource('url', e.target.value)}
          />
        </div>
      </div>
      <div className="input_containers">
        <div className="input-group input-group-m mb-3">
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
            data-testid="add-resource-type"
            onChange={(e) => handleAddNewResource('type', e.target.value)}
          >
            <option>Choose a resource type...</option>
            {contentType.map((type) => {
              return (
                <option key={type}>{type}</option>
              )
            })}
          </select>
        </div>
      </div>
      <div className="input_containers">
        <div className="input-group input-group-m mb-3">
          <label
            className="input-group-text"
            htmlFor="inputGroupSelect01"
          >
            Recommendability
          </label>
          <select
            className="form-select"
            id="inputGroupSelect01"
            defaultValue="0"
            data-testid="add-resource-recommendability"
            onChange={(e) => handleAddNewResource('type', e.target.value)}
          >
            <option>Choose a recommendability...</option>
            <option>Un-bee-table</option>
            <option>May-bee</option>
            <option>Buzzkill</option>

          </select>
        </div>
      </div>

      <div className="input_containers">
        <div className="selectedTags" data-testid="add-resource-selected-tags">
          <p>Selected tags: </p>
          {selectedTags.map((tag) => (
            <span key={tag.tag_id}
              className="tag-badge badge rounded-pill bg-primary"
              onClick={() => handleRemoveTagClick(tag)}>
              {tag.tag_name}
            </span>
          ))}
        </div>
        <hr className="dropdown-divider" />
        <div className="filterTags" data-testid="add-resource-tags">
          {unselectedTags.map((tag) => (
            <span
              data-testid={`add-resource-tag-${tag.tag_id}`}
              key={tag.tag_id}
              className="tag-badge badge rounded-pill bg-primary"
              onClick={() => handleTagClick(tag)}
            >
              {tag.tag_name}
            </span>
          ))}
          <button
            onClick={openModal}
            className="tag-badge badge rounded-pill bg-success">
            +
          </button>
        </div>
        <>
          <Modal show={modalState}>
            <Modal.Header closeButton onClick={onClosingModal}>
            </Modal.Header>
            <Modal.Body>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Input tag"
                  aria-label="Input new tag"
                  value={newTag}
                  onChange={(e) => handleNewTag(e.target.value)} />
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
                  <option>Choose a colour...</option>
                  {/* how to change styling of options? */}
                  <option className="text-danger">Red</option>
                  <option>Orange</option>
                  <option>Yellow</option>
                  <option>Green</option>
                  <option>Light Blue</option>
                  <option>Dark Blue</option>
                  <option>Purple</option>
                  <option>Pink</option>

                </select>
              </div>
              <div className="nav justify-content-center">
                <button
                  className="btn btn-primary"
                  onClick={() => handleNewTags(newTag, newTagColour)}>Add new tag</button>
              </div>
              {newTags.map((tag) => (
                <span
                  key={tag.tag_name}
                  //update className
                  className="tag-badge badge rounded-pill bg-primary"
                >
                  {tag.tag_name}
                </span>
              ))}
            </Modal.Body>
            <Modal.Footer className="nav justify-content-center">
              <Button
                className="btn btn-lg"
                onClick={() => handleUpdateTagBank(newTags, unselectedTags)}>Submit new tags</Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>

      <div className="nav justify-content-center pt-5">
        <button
          type="button"
          className="btn btn-outline-success btn-lg"
          onClick={
            () => ifEmptyInputs ?
              console.log("Please add inputs for every field") :
              () => {
                handlePostNewResource(newResource, currentUser);
                //how to call two functions inside onClick? 
                handlePostResourcesTags(selectedTags, latestResourceId)
              }
          }
        >Submit new resource</button>
      </div>
    </div >
  );
}

export default AddResourcePage;