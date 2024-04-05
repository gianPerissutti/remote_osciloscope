import { useRef, useEffect, useState } from "react";
import "chartjs-plugin-style";
import Plotly from "plotly.js-dist";
import range from "lodash/range";
import oscConfigService from "../services/oscConfigService";

const Display = ({ lastSignalValueChannel1, lastSignalValueChannel2, timeDiv, amplitudeDiv, pause }) => {
  const sampleFrec = 10000;

  const [timeDivDisplay, setTimeDivDisplay] = useState(0.005);
  const [ampDivDisplay, setAmpDivDisplay] = useState(5);
  const xVals = range(0, 1, 1 / sampleFrec);

  useEffect(() => {
    oscConfigService.getAll().then((response) => {
      setTimeDivDisplay(response.data.timeDiv);
      setAmpDivDisplay(response.data.ampDiv);
    });
  }, []);

  useEffect(() => {
    setTimeDivDisplay(timeDiv);
  }, [timeDiv]);

  useEffect(() => {
    setAmpDivDisplay(amplitudeDiv);
  }, [amplitudeDiv]);

  const displayDataRefChannel1 = useRef([]);
  const displayDataRefChannel2 = useRef([]);

  useEffect(() => {
    if (!pause) {
      displayDataRefChannel1.current = Array.from(lastSignalValueChannel1);
      displayDataRefChannel2.current = Array.from(lastSignalValueChannel2);
    }
  }, [lastSignalValueChannel1, lastSignalValueChannel2]);


  const plotRef = useRef(null);

  useEffect(() => {
    const Channel1 = {
      name: "Channel 1",
      x: xVals, // Use index as x-value
      y: displayDataRefChannel1.current,
      type: "scattergl",
      mode: " lines",
      line: {
        color: "rgba(255, 206, 86, 1)",
        width: 2,
      },
    };
    const Channel2 = {
      name: "Channel 2",
      x: xVals, // Use index as x-value
      y: displayDataRefChannel2.current,
      type: "scattergl",
      mode: " lines",
      line: {
        color: "rgba(255, 50, 50, 1)",
        width: 2,
      },
    };
    const layout = {
      xaxis: {
        title: "",
        range: [0, 10 * timeDivDisplay],
        tick0: 0,
        dtick: timeDivDisplay,
        gridcolor: "lightgray",
      },
      yaxis: {
        title: "Voltage (V)",
        range: [-ampDivDisplay, ampDivDisplay],
        gridcolor: "lightgray",
        dtick: ampDivDisplay / 5,
      },
      margin: { t: 0 },
      paper_bgcolor: "black",
      plot_bgcolor: "black",
      legend: {
        x: 0,
        y: 1,
        traceorder: 'normal',
        font: {
          family: 'sans-serif',
          size: 12,
          color: '#000'
        }
      },
      legend: {

        traceorder: 'normal',

        font: {
          family: 'sans-serif',
          size: 12,
          color: '#FFF'
        }
      }
    }
    const config = { responsive: true, staticPlot: !pause, displaylogo: false };

    Plotly.react(plotRef.current, [Channel1, Channel2], layout, config);
  }, [displayDataRefChannel1.current, ampDivDisplay, timeDivDisplay, displayDataRefChannel2.current]);

  return (
    <div
      ref={plotRef}
      style={{ backgroundColor: "black", width: "100%", height: "90vh" }}
    />
  );
};

export default Display;
