export default function(){
  const $progressElem = $('#LoadingBar')
  const $progressElemWrapper = $('#content__scroll');
  $($progressElemWrapper).fadeTo( "fast" , 0.3);
  let progressWidth = 1;
  let progressId = setInterval(frame, 10);
  function frame() {
    if (progressWidth >= 100) {
      clearInterval(progressId);
      $($progressElem).css("width", '0%');
      $($progressElemWrapper).fadeTo( "fast" , 1);
    } else {
      progressWidth++;
      $($progressElem).css("width", progressWidth + '%');
    }
  }
}
