"use strict";function createLocation(t,e){return a.href=t||location.href,{state:e||null,pathname:"/"+(a.pathname||location.pathname).split("/").filter(Boolean).join("/"),search:a.search,hash:a.hash,key:t&&Math.random().toString(36).substr(2,5)}}function createHistory(){function t(){o.forEach(function(t){return t(r,n)})}function e(e){r=e.state||a[0],n="POP",t()}var n,o=[],r=createLocation(),a=[r];return{get length(){return a.length},get location(){return r},get action(){return n},listen:function(t){return o.push(t),1===o.length&&addEventListener("popstate",e,!1),function(){o.splice(o.indexOf(t),1),o.length||removeEventListener("popstate",e)}},push:function(e,o){r=createLocation(e,o),a.push(r),history.pushState(r,null,e),n="PUSH",t()},replace:function(e,o){r=createLocation(e,o),a.pop(),a.push(r),history.replaceState(r,null,e),n="REPLACE",t()},go:function(t){history.go(t)},back:function(){history.back()},forward:function(){history.forward()}}}var a=document.createElement("a");module.exports=createHistory;
//# sourceMappingURL=index.js.map
