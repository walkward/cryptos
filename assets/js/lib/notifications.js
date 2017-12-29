import { Tooltip } from 'foundation-sites/js/foundation.tooltip';
import { Drilldown } from 'foundation-sites/js/foundation.drilldown';

function init(){
  var notificationsDrilldown = new Foundation.Drilldown($('#notifications-drilldown'));

  if( $("[data-tooltip]").length > 0 ) {
    Foundation.plugin(Tooltip, 'Tooltip');
    var tooltipEl = $(document).find("[data-tooltip]");
    $(tooltipEl).each(function(){
      var tooltip = new Foundation.Tooltip($(this));
    })
  }
}

module.exports = {
  init: init
}
