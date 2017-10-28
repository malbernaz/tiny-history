"use strict";function createURL(t){var e=document.createElement("a");return e.href=t,{pathname:"/"+e.pathname.split("/").filter(Boolean).join("/"),search:e.search,hash:e.hash}}function createLocation(t,e){var n,r={state:e||null};if(void 0===t)n=createURL(location.href);else{var o=Math.random().toString(36).substr(2,5);n=createURL(t),r.key=o}return r.pathname=n.pathname,r.search=n.search,r.hash=n.hash,r}function createHistory(){function t(t){n=t.state||r[0],e.forEach(function(t){return t(n,"POP")})}var e=[],n=createLocation(),r=[n];return{go:function(t){return history.go(t)},back:function(){return history.back()},forward:function(){return history.forward()},get length(){return r.length},get location(){return n},listen:function(n){if("function"!=typeof n)throw Error("listener must be a function");return e.push(n),1===e.length&&addEventListener("popstate",t,!1),function(){(e=e.filter(function(t,r){return r!==e.indexOf(n)})).length||removeEventListener("popstate",t)}},push:function(t,o){n=createLocation(t,o),r.push(n),history.pushState(n,null,t),e.forEach(function(t){return t(n,"PUSH")})},replace:function(t,o){n=createLocation(t,o),r.pop(),r.push(n),history.replaceState(n,null,t),e.forEach(function(t){return t(n,"REPLACE")})}}}module.exports=createHistory;
//# sourceMappingURL=index.js.map
