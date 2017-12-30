import Promise from 'promise-polyfill'
import tablesorter from 'tablesorter/dist/js/jquery.tablesorter.combined'

function init (tableSelector) {
  return new Promise((resolve, reject) => {
    const initTable = function () {
      return $(tableSelector).tablesorter({
        sortList: [[1, 0]],
        widgets: [ 'filter' ],
        widgetOptions: {
          filter_ignoreCase: true
        }
      })
    }

    $.when(initTable()).done(function () {
      resolve('success')
    })
  })
}

module.exports = {
  init: init
}
