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
        <Dropdown>
          <Dropdown.Toggle
            variant="secondary"
            id="dropdown-basic"
            style={{
              border: "none",          // Remove border for a cleaner look
              background: "transparent", // Remove background color
              padding: 0,             // Remove padding to ensure it's tightly wrapped around the icon
              position: "relative",    // Ensures the icon aligns correctly
            }}
          >
            <img
              src="./../../public/gear-fill.svg"
              alt="settings icon"
              width="32"
              height="32"
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/profile">Profile</Dropdown.Item>
            <Dropdown.Item href="/deleteAccount">Delete Account</Dropdown.Item>
            <Dropdown.Item href="/logout">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </nav>
    </div>
  );
}