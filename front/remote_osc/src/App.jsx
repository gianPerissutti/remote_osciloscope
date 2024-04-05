import Display from "./modules/Display";
import "./Disp.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RangeSlider from 'react-bootstrap-range-slider';
import WebSocketComponent from "./services/websocket";
import { useState, useCallback } from "react";
import ConfigBar from "./modules/ConfigBar.jsx";
import Measurements from "./modules/Measurements.jsx";


const App = () => {
  const [signalValueChannel1, setSignalValueChannel1] = useState(0);
  const [signalValueChannel2, setSignalValueChannel2] = useState(0);
  const [timeDivDisplay, setTimeDivDisplay] = useState(0.001);
  const [ampDivDisplay, setAmpDivDisplay] = useState(5);
  const [pause, setPause] = useState(false);


  // Crear este callback hace que no aparezca un mensaje de error en la consola
  // diciendo que setReturnedValue cambia demasiado en websocket.jsx
  const memoizedSetSignalValueChannel1 = useCallback(
    (value) => setSignalValueChannel1(value),
    []
  );
  const memoizedSetSignalValueChannel2 = useCallback(
    (value) => setSignalValueChannel2(value),
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
          setReturnedValue1={memoizedSetSignalValueChannel1}
          setReturnedValue2={memoizedSetSignalValueChannel2}
          pause={pause}
        />
        <div className="display">
          <Display
            lastSignalValueChannel1={signalValueChannel1}
            lastSignalValueChannel2={signalValueChannel2}
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
