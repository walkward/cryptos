import url from '../util/url'
import tmpl from '../util/doT'
import selector from '../lib/selector'
import toolbarCounter from '../lib/toolbarCounter'
import viewer from './viewer.js'

export default function (data) {
  /**
   * Fetches the file data and then initializes the template function
   * @param  {[type]} output [description]
   * @return {[type]}        [description]
   */
  data.files(function (output) {
    const $items = output
    $('#assetcard_container').tmpl('assetcard', $items)
    selector(0)
    toolbarCounter()
    viewer.doubleClick()
  })

  $('.asset-card input').off()
};
