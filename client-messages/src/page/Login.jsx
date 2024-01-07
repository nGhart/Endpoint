import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BASE_URL } from "../utilities";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/user/login`, loginData)
      .then((resp) => {
        if (resp.data.msg === "Log in successful") {
          localStorage.setItem("logged", resp.data.user.role);
          navigate("/userpage");
        } else {
          toast.error(resp.data.msg);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="loginContainer">
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            required
          />
          <label className="form-check-label" for="exampleCheck1">
            I agree to the
            <a
              href="https://www.termsandconditionsgenerator.com/live.php?token=k2ZCxDgH8tE3TNkFs7Ou5VKm8BxadwA6"
              target="_blank"
            >
              {" "}
              Terms and Conditions
            </a>{" "}
            and have read the{" "}
            <a
              href="https://www.freeprivacypolicy.com/live/c9fa8cf1-a613-4353-a72d-84bd630f71b1"
              target="_blank"
            >
              Privacy Policy
            </a>
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
export default Login;
