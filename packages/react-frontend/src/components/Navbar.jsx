import Form from 'react-bootstrap/Form';

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
        <div className="d-flex justify-content-center align-items-center w-50">
          <form className="px-1 d-flex align-items-center w-100">
            <div className="select w-50 me-2">
              <Form.Select aria-label="Default select example">
                <option>Search By</option>
                <option value="1">Website</option>
                <option value="2">Username</option>
              </Form.Select>
            </div>
            <input
              className="form-control me-2 m-0"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn bg-white" type="submit">
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
