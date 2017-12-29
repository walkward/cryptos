/**
 * Functions triggered on dashboard pages
 * @file Intializes the dashboard pages
 */
import Sortable from 'sortablejs';
import budgetChart from '../lib/budgetChart';
import taskChart from '../lib/taskChart';
import pageTitle from '../lib/pageTitle';
import table from '../lib/table';
import data from '../util/data';

export default function(){
  /**
   * [pageTitle description]
   */
  pageTitle.topTitle();

  /**
   * Check if the budget chart exists and initialize
   * @type {[type]}
   */
  const budgetChartEl = document.getElementById("budgetChart");
  if (budgetChartEl) {
    budgetChart(budgetChartEl);
  }

  /**
   * Check if the task chart exists and initialize
   * @type {[type]}
   */
  const taskChartEl = document.getElementById("taskChart");
  if (taskChartEl) {
    taskChart(taskChartEl);
  }

  /**
   * Initialize the table if it exists
   * @type {[type]}
   */
  if ($(".dot-table")[0]){
    table(data);
  }

  /**
   * Get the widget container and initialize the sortable grid
   * @type {[type]}
   */
  const widgetContainer = document.getElementById('widgetContainer');
  const sortable = Sortable.create(widgetContainer, {
    handle: ".widget-drag-handle"
  });

}
