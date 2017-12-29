/**
 * Single asset view within the asset viewer
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
  split.filmstrip();
  /**
   * Initializing filmstrip
   */
  selector(0);
  filmstrip('/-/resize/x600/');
  toolbarCounter();
  pageTitle.toolbarTitle();
  assetViewer();
  clique.split.toggleSplit(clique.split.filmstrip, 1, event);
}
