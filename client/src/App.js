import { EventSourcing } from "./EventSourcing";
import { LongPulling } from "./LongPulling";
import { WebSock } from "./WebSocket";

export function App() {
  return (
    <div>
      {/* <LongPulling /> */}
      {/* <EventSourcing /> */}
      <WebSock />
    </div>
  );
}
