import { Link, useLocation } from "react-router-dom";
import "./styles/NavBar.css";
import { IUser } from "../interfaces/IUser";

interface NavBarProps {
  users: IUser[];
  currentUser: IUser | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

function NavBar({ users, currentUser, setCurrentUser }: NavBarProps) {
  const location = useLocation();
  return (
    <div className="navbar-container">
      <nav className="navbar navbar-expand-lg navbar-light bg-warning">
        <div className="container-fluid">
          <div className="hivemind-title" data-cy="page-title">
            <h1>🐝 Hivemind</h1>
          </div>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav" data-cy="nav-buttons">
              <li className="nav-item">
                <Link
                  to="/"
                  className={
                    "link nav-link " +
                    `${location.pathname === "/" ? "active" : ""}`
                  }
                  data-cy="home-page-click"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="study-list"
                  className={
                    "link nav-link " +
                    `${location.pathname === "/study-list" ? "active" : ""}`
                  }
                  data-cy="study-list-page-click"
                >
                  Study List
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="add-resource"
                  className={
                    "link nav-link " +
                    `${location.pathname === "/add-resource" ? "active" : ""}`
                  }
                  data-cy="add-resource-page-click"
                >
                  Add Resource
                </Link>
              </li>
            </ul>
          </div>
          {!currentUser ? (
            <div className="dropstart" data-testid={`navbar-sign-in`}>
              <button
                className="sign-in-btn btn btn-success btn-sm dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-cy="sign-in"
              >
                Sign in
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
                data-cy="list-of-users"
                data-testid={`navbar-users-dropdown`}
              >
                {users.map((user) => (
                  <li key={user.id}>
                    <button
                      data-testid={`navbar-user-${user.id}`}
                      type="button"
                      className="dropdown-item"
                      data-cy={`user-${user.id}`}
                      onClick={() => {
                        setCurrentUser(user);
                      }}
                    >
                      {user.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <>
              <div data-cy="user-signed-in">
                <small>Signed in as </small>{" "}
                <strong>
                  {currentUser.is_faculty ? "🤓" : "🎓"}
                  {currentUser.name}
                </strong>{" "}
              </div>
              <button
                className="sign-out-btn btn btn-danger btn-sm"
                data-testid={`navbar-sign-out`}
                onClick={() => setCurrentUser(undefined)}
                data-cy="sign-out"
              >
                Sign out
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
