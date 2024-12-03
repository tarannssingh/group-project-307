import { useEffect } from "react";
import Navbar from "./../components/Navbar";
import Credential from "../components/credential/credential";
import Create from "../components/create/create"
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


function Home() {
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
      <Credential/>
    </div>
  );
}
export default Home;
