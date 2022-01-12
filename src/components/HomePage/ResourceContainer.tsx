import Resource from "./Resource";
import { IUser } from "../../interfaces/IUser";
import { IResource } from "../../interfaces/IResource";
import filterResource from "../../utils/filterResource";

interface ResourceContainerProps {
  currentUser: IUser | undefined;
  resources: IResource[];
  searchTerm: string;
}

function ResourceContainer({
  currentUser,
  resources,
  searchTerm,
}: ResourceContainerProps) {
  const filteredResources = resources.filter((resource) =>
    filterResource(searchTerm, resource.title, resource.description)
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
