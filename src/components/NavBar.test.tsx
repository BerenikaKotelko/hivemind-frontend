import NavBar from "./NavBar";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

const NavBarProps = {
  users: [
    {
      id: 1,
      name: "John Doe",
      is_faculty: false,
    },
    {
      id: 2,
      name: "Jane Doe",
      is_faculty: false,
    },
  ],
  currentUser: undefined,
  setCurrentUser: jest.fn(),
};

it("should call setCurrentUser when onclick", () => {
  render(
    <Router>
      <NavBar {...NavBarProps} />
    </Router>
  );
  const navbar = screen.getByTestId(`navbar-user-1`);
  fireEvent.click(navbar);

  expect(NavBarProps.setCurrentUser).toHaveBeenCalled();
});

it("should display sign out button and fire setCurrentUser when clicked", () => {
  const NavBarPropsWithCurrentUser = {
    ...NavBarProps,
    currentUser: {
      id: 1,
      name: "John Doe",
      is_faculty: false,
    },
  };
  render(
    <Router>
      <NavBar {...NavBarPropsWithCurrentUser} />
    </Router>
  );
  const signOutButton = screen.getByTestId(`navbar-sign-out`);
  expect(signOutButton).toHaveTextContent("Sign out");

  fireEvent.click(signOutButton);
  expect(NavBarProps.setCurrentUser).toHaveBeenCalled();
});

it("Displayed user names should match incoming props user names", () => {
  render(
    <Router>
      <NavBar {...NavBarProps} />
    </Router>
  );

  const firstUser = screen.getByTestId("navbar-user-1");
  expect(firstUser).toHaveTextContent("John Doe");
  const secondUser = screen.getByTestId("navbar-user-2");
  expect(secondUser).toHaveTextContent("Jane Doe");
});
