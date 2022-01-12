import SearchBar from "./SearchBar";
import ResourceContainer from "./ResourceContainer";
import { IUser } from "../../interfaces/IUser";
import { IResource } from "../../interfaces/IResource";
import { ITag } from "../../interfaces/ITag";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface HomePageProps {
  currentUser: IUser | undefined;
  resources: IResource[];
}

function HomePage({ currentUser, resources }: HomePageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [unselectedTags, setUnselectedTags] = useState<ITag[]>([]);
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);

  const baseUrl = process.env.REACT_APP_API_URL ?? "https://localhost:4000";

  function handleTagClick(tag: ITag) {
    setUnselectedTags([
      ...unselectedTags.filter((element) => element.tag_name !== tag.tag_name),
    ]);
    setSelectedTags([...selectedTags, tag]);
  }

  function handleRemoveTagClick(tag: ITag) {
    setSelectedTags([
      ...selectedTags.filter((element) => element.tag_name !== tag.tag_name),
    ]);
    setUnselectedTags([...unselectedTags, tag]);
  }

  const getTags = useCallback(
    async (endpoint: string) => {
      const res = await axios.get(`${baseUrl}/${endpoint}`);
      setUnselectedTags(res.data.data);
    },
    [baseUrl]
  );

  useEffect(() => {
    getTags("tags");
  }, [getTags]);

  return (
    <div className="container" data-testid="homepage">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        unselectedTags={unselectedTags}
        selectedTags={selectedTags}
        handleTagClick={handleTagClick}
        handleRemoveTagClick={handleRemoveTagClick}
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
