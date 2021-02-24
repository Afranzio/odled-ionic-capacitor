import React, {useState, useRef } from "react";
import Alert from './alert';
import { auth } from '../secure/firebase'
import { useHistory} from "react-router-dom";

import {Navbar} from 'react-bootstrap';
import logo from '../assets/topLogo100.png';
import nood from '../assets/LoginPageIcon.png'

export default function Login({setuser, user, setdisplay, dis}){

    const ref = useRef(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [disName, setDisName] = useState('');

    const signIn=(event)=>{
        event.preventDefault();
        auth.signInWithEmailAndPassword(email,password)
        .then(() => {
            setuser(auth.currentUser.email)
            window.localStorage.setItem('displayName', disName);
            setdisplay(disName)
            // ipcRenderer.send('request-mainprocess-action', disName)
            // ipcRenderer.on('request-mainprocess-reply', (event, arg) => {
            //     setdisplay(arg) 
            //   })
        })
        .catch((error)=> {
            setMsg(error.message)
            ref.current.handleShow();
        })
    }

    const handleFgtPwd = () => {
        setMsg("Please Contact Our Support Team..😊")
        ref.current.handleShow();
    };

    return (
        <div>
            <Navbar variant="dark" style={{background: "rgb(3,77,162)", width: "100%"}}>
                <Navbar.Brand href="#/" style={{fontSize: "2em", fontWeight: "bolder", display: "flex", justifyContent: "center", textAlign: "center", width: "100%"}} >
                <img
                    className="Main-Logo"
                    alt=""
                    src={logo}
                    width="8%"
                    height="70%"
                    className="d-inline-block align-top"
                />{' '}
                </Navbar.Brand>
            </Navbar>
            <div className="outer">
                <div className="middle">
                    <div className="auth-inner">
                        <h3 style={{fontFamily : "Quicksand', sans-serif;"}}>Welcome OD Digital World</h3>
                        <form>
                            <div className="form-group">
                            <img
                                className="Main-Logo"
                                alt=""
                                src={nood}
                                width= "30%"
                                className="d-inline-block align-top"
                                style={{marginLeft: "35%", marginTop: "1em"}}
                            />
                            </div>
                            <div className="form-group">
                                <label>Email address</label>
                                <input id="userName" type="email" className="form-control" placeholder="Enter email" onChange={(e)=> {setEmail(e.target.value);}} />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input id="pwd" type="password" className="form-control" placeholder="Enter password" onChange={(e)=> {setPassword(e.target.value);}} />
                            </div>

                            <div className="form-group" style={{width: "50%", marginLeft: "25%"}}>
                                <input id="displayName" type="text" required className="form-control" placeholder={dis ? dis : "ie: display1"} onChange={(e)=>{setDisName(e.target.value);}} />
                            </div>

                            <button id="newLogin" type="submit" className="btn btn-primary btn-block" onClick={signIn} style={{width: "75%"}} >Submit</button>
                            <p className="forgotPassword text-center" onClick={handleFgtPwd} style={{color: "#007bff", cursor: "pointer"}} >
                                Forgot password?
                            </p>
                            {/* <button id="newLogin" type="submit" className="btn btn-primary btn-block" style={{width: "75%"}} >Submit</button> */}
                        </form> 
                        <Alert message={msg} ref={ref} />
                    </div>
                </div>
            </div>
        </div>
    );
}