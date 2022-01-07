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

export default filterResource;
