import doT from 'dot';
import url from '../util/url';
import store from 'store/dist/store.modern.js';
import Sortable from 'sortablejs';
import { GetYoDigits } from 'foundation-sites/js/foundation.util.core';

export default (function() {

  // Id's for drilldown menus
  const $divisionDrilldown = $('#divisionDrilldown');
  const $collectionDrilldown = $('#collectionDrilldown');

  // Add classes to define navigation active page
  const setActive = (function(){
    if (typeof url.type !== 'undefined' && typeof url.id !== 'undefined') {
      if (url.type == 'division' || url.type == 'division_dashboard') {
        $divisionDrilldown.foundation('_show', $('#browse_'+url.id));
      } else if (url.type == 'project' || url.type == 'folder' || url.type == 'project_collection' || url.type == 'project_dashboard' ) {
        const $parent = $('#browse_'+url.parent).parents('[data-resource-type="division"]');
        $divisionDrilldown.foundation('_show', $parent);
        $divisionDrilldown.foundation('_show', $('#browse_'+url.parent));
      } else if (url.type == 'personal_collection' || url.type == 'group_collection') {
        $collectionDrilldown.foundation('_show', $('#browse_'+url.type));
      }
    }
    if (url.type == 'folder' || url.type == 'project_collection' || url.type == 'group_collection' || url.type == 'personal_collection') {
      $('#link_'+url.id).addClass('primary-color');
    } else if (url.type == 'division_dashboard' || url.type == 'project_dashboard') {
      $('#dash_'+url.id).addClass('primary-color');
    } else {
      const $page_id = $('body').attr('id');
      $('#link_'+$page_id).addClass('primary-color');
    }
  })();

  // Remove the ".initial" class white disables the animation
  $.when( setActive ).done(function () {
    // Needs to be delayed by 500 ms or else the animation will fire
    setTimeout(function(){ $('#browse-panel').removeClass('initial')}, 300);
  });

  // Add user's name to the sidenav.
  const tempFn = doT.template("<img class='circle-img profile-img' src='{{=it.user_photoURL}}' alt='' /><span>{{=it.user_fullname}}</span>");
  const resultText = tempFn({
    user_fullname: store.get('user_fullname'),
    user_photoURL: store.get('user_photoURL')
  });
  $('#home-panel-user_container').html(resultText);

  $('.sidenav-menu-more, .sidenav-menu-close').on('click', function(event){
    event.preventDefault();
    $(this).parents('li').toggleClass('more-active');
  })

  /**
   * Make folder lists sortable within the browse tab
   * @return {[type]} [description]
   */
  $('[data-sortable-resource]').each(function(){
    let $elId = document.getElementById($(this).attr("id"));
    Sortable.create($elId, {
      group: $elId,
      draggable: ".draggable-item",
      handle: ".draggable-handle",
      animation: 100
    });
  })

  /**
   * Duplicate folder/project collection function
   * @return {[type]} [description]
   */
  $('.sidenav__new-folder, .sidenav__new-project-collection').on('click', function(){
    let $this = $(this);
    let elText = '';
    let elId = GetYoDigits();
    if($($this).hasClass('sidenav__new-folder')){
      elText = '<svg role="img" class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/img/icons-sprites.svg#folder"></use></svg> <input type="text" value="New Folder" style="width:90%;">';
    } else {
      elText = '<svg role="img" class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/img/icons-sprites.svg#collection"></use></svg> <input type="text" value="New Project Collection" style="width:90%;">';
    }
    let el = '<li id="' + elId + '" class="draggable-item"><a class="sidenav-item form-strip-div">' + elText + '</a></li>';

    $($this).closest('ul.menu').append(el);
    $('#'+elId).find('input').select();
  })

})();
