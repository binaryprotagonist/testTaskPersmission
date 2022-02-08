import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if( email == "" || password.length < 8 ){
        setError(true);
    }
    else{
        setError(false);
        // console.log(email);
    }

    if(email && password){
        const res = await axios.post(
            "http://localhost:3001/api/login",
            {
                email,
                password
            }
        )
        localStorage.setItem("testTask", res.data);
        if(res.data){
            navigate("/filelist");
        }
    }
    // console.log(obj);
  };

  return (<div>
      <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 mt-5">
                    <h2>Login</h2>
                    <form method='POST' onSubmit={handleLogin}>
                        <div className='mt-3'>
                            <div className="form-group mt-3">
                                <label>Email</label>
                                <input type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} className="form-control"/>
                                {/* {error? <p className="text-danger">Email is required</p>:""} */}
                            </div>
                            <div className="form-group mt-3">
                                <label>Password</label>
                                <input type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} className="form-control"/>
                                {/* {error? <p className="text-danger">Password length should be minimum 8</p>:""} */}
                            </div>
                        </div>
                        <button className='btn btn-primary mt-3'>Login</button>
                    </form>

                    {error? <p className="text-danger">Please enter all the fields</p>:""}
                    <a href="/signup" className="btn btn-info mt-3">Signup</a>
                </div>
            </div>
      </div>
  </div>);
};

export default Login;
