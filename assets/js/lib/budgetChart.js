/**
 * [Chart description]
 * @type {[type]}
 */

import chartConfig from '../vendor/charts';

export default function(chartId){

  System.import('chart.js/dist/Chart.bundle.js')

    .then(Chart => {

      const config = {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [10, 20, 30],
            backgroundColor: [
              chartConfig.colors.red,
              chartConfig.colors.yellow,
              chartConfig.colors.blue,
            ],
            borderColor: chartConfig.colors.widget,
            borderWidth: 5
          }],
          labels: ["Red", "Blue", "Yellow"]
        },
        options: {
          responsive: false
        }
      };

      const budgetPieChart = new Chart(chartId, config);

    })
    .catch(error => {
      alert(error)
    });


};
