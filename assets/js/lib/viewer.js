import data from '../util/data';
import { Toggler } from 'foundation-sites/js/foundation.toggler';
import GetYoDigits from 'foundation-sites/js/foundation.util.core';
import loadBar from '../util/loading';

const $assetCards = $('#assetcard_container').find('.asset-card');

function getItems(){
  let selectedItems = [];
  $('[data-selector-checkbox]:checked').each(function(){
    let uuid = $(this).attr('id').replace('checkbox-','');
    data.fileInfo(uuid, function(output){
      selectedItems.push(output[0])
    })
  })
  return selectedItems;
};

function selectAll(){
  $('[data-selector-checkbox]').each( function(){
    $(this).prop( "checked", true );
  })
  $($('[data-selector]')).trigger( "update:select_all" );
}

function deselectAll(){
  $('[data-selector-checkbox').each( function(){
    $(this).prop( "checked", false );
  })
  $($('[data-selector]')).trigger( "update:deselect_all" );
}

function tableSelectToggle(event){
  let $el = $(event.target).parents('table');
  $el.find('tbody input[type=checkbox]').each( function(){
    if ($(event.target).prop("checked") == true) {
      $(this).prop( "checked", true );
    } else {
      $(this).prop( "checked", false );
    }
  })
}

function toggleFlags(){
  const approvedIcon = "<span class='label success'><svg role='img' class='icon icon-left'><use xlink:href='/assets/img/icons-sprites.svg#approved'></use></svg>Lora R.</span>";
  const approvedChangesIcon = "<span class='label warning'><svg role='img' class='icon icon-left'><use xlink:href='/assets/img/icons-sprites.svg#approved'></use></svg>Edwin R.</span>";
  const disapprovedIcon = "<span class='label alert'><svg role='img' class='icon icon-left'><use xlink:href='/assets/img/icons-sprites.svg#disapproved'></use></svg>Lily C.</span>";
  const flagWrapper = "<div class='flag-container'>"+approvedIcon+approvedChangesIcon+disapprovedIcon+"</div>";
  if ($('.flag-container').length > 0) {
    $('.flag-container').remove();
  } else {
    $('#assetcard_container .asset-card').append(flagWrapper);
  }
}

function resizeCards(cardSize){
  const $cdnUrl = 'https://ucarecdn.com/';
  const wrappeWidth = $('#assetcard_container').width();
  const percentWidth = (wrappeWidth) / (parseFloat(cardSize + 43) / 100.0);
  let reqWidth = 172;
  if(cardSize > 350){
    let remaining_pixels = wrappeWidth - 350;
    let multiplier = (cardSize - 350) * (remaining_pixels / 150);
    reqWidth = Math.floor(multiplier + 350);
  } else {
    reqWidth = Math.floor(cardSize);
  }
  const reqHeight = Math.floor(reqWidth * 0.88);
  const reqString = '/-/preview/' + reqWidth + 'x' + reqHeight + '/';
  const $cards = $('#assetcard_container').find('.asset-card');
  $($cards).each(function(){
    let $cardImg = $(this).find('[data-file-uuid]');
    let cardUuid = $cardImg.attr('data-file-uuid');
    $cardImg.attr('src', $cdnUrl + cardUuid + reqString);
  })
  $cards.width(reqWidth);
  $cards.find('.asset-card__image').height(reqHeight + 65);
};

function rank(ranking, event){
  let $stars;
  if (event.type == 'keydown') {
    $stars = $('[data-active="secondary"]').find('.rank-star');
  } else {
    $stars = $(event.target).parents('.asset-card__actions').find('.rank-star');
  }
  $stars.removeClass('active-rank');
  for (var ii = ranking;  ii > 0 ; ii-- ) {
    $($stars[ii - 1]).addClass('active-rank');
  }
  $($stars[0]).parents('.asset-card__actions').addClass('visible');
  setTimeout(function(){
    $($stars[0]).parents('.asset-card__actions').removeClass('visible');
  }, 1000)
}

function approval(approveStatus, event){
  let $card;
  if (event.type == 'keydown') {
    $card = $('[data-active="secondary"]');
  } else {
    $card = $(event.target).parents('.asset-card');
  }
  const rankButtons = $($card).find('[data-dropdown-flag] button .label');
  $($card).find('.user-approval').remove();
  $(rankButtons[approveStatus]).clone().addClass('user-approval').appendTo( $card );
  $($card).find('.dropdown-pane').foundation('close');
}

function renameAsset(event){
  $(event.target).parents('[data-asset-wrapper]').find('[data-viewer-rename]').select();
}

function rotate(direction){
  $('[data-selector-checkbox]').each( function(){
    if($(this).prop( "checked") == true) {
      let el = $(this).attr("id").replace('checkbox-', '');
      let rotateVal = $('[data-file-uuid="'+el+'"]').attr('data-viewer-rotate');
      if (rotateVal < 181 && direction == 'right') {
        rotateVal = parseInt(rotateVal, 10) + 90;
      } else if (rotateVal > 89 && direction == 'left') {
        rotateVal = parseInt(rotateVal, 10) - 90;
      } else if (direction == 'right') {
        rotateVal = 0;
      } else {
        rotateVal = 270;
      }
      $('[data-file-uuid="'+el+'"]').attr('data-viewer-rotate', rotateVal);
    }
  })
}

function addTag(tagString, tagType){
  let tagId = Foundation.GetYoDigits();
  let tagColor = 'secondary';
  let tagPrefix;
  if (typeof tagType !== 'undefined' && tagType == 'sort') {
    tagPrefix = "SORT ASC: ";
  } else if (typeof tagType !== 'undefined' && tagType !== ''){
    tagColor = tagType;
    tagPrefix = "";
  } else {
    tagPrefix = "";
  }
  let tag = "<span id='search-tag-"+ tagId +"' data-toggler='.hide' class='label " + tagColor + "' style='margin-left:6px'>"+ tagPrefix + tagString +"<svg data-toggle='search-tag-"+ tagId +"' role='img' class='icon icon-right' ><use xlink:href='/assets/img/icons-sprites.svg#close'></use></svg></span>"
  $(tag).appendTo($('[data-search-tags]'))

  Foundation.plugin(Toggler, 'Toggler');
  var tagToggler = new Foundation.Toggler($("#search-tag-"+tagId));

  loadBar();
}

function doubleClick(){
  /**
   * Click event listener for doubleclicking
   */
   const $selectorWrapper = $('[data-selector]');
   const $selectorItem = $('[data-selector-index');
   const $tiles = $($selectorWrapper).find($selectorItem);
  $($tiles).on('dblclick', function(event) {
    let el = $(event.target);
    let uuid = $(el).closest('.asset-card').find('.selector-target').attr('data-file-uuid');
    let filename = $(el).closest('.asset-card').find('.selector-target').attr('data-filename');
    let imageUrl = 'https://ucarecdn.com/' + uuid + '/' + filename;

    clique.modal.open('overlay', function(callback){
      $('#overlay .overlay__title').text(filename)
      $('#overlay img').attr('src', imageUrl);
    })

  })
}

module.exports = { selectAll, deselectAll, toggleFlags, resizeCards, rank, approval, tableSelectToggle, renameAsset, rotate, addTag, doubleClick }
