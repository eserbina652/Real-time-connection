import { useState, useRef } from "react";
import axios from "axios";

export function WebSock() {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);
  const socket = useRef(null);

  function connect() {
    socket.current = new WebSocket("ws://localhost:5000");

    socket.current.onopen = () => {
      setConnected(true);
      const message = {
        event: "connection",
        username,
        id: Date.now(),
      };
      socket.current.send(JSON.stringify(message));
      console.log("Connected and sent:", message);
    };

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
      console.log("Received message:", message);
    };

    socket.current.onclose = () => {
      console.log("Closed");
    };

    socket.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  const sendMessage = async () => {
    const message = {
      username,
      messages: value,
      id: Date.now(),
      event: "message",
    };
    socket.current.send(JSON.stringify(message));
    setValue("");
  };

  if (!connected) {
    return (
      <div className="center">
        <div className="form">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Write your name"
          />
          <button onClick={connect}>Enter</button>
        </div>
      </div>
    );
  }

  return (
    <div className="center">
      <div>
        <div className="form">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
        <div className="messages">
          {messages.map((mess) => (
            <div key={mess.id}>
              {mess.event === "connection" ? (
                <div>User {mess.username} was connected</div>
              ) : (
                <div>
                  User {mess.username}. {mess.messages}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
