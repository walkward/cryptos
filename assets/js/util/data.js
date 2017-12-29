function resources(handleData) {
  $.ajax({
    url: "/data/resources.json",
    method: "GET",
    dataType: "json",
    success: function(data) {
      handleData(data);
    }
  });
}

function files(handleData) {
  $.ajax({
    url: "/data/files.json",
    method: "GET",
    dataType: "json",
    success: function(data) {
      handleData(data);
    }
  });
}

function fileInfo(uuid, handleData) {
  $.ajax({
    url: "/data/files.json",
    method: "GET",
    dataType: "json",
    success: function(data) {
      let fileData = data.filter(function( obj ) {
        if (obj.uuid == uuid) {
          return obj;
        }
      });
      handleData(fileData);
    }
  })
}

function modal(id, handleData) {
  $.ajax({
    url: '/modals/' + id + '/',
    method: "GET",
    dataType: "html",
    success: function(data) {
      handleData(data);
    }
  });
}

module.exports = {
  resources: resources,
  files: files,
  fileInfo: fileInfo,
  modal: modal
};
