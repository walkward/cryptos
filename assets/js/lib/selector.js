/**
 * A film strip of images available within the asset viewer
 * @file Initializes film strip
 */

import key from 'keymaster';
import { Box } from 'foundation-sites/js/foundation.util.box'

export default function($activeSecondary, $activePrimary) {
  /**
   * All tiles within the current filmstrip
   * @type {[type]}
   */
  const $selectorWrapper = $('[data-selector]');
  const $selectorItem = $('[data-selector-index');
  const $nextArrow = $('.filmstrip__next');
  const $prevArrow = $('.filmstrip__prev');
  const $tiles = $($selectorWrapper).find($selectorItem);
  const $total = $tiles.length - 1;

  const $primaryFrame = $('#primary');
  const $secondaryFrame = $('#secondary');
  let $primary_exists = false;
  if ($primaryFrame.length > 0) { $primary_exists = true; }

  function setPrimary($index, event) {
    /**
     * Check if the target tile is the secondary image tile
     */
    if ($index == $activeSecondary && $secondaryFrame.length > 0 && event.type != 'init') {
      setSecondary($activePrimary, event);
      // setPrimary($index, event);
    }
    /**
     * Add/Remove Primary data attribute
     */
    $('[data-active="primary"]').attr('data-active', '');
    $($tiles[$index]).attr('data-active', 'primary');
    /**
     * Update activePrimary variable
     */
    $activePrimary = $index;
    /**
     * Emit an update event
     */
    $($tiles[$activePrimary]).trigger( "update:primary", [$tiles[$activePrimary]] );
  }

  /**
   * Set the secondary active image tile
   */
  function setSecondary($index, event) {
    /**
     * Skip over primary image while navigating using the keyboard
     */
    if ($index == $activePrimary && $secondaryFrame.length > 0 && event.type != 'init' && event.type != 'click') {
      if ( $( '[data-active="secondary"]').attr('data-selector-index') < $index ) {
        $index = parseInt($index, 10) + 1;
      } else if ( $('[data-active="secondary"]').attr('data-selector-index') > $index ){
        $index = parseInt($index, 10) - 1;
      }
    }
    /**
     * Greater than total handling
     */
    if ($index > $total) {
      $index = 0;
    }
    /**
     * Negitive intger handling
     */
    if ($index < 0) {
      $index = $total;
    }
    /**
     * Add/Remove Secondary data attribute
     */
    $('[data-active="secondary"]').attr('data-active', '');
    $($tiles[$index]).attr('data-active', 'secondary');
    if (typeof event != 'undefined' && event.type != 'focus') {
      $($tiles[$index]).focus()
    }
    /**
     * Update activeSecondary variable
     */
    $activeSecondary = $index;
    /**
     * Emit an update event
     */
    $($tiles[$activeSecondary]).trigger( "update:secondary", [$tiles[$activeSecondary]] );
  }

  /**
   * Calculates the number of items per row of selector
   * @return {Intger} The number of items per row
   */
  function perRow() {
    let wrapperDims = Foundation.Box.GetDimensions($selectorWrapper);
    let itemDims = Foundation.Box.GetDimensions($selectorItem);
    return Math.floor(wrapperDims.width/((itemDims.width) + 15));
  }

  function activeIndex() {
    return parseInt($activeSecondary, 10);
  };

  /**
   * Click event listener for changing the active image tile
   */
  $($tiles).on('click', function(event) {
    if (event.target !== this && !$(event.target).hasClass('selector-target')) { return; }
    let $index = event.currentTarget.dataset.selectorIndex;
    if ( $index != $activePrimary && event.type == 'click') {
      if ( $primary_exists ) {
        setPrimary($index, event);
      } else {
        setSecondary($index, event);
      }
    }
  })

  /**
   * Left & right arrow event listeners
   */
  $($prevArrow).on('click', function(event) {
    let $index = activeIndex() - 1;
    setSecondary($index, event);
  });
  $($nextArrow).on('click', function(event) {
    let $index = activeIndex() + 1;
    setSecondary($index, event);
  });

  /**
   * Keypress event listeners
   */
  key('left', function() {
    let $index = activeIndex() - 1;
    setSecondary($index, {type:'key'});
  });
  key('right', function() {
    let $index = activeIndex() + 1;
    setSecondary($index, {type:'key'});
  });
  /**
   * Only activate up & down keys for the grid
   * @param  {[type]} $ [description]
   * @return {[type]}   [description]
   */
  if ( $('[data-selector-grid]').length > 0 ) {
    key('up', function() {
      let $index = activeIndex() - perRow();
      if ($index < 0) { $index = 0; }
      setSecondary($index, {type:'key'});
    });
    key('down', function() {
      let $index = activeIndex() + perRow();
      if ($index > $total) { $index = $total; }
      setSecondary($index, {type:'key'});
    });
  }
  key('space', function(event) {
    event.preventDefault();
    let $index = activeIndex();
    let $el = $($tiles[$index]).find('[data-selector-checkbox]');
    if ($el.prop('checked') == false) {
      $el.prop('checked', true).change();
    } else {
      $el.prop('checked', false).change();
    }
  });

  /**
   * Initializing first images
   * @return {[type]} [description]
   */
  const init = (function(){
    if ( $primaryFrame.length > 0 ){
      setPrimary($activePrimary, {type:'init'});
    }
    setSecondary($activeSecondary);
  })();

  return {
    init: init
  };

}
