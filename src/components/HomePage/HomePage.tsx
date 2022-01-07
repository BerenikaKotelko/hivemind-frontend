import SearchBar from "./SearchBar";
import ResourceContainer from "./ResourceContainer";
import { IUser } from "../../interfaces/IUser";

interface HomePageProps {
  currentUser: IUser | undefined;
}

function HomePage({ currentUser }: HomePageProps) {
  return (
    <div className="container">
      <SearchBar />
      <ResourceContainer currentUser={currentUser} />
    </div>
  );
}

export default HomePage;
