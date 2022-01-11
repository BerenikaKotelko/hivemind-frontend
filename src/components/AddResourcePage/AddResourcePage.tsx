// import { useState } from "react";
import { useState } from "react";
import { ITag } from "../../interfaces/ITag";

interface AddResourcePageProps {
  tags: ITag[];
  setTags?: React.Dispatch<React.SetStateAction<ITag[]>>;
}

function AddResourcePage({ tags, setTags }: AddResourcePageProps): JSX.Element {
  // const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const [inputTitle, setInputTitle] = useState<string>('')

  return (
    <div className="container">
      <h1 data-testid="add-resource-header">Add a resource</h1>
      <input
        data-testid="add-resource-input-title"
        placeholder="Title"
        className="form-control me-2"
        type="search"
        aria-label="Search"
        value={inputTitle}
        onChange={(e) => setInputTitle(e.target.value)}
      />
      <input data-testid="add-resource-input-description" placeholder="Description"></input>
      <input data-testid="add-resource-input-url" placeholder="URL"></input>
      <select data-testid="add-resource-recommendability">
        <option data-testid="add-resource-recommendability-option1">Un-bee-lievable</option>
        <option data-testid="add-resource-recommendability-option2">May-bee</option>
        <option data-testid="add-resource-recommendability-option3">Buzzkill</option>
      </select>

      <div className="selectedTags" data-testid="add-resource-selected-tags">
        <p>Selected tags: </p>
        {tags.map((tag, index) => (
          <span key={index} className="tag-badge badge rounded-pill bg-primary">
            {tag.tag_name}
          </span>
        ))}
      </div>
      <hr className="dropdown-divider" />
      <div className="filterTags" data-testid="add-resource-tags">
        {tags.map((tag) => (
          <span
            data-testid={`add-resource-tag-${tag.tag_id}`}
            key={tag.tag_id}
            className="tag-badge badge rounded-pill bg-primary"
          >
            {tag.tag_name}
          </span>
        ))}
      </div>
    </div>
  );
}

//Shows header DONE
//Testing that title, description and url input fields work (are of type input)
//Testing that there are three selectable options, check the inputs match the options
//All tags are showing in resource tags and none in selected tags 

export default AddResourcePage;
