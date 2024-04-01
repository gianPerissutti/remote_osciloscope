import Display from "./modules/Display";
import './Disp.css'
import WebSocketComponent from './services/websocket';
import { useRef, useEffect ,useState} from 'react';
const App = () => {
    
    const [signalValue, setSignalValue] = useState(0);
    
    return (
        <div>
             <WebSocketComponent setReturnedValue={setSignalValue}/>
        <div className = "display">
            <Display lastSignalValue={signalValue} />
        </div>
        </div>
    );
};

export default  App;
//