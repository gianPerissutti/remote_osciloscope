import {useRef,useEffect, useState} from 'react'
import Chart from 'chart.js/auto';
import 'chartjs-plugin-style'


const Display = ({lastSignalValue,timeDiv,amplitudeDiv}) => {

    //Initial variables
    const [timeDivDisplay, setTimeDivDisplay] = useState(0.0001);
    const [ampDivDisplay,setAmpDivDisplay] = useState(5)

    //const t = JSON.parse(window.localStorage.getItem('t'))
    //Vamos a hacer 4 divisiones de prueba
    // 1 ms , 500ms, 1 s, 5 s
    const maxValue = 1
    const sampleFrec = 10000
  
    
    const separation = 1/sampleFrec;
    const t = _.range(0, maxValue*10, separation).map(t => (t.toFixed(6)));
    const chartRef = useRef(null);
    const [displayData, setDisplayData] = useState();

    useEffect(() => {
    setDisplayData(lastSignalValue) 
    }, [lastSignalValue])   
    
    useEffect(()=>
    {
        setTimeDivDisplay(timeDiv)
    },[timeDiv])

    
    const data = { 
        labels:t,
        datasets: [{
            label: 'Voltage (V)',
            data: displayData,
            borderColor: 'rgba(255, 206, 86, 1)', // Yellow color
            spanGaps: true,
            borderWidth: 2,
            pointRadius: 0, // Set pointRadius to 0 to remove circles
            display: false,
            
        }]
    };
    const options = {
        plugins:
        {
            decimation:
            {
                enabled: true,
                algorithm: 'lttb',
                samples:1,
                
            }
        },
        normalized: true,
        animation:false,
            scales: {
                
                x: {
                    min :0,
                    max:sampleFrec*10*timeDiv,
                    grid:{
                        
                        color: 'gray', 
                    },
                    ticks:
                    {
                      
                        sampleSize:t,
                        autoSkip: false,
                        stepSize: timeDivDisplay,
                        maxTicksLimit:10,
                        callback: function(value, index, ticks) {
                            // Return only the tick value
                            if(value%0.4== 0)
                            {
                                return  'time division:'+ timeDivDisplay +'s'
                            }
                            else{
                                return ''
                            }
                        }
                    }   
                },
                
                y: {
                    min:-5,
                    max:5,
                    title: {
                        display: true,
                        text: 'Voltage (V)' // Y-axis label
                    },
                    
                    suggestedMin: -amplitude, // Minimum value on the y-axis
                    suggestedMax: amplitude,    
                    grid:{
                        
                        color: 'gray', 
                    },
                    
                    
                },
                
            
            
            }
        
        };



        useEffect(() => {
            const ctx = chartRef.current?.getContext('2d');
            let chartInstance = null;

            if (ctx) {
            
                chartInstance = new Chart(ctx, {
                    type: 'line',
                    data: data,
                    options: options,
                    
                });

            }

            return () => {
                if (chartInstance !== null) {
                    chartInstance.destroy();
                }
            };
        }, [data, options]);

        return (
            <div>   
                <canvas ref={chartRef}></canvas>
            </div>
        );
};

export default Display









    













/*GENERATE SAMPLE FUNCTION*-/--------------------------------------------------------------------*/

//
//const voltageValues = t.map(t => (t <= (t.length  )? amplitude * Math.sin(t * frequency * 2 * 3.1419).toFixed(3) : null));
//window.localStorage.setItem('voltageValues',JSON.stringify(voltageValues))
//window.localStorage.setItem('t',JSON.stringify(t))

//const t = JSON.parse(window.localStorage.getItem('t'))
//const voltageValues = JSON.parse(window.localStorage.getItem('voltageValues'))

//const buffer1seg = new Array(sampleFrec*10).fill(0);
//buffer1seg.splice(0,voltageValues.length,...voltageValues)
//window.localStorage.setItem('buffer1seg',JSON.stringify(buffer1seg))

//const buffer1seg = JSON.parse(window.localStorage.getItem('buffer1seg'))
