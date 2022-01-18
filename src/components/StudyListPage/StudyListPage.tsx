import { IUser } from "../../interfaces/IUser";
import "../../components/styles/StudyList.css";

interface StudyListPageProps {
  currentUser: IUser | undefined;
}

function StudyListPage({ currentUser }: StudyListPageProps) {
  return (
    <>
      {currentUser ? (
        <div className="container">
          <h1>Study List here</h1>
        </div>
      ) : (
        <div className="container require-sign-in">
          <img
            src="https://i.pinimg.com/originals/c1/dc/25/c1dc25c150904864cc24c48e15e63b0d.gif"
            alt="Animated bee gif"
          ></img>
          <h3>Please sign in to view this page!</h3>
        </div>
      )}
    </>
  );
}

export default StudyListPage;
