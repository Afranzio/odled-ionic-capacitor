import React,{useEffect, useState} from 'react'
import { Rnd } from 'react-rnd'
import {db} from './config'
import firebase from 'firebase'

export default function Display({accName}) {

    const [items, setItems] = useState([])

    useEffect(() => {
        if(accName){
          db.collection(accName).orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
            setItems(
              snapshot.docs.map((doc) => ({
                timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                id: doc.id,
                post: doc.data(),
              }))
            );
          });
        }
      },[accName]);

      function selectTag(post){
        if(post.texts !== ""){  
          return <div dangerouslySetInnerHTML={{__html: post.texts}} />
        }
        else if(post.fileType === "image/png" || post.fileType === "image/jpeg" || post.fileType === "image/jpg" || post.fileType === "image/gif" ){
          return <img src={post.imageURL} alt="" />
        }
        else if(post.fileType === "video/mp4" || post.fileType === "video/avi" || post.fileType === "video/flv" || post.fileType === "video/mkv" ){
          return <video src={post.imageURL} loop={true} autoPlay={true} alt="" />
        }
        else if(post.fileType === "application/pdf"){
          return <iframe src={post.imageURL+'#toolbar=0&scrollbar=1&navpanes=0'} type={post.fileType} title={post.fileName} scrolling="no" height={post.size.height} />
        }
      }

    return (
        <div className="ffmain" >
          {console.log(items)}
            {(items !== 0)?  
                items.map(({id,post}) => (
                    <Rnd id={id} key={id} className="grid" 
                    bounds="body"
                    size={{width: post.size.w, height: post.size.h}}
                    position={{x: post.position.x, y: post.position.y}}
                    disableDragging={true}
                    enableResizing={false}
                    >
                        {selectTag(post)}
                    </Rnd>
            )) : null}
        </div>
    )
}
