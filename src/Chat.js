
import "./Chat.css";

import { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {InsertEmoticon, MicRounded} from "@material-ui/icons";

function Chat() {
  
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");


  useEffect(()=> {
    setSeed(Math.floor(Math.random()*5000));
  }, []);

  const sendMessage = () => {}

  return (
  <div className="chat">
    
    <div className="chat__header">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="chat__headerInfo">
        <h3>Room name</h3>
        <p>Last message.. </p>
      </div>
      <div className="chat__headerRight">
        <IconButton><SearchOutlinedIcon /></IconButton>
        <IconButton><AttachFileIcon /></IconButton>
        <IconButton><MoreVertIcon /></IconButton>
      </div>
    </div>
    <div className="chat__body">
      <p className="chat__message">
        <span className="chat__name">
          Yuu Mami
        </span>
        Hey Guys
        <span className="chat__timestamp">
          3:35PM
        </span>
      </p>


      <p className={`chat__message ${true && "chat__receiver"}`}>
        <span className="chat__name">
          Yuu Mami
        </span>
        Hey Guys
        <span className="chat__timestamp">
          3:35PM
        </span>
      </p>

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

