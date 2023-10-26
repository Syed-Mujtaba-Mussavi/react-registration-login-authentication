import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const usenavigate = useNavigate();
  useEffect(() => {
    let username = sessionStorage.getItem("username");
    if (username === "" || username === null) {
      usenavigate("/login");
    }
  }, []);
  return (
    <div>
      <div style={{ padding: "30px", fontSize: "30px" }} className="header">
        <Link to="/">Home</Link>
        <Link style={{ float: "right" }} to="/login">
          Logout
        </Link>
      </div>
      <h1 className="text-center">Welcome to home page</h1>
    </div>
  );
};

export default Home;
