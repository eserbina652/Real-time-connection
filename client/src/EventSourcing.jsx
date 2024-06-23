import { useEffect, useState } from "react";
import axios from "axios";

export function EventSourcing() {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    const eventSource = new EventSource("http://localhost:5000/connect");
    eventSource.onmessage = function (event) {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };
  };

  const sendMessage = async () => {
    try {
      await axios.post("http://localhost:5000/new-messages", {
        message: value,
        id: Date.now(),
      });
      setValue("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

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
            <div className="message" key={mess.id}>
              {mess.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
