/**
 * Generates tables for list pages
 * @file
 */

import table from '../lib/table';
import data from '../util/data';
import pageTitle from '../lib/pageTitle';

export default function() {
  /**
   * Initialize table templating function
   */
  table(data)

  pageTitle.topTitle()

}
