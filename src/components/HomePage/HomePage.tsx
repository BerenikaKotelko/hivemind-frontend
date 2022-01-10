import SearchBar from "./SearchBar";
import ResourceContainer from "./ResourceContainer";
import { IUser } from "../../interfaces/IUser";
import { IResource } from "../../interfaces/IResource";
import { useState } from "react";

interface HomePageProps {
  currentUser: IUser | undefined;
  resources: IResource[];
}

function HomePage({ currentUser, resources }: HomePageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="container" data-testid="homepage">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ResourceContainer
        currentUser={currentUser}
        resources={resources}
        searchTerm={searchTerm}
      />
    </div>
  );
}

export default HomePage;
