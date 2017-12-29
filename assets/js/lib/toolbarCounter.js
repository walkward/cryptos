/**
 * Controls for the bottom toolbar
 * @return {[type]}                  [description]
 */

export default function() {

  const $tiles = $('[data-selector]').find('[data-selector-index]');
  const $select_selector = $('[data-counter] [type="checkbox"]');
  const $select_total_selector = $('[data-counter-total]');
  const $select_count_selector = $('[data-counter-count]');
  const $select_count_index = $('[data-counter-index]');
  let $selected_count = 0;
  const $select_total = $select_selector.length;

  function updateTotal(total){
    return $($select_total_selector).html($select_total);
  }

  function updateCount(count){
    return $($select_count_selector).html(count);
  }

  $($select_selector).change(function() {
      if(this.checked) {
        $selected_count++;
      } else {
        $selected_count--;
      }
      return updateCount($selected_count);
  });

  $tiles.on('update:secondary', function(event, activeSecondary) {
    $($select_count_index).html(parseInt(activeSecondary.dataset.selectorIndex, 10) + 1)
  });

  $('[data-selector]').on('update:select_all', function(event) {
    updateCount($select_total)
  });

  $('[data-selector]').on('update:deselect_all', function(event) {
    updateCount(0)
  });

  return {
    updateTotal: updateTotal()
  }

}
