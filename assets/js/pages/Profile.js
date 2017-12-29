/**
 * Single asset view within the asset viewer
 */
import pageTitle from '../lib/pageTitle';
import table from '../lib/table';
import { Tabs } from 'foundation-sites/js/foundation.tabs';

export default function(){
  table()
  Foundation.plugin(Tabs, 'Tabs');
  var tabs = new Foundation.Tabs($("[data-profile-tabs]"));
}
