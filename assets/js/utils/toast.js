export default (msg) => {
  let $modal = $('#toastModal')
  $($modal).html(msg)
  $($modal).foundation('open')
  setTimeout(() => { $($modal).foundation('close') }, 2000)
}
