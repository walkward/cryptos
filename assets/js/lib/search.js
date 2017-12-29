import url from '../util/url';
import { Dropdown } from 'foundation-sites/js/foundation.dropdown';

const search_selector = $('#sidenavSearch');
const search_prefix = 'Search within this ';
const search_globally = 'Search globally';
let search_area;
if (typeof url.type !== 'undefined'){
  search_area = url.type.replace('_', ' ');
}

function placeholder(){
  if (url.type) {
    $(search_selector).attr('placeholder', search_prefix + search_area);
  }
}

function globally(){
  if($(search_selector).hasClass('global')) {
      placeholder()
  } else {
    $(search_selector).attr('placeholder', search_globally)
  }
  $(search_selector).toggleClass('global')
}

function getSearch(handleData) {
  $.ajax({
    url: '/search/',
    method: "GET",
    dataType: "html",
    success: function(data) {
      handleData(data);
    }
  });
}

function results(event) {
  if (typeof event !== 'undefined'){
    event.preventDefault();
  }
  let term = encodeURIComponent($('#sidenavSearch').val());
  let target = $($('[data-search-target]')).attr("data-search-target");
  window.location.href=target+'?'+term;
}

function toggleSearch(){
  getSearch(function(output){
    $('#search-panel').html(output)
  })
  $('#search-toggle').find('use').toggleClass('primary-color');
  $('#sidenav-tabs').foundation('selectTab', $('#search-panel'));
}

let lastActiveTab = $('#sidenav-tabs').find('.tabs-title.is-active a');

$('#search-toggle').on('click', function(){
  if($('#search-panel').hasClass('is-active')) {
    $('#sidenav-tabs').foundation('selectTab', $('#'+$(lastActiveTab).attr('id').replace('-label', '')));
  } else {
    lastActiveTab = $('#sidenav-tabs').find('.tabs-title.is-active a');
    toggleSearch();
  }
})

$('#browse-panel-label, #home-panel-label').on('click', function(){
  $('#search-toggle').find('use').removeClass('primary-color');
})

module.exports = {
  placeholder: placeholder,
  globally: globally,
  results: results,
  toggleSearch: toggleSearch
}
