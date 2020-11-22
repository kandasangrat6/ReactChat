
import "./Chat.css";

import { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {InsertEmoticon, MicRounded} from "@material-ui/icons";

import { useParams } from "react-router-dom";
import db from "./firebase";
import firebase from "firebase";

import { useStateValue } from "./StateProvider";

function Chat() {
  
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("Rooms").doc(roomId).onSnapshot((snapshot) => {
        setRoomName(snapshot.data().name);
      });

      db.collection("Rooms").doc(roomId)
      .collection("Messages").orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map(doc => doc.data()))
      });

    }
  }, [roomId]);

  useEffect(()=> {
    setSeed(Math.floor(Math.random()*5000));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(" >> " + input);

    db.collection("Rooms").doc(roomId)
    .collection("Messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  }

  return (
  <div className="chat">
    
    <div className="chat__header">
      <Avatar src={`https://avatars.dicebear.com/api/female/${seed}.svg`} />
      
      <div className="chat__headerInfo">
      <h3>{roomName}</h3>
      <p>
        last seen {" "}
      {
        new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()  
      }
      </p>
      </div>

      <div className="chat__headerRight">
        <IconButton><SearchOutlinedIcon /></IconButton>
        <IconButton><AttachFileIcon /></IconButton>
        <IconButton><MoreVertIcon /></IconButton>
      </div>
    </div>
    <div className="chat__body">
      { messages.map(msg => (

        <p className={`chat__message ${msg.name === user.displayName && "chat__receiver"}`}>
        <span className="chat__name">{msg.name}</span>
        {msg.message}
        <span className="chat__timestamp">{new Date(msg.timestamp?.toDate()).toUTCString()}</span>
        </p>

      )) }

    </div>
    <div className="chat__footer">
      <InsertEmoticon /> 
      <form>
        <input placeholder="Type a message" type="text" value={input} onChange={ (e) => setInput(e.target.value) } />
        <button onClick={ sendMessage } type="submit">Send a message</button>
      </form>
      <MicRounded />
    </div>
  </div>
  );
}

export default Chat;

