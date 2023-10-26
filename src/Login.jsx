import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    sessionStorage.clear();
  }, []);
  const proceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      //   implementaion login functionalitys
      fetch("http://localhost:3000/user/" + userName)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          if (Object.keys(data).length === 0) {
            toast.error("Enter Valid user");
          } else {
            if (data.password === password) {
              toast.success("Success");
              sessionStorage.setItem("username", userName);
              navigate("/");
            } else {
              toast.error("Enter Valid Credentials");
            }
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to :" + err.message);
        });
    }
  };
  const validate = () => {
    let result = true;
    if (userName === "" || userName === null) {
      result = false;
      toast.warning("Please Enter Username");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };
  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6 center">
        <form onSubmit={proceedLogin} className="container">
          <div className="card">
            <div className="card-header">
              <h2>User Login</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>
                  User Name <span className="errmsg">*</span>
                </label>
                <input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="form-control"
                ></input>
              </div>
              <div className="form-group">
                <label>
                  Password <span className="errmsg">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                ></input>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Login
              </button>{" "}
              |
              <Link className="btn btn-success" to={"/register"}>
                New User
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
