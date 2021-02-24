import React,{useEffect} from 'react';
import Ratio from 'react-ratio';
import { Rnd } from 'react-rnd'

// text
import ReactHtmlParser from 'react-html-parser';
import { Textfit } from 'react-textfit';

// firestore
import firebase from 'firebase';
import { auth } from '../secure/firebase';
import { Button } from 'react-bootstrap';


export default function Display({user, dis}){

    const [items, setItems] = React.useState([])
    const [config, setConfig] = React.useState([])

    let tempSize = handletemp()

    useEffect(() => {
        if(user && dis){
            fetchConfig();
        }
        else{
            window.location = "#/"
        }
        window.addEventListener('keydown', userLogOut);
    }, [dis, user])

    function handletemp(){
        if(window.innerWidth === 1366){
            return(1366/1366)
        }
        else if(window.innerWidth === 1920){
            return(1920/1366)
        }
        else if(window.innerWidth === 3840){
            return(3840/1366)
        }
        else if(window.innerWidth === 7680){
            return(7680/1366)
        }
        else{
            return ("This is not familiar resolution")
        }
    }

    async function fetchConfig(){
        const events = await firebase.firestore().collection(user)
        events.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.id === "configuration"){
                    setConfig(doc.data())
                }
                else if(doc.id === dis){
                    setItems(doc.data())
                }
            })
         })
    }     

    function selectTag(post){
        if(post.texts !== ""){  
            return  (<div style={{width: post.size.width*tempSize, height: post.size.height*tempSize}} >
                <Textfit
                  mode="multi"
                  style={{height: "100%"}}
                  forceSingleModeWidth={false}>
                  {ReactHtmlParser(post.texts)}
                </Textfit>
              </div>)
        }
        else if(post.fileType === "image/png" || post.fileType === "image/PNG" || post.fileType === "image/jpeg" || post.fileType === "image/jpg" || post.fileType === "image/gif" ){
        return <img src={post.imageURL} style={{width: post.size.width*tempSize, height: post.size.height*tempSize}} disableDragging="true"  alt="" />
        }
        else if(post.fileType === "video/mp4" || post.fileType === "video/avi" || post.fileType === "video/flv" || post.fileType === "video/mkv" ){
        return <video src={post.imageURL} style={{width: post.size.width*tempSize, height: post.size.height*tempSize}} loop={true} autoPlay={true} alt="" />
        }
    }

    function testResolution(){
        if(tempSize !== "This is not familiar resolution"){
            return(
                    config.ratio && Object.keys(items).length !== 0 && config.agreedToSend ?
                    <Ratio ratio={ config.ratio.w / config.ratio.h } style={{maxHeight: "inherit",background: config.bgImage !=="" ? `url(${config.bgImage})`: config.bgColor.background, backgroundPosition: 'center',backgroundSize: 'cover',overflow: 'hidden',backgroundRepeat  : 'no-repeat', cursor: "none"}}  className="layout" id="main" >
                        {(Object.keys(items).length !== 0) ? 
                        Object.keys(items).map((post) => (
                            <Rnd className="SelectedTemp img grid" 
                            style={{cursor: "none"}}
                            bounds="parent"
                            size={{width: items[post].size.width*tempSize, height: items[post].size.height*tempSize}}
                            position={{x: items[post].position.x*tempSize, y: items[post].position.y*tempSize}} 
                            disableDragging="true"
                            enableResizing="false"
                            >
                                {selectTag(items[post])}
                            </Rnd>
                        )) : null}
                    </Ratio>
                :
                <div className="outer">
                    <div className="middle">
                        <div className="auth-inner">              
                            <div>{"Your Cloud Is Empty Please Check From Controller Or Restart The Application"}</div>
                            <div>{`Display Name: ${dis}`}</div>
                            <Button variant="outline-primary" onClick={() => {auth.signOut(); window.location="#/"}} style={{margin: "1em", fontSize: "0.8em"}} >Log Out</Button>
                            <Button variant="outline-primary" onClick={() => {window.location.reload(1)}} style={{margin: "1em", fontSize: "0.8em"}} >Restart</Button>
                        </div>
                    </div>  
                </div>
            )
        }
        else{
            return(
                <div className="outer">
                    <div className="middle">
                        <div className="auth-inner">              
                            <div>{`Display Name: ${dis}`}</div>
                            <div>{tempSize}</div>
                        </div>
                    </div>  
                </div>
            )
        }
    }

    function userLogOut(event){
        if(event.key === "Tab"){
            auth.signOut()
        }
    }

    return (
        <div onKeyPress={userLogOut}>
            <div>
                {testResolution()}
            </div>
        </div>
    )
}