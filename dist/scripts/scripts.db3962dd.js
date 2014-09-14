"use strict";angular.module("whiteboardApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","LocalStorageModule"]).config(["localStorageServiceProvider",function(a){a.setPrefix("wb-div")}]).config(function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}),angular.module("whiteboardApp").controller("MainCtrl",["$interval","$scope","CRUDFactory",function(a,b,c){function d(a,b,d){c.readPostIts(function(b){a=b}),b=a[d]}b.postits=[],c.readPostIts(function(a){b.postits=a}),a(function(){c.readPostIts(function(a){var c=a;if(c.length>0){for(var e=0;e<b.postits.length;e++){var f=c[e],g=b.postits[e];void 0!==f&&(b.postits[e].text=f.text,b.postits[e].timestamp=f.timestamp),d(c,f,e),void 0!==f&&b.postits[e].status!==f.status&&(b.postits[e]=f),d(c,f,e),void 0!==f&&(f.position.x!==g.position.x||f.position.y!==g.position.y)&&(b.postits[e]=f)}if(d(c,null,null),c.length>b.postits.length)for(e=0;e<c.length-b.postits.length;e++)b.postits.push(c[e]);d(c,null,null)}else b.postits.length=0})},1e3)}]),angular.module("whiteboardApp").controller("AboutCtrl",function(){}),angular.module("whiteboardApp").directive("wbPostIt",["$document","CRUDFactory",function(a,b){return{templateUrl:"./scripts/directives/templates/post-it.html",restrict:"E",scope:{content:"="},link:function(c,d){function e(a){var b=m.width()-d.width(),c=m.offset().left;return a>=b?b:c>=a?c:a}function f(a){var b=m.height()+m.offset().top-50,c=m.offset().top;return a>b?b:c>a?c:a}function g(a){c.isBeingEdited||(k=f(a.screenY-j),l=e(a.screenX-i),d.css({top:k+"px",left:l+"px"}))}function h(){a.unbind("mousemove",g),a.unbind("mouseup",h),d.css({top:k+"px",left:l+"px"}),(l!==c.content.position.x||k!==c.content.position.y)&&(c.content.position.x=l,c.content.position.y=k,b.updatePostIt(c.content))}var i=d.offset().left,j=d.offset().top,k=c.content.position.y,l=c.content.position.x,m=$(".whiteboard");d.css({left:c.content.position.x+"px",top:c.content.position.y+"px"}),function(){d.bind("mousedown",function(b){c.isBeingEdited||c.$parent.ghostActive||(i=b.screenX-d.offset().left,j=b.screenY-d.offset().top,a.bind("mousemove",g),a.bind("mouseup",h))})}(),c.getStatusCss=function(){return c.content.status.replace(" ","-")},c.isBeingEdited=!1,d.hover(function(){$(this).find("wb-post-it-status-panel").css("opacity","1")},function(){c.isBeingEdited||($(this).find("wb-post-it-status-panel").css("opacity","0"),$(this).find(".postit-scroll-read").animate({scrollTop:0},600))})}}}]),angular.module("whiteboardApp").directive("wbWhiteboard",function(){return{templateUrl:"./scripts/directives/templates/whiteboard.html",restrict:"E"}}),angular.module("whiteboardApp").directive("wbPostItStatusPanel",function(){return{templateUrl:"./scripts/directives/templates/post-it-status-panel.html",restrict:"E",scope:{content:"="},controller:["$scope","CRUDFactory",function(a,b){a.postIts=a.$parent.$parent.postits,a.done="done",a.inProgress="in progress",a.notStarted="not started",a.onhold="on hold",a.showEditForm=!1,a.showEdit=function(){a.showEditForm=!a.showEditForm,a.$parent.isBeingEdited=!0},a.changeStatus=function(c){a.content.status=c,b.updatePostIt(a.content)},a.deletePostIt=function(c){b.deletePostIt(c);for(var d=0;d<a.postIts.length;d++)a.postIts[d].id===c&&a.postIts.splice(d,1)}}]}}),angular.module("whiteboardApp").directive("wbPostItCreate",["$document","CRUDFactory",function(a,b){return{templateUrl:"./scripts/directives/templates/postit-create.html",restrict:"E",link:function(c){function d(){a.bind("mousemove",j),a.bind("keydown",e),c.ghostActive=!1,c.toggleForm=!0}function e(a){27===a.keyCode&&(c.ghostActive?c.cancelCreationOfPostIt():q.hide())}function f(){p.hover(function(){a.bind("mouseup",m)},function(){a.unbind("mouseup",m)})}function g(a){var b=r.width()-p.width(),c=r.offset().left;return a>=b?b:c>=a?c:a}function h(a){var b=r.height()+r.offset().top-50,c=r.offset().top;return a>b?b:c>a?c:a}function i(a,b){var c=parseInt(p.css("margin")),d=r.width()+r.offset().left-c-1,e=r.offset().left+c,f=r.height()+r.offset().top-50+p.height(),g=r.offset().top+c;return a>d||e>a||b>f||g>b}function j(a){i(a.pageX,a.pageY)?(p.removeClass("inside-boundaries").addClass("outside-boundaries"),p.children().hide()):(p.removeClass("outside-boundaries").addClass("inside-boundaries"),p.children().show()),k(a.pageX-p.width(),a.pageY-p.height())}function k(a,b){n=g(a),o=h(b),p.css({top:o+"px",left:n+"px"})}function l(){p.unbind("mouseenter mouseleave"),a.unbind("mouseup",m)}function m(){l(),c.postItTemplate.position.x=n,c.postItTemplate.position.y=o,b.createPostIt(c.postItTemplate,function(a){c.postItTemplate.id=a.id,c.postits.push(c.postItTemplate),console.log("After CREATE success: PostIt was created on the server with an id of "+a.id),c.ghostActive=!1},function(){f()})}var n,o,p=$("#post-it-ghost"),q=$("#create-post-it-div"),r=$(".whiteboard");d(),c.toggleForm=function(){q.is(":visible")?q.hide():q.show()},c.cancelCreationOfPostIt=function(a){l(),c.ghostActive=!1,p.removeClass("outside-boundaries").addClass("inside-boundaries"),p.children().show(),c.postItText="",a&&c.toggleForm()},c.createPostItGhost=function(){var a=new Date;c.postItTemplate={id:"",author:c.username,text:c.postItText,status:"not started",position:{x:0,y:0},removed:!1,timestamp:a.getFullYear()+"-"+(a.getMonth()+1<10?"0":"")+(a.getMonth()+1)+"-"+(a.getDate()<10?"0":"")+a.getDate()+" - "+a.getHours()+":"+(a.getMinutes()<10?"0":"")+a.getMinutes()},f(),q.hide(),c.postItText="",c.ghostActive=!0}}}}]),angular.module("whiteboardApp").directive("wbPostitEdit",function(){return{templateUrl:"./scripts/directives/templates/post-it-edit.html",restrict:"E",scope:{content:"="},controller:["$scope","CRUDFactory",function(a,b){a.inputText=a.content.text,a.updatePostit=function(){if(a.content.text!==a.inputText){var c=new Date;a.content.text=a.inputText,a.content.timestamp=c.getFullYear()+"-"+(c.getMonth()+1<10?"0":"")+(c.getMonth()+1)+"-"+(c.getDate()<10?"0":"")+c.getDate()+" - "+c.getHours()+":"+(c.getMinutes()<10?"0":"")+c.getMinutes(),b.updatePostIt(a.content)}a.closeEditForm()},a.closeEditFormEsc=function(b){27===b.keyCode&&a.closeEditForm()},a.closeEditForm=function(){a.inputText=a.content.text,a.$parent.showEditForm=!1,a.$parent.$parent.isBeingEdited=!1}}]}}),angular.module("whiteboardApp").directive("wbLogin",function(){return{templateUrl:"./scripts/directives/templates/login.html",restrict:"E",controller:["$scope","localStorageService",function(a,b){a.username=b.get("username"),a.loggedIn=function(){return void 0!==a.username&&""!==a.username&&null!==a.username?!0:!1}(),a.login=function(){b.add("username",a.username),a.loggedIn=!0},a.logout=function(){b.remove("username"),a.loggedIn=!1,a.cancelCreationOfPostIt(!a.toggleForm)}}]}}),angular.module("whiteboardApp").factory("CRUDFactory",["$http",function(a){var b="http://api.beta2.se/wb-div-postits32";return{createPostIt:function(c,d,e){a.post(b,c).success(function(a){d(a)}).error(function(){e()})},readPostIts:function(c){a.get(b+"/").success(function(a){c(a)})},updatePostIt:function(c){a.put(b+"/"+c.id,c),console.log(c+" was updated on the server")},deletePostIt:function(c){a.delete(b+"/"+c),console.log(c+" was deleted from the server")}}}]);