import Resource from "./Resource";
import { IUser } from "../../interfaces/IUser";
import { IResource } from "../../interfaces/IResource";
// const resources = [
//   {
//     id: 1,
//     author_id: 1,
//     title: "Computer programming",
//     description:
//       "Computer programming is the process of designing and building an executable computer program to accomplish a specific computing result or to perform a particular task. Programming involves tasks such as analysis, generating algorithms, profiling algorithms' accuracy and resource consumption, and the implementation of algorithms in a chosen programming language (commonly referred to as coding).",
//     recommended: "Un-bee-liveable",
//     URL: "#",
//     date_added: "06/02/2000",
//     likes: "5",
//   },
//   {
//     id: 2,
//     author_id: 1,
//     title: "Beer",
//     description:
//       "Beer is one of the oldest[1][2][3] and most widely consumed[4] alcoholic drinks in the world, and the third most popular drink overall after water and tea.[5] It is produced by the brewing and fermentation of starches, mainly derived from cereal grains—most commonly from malted barley, though wheat, maize (corn), rice, and oats are also used. During the brewing process, fermentation of the starch sugars in the wort produces ethanol and carbonation in the resulting beer.[6] Most modern beer is brewed with hops, which add bitterness and other flavours and act as a natural preservative and stabilizing agent.",
//     recommended: "Promising",
//     URL: "#",
//     date_added: "25/12/2021",
//     likes: "56",
//   },
//   {
//     id: 3,
//     author_id: 1,
//     title: "Bungee Jumping",
//     description:
//       "Bungee jumping (/ˈbʌndʒi/), also spelled bungy jumping, is an activity that involves a person jumping from a great height while connected to a large elastic cord. The launching pad is usually erected on a tall structure such as a building or crane, a bridge across a deep ravine, or on a natural geographic feature such as a cliff. It is also possible to jump from a type of aircraft that has the ability to hover above the ground, such as a hot-air-balloon or helicopter. The thrill comes from the free-falling and the rebound.[1] When the person jumps, the cord stretches and the jumper flies upwards again as the cord recoils, and continues to oscillate up and down until all the kinetic energy is dissipated.",
//     recommended: "Buzzkill",
//     URL: "#",
//     date_added: "13/10/2021",
//     likes: "17",
//   },
// ];

interface ResourceContainerProps {
  currentUser: IUser | undefined;
  resources: IResource[];
}

function ResourceContainer({ currentUser, resources }: ResourceContainerProps) {
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
