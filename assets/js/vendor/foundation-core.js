import { Foundation } from 'foundation-sites/js/foundation.core';
import { rtl, GetYoDigits, transitionend } from 'foundation-sites/js/foundation.util.core';
import { Box } from 'foundation-sites/js/foundation.util.box'
import { onImagesLoaded } from 'foundation-sites/js/foundation.util.imageLoader';
import { Keyboard } from 'foundation-sites/js/foundation.util.keyboard';
import { MediaQuery } from 'foundation-sites/js/foundation.util.mediaQuery';
import { Motion, Move } from 'foundation-sites/js/foundation.util.motion';
import { Nest } from 'foundation-sites/js/foundation.util.nest';
import { Timer } from 'foundation-sites/js/foundation.util.timer';
import { Touch } from 'foundation-sites/js/foundation.util.touch';
import { Triggers } from 'foundation-sites/js/foundation.util.triggers';
// import { Abide } from 'foundation-sites/js/foundation.abide';
// import { Accordion } from 'foundation-sites/js/foundation.accordion';
// import { AccordionMenu } from 'foundation-sites/js/foundation.accordionMenu';
import { Drilldown } from 'foundation-sites/js/foundation.drilldown';
import { Dropdown } from 'foundation-sites/js/foundation.dropdown';
import { DropdownMenu } from 'foundation-sites/js/foundation.dropdownMenu';
// import { Equalizer } from 'foundation-sites/js/foundation.equalizer';
// import { Interchange } from 'foundation-sites/js/foundation.interchange';
// import { Magellan } from 'foundation-sites/js/foundation.magellan';
import { OffCanvas } from 'foundation-sites/js/foundation.offcanvas';
// import { Orbit } from 'foundation-sites/js/foundation.orbit';
import { ResponsiveMenu } from 'foundation-sites/js/foundation.responsiveMenu';
import { ResponsiveToggle } from 'foundation-sites/js/foundation.responsiveToggle';
// import { Reveal } from 'foundation-sites/js/foundation.reveal';
import { Slider } from 'foundation-sites/js/foundation.slider';
// import { SmoothScroll } from 'foundation-sites/js/foundation.smoothScroll';
// import { Sticky } from 'foundation-sites/js/foundation.sticky';
import { Tabs } from 'foundation-sites/js/foundation.tabs';
import { Toggler } from 'foundation-sites/js/foundation.toggler';
import { Tooltip } from 'foundation-sites/js/foundation.tooltip';
// import { ResponsiveAccordionTabs } from 'foundation-sites/js/foundation.responsiveAccordionTabs';


Foundation.addToJquery($);

// Add Foundation Utils to Foundation global namespace for backwards
// compatibility.

Foundation.rtl = rtl;
Foundation.GetYoDigits = GetYoDigits;
Foundation.transitionend = transitionend;

Foundation.Box = Box;
Foundation.onImagesLoaded = onImagesLoaded;
Foundation.Keyboard = Keyboard;
Foundation.MediaQuery = MediaQuery;
Foundation.Motion = Motion;
Foundation.Move = Move;
Foundation.Nest = Nest;
Foundation.Timer = Timer;

// Initializing mediaQuery javascript utility
Foundation.MediaQuery._init();

// Touch and Triggers previously were almost purely sede effect driven,
// so no // need to add it to Foundation, just init them.

Touch.init($);

Triggers.init($, Foundation);

// Foundation.plugin(Abide, 'Abide');

// Foundation.plugin(Accordion, 'Accordion');

// Foundation.plugin(AccordionMenu, 'AccordionMenu');

Foundation.plugin(Drilldown, 'Drilldown');

// Initialize foundation Division Drilldown Plugin
const backEl = '<li class="js-drilldown-back"><a tabindex="0"><svg role="img" class="icon"><use xlink:href="/assets/img/icons-sprites.svg#arrow-left-thick"></use></svg> Back</a></li>';
const $divisionDrilldown = new Foundation.Drilldown($('#divisionDrilldown'), {
  autoHeight: true,
  backButton: backEl
});
// Initialize foundation Collection Drilldown Plugin
const $collectionDrilldown = new Foundation.Drilldown($('#collectionDrilldown'), {
  autoHeight: true,
  backButton: backEl
});

Foundation.plugin(Dropdown, 'Dropdown');
// var dropEl = $(document).find("[data-dropdown]");
// $(dropEl).each(function(){
//   var dropdown = new Foundation.Dropdown($(this));
// })

Foundation.plugin(DropdownMenu, 'DropdownMenu');
// var dropdownMenu = new Foundation.DropdownMenu($("[data-dropdown-menu]"));

// Foundation.plugin(Equalizer, 'Equalizer');

// Foundation.plugin(Interchange, 'Interchange');

// Foundation.plugin(Magellan, 'Magellan');

Foundation.plugin(OffCanvas, 'OffCanvas');
// var offCanvasEl = $(document).find("[data-off-canvas]");
// $(offCanvasEl).each(function(){
//   var offCanvas = new Foundation.OffCanvas($(this));
// })

// Foundation.plugin(Orbit, 'Orbit');

Foundation.plugin(ResponsiveMenu, 'ResponsiveMenu');
// var ResponsiveMenuEl = $(document).find("[data-responsive-menu]");
// $(ResponsiveMenuEl).each(function(){
//   var responsiveMenu = new Foundation.ResponsiveMenu($(this));
// })

// Foundation.plugin(ResponsiveToggle, 'ResponsiveToggle');
// var ResponsiveToggleEl = $(document).find("[data-responsive-toggle]");
// $(ResponsiveMenuEl).each(function(){
//   var responsiveToggle = new Foundation.ResponsiveToggle($(this));
// })

// Foundation.plugin(Reveal, 'Reveal');

// if ($("#grid-slider").length > 0) {
  Foundation.plugin(Slider, 'Slider');
//   var slider = new Foundation.Slider($("#grid-slider"));
// }

// Foundation.plugin(SmoothScroll, 'SmoothScroll');

// Foundation.plugin(Sticky, 'Sticky');

Foundation.plugin(Tabs, 'Tabs');
// var tabsEl = $(document).find("[data-tabs]");
// $(tabsEl).each(function(){
//   var tabs = new Foundation.Tabs($(this));
// })

// if( $("[data-toggle]").length > 0 ) {
  Foundation.plugin(Toggler, 'Toggler');
//   var toggleEl = $(document).find("[data-toggler]");
//   $(toggleEl).each(function(){
//     var toggler = new Foundation.Toggler($(this));
//   })
// }

// if( $("[data-tooltip]").length > 0 ) {
  Foundation.plugin(Tooltip, 'Tooltip');
//   var tooltipEl = $(document).find("[data-tooltip]");
//   $(tooltipEl).each(function(){
//     var tooltip = new Foundation.Tooltip($(this));
//   })
// }

// Foundation.plugin(ResponsiveAccordionTabs, 'ResponsiveAccordionTabs');

$(document).foundation();

module.exports = Foundation;
