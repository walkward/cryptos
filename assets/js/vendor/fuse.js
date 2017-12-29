import data from '../util/data';
import doT from 'dot';
import Fuse from 'fuse.js';
import key from 'keymaster';
import GetYoDigits from 'foundation-sites/js/foundation.util.core';
import { Toggler } from 'foundation-sites/js/foundation.toggler';

export default function() {

  $('[data-autocomplete]').on('focusin', function() {
    let $fuseInstance = $(this);
    let $autocompleteID = $fuseInstance.attr('data-autocomplete-id');
    let $autocompleteTypes = $fuseInstance.attr('data-autocomplete-types');
    let $items = [];
    let keyTimer;
    let keyTimerTime = 200;
    const fuseOptions = {
      shouldSort: true,
      threshold: 0.2,
      location: 0,
      distance: 50,
      maxPatternLength: 18,
      minMatchCharLength: 2,
      keys: [
        "name"
      ]
    };

    data.resources(function(output) {

      // Creating list of data and filtering out results based on the 'data-autocomplete-types' attribute
      $.each(output, function(key, val) {
        if ($autocompleteTypes.indexOf(val.type) !== -1) {
          $items.push(val);
        }
      });

      let fuse = new Fuse($items, fuseOptions);

      // Refresh the results after the user has stopped typing for .3 seconds
      $fuseInstance.on('keyup', function() {
        let $el = $(this);
        let tmpl = doT.template("<li tabindex='1' class='result' >{{=it.name}}</li>");

        // Wait until the user has stopped typing to fetch results
        clearTimeout(keyTimer);
        keyTimer = setTimeout(function() {

          // Perform a search
          let result = fuse.search($el.val());

          $(result).each(function() {
            let html = '';
            for (let itemIdx = 0; itemIdx < result.length; itemIdx++) {
              result[itemIdx].index = itemIdx;
              html += tmpl(result[itemIdx]);
            }
            // Add results to autocomplete instance
            $('#' + $autocompleteID).html(html);
          });
        }, keyTimerTime);
      })
    })
  })

  $('[data-autocomplete]').on('focusout', function(event) {
    let $fuseInstance = $(this);
    let $autocompleteID = $fuseInstance.attr('data-autocomplete-id');

    // Add result or tags to the input onclick
    if (typeof event.relatedTarget.className !== 'undefined' && event.relatedTarget.className == 'result') {
      // Append tags if data attribute is set otherwise set the input value.
      if($($fuseInstance).attr('data-autocomplete-tags') == 'true') {
        let tempFn = doT.template("<span id='{{=it.tagCode}}' data-toggler='.hide' class='label primary'>{{=it.tagName}}<svg data-toggle='{{=it.tagCode}}' role='img' class='icon icon-right' ><use xlink:href='/assets/img/icons-sprites.svg#close'></use></svg></span>");
        let tagCode = Foundation.GetYoDigits();
        let tagText = tempFn({
          tagName: $(event.relatedTarget).text(),
          tagCode: tagCode
        });
        $('[data-label-target="'+$autocompleteID+'"]').append(tagText);
        $fuseInstance.val('')
        Foundation.plugin(Toggler, 'Toggler');
        var tagToggler = new Foundation.Toggler($("#"+tagCode));
      } else {
        $fuseInstance.val($(event.relatedTarget).text())
      }
    }
    // Remove autocomplete results
    $('#' + $fuseInstance.attr('data-autocomplete-id')).html('');
  })

}
