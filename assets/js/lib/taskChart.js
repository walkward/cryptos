import chartConfig from '../vendor/charts';

'use strict';

export default function(chartId) {

  System.import('chart.js/dist/Chart.bundle.js')

    .then(Chart => {

      const barOptions_stacked = {
        responsive: false,
        tooltips: {
          enabled: false
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 11
            },
            gridLines: {
              display: false
            },
            stacked: true
          }],
          yAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              fontSize: 11
            },
            stacked: true
          }]
        },
        legend: {
          display: false
        }
      };

      const taskChart = new Chart(chartId, {
        type: 'horizontalBar',
        data: {
          labels: ["Sarah H.", "Ben N.", "Jerry G.", "Charlie H."],
          datasets: [{
            data: [1, 0, 1, 1, 1],
            backgroundColor: chartConfig.colors.widget,
            hoverBackgroundColor: chartConfig.colors.widget
          }, {
            data: [2, 1, 2, 1, 1],
            backgroundColor: chartConfig.colors.blue,
            hoverBackgroundColor: chartConfig.colors.purple
          }, {
            data: [0, 0, 1, 2, 1],
            backgroundColor: chartConfig.colors.widget,
            hoverBackgroundColor: chartConfig.colors.widget
          }]
        },

        options: barOptions_stacked,
      });


    })
    .catch(error => {
      alert(error)
    });


};
