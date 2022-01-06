import React from "react";
import SearchBar from "./SearchBar";
import ResourceContainer from "./ResourceContainer";

interface HomePageProps {
  currentUser: string;
}

function HomePage({ currentUser }: HomePageProps) {
  return (
    <div className="container">
      <SearchBar />
      <ResourceContainer currentUser={currentUser} />
    </div>
  );
}

export default HomePage;
