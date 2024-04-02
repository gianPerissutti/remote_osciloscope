import { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import "chartjs-plugin-style";
import { range } from "lodash";
import OscConfigService from "../services/osc_config";

const Display = ({ lastSignalValue, timeDiv, amplitudeDiv }) => {
  //Initial variables
  const maxValue = 1;
  const sampleFrec = 10000;
  const separation = 1 / sampleFrec;
  const t = range(0, maxValue * 10, separation).map((t) => t.toFixed(6));

  const [displayData, setDisplayData] = useState();
  const [timeDivDisplay, setTimeDivDisplay] = useState(0.0001);
  const [ampDivDisplay, setAmpDivDisplay] = useState(5);
  let ampFromServer = 0;
  let timeFromServer = 0;
  //const t = JSON.parse(window.localStorage.getItem('t'))
  //Vamos a hacer 4 divisiones de prueba
  // 1 ms , 500ms, 1 s, 5 s

  let parsedData = [];
  if (displayData) {
    for (let i = 0; i < displayData.length; i++) {
      parsedData.push({
        x: i,
        y: displayData[i],
      });
    }
  }

  useEffect(() => {
    setDisplayData(lastSignalValue);
  }, [lastSignalValue]);

  useEffect(() => {
    setTimeDivDisplay(timeDiv);
  }, [timeDiv]);

  useEffect(() => {
    setAmpDivDisplay(amplitudeDiv);
  }, [amplitudeDiv]);

  const data = {
    labels: t,
    datasets: [
      {
        label: "Voltage (V)",
        data: parsedData,
        borderColor: "rgba(255, 206, 86, 1)", // Yellow color
        spanGaps: true,
        borderWidth: 2,
        pointRadius: 0, // Set pointRadius to 0 to remove circles
        display: false,
      },
    ],
  };

  const options = {
    plugins: {
      decimation: {
        enabled: true,
        algorithm: "lttb",
        samples: 1,
      },
    },
    normalized: true,
    animation: false,
    parsing: false,
    scales: {
      x: {
        min: 0,
        max: sampleFrec * 10 * timeDiv,
        grid: {
          color: "gray",
        },
        ticks: {
          sampleSize: t,
          autoSkip: false,
          stepSize: timeDivDisplay,
          maxTicksLimit: 10,
          callback: function (value, index, ticks) {
            // Return only the tick value
            if (value % 0.4 == 0) {
              return "time division:" + timeDivDisplay + "s";
            } else {
              return "";
            }
          },
        },
      },

      y: {
        min: -ampDivDisplay,
        max: ampDivDisplay,
        title: {
          display: true,
          text: "Voltage (V)", // Y-axis label
        },

        suggestedMin: -ampDivDisplay, // Minimum value on the y-axis
        suggestedMax: ampDivDisplay,
        grid: {
          color: "gray",
        },
      },
    },
  };

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");

    if (ctx) {
      // Check if chartInstanceRef.current is already set
      if (chartInstanceRef.current) {
        // If it is, destroy the previous instance before creating a new one
        chartInstanceRef.current.destroy();
      }

      // Create a new chart instance
      const newChartInstance = new Chart(ctx, {
        type: "line",
        data: data,
        options: options,
      });

      // Update the chart instance ref
      chartInstanceRef.current = newChartInstance;
    }

    // Cleanup function to destroy the chart instance when component unmounts
    return () => {
      if (chartInstanceRef.current !== null) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data, options]);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default Display;
