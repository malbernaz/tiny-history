function createLocation(t,n){return a.href=t||location.href,{state:n||null,pathname:"/"+(a.pathname||location.pathname).split("/").filter(Boolean).join("/"),search:a.search,hash:a.hash,key:t&&Math.random().toString(36).substr(2,5)}}function createHistory(){function t(){o.forEach(function(t){return t(a,e)})}function n(n){a=n.state||r[0],e="POP",t()}var e,o=[],a=createLocation(),r=[a];return{get length(){return r.length},get location(){return a},get action(){return e},listen:function(t){return o.push(t),1===o.length&&addEventListener("popstate",n,!1),function(){o.splice(o.indexOf(t),1),o.length||removeEventListener("popstate",n)}},push:function(n,o){a=createLocation(n,o),r.push(a),history.pushState(a,null,n),e="PUSH",t()},replace:function(n,o){a=createLocation(n,o),r.pop(),r.push(a),history.replaceState(a,null,n),e="REPLACE",t()},go:function(t){history.go(t)},back:function(){history.back()},forward:function(){history.forward()}}}var a=document.createElement("a");export default createHistory;
//# sourceMappingURL=tiny-history.esm.js.map
