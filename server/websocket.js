const ws = require("ws");

const wss = new ws.Server(
  {
    port: 5000,
  },
  () => console.log("Server started on 5000")
);

wss.on("connection", function connection(ws) {
  console.log("New client connected");

  ws.on("message", function (message) {
    try {
      message = JSON.parse(message);
      switch (message.event) {
        case "message":
          broadcastMessage(message);
          break;

        case "connection":
          broadcastMessage(message);

          break;
      }
    } catch (e) {
      console.log("ERROR Mess", e);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

function broadcastMessage(message) {
  wss.clients.forEach((client) => {
    if (client.readyState === ws.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}
