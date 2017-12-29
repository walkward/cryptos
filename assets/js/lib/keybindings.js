/** Defines keyboard events used throughout the app
 *  -------------------
 *  The scope of keys should be activated within their respective page scripts
 */

import key from 'keymaster';

export default (function() {

key('shift+N', function(){ clique.modal.open("create_new") });

key('shift+U', function(){ clique.modal.open("upload") });

key('shift+K', function(){ clique.modal.open("keyboard_shortcuts") });

key('delete, backspace, clear', 'viewer', function(){ clique.modal.open("delete_confirmation") });

key('command+A', 'viewer', function(event){ event.preventDefault(); clique.viewer.selectAll() });

key('command+shift+A', 'viewer', function(){ clique.viewer.deselectAll() });

key('1', 'viewer', function(event){ clique.viewer.rank(1, event) });

key('2', 'viewer', function(event){ clique.viewer.rank(2, event) });

key('3', 'viewer', function(event){ clique.viewer.rank(3, event) });

key('4', 'viewer', function(event){ clique.viewer.rank(4, event) });

key('5', 'viewer', function(event){ clique.viewer.rank(5, event) });

key('A', 'viewer', function(event){ clique.viewer.approval(0, event) });

key('W', 'viewer', function(event, handler){ clique.viewer.approval(1, event); console.log(handler.shortcut, handler.scope); });

key('D', 'viewer', function(event){ clique.viewer.approval(2, event) });

})();
