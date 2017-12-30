!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/assets/",t(t.s=37)}({10:function(e,t,n){"use strict";var r=n(26),o=[n(28),n(29),n(30),n(31)],i=[];e.exports=r.createStore(o,i)},26:function(e,t,n){"use strict";function r(){var e="undefined"==typeof console?null:console;e&&(e.warn?e.warn:e.log).apply(e,arguments)}function o(e,t,n){n||(n=""),e&&!f(e)&&(e=[e]),t&&!f(t)&&(t=[t]);var o=n?"__storejs_"+n+"_":"",i=n?new RegExp("^"+o):null;if(!/^[a-zA-Z0-9_\-]*$/.test(n))throw new Error("store.js namespaces can only have alphanumerics + underscores and dashes");var g={_namespacePrefix:o,_namespaceRegexp:i,_testStorage:function(e){try{var t="__storejs__test__";e.write(t,t);var n=e.read(t)===t;return e.remove(t),n}catch(e){return!1}},_assignPluginFnProp:function(e,t){var n=this[t];this[t]=function(){function t(){if(n)return c(arguments,function(e,t){r[t]=e}),n.apply(o,r)}var r=a(arguments,0),o=this,i=[t].concat(r);return e.apply(o,i)}},_serialize:function(e){return JSON.stringify(e)},_deserialize:function(e,t){if(!e)return t;var n="";try{n=JSON.parse(e)}catch(t){n=e}return void 0!==n?n:t},_addStorage:function(e){this.enabled||this._testStorage(e)&&(this.storage=e,this.enabled=!0)},_addPlugin:function(e){var t=this;if(f(e))return void c(e,function(e){t._addPlugin(e)});if(!u(this.plugins,function(t){return e===t})){if(this.plugins.push(e),!p(e))throw new Error("Plugins must be function values that return objects");var n=e.call(this);if(!d(n))throw new Error("Plugins must return an object of function properties");c(n,function(n,r){if(!p(n))throw new Error("Bad plugin property: "+r+" from plugin "+e.name+". Plugins should only return functions.");t._assignPluginFnProp(n,r)})}},addStorage:function(e){r("store.addStorage(storage) is deprecated. Use createStore([storages])"),this._addStorage(e)}},v=l(g,h,{plugins:[]});return v.raw={},c(v,function(e,t){p(e)&&(v.raw[t]=s(v,e))}),c(e,function(e){v._addStorage(e)}),c(t,function(e){v._addPlugin(e)}),v}var i=n(6),a=i.slice,u=i.pluck,c=i.each,s=i.bind,l=i.create,f=i.isList,p=i.isFunction,d=i.isObject;e.exports={createStore:o};var h={version:"2.0.12",enabled:!1,get:function(e,t){var n=this.storage.read(this._namespacePrefix+e);return this._deserialize(n,t)},set:function(e,t){return void 0===t?this.remove(e):(this.storage.write(this._namespacePrefix+e,this._serialize(t)),t)},remove:function(e){this.storage.remove(this._namespacePrefix+e)},each:function(e){var t=this;this.storage.each(function(n,r){e.call(t,t._deserialize(n),(r||"").replace(t._namespaceRegexp,""))})},clearAll:function(){this.storage.clearAll()},hasNamespace:function(e){return this._namespacePrefix=="__storejs_"+e+"_"},createStore:function(){return o.apply(this,arguments)},addPlugin:function(e){this._addPlugin(e)},namespace:function(e){return o(this.storage,this.plugins,e)}}},27:function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},28:function(e,t,n){"use strict";function r(){return l.localStorage}function o(e){return r().getItem(e)}function i(e,t){return r().setItem(e,t)}function a(e){for(var t=r().length-1;t>=0;t--){var n=r().key(t);e(o(n),n)}}function u(e){return r().removeItem(e)}function c(){return r().clear()}var s=n(6),l=s.Global;e.exports={name:"localStorage",read:o,write:i,each:a,remove:u,clearAll:c}},29:function(e,t,n){"use strict";function r(){return l.sessionStorage}function o(e){return r().getItem(e)}function i(e,t){return r().setItem(e,t)}function a(e){for(var t=r().length-1;t>=0;t--){var n=r().key(t);e(o(n),n)}}function u(e){return r().removeItem(e)}function c(){return r().clear()}var s=n(6),l=s.Global;e.exports={name:"sessionStorage",read:o,write:i,each:a,remove:u,clearAll:c}},30:function(e,t,n){"use strict";function r(e){if(!e||!c(e))return null;var t="(?:^|.*;\\s*)"+escape(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*";return unescape(p.cookie.replace(new RegExp(t),"$1"))}function o(e){for(var t=p.cookie.split(/; ?/g),n=t.length-1;n>=0;n--)if(f(t[n])){var r=t[n].split("="),o=unescape(r[0]),i=unescape(r[1]);e(i,o)}}function i(e,t){e&&(p.cookie=escape(e)+"="+escape(t)+"; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/")}function a(e){e&&c(e)&&(p.cookie=escape(e)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/")}function u(){o(function(e,t){a(t)})}function c(e){return new RegExp("(?:^|;\\s*)"+escape(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(p.cookie)}var s=n(6),l=s.Global,f=s.trim;e.exports={name:"cookieStorage",read:r,write:i,each:o,remove:a,clearAll:u};var p=l.document},31:function(e,t,n){"use strict";function r(e){return c[e]}function o(e,t){c[e]=t}function i(e){for(var t in c)c.hasOwnProperty(t)&&e(c[t],t)}function a(e){delete c[e]}function u(e){c={}}e.exports={name:"memoryStorage",read:r,write:o,each:i,remove:a,clearAll:u};var c={}},37:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var o=n(10),i=r(o),a=n(!function(){var e=new Error('Cannot find module "firebase/app"');throw e.code="MODULE_NOT_FOUND",e}()),u=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(a);n(!function(){var e=new Error('Cannot find module "firebase/auth"');throw e.code="MODULE_NOT_FOUND",e}());var c=n(9),s=r(c),l={apiKey:"AIzaSyCartjS5zcMZr-flNNGYZhPxOxu-IyV9S0",authDomain:"clique-eb9a9.firebaseapp.com",databaseURL:"https://clique-eb9a9.firebaseio.com",projectId:"clique-eb9a9",storageBucket:"clique-eb9a9.appspot.com",messagingSenderId:"389335213679"};u.initializeApp(l),window.clique=window.clique||{},clique.auth=function(){function e(){if(u.auth().currentUser)u.auth().signOut();else{var e=document.getElementById("email").value,t=document.getElementById("password").value;if(e.length<4)return void alert("Please enter an email address.");if(t.length<4)return void alert("Please enter a password.");u.auth().signInWithEmailAndPassword(e,t).catch(function(e){var t=e.code,n=e.message;"auth/wrong-password"===t?alert("Wrong password."):alert(n),console.log(e)})}}return 0==i.default.get("auth_state")&&u.auth().signOut(),u.auth().onAuthStateChanged(function(e){if(e)return e.displayName,e.email,e.emailVerified,e.photoURL,e.isAnonymous,e.uid,e.providerData,i.default.set("user_photoURL",e.photoURL),i.default.set("user_fullname",e.displayName),i.default.set("auth_state",!0),window.location.replace("/index.html");e||"/login/"==window.location.pathname||window.location.replace("/login")}),s.default.filter=function(e){var t=(e.target||e.srcElement).tagName;return s.default.setScope(/^(INPUT|TEXTAREA|SELECT)$/.test(t)?"input":"other"),!0},(0,s.default)("enter",function(){clique.auth.toggleSignIn()}),{toggleSignIn:e}}()},6:function(e,t,n){"use strict";(function(t){function n(e,t){return function(){return t.apply(e,Array.prototype.slice.call(arguments,0))}}function r(e,t){return Array.prototype.slice.call(e,t||0)}function o(e,t){a(e,function(e,n){return t(e,n),!1})}function i(e,t){var n=u(e)?[]:{};return a(e,function(e,r){return n[r]=t(e,r),!1}),n}function a(e,t){if(u(e)){for(var n=0;n<e.length;n++)if(t(e[n],n))return e[n]}else for(var r in e)if(e.hasOwnProperty(r)&&t(e[r],r))return e[r]}function u(e){return null!=e&&"function"!=typeof e&&"number"==typeof e.length}function c(e){return e&&"[object Function]"==={}.toString.call(e)}function s(e){return e&&"[object Object]"==={}.toString.call(e)}var l=function(){return Object.assign?Object.assign:function(e,t,n,r){for(var i=1;i<arguments.length;i++)o(Object(arguments[i]),function(t,n){e[n]=t});return e}}(),f=function(){if(Object.create)return function(e,t,n,o){var i=r(arguments,1);return l.apply(this,[Object.create(e)].concat(i))};var e=function(){};return function(t,n,o,i){var a=r(arguments,1);return e.prototype=t,l.apply(this,[new e].concat(a))}}(),p=function(){return String.prototype.trim?function(e){return String.prototype.trim.call(e)}:function(e){return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}}(),d="undefined"!=typeof window?window:t;e.exports={assign:l,create:f,trim:p,bind:n,slice:r,each:o,map:i,pluck:a,isList:u,isFunction:c,isObject:s,Global:d}}).call(t,n(27))},9:function(e,t,n){!function(t){function n(e,t){for(var n=e.length;n--;)if(e[n]===t)return n;return-1}function r(e,t){if(e.length!=t.length)return!1;for(var n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function o(e){for(_ in S)S[_]=e[j[_]]}function i(e){var t,r,i,a,u,s;if(t=e.keyCode,-1==n(O,t)&&O.push(t),93!=t&&224!=t||(t=91),t in S){S[t]=!0;for(i in x)x[i]==t&&(c[i]=!0)}else if(o(e),c.filter.call(this,e)&&t in b)for(s=h(),a=0;a<b[t].length;a++)if(r=b[t][a],r.scope==s||"all"==r.scope){u=r.mods.length>0;for(i in S)(!S[i]&&n(r.mods,+i)>-1||S[i]&&-1==n(r.mods,+i))&&(u=!1);(0!=r.mods.length||S[16]||S[18]||S[17]||S[91])&&!u||!1===r.method(e,r)&&(e.preventDefault?e.preventDefault():e.returnValue=!1,e.stopPropagation&&e.stopPropagation(),e.cancelBubble&&(e.cancelBubble=!0))}}function a(e){var t,r=e.keyCode,o=n(O,r);if(o>=0&&O.splice(o,1),93!=r&&224!=r||(r=91),r in S){S[r]=!1;for(t in x)x[t]==r&&(c[t]=!1)}}function u(){for(_ in S)S[_]=!1;for(_ in x)c[_]=!1}function c(e,t,n){var r,o;r=v(e),void 0===n&&(n=t,t="all");for(var i=0;i<r.length;i++)o=[],e=r[i].split("+"),e.length>1&&(o=m(e),e=[e[e.length-1]]),e=e[0],e=k(e),e in b||(b[e]=[]),b[e].push({shortcut:r[i],scope:t,method:n,key:r[i],mods:o})}function s(e,t){var n,o,i,a,u,c=[];for(n=v(e),a=0;a<n.length;a++){if(o=n[a].split("+"),o.length>1&&(c=m(o),e=o[o.length-1]),e=k(e),void 0===t&&(t=h()),!b[e])return;for(i=0;i<b[e].length;i++)u=b[e][i],u.scope===t&&r(u.mods,c)&&(b[e][i]={})}}function l(e){return"string"==typeof e&&(e=k(e)),-1!=n(O,e)}function f(){return O.slice(0)}function p(e){var t=(e.target||e.srcElement).tagName;return!("INPUT"==t||"SELECT"==t||"TEXTAREA"==t)}function d(e){P=e||"all"}function h(){return P||"all"}function g(e){var t,n,r;for(t in b)for(n=b[t],r=0;r<n.length;)n[r].scope===e?n.splice(r,1):r++}function v(e){var t;return e=e.replace(/\s/g,""),t=e.split(","),""==t[t.length-1]&&(t[t.length-2]+=","),t}function m(e){for(var t=e.slice(0,e.length-1),n=0;n<t.length;n++)t[n]=x[t[n]];return t}function y(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on"+t,function(){n(window.event)})}function w(){var e=t.key;return t.key=A,e}var _,b={},S={16:!1,18:!1,17:!1,91:!1},P="all",x={"⇧":16,shift:16,"⌥":18,alt:18,option:18,"⌃":17,ctrl:17,control:17,"⌘":91,command:91},E={backspace:8,tab:9,clear:12,enter:13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,del:46,delete:46,home:36,end:35,pageup:33,pagedown:34,",":188,".":190,"/":191,"`":192,"-":189,"=":187,";":186,"'":222,"[":219,"]":221,"\\":220},k=function(e){return E[e]||e.toUpperCase().charCodeAt(0)},O=[];for(_=1;_<20;_++)E["f"+_]=111+_;var j={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey"};for(_ in x)c[_]=!1;y(document,"keydown",function(e){i(e)}),y(document,"keyup",a),y(window,"focus",u);var A=t.key;t.key=c,t.key.setScope=d,t.key.getScope=h,t.key.deleteScope=g,t.key.filter=p,t.key.isPressed=l,t.key.getPressedKeyCodes=f,t.key.noConflict=w,t.key.unbind=s,e.exports=c}(this)}});