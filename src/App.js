import React, {useState, useEffect} from 'react';
import {HashRouter, Switch, Route, Link } from "react-router-dom";

// Import Components
import Login from './components/Login'
import Display from './components/display'
import {auth} from './components/config'
import Error from './components/Error'

// Import Css
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"

function App() {

  // firebase
  const [user, setUser] = useState()
  const [auths, setAuths] = useState("")


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser)=> {
      if (authUser){
        setAuths(authUser.email)
        setUser(authUser);
      }
      else{
        //user has logged out
        setUser(null)
      }
    })
    return () => { 
      unsubscribe()
    };
  }, [user])

  function nav(){
    return(
      <nav className="navbar navbar-expand navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"} ><h1 style={{color: "black", fontFamily: "monospace", fontWeight: "bolder"}} >OD-LED</h1></Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                {(user!=null)? <div style={{display: "flex"}} > <h4 onClick={() => auth.signOut()}>Welcome <h4 style={{color: "black", fontFamily: "monospace"}} >{auth.currentUser.email}</h4></h4></div> : <h4>Login To Procide</h4>}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )}


  return (
    <HashRouter>
      <div className="App">
        <div className="auth-wrapper">
          <div>
            <Switch>
              <Route exact path="/">
                <Login user={user} changeUser={setUser} navBar={nav} />
              </Route>
              <Route path="/device">
                <Display accName={auths} />
              </Route>
              <Route component={Error} />
            </Switch>
          </div>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
