import { useEffect,Link } from "react";
import {  useNavigate,Outlet } from "react-router-dom";

const Dashboard=()=>{
    
    const navigate = useNavigate();
    useEffect(() => {
        let isLoggedIn = localStorage.getItem("logged");
        if (!isLoggedIn) {
          navigate("/");
        }
      }, []);

      const logout = () => {
        localStorage.clear();
        navigate("/");
      };
    return (
        <>
          <nav className="navbar nav fixed-top bg-body-tertiary">
  <div className="container-fluid">
    <h2 className="navbar-brand" href="#">  Order List</h2> 
    <div>
      <Link to='privacy'>Privacy</Link>
    <button type="button" className="btn btn-light" onClick={logout}>Log Out</button>
    </div>
  </div>
</nav>
        <Outlet/>
        </>
    )
}
export default Dashboard