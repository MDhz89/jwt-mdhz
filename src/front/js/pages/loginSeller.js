import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const LoginSeller = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msgError, setMsgError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => { 
        e.preventDefault();
        
        setMsgError(null);

        const raw = {
            email: email,
            password: password 
        };
        
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(raw)
        };
   
        fetch(process.env.BACKEND_URL + "/api/seller/login", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    setMsgError("Bad email or password");
                    throw new Error('Network response was not ok');
                }
                return response.json(); 
            })
            .then((result) =>  {
                localStorage.setItem("jwt-token-seller", result.access_token);
                actions.changeAuthenticatedSeller(true); 
                  
                navigate("/private");
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    };

    return (
        <div className="row h-75 mt-5 w-100 d-flex justify-content-center">
            <div className="col-3 align-content-center">
                <div className="card-black body-login">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h2 className="text-center mb-4">Log in seller</h2>
                            <div className="mb-4">
                                <label htmlFor = "email">Email</label>
                                <input 
                                    type = "email" 
                                    className="form-control" id = "email" 
                                    value={email} 
                                    onChange ={(e)=>setEmail(e.target.value)} 
                                    placeholder="Enter email"
                                    required
                                >
                                </input>
                            </div>
                            <div className="mb-4">
                                <label htmlFor = "password">Password</label>
                                <input 
                                    type = "password" 
                                    className="form-control" id = "password" 
                                    value={password} 
                                    onChange ={(e)=>setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    required
                                >
                                </input>
                            </div>
                            <p className="text-danger">{msgError ? msgError:null}</p>
                            <div className="text-center mb-3">
                                <button type="submit" className="purple-button w-100">Login</button>
                            </div>
                            <p>don't have an account? <Link className="text-purple" to="/seller/signup">sign up seller</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};