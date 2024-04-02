/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from "react";
import "chartjs-plugin-style";
import Plotly from "plotly.js-dist";
import range from "lodash";

// eslint-disable-next-line react/prop-types
const Display = ({ lastSignalValue, timeDiv, amplitudeDiv }) => {
  const maxValue = 1;
  const sampleFrec = 10000;
  const separation = 1 / sampleFrec;
  const t = range(0, maxValue * 10, separation).map((t) => t.toFixed(6));

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
  useEffect(() => {
    parsedData = Array.from(displayData);
  }, [displayData]);

  const plotRef = useRef(null);

  useEffect(() => {
    const trace = {
      x: parsedData.map((_, index) => index), // Use index as x-value
      y: parsedData,
      type: "scattergl",
      mode: "lines",
      line: {
        color: "rgba(255, 206, 86, 1)",
        width: 2,
      },
    };

    const layout = {
      xaxis: {
        title: "",
        range: [0, sampleFrec * 10 * timeDiv],
      },
      yaxis: {
        title: "Voltage (V)",
        range: [-ampDivDisplay, ampDivDisplay],
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
