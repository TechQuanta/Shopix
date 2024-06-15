import React, { useState } from 'react'
import { FaUserTie, FaEye, FaEyeSlash, FaUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

import loginbg from "../../assets/loginbg.jpg";

import './style.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GenderCheckbox from './rolecheckbox/GenderCheckbox';
import SummaryApi from '../../utils/apiUrls';
import userAtom from '../../atom (global state)/userAtom';
import { useSetRecoilState } from 'recoil';

function Authentication() {

    const navigate = useNavigate();
    const setUser = useSetRecoilState(userAtom)
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)
    const [showPassword3, setShowPassword3] = useState(false)

    const [emailr, setEmailr] = useState('');
    const [usernamer, setUsernamer] = useState('');
    const [cpasswordr, setCpasswordr] = useState('');
    const [passwordr, setPasswordr] = useState('');
    const [role, setRole] = useState('');
    const [userRegistering, setUserRegistering] = useState("Sign Up");
    const [userRegistered, setUserRegistered] = useState("Welcome Back!");
    const [userRegistered2, setUserRegistered2] = useState("Create An account for Discover and Explore millions of movies and TV Shows.");

    const handleRegisterSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(SummaryApi.signUP.url, {
                method: SummaryApi.signUP.method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: usernamer, email: emailr, password: passwordr, confirmPassword: cpasswordr, role: role }),
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            console.log(data);

            setUserRegistering("Creating Account...");
            setUserRegistering("Sign Up");
            setUserRegistered("Account Created Successfully!");
            toast.success("Account Created Successfully!");
            setUserRegistered2("Now, Click on login to login to your account and enjoy our services.");
        }
        catch (error) {
            setUserRegistered("Account already exists!");
            toast.warn(error);
            setUserRegistered2("Create Account with different email, because this account already exists in our system.");
            console.log(error)
            setUserRegistering("Sign Up");
        }
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [wrongColor, setWrongColor] = useState("white");
    const [userLoging, setUserLoging] = useState("Login");
    const [loggedIn, setLoggedIn] = useState(false);
    const [userWrongPass, setUserWrongPass] = useState("Welcome Back!");
    const [userWrongPass2, setUserWrongPass2] = useState("Login Into your account and Discover and Explore millions of movies and TV Shows.");

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        try {
            setUserLoging("Loging in...");
            const res = await fetch(SummaryApi.signIn.url, {
                method: SummaryApi.signIn.method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, password: password }),
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            if (data?.email) {
                navigate("/");
                localStorage.setItem("shopix", JSON.stringify(data));
                setUser(data);
                toast.success("Logged in successfully!")
                setLoggedIn(true);
                setUserLoging("Login");
            }
        }
        catch (error) {
            setWrongColor("red");
            console.log(error)
            setUserLoging("Login");
            toast.error(error);
            setUserWrongPass("Incorrect Password")
            setLoggedIn(false);
            setUserWrongPass2("Try Entering Right password again and then, login. Enjoy!")
        }
    }

    const handleCheckboxChange = (gender) => {
        setRole(gender);
    };

    const [Wrapper, setWrapper] = useState(false);

    return (
        <>
            <div className="auth">
                <div id="authwrapperbd" className={`${Wrapper ? "active" : ""}`}>
                    <span className="bg-animate"></span>
                    <span className="bg-animate2"></span>
                    <div className="auth-form-box login">
                        <h2 className="animation" style={{ "--i": 0, "--j": 21 }}>Login</h2>
                        <form
                            onSubmit={handleLoginSubmit}
                        >
                            <div className="auth-input-box animation" style={{ "--i": 1, "--j": 22 }}>
                                <input type="text" onChange={(e) => setEmail(e.target.value)} required />
                                <label>Email</label>
                                <MdEmail className='icon' />
                            </div>
                            <div className="auth-input-box animation" style={{ "--i": 2, "--j": 23 }}>
                                <input type={showPassword3 ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} required />
                                <label>Password</label>
                                <div onClick={() => setShowPassword3((preve) => !preve)}>
                                    {
                                        showPassword3 ? (
                                            <FaEyeSlash className='icon' style={{ cursor: "pointer" }} />
                                        )
                                            :
                                            (
                                                <FaEye className='icon' style={{ cursor: "pointer" }} />
                                            )
                                    }
                                </div>
                                {userWrongPass === "Incorrect Password" && <span onClick={() => navigate('/forgot-password')} className='forgotclickspan'>forgot password?</span>}
                            </div>
                            <button className="btn animation" style={{ "--i": 3, "--j": 24 }} type='submit'>{userLoging}</button>
                            <div className="logreg-link animation" style={{ "--i": 4, "--j": 25 }}>
                                <p>Don't have an account? <a href="" className="register-link" onClick={(e) => {
                                    setWrapper(true);
                                    e.preventDefault();
                                }}>Sign Up</a></p>
                            </div>
                        </form>
                    </div>
                    <div className="auth-info-text login">
                        <h2 className="animation" style={{ "--i": 0, "--j": 20, color: `${wrongColor}` }}>{userWrongPass}</h2>
                        <p className="animation" style={{ "--i": 1, "--j": 21 }}>{userWrongPass2}</p>
                    </div>

                    <div className="auth-form-box register">
                        <h2 className="animation" style={{ "--i": 17, "--j": 0 }}>Sign Up</h2>
                        <form
                            onSubmit={handleRegisterSubmit}
                        >
                            {/* <div className="auth-input-box animation" style={{ "--i": 18, "--j": 1 }}>
                            <input type="text" onChange={(e) => setUsernamer(e.target.value)} required />
                            <label>Username</label>
                            <FaUserTie className='icon' />
                        </div> */}
                            <div className="auth-input-box animation" style={{ "--i": 18, "--j": 1 }}>
                                <input type="text" onChange={(e) => setUsernamer(e.target.value)} required />
                                <label>Username</label>
                                <FaUserCircle className='icon' />
                            </div>
                            <div className="auth-input-box animation" style={{ "--i": 19, "--j": 2 }}>
                                <input type="text" onChange={(e) => setEmailr(e.target.value)} required />
                                <label>Email</label>
                                <MdEmail className='icon' />
                            </div>
                            <div className="auth-input-box animation" style={{ "--i": 20, "--j": 3 }}>
                                <input type={showPassword ? "text" : "password"} onChange={(e) => setPasswordr(e.target.value)} required />
                                <label>password</label>
                                <div onClick={() => setShowPassword((preve) => !preve)}>
                                    {
                                        showPassword ? (
                                            <FaEyeSlash className='icon' style={{ cursor: "pointer" }} />
                                        )
                                            :
                                            (
                                                <FaEye className='icon' style={{ cursor: "pointer" }} />
                                            )
                                    }
                                </div>
                            </div>
                            <div className="auth-input-box animation" style={{ "--i": 21, "--j": 4 }}>
                                <input type={showPassword2 ? "text" : "password"} onChange={(e) => setCpasswordr(e.target.value)} required />
                                <label>Confirm Password</label>
                                <div onClick={() => setShowPassword2((preve) => !preve)}>
                                    {
                                        showPassword2 ? (
                                            <FaEyeSlash className='icon' style={{
                                                cursor: "pointer", color: "#0ef"
                                            }} />
                                        )
                                            :
                                            (
                                                <FaEye className='icon' style={{ cursor: "pointer" }} />
                                            )
                                    }
                                </div>
                            </div>
                            <div className="authcheckreg animation" style={{ "--i": 22, "--j": 5 }}>
                                <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={role} />
                            </div>
                            <button className="btn animation" style={{ "--i": 23, "--j": 6 }} type='submit'>{userRegistering}</button>
                            <div className="logreg-link animation" style={{ "--i": 26, "--j": 7 }}>
                                <p>Already have an account? <a href="" className="login-link" onClick={(e) => {
                                    setWrapper(false);
                                    e.preventDefault();
                                }}>Login</a></p>
                            </div>
                        </form>
                    </div>
                    <div className="auth-info-text register">
                        <h2 className="animation" style={{ "--i": 17, "--j": 0 }}>{userRegistered}</h2>
                        <p className="animation" style={{ "--i": 18, "--j": 1 }}>{userRegistered2}</p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Authentication

