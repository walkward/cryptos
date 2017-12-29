import { Accordion } from 'foundation-sites/js/foundation.accordion'

export default function () {
  function getAssetInfo (handleData) {
    $.ajax({
      url: '/assetinfo/',
      method: 'GET',
      dataType: 'html',
      success: function (data) {
        handleData(data)
      }
    })
  }

  function initAssetInfo () {
    getAssetInfo(function (output) {
      $('#assetInfo').html(output)

      $('.assetInfo__file-title').foundation()

      Foundation.plugin(Accordion, 'Accordion')
      const $newAssetInfoAccordion = new Foundation.Accordion($('#assetInfo__accordion'), {
        multiExpand: true,
        allowAllClosed: true
      })
    })
  }

  // Adding Asset Info markup after opening (mobile)
  $('#assetInfo').on('opened.zf.offcanvas', function () {
    $('#assetInfo').removeClass('split-hidden')
    initAssetInfo()
  })

  // Event listener for when Asset Info panel is opened on desktop view
  $(document).on('toggle:assetInfo', function () {
    initAssetInfo()
    clique.split.toggleSplit(clique.split.main, 2, event)
  })
}
