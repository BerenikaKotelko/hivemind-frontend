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
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-warning">
        <div className="container-fluid">
          <h1>🐝 Hivemind</h1>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav justify-content-center">
              <li className="nav-item">
                <Link to="/" className="link">
                  <a
                    className={
                      "nav-link " +
                      `${location.pathname === "/" ? "active" : ""}`
                    }
                    href="#"
                  >
                    Home
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="study-list" className="link">
                  <a
                    className={
                      "nav-link " +
                      `${location.pathname === "/study-list" ? "active" : ""}`
                    }
                    href="#"
                  >
                    Study List
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="add-resource" className="link">
                  <a
                    className={
                      "nav-link " +
                      `${location.pathname === "/add-resource" ? "active" : ""}`
                    }
                    href="#"
                  >
                    Add Resource
                  </a>
                </Link>
              </li>
              {currentUser === "" ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Sign in
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    {users.map((user, i) => (
                      <li key={i}>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => {
                            console.log(`Signed in as ${user}`);
                            setCurrentUser(user);
                          }}
                        >
                          {user}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <div>
                  Signed in as {currentUser}
                  <button onClick={() => setCurrentUser("")}>Sign out</button>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
