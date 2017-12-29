/**
 * Exports every url paramter used in the system
 * @param  {[type]} sParam [description]
 * @return {[type]}        [description]
 */

function getUrlParameter(sParam) {
    let sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

const type = getUrlParameter('type');
const id = getUrlParameter('id');
const parent = getUrlParameter('parent');
const params = '?parent='+parent+'&id='+id+'&type='+type;

module.exports = {
  getUrlParameter: getUrlParameter,
  type: type,
  id: id,
  parent: parent,
  params: params
};
