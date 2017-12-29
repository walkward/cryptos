/**
 * Generates tables usind doT & ajax data
 * @type {[type]}
 */

import tmpl from '../util/doT';
import url from '../util/url';

export default function(data) {
  if($('.dot-table').length > 0){
    /**
     * Add items for resource specific tables
     * @param  {[type]} clique [description]
     * @return {[type]}        [description]
     */
    if ( !url.type || url.type == 'project' || url.type == 'division' || url.type == 'division_dashboard' || url.type == 'project_dashboard' ) {
      data.resources(function(output){
        let $items = [];
        $.each(output, function(key, val) {
          if (!url.type && val.type == 'division') {
            $items.push(output[key]);
          } else if (url.type == 'division' && val.division_id == url.id && val.type == 'project') {
            $items.push(output[key]);
          } else if (url.type == 'project' && val.project_id == url.id && (val.type == 'folder' || val.type == 'project_collection')) {
            $items.push(output[key]);
          } else if (url.type == 'division_dashboard' && val.division_id == url.id && val.type == 'project') {
            $items.push(output[key]);
          } else if (url.type == 'project_dashboard' && val.project_id == url.id && (val.type == 'folder' || val.type == 'project_collection')) {
            $items.push(output[key]);
          }
        });
        $('#table_container').tmpl('table', $items);
      });

    }

    /**
     * Add items for file specific tables
     * @type {[type]}
     */
    else if (url.type == 'folder' || url.type == 'project_collection' || url.type == 'personal_collection' || url.type == 'group_collection' ) {
      data.files(function(output){
        const $items = output;
        $('#table_container').tmpl('table', $items);
      });
    }
  }

  /**
   * Active table item
   * @type {[type]}
   */
  $(document).ready(function(){
    $('td').on('click', function(){
      $('[data-active="secondary"]').attr('data-active','');
      $(this).closest('tr').attr('data-active', 'secondary');
    })
  })

  System.import('tablesorter/dist/js/jquery.tablesorter.combined.js')
    .then(tablesorter => {
      let $instances = $(document).find('[date-table-filter]');
      let $table = $($instances).tablesorter({
        widgets: ["filter"],
        sortList: [[0,0]],
        widgetOptions : {
          filter_columnFilters: true,
          filter_placeholder: { search : 'Search...' },
          filter_saveFilters : true,
          filter_searchFiltered : false
        }
      });
    })

};
