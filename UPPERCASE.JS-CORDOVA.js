global.console=console=OBJECT({init:function(o,n){"use strict";var t,i,e=0;n.log=i=function(){var o,n,i=arguments;o="",EACH(i,function(n,t){var e=JSON.stringify(n);"string"==typeof n&&(e=e.substring(1,e.length-1)),o+=e,t<i.length-1&&(o+=" ")}),void 0===t&&(t=DIV({style:{position:"fixed",left:0,bottom:0,backgroundColor:"#fff",width:"100%",zIndex:999999,margin:0}}).appendTo(BODY)),t.append(n=P({style:{padding:2,margin:0,borderTop:"1px solid #F0F0F0",fontWeight:"bold",color:"#666"},c:o})),e+=1,t.show(),DELAY(5,function(){n.remove(),e-=1,0===e&&(t.remove(),t=void 0)})}}});