import Dropdown from "react-bootstrap/Dropdown";

export default function Navbar() {
  return (
    <div
      className="px-4 align-items-center"
      style={{ backgroundColor: "#FFC1A1" }}
    >
      <nav className="navbar navbar-light justify-content-between text-bold">
        <h1>
          <strong>PiggyPass</strong>
        </h1>
        <div className="d-flex justify-content-center w-50">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Search By
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Website</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Username</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <form className="px-1 d-flex align-items-center w-100">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-secondary" type="submit">
              Search
            </button>
          </form>
        </div>
        <a href="/settings">
          <img
            src="./../../public/gear-fill.svg"
            alt="settings icon"
            width="32"
            height="32"
          ></img>
        </a>
      </nav>
    </div>
  );
}