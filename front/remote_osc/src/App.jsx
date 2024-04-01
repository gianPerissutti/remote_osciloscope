import Display from "./modules/Display";
import './Disp.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import WebSocketComponent from './services/websocket';
import { useRef, useEffect ,useState} from 'react';
import DropdownMenu from './modules/ConfigBar.jsx';
import ConfigBar from "./modules/ConfigBar.jsx";

const App = () => {
    
    const [signalValue, setSignalValue] = useState(0);
    const [timeDivDisplay,setTimeDivDisplay] =useState(0.001)

    return (
        <div>
        <div >
        <ConfigBar setTimeDivDisplay={setTimeDivDisplay}/>
        </div>
        <div>
             <WebSocketComponent setReturnedValue={setSignalValue}/>
        <div className = "display">
            <Display lastSignalValue={signalValue} timeDiv={timeDivDisplay} />
        </div>
        </div>
        </div>

    );
};

export default  App;


