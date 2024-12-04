import { createContext, useEffect, useState } from "react";
import Navbar from "./../components/Navbar";
import Credential from "../components/credential/credential";
import Create from "../components/create/create"
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { addAuthHeader } from "../utils";
export const CredContext = createContext()

function Home() {
  const API_PREFIX =  "http://localhost:5478";
  const [logins, setLogins] = useState([])
  const [update, setUpdate] = useState(true)
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
      // decoded
      fetch(`${API_PREFIX}/credentials`, {
        method: "GET",
        headers: addAuthHeader({"Content-Type": "application/json"}),
      })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        setLogins(json)
        setUpdate(false)
      })
    } catch(error) {
      console.log(error)
        navigate("/login");
    }
    }, [update])

  return (
    <CredContext.Provider value={{update, setUpdate}}>
      <Navbar />
      {/* here is where we create the dashboard */}
      <Create/>
      {logins && logins.length > 0 ? logins.map((login) => {
        return <Credential key={login._id} cred_id={login._id} username={login.username} website={login.website}  password={login.password}/>
      }) : (
        <p>No credentials available</p>
      )}
    </CredContext.Provider>
  );
}
export default Home;
