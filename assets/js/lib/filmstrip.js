/**
 * A film strip of images available within the asset viewer
 * @file Initializes film strip
 */

import data from '../util/data';
import key from 'keymaster';
import { Interchange } from 'foundation-sites/js/foundation.interchange';

export default function(mainImgSize, filmstripOptions) {
  Foundation.plugin(Interchange, 'Interchange');
  /**
   * All tiles within the current filmstrip
   * @type {[type]}
   */
  const $tiles = $('[data-selector]').find('[data-selector-index]');
  const $total = $tiles.length - 1;

  const $cdnUrl = 'https://ucarecdn.com/';
  const $cdnParam = mainImgSize;
  const $primaryFrame = $('#primary');
  const $secondaryFrame = $('#secondary');
  const $primary_filename = $('#primary_filename');
  const $secondary_filename = $('#secondary_filename');
  const $primary_tile = $('[data-active="primary"]');
  const $secondary_tile = $('[data-active="secondary"]');
  const $zoomFrame = $('#zoomFrame')

  /**
   * Initializing first images
   * @return {[type]} [description]
   */
  const init = (function(){
    // Check if secondary frame exists (for compare views)
    if( $secondaryFrame.length > 0 ){
      let interchangeSecondary = new Foundation.Interchange($secondaryFrame, {
        rules: ["[" + $cdnUrl + $($secondary_tile).attr('data-uuid') + $cdnParam + ", small]"]
      });
    }
    if ( $primaryFrame.length > 0 ){
      let interchangePrimary = new Foundation.Interchange($primaryFrame, {
        rules: ["[" + $cdnUrl + $($primary_tile).attr('data-uuid') + $cdnParam + ", small]"]
      });
    }

    $tiles.on('update:primary', function(event, activePrimary) {
      $($primary_filename).val(activePrimary.dataset.filename);
      $($primaryFrame).foundation('replace', $cdnUrl + activePrimary.dataset.uuid + $cdnParam);
    });

    $tiles.on('update:secondary', function(event, activeSecondary) {
      $($secondary_filename).val(activeSecondary.dataset.filename);
      $($secondaryFrame).foundation('replace', $cdnUrl + activeSecondary.dataset.uuid + $cdnParam);
      if (filmstripOptions.zoom == true) {
        $($zoomFrame).attr('href', $cdnUrl + activeSecondary.dataset.uuid + '/-/resize/x1600/')
        $zoomEl.destroy();
        window.$zoomEl = $('.zoom').magnify();
      }
    });

  })();

  return {
    init: init
  };

}
