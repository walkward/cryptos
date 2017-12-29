/**
 * Trigger opening ajax modals
 * @type {String}
 */

import data from '../util/data';
import { Reveal } from 'foundation-sites/js/foundation.reveal';
import { Tabs } from 'foundation-sites/js/foundation.tabs';

/**
 * [description]
 * @param  {String} id Should be passed from button onclick as the id of the module.
 * @return {[type]}    [description]
 */
function open(id, handleCallback){

  Foundation.plugin(Reveal, 'Reveal');
  Foundation.plugin(Tabs, 'Tabs');
  let $modal = '#' + id;

  /**
   * Return the modal markup via ajax from the data() method
   * @param  {[type]} output [description]
   * @return {[type]}        [description]
   */
  data.modal(id, function(output){

    /**
     * Append the new modal
     * @param  {[type]} body [description]
     * @return {[type]}      [description]
     */
    $( "body" ).append( output );

    /**
     * Initialize the modal
     * @type {Foundation}
     */
    let reveal = new Foundation.Reveal($($modal));

    if($("[data-modal-tabs]").length > 0) {
      let modalTabs = new Foundation.Tabs($("[data-modal-tabs]"));

      function showNewTab(tabId){
        $("[data-modal-tabs]").foundation('selectTab', $('[data-modal-tab-index='+tabId+']').attr('data-modal-tab-id'));
      }

      $('[data-modal-tab-next]').on('click', function(){
        if ($(this).attr('data-modal-tab-next') == '') {
          showNewTab(parseInt($('[data-modal-tabs]').find('.is-active').attr('data-modal-tab-index'), 10) + 1)
        } else {
          showNewTab(parseInt(($(this).attr('data-modal-tab-next')), 10))
        }
      })

      $('[data-modal-tab-previous]').on('click', function(){
        if ($(this).attr('data-modal-tab-previous') == '') {
          showNewTab(parseInt($('[data-modal-tabs]').find('.is-active').attr('data-modal-tab-index'), 10) - 1)
        } else {
          showNewTab(parseInt(($(this).attr('data-modal-tab-previous')), 10))
        }
      })
    }

    $($modal).foundation('open');

    /**
     * Initialize fuse automplete (if it exists)
     */
    if ($('[data-autocomplete]').length > 0) {
      require.ensure([], function(require) {
        let fuse = require('../vendor/fuse');
        fuse.default()
      });
    }

    /**
     * Remove markup and destroy the modal once it has closed
     * @return {[type]} [description]
     */
    $($modal).on('closed.zf.reveal', function(){
      close(id);
    });

    /**
     * Handle callback if it exists
     * @param  {[type]} handleCallback [description]
     * @return {[type]}                [description]
     */
    if (handleCallback) {
      return handleCallback("done");
    }

  });

}

/**
 * Remove markup and destroy method
 * @return {[type]} [description]
 */
function close(id){
  let $modal = '#' + id;
  $($modal).foundation('_destroy');
  $($modal).remove();
}

module.exports = {
  open: open,
  close: close
};
