import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

function Navbar() {
  const context = useContext(noteContext);
  const { notes, filterNoteByTag} = context;
  //Extract all unique tags from notes
  const tags = [...new Set(notes.map((note) => note.tag))];
  const handleTagFilter = (tag) => {
    filterNoteByTag(tag);
   
  };

  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  let location = useLocation();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <div className="nav-item">
                <button
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Tags
                </button>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {tags.map((tag) => (
                  <li key={tag}>
                    <button
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleTagFilter(tag)}
                    >
                      {tag}
                    </button>
                  </li>
                ))}
              </ul>
              </div>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex">
                <Link className="btn btn-primary mx-1" to="/login">
                  Login
                </Link>
                <Link className="btn btn-primary mx-1" to="/signup">
                  Signup
                </Link>
              </form>
            ) : (
              <button onClick={handleLogout} className="btn btn-primary">
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
