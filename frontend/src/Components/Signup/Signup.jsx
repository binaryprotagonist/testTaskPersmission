import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(name == "" || email == "" || password.length < 8 || confirm.length < 8){
        setError(true);
    }
    else{
        console.log(name);
        setError(false);
    }

    if(name && email && password){
        const res = await axios.post(
            "http://localhost:3001/api/signup",
            {
                name,
                email,
                password
            }
        )
        console.log(res);
        if(res.data){
            navigate("/");
        }
    }
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 mt-5">
            <h2>Signup</h2>
            <form method="POST" onSubmit={handleSubmit}>
              <div className="mt-3">
                <div className="form-group mt-3">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                  />

                {/* {error? <p className="text-danger">Full Name is required</p>:""} */}
                </div>
                <div className="form-group mt-3">
                  <label>Email</label>
                  <input type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} className="form-control" />

                {/* {error? <p className="text-danger">Email is required</p>:""} */}
                </div>
                <div className="form-group mt-3">
                  <label>Password</label>
                  <input type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} className="form-control" />
                  {/* {error? <p className="text-danger">Password length should be minimum 8</p>:""} */}
                </div>
                {/* <div className="form-group mt-3">
                  <label>Confirm Password</label>
                  <input type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)} className="form-control" />
                  {error? <p className="text-danger">Confirm Password length should be minimum 8</p>:""}
                </div> */}
              </div>
              {error? <p className="text-danger">Please enter all fields</p>:""}
              <button className="btn btn-primary mt-3">Signup</button>
              <a href="/" className="btn btn-info mt-3 mx-3">Login</a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


