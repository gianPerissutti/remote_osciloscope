/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from "react";
import "chartjs-plugin-style";
import Plotly from "plotly.js-dist";
import range from "lodash/range";

// eslint-disable-next-line react/prop-types
const Display = ({ lastSignalValue, timeDiv, amplitudeDiv }) => {


  const sampleFrec = 10000;
  const [displayData, setDisplayData] = useState([]);
  const [timeDivDisplay, setTimeDivDisplay] = useState(0.0001);
  const [ampDivDisplay, setAmpDivDisplay] = useState(5);

  useEffect(() => {
    setDisplayData(lastSignalValue);
  }, [lastSignalValue]);

  useEffect(() => {
    setTimeDivDisplay(timeDiv);
  }, [timeDiv]);

  useEffect(() => {
    setAmpDivDisplay(amplitudeDiv);
  }, [amplitudeDiv]);

  let parsedData = [];

  const xVals = range(0, 1, 1 / sampleFrec)
  useEffect(() => {
    parsedData = Array.from(displayData);
  }, [displayData]);

  const plotRef = useRef(null);

  useEffect(() => {
    const trace = {
      x: xVals, // Use index as x-value
      y: parsedData,
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

    const config = { responsive: true, staticPlot: true };

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
