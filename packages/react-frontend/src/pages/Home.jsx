import { useEffect, useState } from "react";
import Navbar from "./../components/Navbar";
import Credential from "../components/credential/credential";
import Create from "../components/create/create"
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { addAuthHeader } from "../utils";



function Home() {
  const API_PREFIX =  "http://localhost:5478";
  const [logins, setLogins] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const token = sessionStorage.getItem('token')
      const decoded = jwtDecode(token)
      const cur = (new Date()).getTime()
      const exp = new Date(parseInt(decoded.exp) * 1000).getTime()
      console.log(cur)
      console.log(exp)
      if (exp < cur) {
        throw Error("Expired Token. Please login.")
      }

      decoded
      fetch(`${API_PREFIX}/credentials`, {
        method: "POST",
        headers: addAuthHeader({"Content-Type": "application/json"}),
      })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        setLogins(json.logins)
      })
    } catch(error) {
      console.log(error)
        navigate("/login");
    }
    }, [])

  return (
    <div>
      <Navbar />
      {/* here is where we create the dashboard */}
      <Create/>
      {logins.map(() => {
        <Credential username="" website="" password=""/>
      })}
    </div>
  );
}
export default Home;
