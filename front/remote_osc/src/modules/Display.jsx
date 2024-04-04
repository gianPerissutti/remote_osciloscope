/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from "react";
import "chartjs-plugin-style";
import Plotly from "plotly.js-dist";
import range from "lodash/range";
import oscConfigService from "../services/oscConfigService";

// eslint-disable-next-line react/prop-types
const Display = ({ lastSignalValue, timeDiv, amplitudeDiv, pause }) => {
  const sampleFrec = 10000;

  const [timeDivDisplay, setTimeDivDisplay] = useState(0.005);
  const [ampDivDisplay, setAmpDivDisplay] = useState(5);
  const xVals = range(0, 1, 1 / sampleFrec)

  useEffect(() => {
    oscConfigService.getAll().then((response) => {
      setTimeDivDisplay(response.data.timeDiv)
      setAmpDivDisplay(response.data.ampDiv)
    })
  }, []);



  useEffect(() => {
    setTimeDivDisplay(timeDiv);
  }, [timeDiv]);

  useEffect(() => {
    setAmpDivDisplay(amplitudeDiv);
  }, [amplitudeDiv]);

  let parsedData = [];


  const displayDataRef = useRef([]);

  useEffect(() => {
    if (!pause) {
      displayDataRef.current = Array.from(lastSignalValue);
    }
  }, [lastSignalValue])



  const plotRef = useRef(null);

  useEffect(() => {
    const trace = {
      x: xVals, // Use index as x-value
      y: displayDataRef.current,
      type: "scattergl",
      mode: " lines",
      line: {
        color: "rgba(255, 206, 86, 1)",
        width: 2,
      },
    };

    const layout = {
      xaxis: {
        title: "",
        range: [0, 10 * timeDivDisplay],
        tick0: 0,
        dtick: timeDivDisplay,
        gridcolor: 'lightgray',
      },
      yaxis: {
        title: "Voltage (V)",
        range: [-ampDivDisplay, ampDivDisplay],
        gridcolor: 'lightgray',
        dtick: ampDivDisplay / 5,
      },
      margin: { t: 0 },
      paper_bgcolor: "black",
      plot_bgcolor: "black",
    };

    const config = { responsive: true, staticPlot: !pause };

    Plotly.react(plotRef.current, [trace], layout, config);


  }, [parsedData]);

  return (
    <div
      ref={plotRef}
      style={{ backgroundColor: "black", width: "100%", height: "90vh" }}
    />
  );
};

export default Display;
