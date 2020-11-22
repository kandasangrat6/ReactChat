import { useState, useEffect } from "react";
import "./SidebarChat.css";

import { Avatar } from "@material-ui/core";
import db from "./firebase";

import { Link } from "react-router-dom";

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    setSeed(Math.floor(Math.random()*5000));
  }, []);

  useEffect(() => {
    if (id) {
      db.collection("Rooms").doc(id)
      .collection("Messages").orderBy("timestamp", "desc")
      .onSnapshot(snapshot => (
        setMessages(snapshot.docs.map((doc) => doc.data()))
      ))
    }
  }, [id]);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat room"); 
    if (roomName) {
      db.collection("Rooms").add({
        name: roomName,
      });
    }
  }

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/female/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{ messages[0]?.message }</p>
        </div>
      </div>
    </Link>
  ) : (
  <div className="sidebarChat" onClick={ createChat }>
    <h2>Add new chat room</h2>
  </div>
  );
}

export default SidebarChat;
