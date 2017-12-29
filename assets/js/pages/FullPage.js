/**
 * The full page view of the asset viewer
 * @file Initializes the full page view
 */

import data from '../util/data';
import filmstrip from '../lib/filmstrip';
import selector from '../lib/selector';
import split from '../vendor/split';
import toolbarCounter from '../lib/toolbarCounter';
import pageTitle from '../lib/pageTitle';
import assetViewer from './AssetViewer';
import loadBar from '../util/loading'

export default function() {
  /**
   * Initializing filmstrip adjustable pane
   */
  split.filmstrip()
  /**
   * Initializing filmstrip
   */
  selector(0);
  filmstrip('/-/resize/x600/', { zoom: true });
  toolbarCounter();
  pageTitle.toolbarTitle();
  assetViewer();
  clique.split.toggleSplit(clique.split.main, 0, 'full-page');
  clique.split.toggleSplit(clique.split.filmstrip, 1, event);

  System.import('magnify')

    .then(magnify => {

      $(document).ready(function() {
        window.$zoomEl = $('.zoom').magnify();
      });

    })

}
