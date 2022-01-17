// import { ITag } from "../interfaces/ITag";
function filterResource(
  searchTerm: string,
  title: string,
  description: string
): boolean {
  if (searchTerm === "") {
    return true;
  }
  const searchTermLower = searchTerm.toLowerCase();
  const titleLower = title.toLowerCase();
  const descriptionLower = description.toLowerCase();

  return titleLower.includes(searchTermLower) ||
    descriptionLower.includes(searchTermLower)
    ? true
    : false;
}

export function filterResourceWithFilters(
  searchTerm: string,
  title: string,
  description: string,
  author: string,
  recommended: string,
  type: string,
  recommendationValue: { [key: string]: boolean },
  contentType: { [key: string]: boolean }
  // selectedTags: ITag[]
): boolean {
  const recommendationValueArray: string[] = [];
  for (const [key, value] of Object.entries(recommendationValue)) {
    if (value) {
      recommendationValueArray.push(key);
    }
  }
  const contentTypeArray: string[] = [];
  for (const [key, value] of Object.entries(contentType)) {
    if (value) {
      contentTypeArray.push(key);
    }
  }
  if (
    searchTerm === "" &&
    recommendationValueArray.length === 0 &&
    contentTypeArray.length === 0
  ) {
    return true;
  }

  const searchTermLower = searchTerm.toLowerCase();
  const titleLower = title.toLowerCase();
  const descriptionLower = description.toLowerCase();
  const authorLower = author.toLowerCase();

  return (titleLower.includes(searchTermLower) ||
    descriptionLower.includes(searchTermLower) ||
    authorLower.includes(searchTermLower)) &&
    (recommendationValueArray.length === 0
      ? true
      : recommendationValueArray.includes(recommended)) &&
    (contentTypeArray.length === 0 ? true : contentTypeArray.includes(type))
    ? true
    : false;
}

export default filterResource;
