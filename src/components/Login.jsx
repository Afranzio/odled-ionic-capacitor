import React, {useState, useRef } from "react";
import Alert from './Alert';
import { auth } from './config'
import { useHistory} from "react-router-dom";


export default function Login({changeUser, navBar, macChecker}){

    let history = useHistory();

    const ref = useRef(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const signIn=(event)=>{
        event.preventDefault();
        auth.signInWithEmailAndPassword(email,password)
        .then(() => {
            changeUser(auth.currentUser)
            console.log(auth.currentUser.photoURL)
            console.log("User Is Logged In@OD-LED")
            return  history.push("/device");
        })
        .catch((error)=> {
            setMsg(error.message)
            handleClick();  
        })
    }

    const handlePwd = (e) => { 
        e.preventDefault();       
        setMsg("Please Contact The Support Team")
        handleClick();
    }

    const handleClick = () => {
        ref.current.handleShow();
    };

    return (
        <div className="login_main">
            {navBar()}
            <div className="auth-inner">
            <form>
                <h3>Sign In</h3>
                <div className="form-group">
                    <label className="label" >Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={(e)=> {setEmail(e.target.value);}} />
                </div>

                <div className="form-group">
                    <label className="label" >Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={(e)=> {setPassword(e.target.value);}} />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={signIn}>Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="/frgpwd" onClick={(e)=>handlePwd(e)} >password?</a>
                </p>
            </form>
            <Alert message={msg} ref={ref} />
        </div>
        </div>
    );
}