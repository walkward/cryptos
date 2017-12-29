export default (function(){

const $filters = $('#viewer-filter-dropdown').find('input');

  $($filters).on('change', function(event){
    let tagString;
    let tagType = $(event.target).closest('[data-label-color]').attr('data-label-color');
    if(event.target.type == 'checkbox') {
      tagString = $(this).attr("id").replace('-', ' ');
    } else {
      tagString = $(this).val();
    }
    clique.viewer.addTag(tagString, tagType)
  })

})()
