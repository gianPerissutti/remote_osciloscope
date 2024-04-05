import Display from "./modules/Display";
import "./Disp.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RangeSlider from 'react-bootstrap-range-slider';
import WebSocketComponent from "./services/websocket";
import { useState, useCallback } from "react";
import ConfigBar from "./modules/ConfigBar.jsx";
import Measurements from "./modules/Measurements.jsx";


const App = () => {
  const [signalValue, setSignalValue] = useState(0);
  const [timeDivDisplay, setTimeDivDisplay] = useState(0.001);
  const [ampDivDisplay, setAmpDivDisplay] = useState(5);
  const [pause, setPause] = useState(false);
  const [value, setValue] = useState(0);
  // Crear este callback hace que no aparezca un mensaje de error en la consola
  // diciendo que setReturnedValue cambia demasiado en websocket.jsx
  const memoizedSetSignalValue = useCallback(
    (value) => setSignalValue(value),
    []
  );

  return (
    <div>
      <div>
        <ConfigBar
          setTimeDivDisplay={setTimeDivDisplay}
          setAmpDivDisplay={setAmpDivDisplay}
          setPause={setPause}
        />
      </div>
      <div>
        <WebSocketComponent
          setReturnedValue={memoizedSetSignalValue}
          pause={pause}
        />
        <div className="display">
          <Display
            lastSignalValue={signalValue}
            timeDiv={timeDivDisplay}
            amplitudeDiv={ampDivDisplay}
            pause={pause}
          /></div>
        <div className="measurements">
          <Measurements />
        </div>


      </div>
    </div>
  );
};

export default App;
