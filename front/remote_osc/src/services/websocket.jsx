import useWebSocket from "react-use-websocket";
import { useEffect } from "react";

const WebSocketComponent = ({ setReturnedValue1,setReturnedValue2 ,pause}) => {
  const { lastMessage, readyState, getWebSocket } = useWebSocket(
    'ws://localhost:3002',
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
        if(!pause)
        {
        setReturnedValue1(bufferArrived.slice(0,bufferArrived.length/2));
        setReturnedValue2(bufferArrived.slice(bufferArrived.length/2,bufferArrived.length));

        }
      };
    }
  }, [lastMessage]);

  return <div>{/* Add any JSX content if needed */}</div>;
};

export default WebSocketComponent;
