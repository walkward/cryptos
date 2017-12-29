/**
 * The grid view of the asset viewer
 * @file Initializes the grid view
 */

import pageTitle from '../lib/pageTitle';
import data from '../util/data';
import assetCard from '../lib/assetCard'
import search from '../lib/search';
import assetInfo from '../lib/assetInfo';
import { Foundation } from 'foundation-sites/js/foundation.core';
import { Dropdown } from 'foundation-sites/js/foundation.dropdown';
import assetViewer from './AssetViewer';

export default function(){

  $.when( assetCard(data) ).then(function() {
    search.placeholder()
    pageTitle.toolbarTitle()
    assetInfo();
    assetViewer();
  }).then(function(){
    $("[data-dropdown-flag]").each(function(){
      var dropdownFlag = new Foundation.Dropdown($(this));
    })

  });

  $("#grid-slider").on('mousedown', function(){
    $(document).on('mouseup', function(){
      setTimeout(function(){
        clique.viewer.resizeCards($("#grid-slider-output").val());
      }, 10)
      $(document).off('mouseup');
    })
  })

}
