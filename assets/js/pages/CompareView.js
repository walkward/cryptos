/**
 * The compare view of the asset viewer
 * @file Initializes the compare view
 */

import data from '../util/data';
import filmstrip from '../lib/filmstrip';
import selector from '../lib/selector';
import split from '../vendor/split';
import toolbarCounter from '../lib/toolbarCounter';
import pageTitle from '../lib/pageTitle';
import assetViewer from './AssetViewer';

export default function(){
  /**
   * Initializing filmstrip adjustable pane
   */
  split.filmstrip()
  /**
   * Initializing filmstrip & selector scripts
   */
  selector(1, 0)
  filmstrip('/-/resize/x400/')
  toolbarCounter()
  pageTitle.toolbarTitle()
  assetViewer()
}
