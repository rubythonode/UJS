global.NODE_CONFIG=NODE_CONFIG={},global.CPU_CLUSTERING=CPU_CLUSTERING=METHOD(function(o){"use strict";var n=require("cluster");return{run:function(E){RUN(n.isMaster?function(){var o=function(){var o=n.fork();o.on("message",function(E){EACH(n.workers,function(n){n!==o&&n.send(E)})})};REPEAT(require("os").cpus().length,function(){o()}),n.on("exit",function(n,E,t){console.log(CONSOLE_RED("[UPPERCASE.JS-CPU_CLUSTERING] WORKER #"+n.id+" (PID:"+n.process.pid+") died. ("+(void 0!==t?t:E)+"). restarting...")),o()})}:function(){var t,e,i,r=n.worker.id,R=n.worker.process.pid,a={},c=function(o,n){var E=a[o];void 0!==E&&EACH(E,function(o){o(n)})};process.on("message",function(o){var n=PARSE_STR(o);void 0!==n&&c(n.methodName,n.data)}),o.on=t=function(o,n){var E=a[o];void 0===E&&(E=a[o]=[]),E.push(n)},t("__SHARED_STORE_SAVE",SHARED_STORE.save),t("__SHARED_STORE_REMOVE",SHARED_STORE.remove),t("__CPU_SHARED_STORE_SAVE",CPU_SHARED_STORE.save),t("__CPU_SHARED_STORE_REMOVE",CPU_SHARED_STORE.remove),o.off=e=function(o){delete a[o]},o.broadcast=i=function(o){process.send(STRINGIFY(o))},E({id:r,pid:R},t,e,i),console.log(CONSOLE_GREEN("[UPPERCASE.JS-CPU_CLUSTERING] RUNNING WORKER... (ID:"+r+", PID:"+R+")"))})}}}),global.CPU_SHARED_STORE=CPU_SHARED_STORE=CLASS(function(o){"use strict";var n,E,t,e={},i={};return o.save=n=function(o,n){var E=o.fullName,t=o.value,r=o.removeAfterSeconds,R=o.isWaitRemove;e[E]=t,R===!0&&void 0!==i[E]&&(i[E].remove(),delete i[E]),void 0!==r&&(i[E]=DELAY(r,n))},o.get=E=function(o){return e[o]},o.remove=t=function(o){delete e[o],void 0!==i[o]&&(i[o].remove(),delete i[o])},{init:function(n,E,t){var e,i,r,R;e=function(o){return t+"."+o},E.save=i=function(n){var E=n.name,t=e(E),i=n.value,r=n.removeAfterSeconds;o.save({fullName:t,value:i,removeAfterSeconds:r},function(){R(E)}),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__CPU_SHARED_STORE_SAVE",data:{fullName:t,value:i,isWaitRemove:void 0!==r}})},E.get=r=function(n){return o.get(e(n))},E.remove=R=function(n){var E=e(n);o.remove(E),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__CPU_SHARED_STORE_REMOVE",data:E})}}}}),global.SERVER_CLUSTERING=SERVER_CLUSTERING=METHOD(function(o){"use strict";return{run:function(n,E){var t,e,i,r,R=n.hosts,a=n.thisServerHost,c=n.port,s={},S={},u={},_=[];t=function(o){S[o]!==!0&&(S[o]=!0,CONNECT_TO_SOCKET_SERVER({host:o,port:c},{error:function(){delete S[o]},success:function(n,E,t){t({methodName:"__BOOTED",data:a}),u[o]=function(o){var n=o.methodName,E=o.data;t({methodName:"SERVER_CLUSTERING."+n,data:E})},n("__DISCONNECTED",function(){delete u[o],delete S[o]}),console.log("[UPPERCASE.JS-SERVER_CLUSTERING] CONNECTED CLUSTERING SERVER. (HOST:"+o+")"),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SERVER_CLUSTERING__CONNECT_TO_CLUSTERING_SERVER",data:o})}}))},void 0!==CPU_CLUSTERING.on&&CPU_CLUSTERING.on("__SERVER_CLUSTERING__CONNECT_TO_CLUSTERING_SERVER",t),EACH(R,function(o){o!==a&&t(o)}),SOCKET_SERVER(c,function(o,n){_.push(n),n("__BOOTED",function(o){t(o)}),EACH(s,function(o,E){EACH(o,function(o){n("SERVER_CLUSTERING."+E,o)})}),n("__DISCONNECTED",function(){REMOVE({array:_,value:n})})}),o.on=e=function(o,n){var E=s[o];void 0===E&&(E=s[o]=[]),E.push(n),EACH(_,function(E){E("SERVER_CLUSTERING."+o,n)})},e("__SHARED_STORE_SAVE",function(o){SHARED_STORE.save(o),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_SAVE",data:o})}),e("__SHARED_STORE_REMOVE",function(o){SHARED_STORE.remove(o),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_REMOVE",data:o})}),o.off=i=function(o){delete s[o]},o.broadcast=r=function(o){EACH(u,function(n){n(o)})},void 0!==E&&E(a,e,i,r),console.log(CONSOLE_BLUE("[UPPERCASE.JS-SERVER_CLUSTERING] RUNNING CLUSTERING SERVER... (THIS SERVER HOST:"+a+", PORT:"+c+")"))}}}),global.SHARED_STORE=SHARED_STORE=CLASS(function(o){"use strict";var n,E,t,e={},i={};return o.save=n=function(o,n){var E=o.fullName,t=o.value,r=o.removeAfterSeconds,R=o.isWaitRemove;e[E]=t,R===!0&&void 0!==i[E]&&(i[E].remove(),delete i[E]),void 0!==r&&(i[E]=DELAY(r,n))},o.get=E=function(o){return e[o]},o.remove=t=function(o){delete e[o],void 0!==i[o]&&(i[o].remove(),delete i[o])},{init:function(n,E,t){var e,i,r,R;e=function(o){return t+"."+o},E.save=i=function(n){var E=n.name,t=e(E),i=n.value,r=n.removeAfterSeconds;o.save({fullName:t,value:i,removeAfterSeconds:r},function(){R(E)}),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_SAVE",data:{fullName:t,value:i,isWaitRemove:void 0!==r}}),void 0!==SERVER_CLUSTERING.broadcast&&SERVER_CLUSTERING.broadcast({methodName:"__SHARED_STORE_SAVE",data:{fullName:t,value:i,isWaitRemove:void 0!==r}})},E.get=r=function(n){return o.get(e(n))},E.remove=R=function(n){var E=e(n);o.remove(E),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_REMOVE",data:E}),void 0!==SERVER_CLUSTERING.broadcast&&SERVER_CLUSTERING.broadcast({methodName:"__SHARED_STORE_REMOVE",data:E})}}}}),global.CONNECT_TO_SOCKET_SERVER=CONNECT_TO_SOCKET_SERVER=METHOD({run:function(o,n){"use strict";var E,t,e,i,r,R,a,c,s,S=o.host,u=o.port,_=require("net"),d={},C=0,O="";CHECK_IS_DATA(n)!==!0?E=n:(E=n.success,t=n.error),s=function(o,n,E){var t=d[o];void 0!==t&&EACH(t,function(o){o(n,function(o){void 0!==c&&void 0!==E&&c({methodName:"__CALLBACK_"+E,data:o})})})},e=_.connect({host:S,port:u},function(){i=!0,E(R=function(o,n){var E=d[o];void 0===E&&(E=d[o]=[]),E.push(n)},a=function(o,n){var E=d[o];void 0!==E&&(void 0!==n?REMOVE({array:E,value:n}):delete d[o])},c=function(o,n){var E="__CALLBACK_"+C;o.sendKey=C,C+=1,e.write(STRINGIFY(o)+"\n"),void 0!==n&&R(E,function(o){n(o),a(E)})},function(){r=!0,e.end()})}),e.on("data",function(o){var n,E,t;for(O+=o.toString();-1!==(E=O.indexOf("\n"));)n=O.substring(0,E),t=PARSE_STR(n),void 0!==t&&s(t.methodName,t.data,t.sendKey),O=O.substring(E+1)}),e.on("close",function(){r!==!0&&s("__DISCONNECTED")}),e.on("error",function(o){var n=o.toString();i!==!0?(console.log(CONSOLE_RED("[UPPERCASE.JS-CONNECT_TO_SOCKET_SERVER] CONNECT TO SOCKET SERVER FAILED: "+n)),void 0!==t&&t(n)):s("__ERROR",n)})}}),global.CONSOLE_BLUE=CONSOLE_BLUE=METHOD({run:function(o){"use strict";return"[36m"+o+"[0m"}}),global.CONSOLE_GREEN=CONSOLE_GREEN=METHOD({run:function(o){"use strict";return"[32m"+o+"[0m"}}),global.CONSOLE_RED=CONSOLE_RED=METHOD({run:function(o){"use strict";return"[31m"+o+"[0m"}}),global.CONSOLE_YELLOW=CONSOLE_YELLOW=METHOD({run:function(o){"use strict";return"[33m"+o+"[0m"}}),global.SHA1=SHA1=METHOD({run:function(o){"use strict";var n=o.key,E=o.password,t=require("crypto");return t.createHmac("sha1",n).update(E).digest("hex")}}),global.COPY_FILE=COPY_FILE=METHOD(function(){"use strict";var o=require("fs"),n=require("path");return{run:function(E,t){var e,i,r=E.srcPath,R=E.distPath,a=E.isSync;void 0!==t&&(CHECK_IS_DATA(t)!==!0?e=t:(e=t.success,i=t.error)),CREATE_FOLDER({path:n.dirname(R),isSync:a},{error:i,success:function(){RUN(a!==!0?function(){var n=o.createReadStream(r);n.pipe(o.createWriteStream(R)),n.on("error",function(o){var n=o.toString();console.log(CONSOLE_RED("[UPPERCASE.JS-COPY_FILE] ERROR:"+n)),void 0!==i&&i(n)}),n.on("end",function(){void 0!==e&&e()})}:function(){var n;try{o.writeFileSync(R,o.readFileSync(r)),void 0!==e&&e()}catch(E){E!==TO_DELETE&&(n=E.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-COPY_FILE] ERROR: "+n)),void 0!==i&&i(n))}})}})}}}),global.CREATE_FOLDER=CREATE_FOLDER=METHOD(function(){"use strict";var o=require("fs"),n=require("path");return{run:function(E,t){var e,i,r,R,a;CHECK_IS_DATA(E)!==!0?e=E:(e=E.path,i=E.isSync),void 0!==t&&(CHECK_IS_DATA(t)!==!0?R=t:(R=t.success,a=t.error)),i!==!0?o.exists(e,function(E){E===!0?void 0!==R&&R():(r=n.dirname(e),o.exists(r,function(n){n===!0?o.mkdir(e,function(o){var n;o!==TO_DELETE?(n=o.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-CREATE_FOLDER] ERROR: "+n)),void 0!==a&&a(n)):R()}):CREATE_FOLDER(r,function(){CREATE_FOLDER(e,R)})}))}):RUN(function(){var E;try{o.existsSync(e)!==!0&&(r=n.dirname(e),o.existsSync(r)===!0?o.mkdirSync(e):(CREATE_FOLDER({path:r,isSync:!0}),CREATE_FOLDER({path:e,isSync:!0}))),void 0!==R&&R()}catch(t){t!==TO_DELETE&&(E=t.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-CREATE_FOLDER] ERROR: "+E)),void 0!==a&&a(E))}})}}}),global.FIND_FILE=FIND_FILE=METHOD(function(){"use strict";{var o=require("fs");require("path")}return{run:function(n,E){var t,e,t,i,r,R=[];return CHECK_IS_DATA(n)!==!0?t=n:(t=n.folderPath,e=n.isSync),void 0!==E&&(CHECK_IS_DATA(E)!==!0?i=E:(i=E.success,r=E.error)),e===!0?RUN(function(){var n,E;try{return n=o.readdirSync(t),EACH(n,function(n){o.statSync(t+"/"+n).isDirectory()!==!0&&R.push(n)}),void 0!==i&&i(R),R}catch(e){e!==TO_DELETE&&(E=e.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-FIND_FILE] ERROR: "+E)),void 0!==r&&r(E))}}):void o.readdir(t,function(n,E){var e;n!==TO_DELETE?(e=n.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-FIND_FILE] ERROR:"+e)),void 0!==r&&r(e)):void 0!==i&&PARALLEL(E,[function(n,E){o.stat(t+"/"+n,function(o,t){var e;o!==TO_DELETE?(e=o.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-FIND_FILE] ERROR:"+e)),void 0!==r&&r(e)):(t.isDirectory()!==!0&&R.push(n),E())})},function(){void 0!==i&&i(R)}])})}}}),global.FIND_FOLDER=FIND_FOLDER=METHOD(function(){"use strict";{var o=require("fs");require("path")}return{run:function(n,E){var t,e,t,i,r,R=[];return CHECK_IS_DATA(n)!==!0?t=n:(t=n.folderPath,e=n.isSync),void 0!==E&&(CHECK_IS_DATA(E)!==!0?i=E:(i=E.success,r=E.error)),e===!0?RUN(function(){var n,E;try{return n=o.readdirSync(t),EACH(n,function(n){o.statSync(t+"/"+n).isDirectory()===!0&&R.push(n)}),void 0!==i&&i(R),R}catch(e){e!==TO_DELETE&&(E=e.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-FIND_FOLDER] ERROR: "+E)),void 0!==r&&r(E))}}):void o.readdir(t,function(n,E){var e;n!==TO_DELETE?(e=n.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-FIND_FOLDER] ERROR:"+e)),void 0!==r&&r(e)):void 0!==i&&PARALLEL(E,[function(n,E){o.stat(t+"/"+n,function(o,t){var e;o!==TO_DELETE?(e=o.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-FIND_FOLDER] ERROR:"+e)),void 0!==r&&r(e)):(t.isDirectory()===!0&&R.push(n),E())})},function(){void 0!==i&&i(R)}])})}}}),global.MOVE_FILE=MOVE_FILE=METHOD({run:function(o,n){"use strict";var E,t,e=o.srcPath,i=o.isSync;CHECK_IS_DATA(n)!==!0?E=n:(E=n.success,t=n.error),COPY_FILE(o,{error:t,success:function(){REMOVE_FILE({path:e,isSync:i},{error:t,success:E})}})}}),global.READ_FILE=READ_FILE=METHOD(function(){"use strict";var o=require("fs");return{run:function(n,E){var t,e,i,r,R;return CHECK_IS_DATA(n)!==!0?t=n:(t=n.path,e=n.isSync),void 0!==E&&(CHECK_IS_DATA(E)!==!0?i=E:(i=E.success,r=E.notExists,R=E.error)),e===!0?RUN(function(){var n,E;try{if(o.existsSync(t)===!0){if(o.statSync(t).isDirectory()!==!0)return E=o.readFileSync(t),void 0!==i&&i(E),E;void 0!==r?r(t):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-READ_FILE] NOT EXISTS! <"+t+">"))}else void 0!==r?r(t):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-READ_FILE] NOT EXISTS! <"+t+">"))}catch(e){e!==TO_DELETE&&(n=e.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-READ_FILE] ERROR: "+n)),void 0!==R&&R(n))}}):void o.exists(t,function(n){n===!0?o.stat(t,function(n,E){var e;n!==TO_DELETE?(e=n.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-READ_FILE] ERROR: "+e)),void 0!==R&&R(e)):E.isDirectory()===!0?void 0!==r?r(t):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-READ_FILE] NOT EXISTS! <"+t+">")):o.readFile(t,function(o,n){var E;o!==TO_DELETE?(E=o.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-READ_FILE] ERROR: "+E)),void 0!==R&&R(E)):void 0!==i&&i(n)})}):void 0!==r?r(t):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-READ_FILE] NOT EXISTS! <"+t+">"))})}}}),global.REMOVE_FILE=REMOVE_FILE=METHOD(function(){"use strict";var o=require("fs");return{run:function(n,E){var t,e,i,r,R;CHECK_IS_DATA(n)!==!0?t=n:(t=n.path,e=n.isSync),CHECK_IS_DATA(E)!==!0?i=E:(i=E.success,r=E.notExists,R=E.error),e!==!0?o.exists(t,function(n){n===!0?o.unlink(t,function(o){var n;o!==TO_DELETE?(n=o.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-REMOVE_FILE] ERROR: "+n)),void 0!==R&&R(n)):void 0!==i&&i()}):void 0!==r?r(t):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-REMOVE_FILE] NOT EXISTS! <"+t+">"))}):RUN(function(){var n;try{o.existsSync(t)===!0?(o.unlinkSync(t),void 0!==i&&i()):void 0!==r?r(t):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-REMOVE_FILE] NOT EXISTS! <"+t+">"))}catch(E){E!==TO_DELETE&&(n=E.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-REMOVE_FILE] ERROR: "+n)),void 0!==R&&R(n))}})}}}),global.WRITE_FILE=WRITE_FILE=METHOD(function(){"use strict";var o=require("fs"),n=require("path");return{run:function(E,t){var e,i,r=E.path,R=E.content,a=E.buffer,c=E.isSync;void 0!==t&&(CHECK_IS_DATA(t)!==!0?e=t:(e=t.success,i=t.error)),CREATE_FOLDER({path:n.dirname(r),isSync:c},function(){c!==!0?o.writeFile(r,void 0!==a?a:R,function(o){var n;o!==TO_DELETE?(n=o.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-WRITE_FILE] ERROR:"+n)),void 0!==i&&i(n)):void 0!==e&&e()}):RUN(function(){var n;try{o.writeFileSync(r,void 0!==a?a:R),void 0!==e&&e()}catch(E){E!==TO_DELETE&&(n=E.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-WRITE_FILE] ERROR: "+n)),void 0!==i&&i(n))}})})}}}),global.DELETE=DELETE=METHOD({run:function(o,n){"use strict";REQUEST(COMBINE([CHECK_IS_DATA(o)===!0?o:{uri:o},{method:"DELETE"}]),n)}}),global.GET=GET=METHOD({run:function(o,n){"use strict";REQUEST(COMBINE([CHECK_IS_DATA(o)===!0?o:{uri:o},{method:"GET"}]),n)}}),global.POST=POST=METHOD({run:function(o,n){"use strict";REQUEST(COMBINE([CHECK_IS_DATA(o)===!0?o:{uri:o},{method:"POST"}]),n)}}),global.PUT=PUT=METHOD({run:function(o,n){"use strict";REQUEST(COMBINE([CHECK_IS_DATA(o)===!0?o:{uri:o},{method:"PUT"}]),n)}}),global.REQUEST=REQUEST=METHOD(function(){"use strict";var o=require("http"),n=require("https");return{run:function(E,t){var e,i,r,R=void 0===E.host?"localhost":E.host,a=E.isSecure,c=void 0===E.port?a!==!0?80:443:E.port,s=E.method,S=E.uri,u=void 0!==E.data?"data="+encodeURIComponent(STRINGIFY(E.data)):E.paramStr;CHECK_IS_DATA(t)!==!0?e=t:(e=t.success,i=t.error),u=(void 0===u?"":u+"&")+Date.now(),s=s.toUpperCase(),"GET"===s?r=(a!==!0?o:n).get({hostname:R,port:c,path:"/"+S+"?"+u},function(o){o.setEncoding("utf-8"),o.on("data",function(o){e(o)})}):(r=(a!==!0?o:n).request({hostname:R,port:c,path:"/"+S,method:s},function(o){o.setEncoding("utf-8"),o.on("data",function(o){e(o)})}),r.write(u),r.end()),r.on("error",function(o){var n=o.toString();console.log(CONSOLE_RED("[UPPERCASE.JS-NODE] REQUEST FAILED: "+n),E),void 0!==i&&i(n)})}}}),global.REALTIME_SERVER=REALTIME_SERVER=METHOD({run:function(o,n){"use strict";var E=require("net"),t=E.createServer(function(o){var E,t,e,i,r={},R=0,a="",c=function(o,n,E){var t=r[o];void 0!==t&&EACH(t,function(o){o(n,function(o){void 0!==E&&i({methodName:"__CALLBACK_"+E,data:o})})})};o.on("data",function(o){var n,E,t;for(a+=o.toString();-1!==(E=a.indexOf("\n"));)n=a.substring(0,E),t=PARSE_STR(n),void 0!==t&&c(t.methodName,t.data,t.sendKey),a=a.substring(E+1)}),o.on("close",function(){E!==!0&&c("__DISCONNECTED"),r=void 0}),o.on("error",function(o){var n=o.toString();console.log("[UPPERCASE.JS-SOCEKT_SERVER] ERROR:",n),c("__ERROR",n)}),n({ip:o.remoteAddress},t=function(o,n){var E=r[o];void 0===E&&(E=r[o]=[]),E.push(n)},e=function(o,n){var E=r[o];void 0!==E&&(void 0!==n?REMOVE({array:E,value:n}):delete r[o])},i=function(n,E){var i="__CALLBACK_"+R;n.sendKey=R,R+=1,o.write(STRINGIFY(n)+"\n"),void 0!==E&&t(i,function(o){E(o),e(i)})},function(){E=!0,o.end()})});t.listen(o),console.log("[UPPERCASE.JS-SOCKET_SERVER] RUNNING SOCKET SERVER... (PORT:"+o+")")}}),global.RESOURCE_SERVER=RESOURCE_SERVER=CLASS(function(o){"use strict";var n,E=require("path"),t=require("querystring");return o.getContentTypeFromURI=n=function(o){var n=E.extname(o);return".png"===n?"image/png":".jpeg"===n||".jpg"===n?"image/jpeg":".gif"===n?"image/gif":".svg"===n?"image/svg+xml":".js"===n?"application/javascript":".json"===n?"application/json":".css"===n?"text/css":".text"===n||".txt"===n?"text/plain":".html"===n?"text/html":".swf"===n?"application/x-shockwave-flash":".mp3"===n?"audio/mpeg":"application/octet-stream"},{init:function(o,E,e,i){var r,R,a,c,s,S=(require("path"),e.port),u=e.securedPort,_=e.rootPath,d=e.version,C={};void 0!==i&&(CHECK_IS_DATA(i)!==!0?r=i:(r=i.requestListener,R=i.error,a=i.notExistsResource)),c=WEB_SERVER(e,function(o,E,e){var i,c,s,S=_,u=o.uri,O=o.uri,v=o.method,T=o.params,f=o.headers,l={};NEXT([function(n){void 0!==r&&(i=r(o,E,e,function(o){S=o},function(o){l=o,n()}),O=o.uri,v=o.method,T=o.params,f=o.headers),i!==!1&&o.isResponsed!==!0&&n()},function(){return function(){CONFIG.isDevMode!==!0&&(l.isFinal!==!0?void 0!==d&&f["if-none-match"]===d:void 0!==f["if-none-match"])?E({statusCode:304}):CONFIG.isDevMode!==!0&&l.isFinal!==!0&&void 0!==d&&""!==u&&T.version!==d?E({statusCode:302,headers:{Location:"/"+u+"?"+t.stringify(COMBINE([T,{version:d}]))}}):"GET"===v&&(c=function(n){void 0!==a&&a(n,o,E),o.isResponsed!==!0&&E({statusCode:404})},s=function(n){console.log(CONSOLE_RED("[UPPERCASE.JS-RESOURCE_SERVER] ERROR: "+n)),void 0!==R&&R(n,o,E),o.isResponsed!==!0&&E({statusCode:500})},NEXT([function(o){var n=C[u];void 0!==n?o(n.buffer,n.contentType):READ_FILE(S+"/"+O,{notExists:function(){READ_FILE(S+(""===O?"":"/"+O)+"/index.html",{notExists:c,error:s,success:function(n){o(n,"text/html")}})},error:s,success:o})},function(){return function(o,t){void 0===t&&(t=n(O)),CONFIG.isDevMode!==!0&&l.isFinal!==!0&&void 0===C[u]&&(C[u]={buffer:o,contentType:t}),E(EXTEND({origin:{buffer:o,contentType:t,version:d},extend:l}))}}]))}}])}),console.log("[UPPERCASE.JS-RESOURCE_SERVER] RUNNING RESOURCE SERVER..."+(void 0===S?"":" (PORT:"+S+")")+(void 0===u?"":" (SECURED PORT:"+u+")")),E.getNativeHTTPServer=s=function(){return c.getNativeHTTPServer()}}}}),global.SOCKET_SERVER=SOCKET_SERVER=METHOD({run:function(o,n){"use strict";var E=require("net"),t=E.createServer(function(o){var E,t,e,i,r={},R=0,a="",c=function(o,n,E){var t=r[o];void 0!==t&&EACH(t,function(o){o(n,function(o){void 0!==E&&i({methodName:"__CALLBACK_"+E,data:o})})})};o.on("data",function(o){var n,E,t;for(a+=o.toString();-1!==(E=a.indexOf("\n"));)n=a.substring(0,E),t=PARSE_STR(n),void 0!==t&&c(t.methodName,t.data,t.sendKey),a=a.substring(E+1)}),o.on("close",function(){E!==!0&&c("__DISCONNECTED"),r=void 0}),o.on("error",function(o){var n=o.toString();console.log("[UPPERCASE.JS-SOCEKT_SERVER] ERROR:",n),c("__ERROR",n)}),n({ip:o.remoteAddress},t=function(o,n){var E=r[o];void 0===E&&(E=r[o]=[]),E.push(n)},e=function(o,n){var E=r[o];void 0!==E&&(void 0!==n?REMOVE({array:E,value:n}):delete r[o])},i=function(n,E){var i="__CALLBACK_"+R;n.sendKey=R,R+=1,o.write(STRINGIFY(n)+"\n"),void 0!==E&&t(i,function(o){E(o),e(i)})},function(){E=!0,o.end()})});t.listen(o),console.log("[UPPERCASE.JS-SOCKET_SERVER] RUNNING SOCKET SERVER... (PORT:"+o+")")}}),global.WEB_SERVER=WEB_SERVER=CLASS(function(o){"use strict";var n,E=require("http"),t=require("querystring"),e=require("zlib");return o.getEncodingFromContentType=n=function(o){return"application/javascript"===o?"utf-8":"application/json"===o?"utf-8":"text/css"===o?"utf-8":"text/plain"===o?"binary":"text/html"===o?"utf-8":"image/png"===o?"binary":"image/jpeg"===o?"binary":"image/gif"===o?"binary":"image/svg+xml"===o?"utf-8":"application/x-shockwave-flash"===o?"binary":"audio/mpeg"===o?"binary":"binary"},{init:function(o,i,r,R){var a,c,s,S,u,_,d,C;CHECK_IS_DATA(r)!==!0?a=r:(a=r.port,c=r.securedPort,s=r.securedKeyFilePath,S=r.securedCertFilePath,u=r.notParsingNativeReqURIs),d=function(o,E){var i,r,a=o.headers,c=o.url,s=o.method.toUpperCase(),S=a["X-Forwarded-For"],_=a["accept-encoding"],d=[];void 0===S&&(S=o.connection.remoteAddress),void 0===_&&(_=""),-1!=c.indexOf("?")&&(i=c.substring(c.indexOf("?")+1),c=c.substring(0,c.indexOf("?"))),c=c.substring(1),NEXT([function(n){"GET"===s||CHECK_IS_IN({array:u,value:c})===!0?n():(o.on("data",function(o){void 0===i&&(i=""),i+=o}),o.on("end",function(){n()}))},function(){return function(){R(r={headers:a,uri:c,method:s,params:t.parse(i),ip:S,cookies:PARSE_COOKIE_STR(a.cookie),nativeReq:o},function(o){var t,i,R,a,c,s,S,u;r.isResponsed!==!0&&(CHECK_IS_DATA(o)!==!0?a=o:(t=o.statusCode,i=o.headers,R=o.contentType,a=o.content,c=o.buffer,s=o.encoding,S=o.version,u=o.isFinal),void 0===t&&(t=200),void 0===i&&(i={}),void 0!==R&&(void 0===s&&(s=n(R)),i["Content-Type"]=R+"; charset="+s),CONFIG.isDevMode!==!0&&(u===!0?i.ETag="FINAL":void 0!==S&&(i.ETag=S)),_.match(/\bgzip\b/)!==TO_DELETE?(i["Content-Encoding"]="gzip",e.gzip(void 0!==c?c:a,function(o,n){E.writeHead(t,i),E.end(n,s)})):(E.writeHead(t,i),E.end(void 0!==c?c:a,s)),r.isResponsed=!0)},function(o){d.push(o)})}}]),CHECK_IS_IN({array:u,value:c})!==!0&&o.on("close",function(){EACH(d,function(o){o()})})},void 0!==a&&(_=E.createServer(d).listen(a)),void 0!==c&&(_=https.createServer({key:fs.readFileSync(s),cert:fs.readFileSync(S)},d).listen(c)),console.log("[UPPERCASE.JS-WEB_SERVER] RUNNING WEB SERVER..."+(void 0===a?"":" (PORT:"+a+")")+(void 0===c?"":" (SECURED PORT:"+c+")")),i.getNativeHTTPServer=C=function(){return _}}}}),global.PARSE_COOKIE_STR=PARSE_COOKIE_STR=METHOD({run:function(o){"use strict";var n,E={};return void 0!==o&&(n=o.split(";"),EACH(n,function(o){var n=o.split("=");E[n[0].trim()]=decodeURIComponent(n[1])})),E}}),global.CREATE_COOKIE_STR_ARRAY=CREATE_COOKIE_STR_ARRAY=METHOD({run:function(o){"use strict";var n=[];return EACH(o,function(o,E){n.push(E+"="+encodeURIComponent(o))}),n}});