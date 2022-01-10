// import { useState } from "react";
import { ITag } from "../../interfaces/ITag";

interface AddResourcePageProps {
  tags: ITag[];
}

function AddResourcePage({ tags }: AddResourcePageProps): JSX.Element {
  // const [selectedTags, setSelectedTags] = useState<ITag[]>([]);

  return (
    <div className="container">
      <h1 data-testid="add-resource-header">Add a resource</h1>
      <input data-testid="add-resource-input-title"></input>
      <input data-testid="add-resource-input-description"></input>
      <input data-testid="add-resource-input-url"></input>
      <select data-testid="add-resource-recommendability">
        <option></option>
        <option></option>
        <option></option>
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

export default AddResourcePage;
