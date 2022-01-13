// import { useState } from "react";
import { useState, useEffect } from "react";
import { ITag } from "../../interfaces/ITag";
import { INewResource } from "../../interfaces/INewResource";
import { INewTag } from "../../interfaces/INewTag";
import { setTextRange } from "typescript";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { argThresholdOpts } from "moment";


interface AddResourcePageProps {
  tagBank: ITag[];
  getTags: (endpoint: string) => void
  baseUrl: string
}

// export interface IResource {
//   id?: number;
//   author_id: number;
//   title: string;
//   description: string;
//   recommended: string;
//   url: string;
//   date_added?: number;
//  content_type: string
// }

//post request to resources with above shape
//post request to resource_tags table with tag_id and resource_id
//post request to tags table, adding the names of any additional tags created by user and refetch the table
//automatic redirect to the Homepage using React router when pressing submit button
//don't show add resource page when visitor not signed in
//add option to attach a colour to your tags


function AddResourcePage({ tagBank, getTags, baseUrl }: AddResourcePageProps): JSX.Element {
  const [newResource, setNewResource] = useState<INewResource>(Object)
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);
  const [modalState, setModalState] = useState<boolean>(false)
  const [newTag, setNewTag] = useState<string>("")
  const [newTagColour, setNewTagColour] = useState<string>("Red")
  const [newTags, setNewTags] = useState<INewTag[]>([{ tag_name: "Tester", tag_colour: "Red" }])


  useEffect(
    () => {
      setTags(tagBank)
    }, [tagBank]
  )

  function handleAddNewResource(property: string, value: string | number) {
    setNewResource({ ...newResource, [property]: value })
  }

  function handleTagClick(tag: ITag) {
    setTags([...tags.filter((element) => element.tag_name !== tag.tag_name)]);
    setSelectedTags([...selectedTags, tag]);
  }

  function handleRemoveTagClick(tag: ITag) {
    setSelectedTags([...selectedTags.filter((element) => element.tag_name !== tag.tag_name)]);
    setTags([...tags, tag]);
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

  //posting new tags to tags table and updating tag bank with new additions
  async function handleUpdateTagBank(newTags: INewTag[]) {
    await axios.post(`${baseUrl}/${tags}`, newTags);
    getTags("tags")
  }

  console.log(newResource)
  console.log(`new tag: ${newTag}`)
  console.log(`new tags: ${JSON.stringify(newTags)}`)
  console.log(`chosen colour: ${newTagColour}`)


  const openModal = () => setModalState(true)
  const closeModal = () => setModalState(false)

  function onClosingModal() {
    setModalState(false) //why can't call closeModal?
    setNewTag("")
    setNewTags([])
  }

  return (
    <div className="container">
      <h1 data-testid="add-resource-header">Add a resource</h1>
      <h3>Title</h3>
      <input
        data-testid="add-resource-input-title"
        placeholder="Title"
        type="text"
        aria-label="Input title for your new resource"
        value={newResource.title}
        onChange={(e) => handleAddNewResource('title', e.target.value)}
      />
      <h3>Description</h3>
      <textarea
        data-testid="add-resource-input-description"
        placeholder="Description"
        aria-label="Input description for your new resource"
        value={newResource.description}
        onChange={(e) => handleAddNewResource('description', e.target.value)}
      />
      <h3>URL</h3>
      <input
        data-testid="add-resource-input-url"
        placeholder="URL"
        type="text"
        aria-label="Input a URL for your new resource"
        value={newResource.url}
        onChange={(e) => handleAddNewResource('url', e.target.value)}
      />
      <h3>Content type</h3>
      <select data-testid="add-resource-recommendability" onChange={(e) => handleAddNewResource('content_type', e.target.value)}>
        <option data-testid="add-resource-recommendability-option1">Video</option>
        <option data-testid="add-resource-recommendability-option2">Article</option>
        <option data-testid="add-resource-recommendability-option3">Ebook</option>
        <option data-testid="add-resource-recommendability-option3">Podcast</option>
        <option data-testid="add-resource-recommendability-option3">Exercise</option>
        <option data-testid="add-resource-recommendability-option3">Exercise Set</option>
        <option data-testid="add-resource-recommendability-option3">Software Tool</option>
        <option data-testid="add-resource-recommendability-option3">Course</option>
        <option data-testid="add-resource-recommendability-option3">Diagram</option>
        <option data-testid="add-resource-recommendability-option3">Cheat-Sheet</option>
        <option data-testid="add-resource-recommendability-option3">Reference</option>
        <option data-testid="add-resource-recommendability-option3">Resource List</option>
        <option data-testid="add-resource-recommendability-option3">YouTube Channel</option>
        <option data-testid="add-resource-recommendability-option3">Organisation</option>
      </select>
      <h3>Resource recommendability</h3>
      <select data-testid="add-resource-recommendability" onChange={(e) => handleAddNewResource('recommended', e.target.value)}>
        <option data-testid="add-resource-recommendability-option1">Un-bee-lievable</option>
        <option data-testid="add-resource-recommendability-option2">May-bee</option>
        <option data-testid="add-resource-recommendability-option3">Buzzkill</option>
      </select>

      <h3>Select tags</h3>
      <div className="selectedTags" data-testid="add-resource-selected-tags">
        <p>Selected tags: </p>
        {selectedTags.map((tag, index) => (
          <span key={index} className="tag-badge badge rounded-pill bg-primary" onClick={() => handleRemoveTagClick(tag)}>
            {tag.tag_name}
          </span>
        ))}
      </div>
      <hr className="dropdown-divider" />
      <p>Available tags: </p>
      <div className="filterTags" data-testid="add-resource-tags">
        {tags.map((tag) => (
          <span
            data-testid={`add-resource-tag-${tag.tag_id}`}
            key={tag.tag_id}
            className="tag-badge badge rounded-pill bg-primary"
            onClick={() => handleTagClick(tag)}
          >
            {tag.tag_name}
          </span>
        ))}
      </div>
      <>
        {/* <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "100vh" }}
        > */}
        <Button variant="primary" onClick={openModal}>
          Launch demo modal
        </Button>
        {/* </div> */}
        <Modal show={modalState}>
          <Modal.Header closeButton onClick={onClosingModal}>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              placeholder="Input tag"
              type="text"
              aria-label="Add a new tag"
              value={newTag}
              onChange={(e) => handleNewTag(e.target.value)}></input>
            <select onChange={(e) => handleNewTagColour(e.target.value)}>
              {/* how to style to add colour to drop-down options?  */}
              <option>Red</option>
              <option>Orange</option>
              <option>Yellow</option>
              <option>Green</option>
              <option>Light Blue</option>
              <option>Dark Blue</option>
              <option>Purple</option>
              <option>Pink</option>
            </select>
            <button onClick={() => handleNewTags(newTag, newTagColour)}>Add new tag</button>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Body>
              <b>Tags to add</b>
              {newTags.map((tag) => (
                <span
                  key={tag.tag_name}
                  className="tag-badge badge rounded-pill bg-primary"
                >
                  {tag.tag_name}
                </span>
              ))}
            </Modal.Body>
            <Button onClick={handleUpdateTagBank(newTags)}>Submit new tags</Button>
          </Modal.Footer>
        </Modal>
      </>
      <button>Submit new resource</button>
    </div >
  );
}

//Shows header DONE
//Testing that title, description and url input fields work (are of type input)
//Testing that there are three selectable options, check the inputs match the options
//All tags are showing in resource tags and none in selected tags 

export default AddResourcePage;
