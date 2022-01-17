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

const defaultRecommendations = {
  "Un-bee-table": false,
  "May-bee": false,
  Buzzkill: false,
};

const defaultContentTypes = {
  Article: false,
  "Cheat-Sheet": false,
  Course: false,
  Diagram: false,
  Ebook: false,
  Exercise: false,
  "Exercise Set": false,
  Podcast: false,
  Organisation: false,
  Reference: false,
  "Resource List": false,
  "Software Tool": false,
  Video: false,
  "Youtube Channel": false,
};

function HomePage({ currentUser, resources }: HomePageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [unselectedTags, setUnselectedTags] = useState<ITag[]>([]);
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const [recommendations, setRecommendations] = useState<{
    [key: string]: boolean;
  }>(defaultRecommendations);
  const [contentTypes, setContentTypes] =
    useState<{ [key: string]: boolean }>(defaultContentTypes);

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
  function handleRecommendationClick(checked: boolean, recValue: string) {
    const newRecommendations = Object.assign({}, recommendations);
    newRecommendations[recValue] = checked;
    setRecommendations(newRecommendations);
  }

  function handleContentTypeClick(checked: boolean, resource: string) {
    const newContentType = Object.assign({}, contentTypes);
    newContentType[resource] = checked;
    setContentTypes(newContentType);
  }

  function handleResetFilters() {
    setRecommendations(defaultRecommendations);
    setContentTypes(defaultContentTypes);
    setUnselectedTags([...unselectedTags, ...selectedTags]);
    setSelectedTags([]);
  }

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
        handleRecommendationClick={handleRecommendationClick}
        handleContentTypeClick={handleContentTypeClick}
        recommendationValue={recommendations}
        contentType={contentTypes}
        handleResetFilters={handleResetFilters}
      />
      <ResourceContainer
        currentUser={currentUser}
        resources={resources}
        searchTerm={searchTerm}
        recommendationValue={recommendations}
        contentType={contentTypes}
        selectedTags={selectedTags}
      />
    </div>
  );
}

export default HomePage;
