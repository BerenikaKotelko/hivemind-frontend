import SearchBar from "./SearchBar";
import ResourceContainer from "./ResourceContainer";
import { IUser } from "../../interfaces/IUser";
import { IResource } from "../../interfaces/IResource";

interface HomePageProps {
  currentUser: IUser | undefined;
  resources: IResource[];
}

function HomePage({ currentUser, resources }: HomePageProps) {
  return (
    <div className="container">
      <SearchBar />
      <ResourceContainer currentUser={currentUser} resources={resources} />
    </div>
  );
}

export default HomePage;
