import { Link, useLocation } from "react-router-dom";
import "./styles/NavBar.css";

interface NavBarProps {
  users: string[];
  currentUser: string;
  setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
}

function NavBar({ users, currentUser, setCurrentUser }: NavBarProps) {
  const location = useLocation();
  return (
    <div className="navbar-container">
      <nav className="navbar navbar-expand-lg navbar-light bg-warning">
        <div className="container-fluid">
          <div className="hivemind-title">
            <h1>🐝 Hivemind</h1>
          </div>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to="/"
                  className={
                    "link nav-link " +
                    `${location.pathname === "/" ? "active" : ""}`
                  }
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
                >
                  Add Resource
                </Link>
              </li>
            </ul>
          </div>
          {currentUser === "" ? (
            <div className="dropstart">
              <button
                className="sign-in-btn btn btn-success btn-sm dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sign in
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                {users.map((user, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => {
                        setCurrentUser(user);
                      }}
                    >
                      {user}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <>
              <div>
                <small>Signed in as </small> <strong>{currentUser}</strong>{" "}
              </div>
              <button
                className="sign-out-btn btn btn-danger btn-sm"
                onClick={() => setCurrentUser("")}
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
