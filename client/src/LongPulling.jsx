import { useEffect, useState } from "react";
import axios from "axios";

export function LongPulling() {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/get-messages");
      setMessages((prev) => [data, ...prev]);
      await subscribe();
    } catch (error) {
      setTimeout(() => {
        subscribe();
      }, 500);
    }
  };

  const sendMessage = async () => {
    axios.post("http://localhost:5000/new-messages", {
      message: value,
      id: Date.now(),
    });
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
