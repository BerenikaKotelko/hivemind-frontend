// import { useState } from "react";
import { useState, useEffect } from "react";
import { ITag } from "../../interfaces/ITag";
import { INewResource } from "../../interfaces/INewResource";
import { setTextRange } from "typescript";
import { Modal, Button } from "react-bootstrap";


interface AddResourcePageProps {
  tagBank: ITag[];
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
//automatic styling to capitalise first letter
//don't show add resource page when visitor not signed in
//add a resource type drop-down
//add option to attach a colour to your tags


function AddResourcePage({ tagBank }: AddResourcePageProps): JSX.Element {
  const [newResource, setNewResource] = useState<INewResource>(Object)
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);
  const [modalState, setModalState] = useState<boolean>(false)
  const [newTags, setNewTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState<string>("")


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
    setNewTag(newTag)
  }

  function handleNewTags(newTag: string) {
    setNewTags([...newTags, newTag])
  }

  console.log(newResource)
  console.log(newTag)
  console.log(`new tags: ${newTags}`)

  const openModal = () => setModalState(true)
  const closeModal = () => setModalState(false)

  function onClosingModal() {
    setModalState(false) //why can't call closeModal?
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
            <button onClick={() => handleNewTags(newTag)}>Add new tag</button>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Body>
              <b>Tags to add</b>
              {newTags.map((tag) => (
                <span
                  key={tag}
                  className="tag-badge badge rounded-pill bg-primary"
                >
                  {tag}
                </span>
              ))}
            </Modal.Body>
            <Button>Submit new tags</Button>
          </Modal.Footer>
        </Modal>
      </>
    </div >
  );
}

//Shows header DONE
//Testing that title, description and url input fields work (are of type input)
//Testing that there are three selectable options, check the inputs match the options
//All tags are showing in resource tags and none in selected tags 

export default AddResourcePage;
