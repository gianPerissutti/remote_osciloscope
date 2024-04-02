import Display from "./modules/Display";
import "./Disp.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WebSocketComponent from "./services/websocket";
import { useRef, useEffect, useState } from "react";
import ConfigBar from "./modules/ConfigBar.jsx";
import OscConfigService from "./services/osc_config";

const App = () => {
  const [signalValue, setSignalValue] = useState(0);
  const [timeDivDisplay, setTimeDivDisplay] = useState(0.001);
  const [ampDivDisplay, setAmpDivDisplay] = useState(5);

  return (
    <div>
      <div>
        <ConfigBar
          setTimeDivDisplay={setTimeDivDisplay}
          setAmpDivDisplay={setAmpDivDisplay}
        />
      </div>
      <div>
        <WebSocketComponent setReturnedValue={setSignalValue} />
        <div className="display">
          <Display
            lastSignalValue={signalValue}
            timeDiv={timeDivDisplay}
            amplitudeDiv={ampDivDisplay}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
