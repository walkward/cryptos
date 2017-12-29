import doT from 'dot';

// jQuery plugin
$.fn.tmpl = function(tmplId, data) {
    var tmpl = doT.template($('#tmpl_' + tmplId).html());
    if (!$.isArray(data)) data = [data];

    return this.each(function() {
        var html = '';
        for (var itemIdx = 0; itemIdx < data.length; itemIdx++) {
            data[itemIdx].index = itemIdx;
            html += tmpl(data[itemIdx]);
        }
        $(this).html(html);
    });
};

module.exports = {
  tmpl: $.fn.tmpl
};
