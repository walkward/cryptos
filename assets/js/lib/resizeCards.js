export default (function(){
  $("#grid-slider").on('mousedown', function(){
    $(document).on('mouseup', function(){
      setTimeout(function(){
        clique.viewer.resizeCards($("#grid-slider-output").val());
      }, 10)
      $(document).off('mouseup');
    })
  })
})()
