// Modules
import React, {useState, useEffect} from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'

// Components
import Login from './components/login'
import Display from './components/display'

// StyleSheets
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Cloud
import {auth} from './secure/firebase';

// const { ipcRenderer } = window.require('electron');

function App(){

// States
    const [userName, setUserName] = useState('')
    const [display, setDisplay] = useState('')

    useEffect(() => {
        // ipcRenderer.invoke('perform-action', "args")
        // ipcRenderer.on('perform-action-reply', (event, arg) => {
        //     setDisplay(arg) 
        // })
        var disName = window.localStorage.getItem('displayName');
        setDisplay(disName)
        auth.onAuthStateChanged(function(user) {
            if (user) {
                setUserName(user.email)
                // getDisplay();
            } 
            else {
                setUserName("")
            }
          });
        }, [userName])

    return (
        <Router>
            <div className="App" style={{margin: "0px", padding: "0px"}} >
                <Switch>
                    <Route exact path="/">
                        {userName && display ? 
                            <Display dis={display} user={userName} style={{overflow: "hidden"}} />
                        : 
                            <Login setdisplay={setDisplay} dis={display} user={userName} setuser={setUserName} />                    
                        }
                    </Route>
                    <Route path="/display">
                        <Display dis={display} user={userName} style={{overflow: "hidden"}} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
