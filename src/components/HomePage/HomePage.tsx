import SearchBar from "./SearchBar";
import ResourceContainer from "./ResourceContainer";
import { IUser } from "../../interfaces/IUser";
import { IResource } from "../../interfaces/IResource";
import { useState } from "react";
import { ITagSearchBar } from "../../interfaces/ITag";

interface HomePageProps {
  currentUser: IUser | undefined;
  resources: IResource[];
  tags: ITagSearchBar[];
}

function HomePage({ currentUser, resources, tags }: HomePageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [tagPool, setTagPool] = useState<ITagSearchBar[]>([]);
  return (
    <div className="container" data-testid="homepage">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        tags={tagPool}
      />
      <ResourceContainer
        currentUser={currentUser}
        resources={resources}
        searchTerm={searchTerm}
      />
    </div>
  );
}

export default HomePage;
