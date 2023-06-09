import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = (props) => {
  const host = "https://inotebook-0qgp.onrender.com"
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  
  // Check if user is already logged in
  if (localStorage.getItem("token")) {
    navigate("/");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the Auth Token and Redirect
      localStorage.setItem("token", json.authtoken);
      props.showAlert("LoggedIn Successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }

    //automatic log out after half hour
    const interval = setInterval(()=>{
      console.log("Logout")
      localStorage.removeItem('token');
      navigate('/login')
      clearInterval(interval);
    },180000);
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
