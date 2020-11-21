import { useState, useEffect } from "react";
import "./SidebarChat.css";

import { Avatar } from "@material-ui/core";
import db from "./firebase";

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  
  useEffect(()=>{
    setSeed(Math.floor(Math.random()*5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat room"); 
    if (roomName) {
      db.collection("Rooms").add({
        name: roomName,
      });
    }
  }

  return !addNewChat ? (
  <div className="sidebarChat">
    <Avatar src={`https://avatars.dicebear.com/api/female/${seed}.svg`} />
    <div className="sidebarChat__info">
      <h2>{name}</h2>
      <p>Last message ...</p>
    </div>
  </div>
  ) : (
  <div className="sidebarChat" onClick={ createChat }>
    <h2>Add new chat room</h2>
  </div>
  );
}

export default SidebarChat;
