import url from '../util/url';
import doT from 'dot';
import data from '../util/data';

function topTitle(){
  if ($('#pagetitle_container').length > 0){
    data.resources(function(output){
      let resourceManager;
      if (url.type == 'group_collection') {
        resourceManager = 'Managed by Frank Robinson';
      } else if (url.type == 'personal_collection'){
        resourceManager = 'Your personal collection';
      } else {
        resourceManager = 'Managed by ' + output[url.id].manager;
      }
      const resourceName = output[url.id].name;
      const tempFn = doT.template("<span class='h4'>{{=it.name}}</span>&nbsp;&nbsp;<span>{{=it.manager}}</span>");
      const resultText = tempFn({
        name: resourceName,
        manager: resourceManager
      });
      $('#pagetitle_container .page-title').html(resultText);
    });
  } else if ($('#username_container').length > 0){
    data.resources(function(output){
      const resourceName = output[url.id].name;
      const tempFn = doT.template("<span class='h4'>{{=it.name}}</span>&nbsp;&nbsp;<br>");
      const resultText = tempFn({
        name: resourceName
      });
      $('#username_container').html(resultText);
    });
  }
}

function toolbarTitle(){
  data.resources(function(output){
    const resourceName = output[url.id].name;
    $('[data-resource-title]').html(resourceName);
  });
}

module.exports = {
  topTitle: topTitle,
  toolbarTitle: toolbarTitle
}
