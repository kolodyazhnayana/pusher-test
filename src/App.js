import './App.css';
import {ChatBox} from "./chatBox";
import {useEffect, useState} from "react";
import {ChatList} from "./chatList";
import Pusher from 'pusher-js';
import axios from 'axios';

function App() {
  const [text, setText] = useState('')
  const [username, setUsername] = useState('')
  const [chats, setChats] = useState([])

  useEffect(() => {
    if (!username) {
      const user = window.prompt('Username: ', 'Anonymous');
      setUsername(user)
    }
  }, [])

  useEffect(() => {
    Pusher.logToConsole = true;

    if (username !== '') {
      const pusher = new Pusher("2b083c5510e46aedbfc0", {
        channelAuthorization: {
          endpoint: "http://localhost:5000/pusher/auth",
        },
        forceTLS: true,
        cluster: 'eu'
      });

      const channel = pusher.subscribe('chat');
      channel.bind('message', data => {
        setChats(prev => [...prev, data])
        setText('')
      })

      document.cookie = "user_id=" + username;

      const channel1 = pusher.subscribe('presence-quickstart');

      channel1.bind("pusher:subscription_succeeded", () =>
        channel1.members.each((member) => console.log('member.id', member.id))
      );
      channel1.bind("pusher:member_added", (member) =>
        console.log(`addMemberToUserList(${member.id})`)
      );
      channel1.bind("pusher:member_removed", (member) => {
       console.log('pusher:member_removed', member)
      });
    }
  }, [username])

  const handleTextChange = (e) => {
    setText(e?.target?.value)
  }

  const sendMessage = () => {
    const payload = {
      username: username,
      message: text,
      chatId: 'chat'
    };
    axios.post('http://localhost:5000/message', payload);
  }

  return (
    <div className="App">
      <ChatBox
        handleTextChange={handleTextChange}
        text={text}
        username={username}
        sendMessage={sendMessage}
      />
      <ChatList chats={chats} />
    </div>
  );
}

export default App;
