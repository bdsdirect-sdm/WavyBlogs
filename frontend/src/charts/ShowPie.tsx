import {Pie} from 'react-chartjs-2';
import { Chart, Tooltip, Legend, ArcElement, Colors } from 'chart.js';
import React from 'react';

Chart.register(
  Tooltip,
  Legend,
  ArcElement,
  Colors
)

const ShowPie:React.FC<any> = ({value, label}) => {

    const options = {
        responsive: true
    }

    const data = {
        labels: ['Red', 'Yellow'],
        datasets: [{
            label: label,
            data: value,
            hoverOffset:50
            }]
    }

    console.log("values", value);
    console.log("label", label);

  return (
    <div>
        <Pie options={options} data={data} />
    </div>
  )
}

export default ShowPie