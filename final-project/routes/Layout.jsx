import { Outlet } from "react-router-dom";
import NavBar from "../src/components/NavBar";
import { useState } from "react";

const Layout = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="whole-page">
      <NavBar onSearch={handleSearch} searchQuery={searchQuery} />
      <Outlet context={{ searchQuery }} />
    </div>
  );
};

export default Layout;
