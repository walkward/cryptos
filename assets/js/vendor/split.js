import Split from 'split.js'

function main () {
  if ($('#assetInfo').length === 0) {
    let sizes = [25, 75]
    // Checking breakpoints to determin size
    if (Foundation.MediaQuery.current === 'medium') {
      sizes = [0, 100]
    }
    // Initialize the dragable sizes
    main.selectors = ['#sidenav', '#main']
    main.instance = Split(main.selectors, {
      sizes: sizes,
      minSize: [250, 624],
      gutterSize: 5
    })
  } else {
    let sizes = [25, 75, 0]
    // Checking breakpoints to determin size
    if (Foundation.MediaQuery.current === 'medium') {
      sizes = [0, 100, 0]
    }
    // Initialize the dragable sizes
    main.selectors = ['#sidenav', '#main', '#assetInfo']
    main.instance = Split(main.selectors, {
      sizes: sizes,
      minSize: [250, 624, 0],
      gutterSize: 5
    })
  }
};

function browse () {
  // Initialize the dragable sizes for the gutter between collections & divisions within the sidenav
  browse.selectors = ['#split-divisions', '#split-collections']
  browse.instance = Split(browse.selectors, {
    sizes: [70, 30],
    minSize: [200, 200],
    gutterSize: 5,
    direction: 'vertical'
  })
};

const filmstrip = function () {
  /**
   * Initialize the filmstrip only if it exists
   * @type {[type]}
   */
  filmstrip.selectors = ['#content', '#filmstrip']
  filmstrip.instance = Split(filmstrip.selectors, {
    sizes: [80, 20],
    minSize: [100, 100],
    gutterSize: 5,
    direction: 'vertical'
  })
}

/**
 * Method for toggling the visibility of split panes
 * @param  {event} event    Used to retrieve DOM element, specifically the 'data-split-target' attribute
 * @param  {string} instance  The split intance which is being targetted
 * @param  {integer} panel    The panel of the split intance
 * @return {[type]}          [description]
 */
function toggleSplit (target, panel, event) {
  let current = target.instance.getSizes()
  if (panel === 2 && current[panel] < 1) {
    $(target.selectors[panel]).removeClass('split-hidden')
    target.instance.setSizes([20, 60, 20])
  } else if (current[panel] < 1) {
    $(target.selectors[panel]).removeClass('split-hidden')
    target.instance.destroy()
    target()
  } else {
    $(target.selectors[panel]).addClass('split-hidden')
    target.instance.collapse(panel)
  }
  // Toggle rotate class
  $(event.target).parents('button').toggleClass('rotate-180')
};

let init = (function () {
  // Only initialize split for medium-up screens
  if (Foundation.MediaQuery.current !== 'small') {
    main()
    browse()
  }
})()

module.exports = {
  init: init,
  filmstrip: filmstrip,
  main: main,
  toggleSplit: toggleSplit
}
