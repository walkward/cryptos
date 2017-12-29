/**
 * The grid view of the asset viewer
 * @file Initializes the grid view
 */

import pageTitle from '../lib/pageTitle';
import search from '../lib/search';
import assetInfo from '../lib/assetInfo';
import selector from '../lib/selector';
import { Foundation } from 'foundation-sites/js/foundation.core';
import { Dropdown } from 'foundation-sites/js/foundation.dropdown';
import { Reveal } from 'foundation-sites/js/foundation.reveal';
import assetViewer from './AssetViewer';

export default function(){

  search.placeholder()
  pageTitle.toolbarTitle()
  assetInfo();
  assetViewer();
  selector(0)

  $("[data-dropdown-flag]").each(function(){
    var dropdownFlag = new Foundation.Dropdown($(this));
  })
  // Init video modal
  Foundation.plugin(Reveal, 'Reveal');
  $("[data-reveal]").each(function(){
    var reveal = new Foundation.Reveal($(this));
  })

}
