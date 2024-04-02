import useWebSocket from "react-use-websocket";
import { useEffect } from "react";

const WebSocketComponent = ({ setReturnedValue }) => {
  const { lastMessage, readyState, getWebSocket } = useWebSocket(
    "ws://192.168.0.73:3002",
    {
      onOpen: () => console.log("opened"),
      //Will attempt to reconnect on all close events, such as server shutting down
      shouldReconnect: (closeEvent) => true,
    }
  );

  useEffect(() => {
    // Update parent component state with the received message
    if (lastMessage !== null && getWebSocket() !== null) {
      getWebSocket().binaryType = "arraybuffer";
      getWebSocket().onmessage = (event) => {
        let bufferArrived = new Float32Array(event.data);
        setReturnedValue(bufferArrived);
      };
    }
  }, [lastMessage]);

  return <div>{/* Add any JSX content if needed */}</div>;
};

export default WebSocketComponent;
