import Resource from "./Resource";

const resources = [
  {
    id: 1,
    author_id: 1,
    title: "Resource 1",
    description: "description 1",
    recommended: "Un-bee-liveable",
    URL: "#",
    date_added: "06/02/2000",
    likes: "5",
  },
  {
    id: 2,
    author_id: 1,
    title: "Resource 2",
    description: "description 2",
    recommended: "Promising",
    URL: "#",
    date_added: "25/12/2021",
    likes: "56",
  },
  {
    id: 3,
    author_id: 1,
    title: "Resource 3",
    description: "description 3",
    recommended: "Buzzkill",
    URL: "#",
    date_added: "13/10/2021",
    likes: "17",
  },
];

interface ResourceContainerProps {
  currentUser: string;
}

function ResourceContainer({ currentUser }: ResourceContainerProps) {
  return (
    <div>
      {resources.map((resource) => (
        <Resource
          key={resource.id}
          resource={resource}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
}

export default ResourceContainer;
