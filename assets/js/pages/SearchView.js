/**
 * The grid view of the asset viewer
 * @file Initializes the grid view
 */

import data from '../util/data';
import assetCard from '../lib/assetCard'
import search from '../lib/search';
import assetInfo from '../lib/assetInfo';
import { Foundation } from 'foundation-sites/js/foundation.core';
import { Dropdown } from 'foundation-sites/js/foundation.dropdown';
import assetViewer from './AssetViewer';
import resizeCards from '../lib/resizeCards';
import { Toggler } from 'foundation-sites/js/foundation.toggler';

export default function(){

  const search_term = decodeURIComponent(window.location.search).slice(1, window.location.search.length);

  $.when( assetCard(data) ).then(function() {
    search.placeholder()
    assetInfo();
    assetViewer();
    clique.search.toggleSearch();
  }).then(function(){
    $("[data-dropdown-flag]").each(function(){
      var dropdownFlag = new Foundation.Dropdown($(this));
    })
  });

  /**
   * Adding search term to search value
   */
  $('#sidenavSearch').val(search_term)

  /**
   * Adding tags for the search term
   */
  const term_array = search_term.split(' ');
  $(term_array).each(function( index, value ){
    let term_tag = "<span id='search-tag-"+ index +"' data-toggler='.hide' class='label secondary' style='margin-left:6px'>"+ value +"<svg data-toggle='search-tag-"+ index +"' role='img' class='icon icon-right' ><use xlink:href='/assets/img/icons-sprites.svg#close'></use></svg></span>"
    $(term_tag).appendTo($('[data-search-tags]'))

    Foundation.plugin(Toggler, 'Toggler');
    var tagToggler = new Foundation.Toggler($("#search-tag-"+index));
  })

}
