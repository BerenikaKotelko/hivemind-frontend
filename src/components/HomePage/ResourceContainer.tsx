import Resource from "./Resource";
import { IUser } from "../../interfaces/IUser";
import { ITag } from "../../interfaces/ITag";
import { IResource } from "../../interfaces/IResource";
import { filterResourceWithFilters } from "../../utils/filterResource";

interface ResourceContainerProps {
  currentUser: IUser | undefined;
  resources: IResource[];
  searchTerm: string;
  recommendationValue: { [key: string]: boolean };
  contentType: { [key: string]: boolean };
  selectedTags: ITag[];
}

function ResourceContainer({
  currentUser,
  resources,
  searchTerm,
  recommendationValue,
  contentType,
  selectedTags,
}: ResourceContainerProps) {
  const filteredResources = resources.filter((resource) =>
    filterResourceWithFilters(
      searchTerm,
      resource.title,
      resource.description,
      resource.name,
      resource.recommended,
      resource.type,
      resource.tags,
      recommendationValue,
      contentType,
      selectedTags
    )
  );

  return (
    <div>
      {filteredResources.map((resource, idx) => (
        <Resource key={idx} resource={resource} currentUser={currentUser} />
      ))}
    </div>
  );
}

export default ResourceContainer;
