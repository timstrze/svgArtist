"use strict";angular.module("svgArtistApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngMaterial","ngMessages","ngMdIcons"]).config(["$routeProvider",function(a){a.when("/svg-artist-demo",{templateUrl:"views/routes/main.html",controller:"MainController",controllerAs:"ctrl"})}]),angular.module("svgArtistApp").filter("keyboardShortcut",["$window",function(a){return function(b){if(b){var c=b.split("-"),d=/Mac OS X/.test(a.navigator.userAgent),e=!d||c.length>2?"+":"",f={M:d?"⌘":"Ctrl",A:d?"Option":"Alt",S:"Shift"};return c.map(function(a,b){var d=b==c.length-1;return d?a:f[a]}).join(e)}}}]).controller("MainController",["$mdDialog","SvgArtist",function(a,b){this.svgArtistDemo=new b({target:".svg-artist-demo"}),this.settings={printLayout:!0,showRuler:!0,showSpellingSuggestions:!0,presentationMode:"edit"},this.sampleAction=function(b,c){a.show(a.alert().title(b).content('You triggered the "'+b+'" action').ok("Great").targetEvent(c))},this.init=function(){},this.clickButton=function(a){return alert(1),a},this.init()}]),angular.module("svgArtistApp").factory("Layers",["$resource",function(a){var b=function(a){var b=this;Object.keys(a).forEach(function(c){b[c]=a[c]})};return b.http=a("json/-layers.json/:id",{id:"@id"},{get:{method:"GET"}}),b}]),angular.module("svgArtistApp").factory("SvgArtist",["$rootScope",function(a){var b=function(a){var b=this;Object.keys(a).forEach(function(c){b[c]=a[c]}),this.svgContainer=d3.select(this.target),this.svgArtist=this.svgContainer.append("g").attr("name","svgArtist").attr("class","svg-artist"),this.Layers=[]},c=function(a,b){var c=d3.mouse(b.node());a.attr("x1",c[0]).attr("y1",c[1]).attr("x2",c[0]).attr("y2",c[1]).attr({"class":"drawn-line",fill:"none","shape-rendering":"crispEdges","stroke-width":"2px",stroke:"steelblue","stroke-linecap":"round"}),b.on("mousemove",function(){d(b,a)})},d=function(a,b){var c=d3.mouse(a.node());b.attr("x2",c[0]).attr("y2",c[1])},e=function(){for(var a=atob(document.querySelector("canvas").toDataURL().replace(/^data:image\/(png|jpg);base64,/,"")),b=new ArrayBuffer(a.length),c=new Uint8Array(b),d=0;d<a.length;d++)c[d]=a.charCodeAt(d);var e=new DataView(b),f=new Blob([e],{type:"image/png"}),g=self.URL||self.webkitURL||self,h=g.createObjectURL(f),i='<img src="'+h+'">';d3.select("#img").html(i)};return b.prototype.createNewLayer=function(){this.Layers.unshift({name:"Layer "+this.Layers.length,layer:this.svgArtist.append("g").attr("name","Layer "+this.Layers.length).attr("class","layer"),items:[]}),this.selectedLayer=this.Layers[0]},b.prototype.activateCreateLine=function(){var b=this;this.createLineActive=!0,this.selectedLayer||(0===this.Layers.length&&this.Layers.push({name:"Layer 0",layer:this.svgArtist.append("g").attr("name","Layer 0").attr("class","layer"),items:[]}),this.selectedLayer=this.Layers[0]);var d=this.svgContainer,e=this.selectedLayer.layer.append("line");this.selectedLayer.items.unshift(e),d.on("mousedown",function(){c(e,d)}).on("mouseup",function(){b.createLineActive=!1,d.on("mousemove",null),d.on("mousedown",null),d.on("mouseup",null),a.$apply()})},b.prototype.saveImageToDesktop=function(){var a=d3.select(".base-chart svg").attr("version",1.1).attr("xmlns","http://www.w3.org/2000/svg").node().parentNode.innerHTML,b="data:image/svg+xml;base64,"+btoa(a),c='<img src="'+b+'">';d3.select("#svgdataurl").html(c);var d=document.querySelector(".export-canvas"),f=d3.select(".base-chart svg").node().getBoundingClientRect();d.height=f.height,d.width=f.width;var g=d.getContext("2d"),h=new Image;h.src=b,h.onload=function(){g.drawImage(h,0,0),e();var a=document.createElement("a");a.download="sample.png",a.href=d.toDataURL("image/png");var b='<img src="'+a.href+'">';d3.select("#pngdataurl").html(b),a.click()}},b.prototype.selectLayer=function(a){this.selectedLayer=a},b.prototype.undoAction=function(){this.Layers.length>0&&(this.Layers[0].item.remove(),this.Layers.shift())},b.prototype.makeSelection=function(){this.selectItemActive=!this.selectItemActive},b.prototype.removeAllLayers=function(){angular.forEach(this.Layers,function(a){angular.forEach(a.items,function(a){a.remove()})}),this.Layers=[],this.selectedLayer=null},b.prototype.removeLayer=function(){angular.forEach(this.selectedLayer.items,function(a){a.remove()}),this.Layers.splice(this.Layers.indexOf(this.selectedLayer),1),this.selectedLayer=this.Layers[0]},b}]),angular.module("svgArtistApp").run(["$templateCache",function(a){a.put("views/routes/main.html",'<div ng-cloak class="main"> <div layout="row"> <div flex="100" class="chart-buttons"> <md-button aria-label="Select" ng-class="{\'md-raised\':ctrl.svgArtistDemo.selectItemActive}" ng-click="ctrl.svgArtistDemo.makeSelection()"> <md-icon md-svg-icon="images/icons/arrow-up-left.svg"></md-icon> </md-button> <md-button aria-label="Pen"> <md-icon md-svg-icon="images/icons/pen.svg"></md-icon> </md-button> <md-button aria-label="Add Line" ng-class="{\'md-raised\':ctrl.svgArtistDemo.createLineActive}" ng-click="ctrl.svgArtistDemo.activateCreateLine()"> <ng-md-icon icon="create" style="fill: black" size="18"></ng-md-icon> </md-button> <md-button aria-label="Add Text"> <ng-md-icon icon="text_format" style="fill: black" size="18"></ng-md-icon> </md-button> <md-menu md-offset="0 -7"> <md-button ng-disabled="!ctrl.svgArtistDemo.Layers.length" aria-label="Open demo menu" ng-click="$mdOpenMenu($event)"> <ng-md-icon md-menu-origin icon="layers" style="fill: black" size="18"></ng-md-icon>{{ctrl.svgArtistDemo.Layers.length}} </md-button> <md-menu-content width="4"> <md-menu-item ng-repeat="item in ctrl.svgArtistDemo.Layers"> <md-button aria-label="Select Layer" ng-click="ctrl.svgArtistDemo.selectLayer(item)"> <div layout="row"> <p flex>{{item.name}}</p> </div></md-button> </md-menu-item> </md-menu-content> </md-menu> <md-button aria-label="New Layer" ng-click="ctrl.svgArtistDemo.createNewLayer()"> <ng-md-icon icon="content_copy" style="fill: black" size="18"></ng-md-icon> </md-button> <md-button aria-label="Clear" ng-click="ctrl.svgArtistDemo.removeAllLayers()"> <ng-md-icon icon="layers_clear" style="fill: black" size="18"></ng-md-icon> </md-button> <!--<md-button aria-label="Rotate">--> <!--<ng-md-icon icon="refresh" style="fill: black" size="18"></ng-md-icon>--> <!--</md-button>--> <!--<md-button aria-label="Undo" ng-click="ctrl.svgArtistDemo.undoAction()">--> <!--<ng-md-icon icon="undo" style="fill: black" size="18"></ng-md-icon>--> <!--</md-button>--> <md-button aria-label="Save" ng-click="ctrl.svgArtistDemo.saveImageToDesktop()"> <ng-md-icon icon="save" style="fill: black" size="18"></ng-md-icon> </md-button> <md-input-container> <input aria-label="Selected Layer" ng-if="ctrl.svgArtistDemo.selectedLayer" ng-model="ctrl.svgArtistDemo.selectedLayer.name"> </md-input-container> <md-button aria-label="Hide/Show Layer" ng-if="ctrl.svgArtistDemo.selectedLayer"> <md-icon md-svg-icon="images/icons/eye.svg"></md-icon> </md-button> <md-button aria-label="Remove Layer" ng-if="ctrl.svgArtistDemo.selectedLayer" ng-click="ctrl.svgArtistDemo.removeLayer()"> <ng-md-icon icon="delete" style="fill: black" size="18"></ng-md-icon> </md-button> </div> </div> <md-toolbar class="md-menu-toolbar"> <div layout="row"> <div> <h2 class="md-toolbar-tools">svgArtist</h2> <md-menu-bar> <md-menu> <button ng-click="$mdOpenMenu()"> File </button> <md-menu-content> <md-menu-item> <md-button ng-click="ctrl.sampleAction(\'share\', $event)"> Share... </md-button> </md-menu-item> <md-menu-divider></md-menu-divider> <md-menu-item> <md-menu> <md-button ng-click="$mdOpenMenu()">New</md-button> <md-menu-content> <md-menu-item><md-button ng-click="ctrl.sampleAction(\'New Document\', $event)">Document</md-button></md-menu-item> <md-menu-item><md-button ng-click="ctrl.sampleAction(\'New Spreadsheet\', $event)">Spreadsheet</md-button></md-menu-item> <md-menu-item><md-button ng-click="ctrl.sampleAction(\'New Presentation\', $event)">Presentation</md-button></md-menu-item> <md-menu-item><md-button ng-click="ctrl.sampleAction(\'New Form\', $event)">Form</md-button></md-menu-item> <md-menu-item><md-button ng-click="ctrl.sampleAction(\'New Drawing\', $event)">Drawing</md-button></md-menu-item> </md-menu-content> </md-menu> </md-menu-item> <md-menu-item> <md-button ng-click="ctrl.sampleAction(\'Open\', $event)"> Open... <span class="md-alt-text"> {{ \'M-O\' | keyboardShortcut }}</span> </md-button> </md-menu-item> <md-menu-item> <md-button disabled ng-click="ctrl.sampleAction(\'Rename\', $event)"> Rename </md-button> </md-menu-item> <md-menu-divider></md-menu-divider> <md-menu-item> <md-button ng-click="ctrl.sampleAction(\'Print\', $event)"> Print <span class="md-alt-text">{{ \'M-P\' | keyboardShortcut }}</span> </md-button> </md-menu-item> </md-menu-content> </md-menu> <md-menu> <button ng-click="$mdOpenMenu()"> Edit </button> <md-menu-content> <md-menu-item class="md-indent"> <md-icon md-svg-icon="undo"></md-icon> <md-button ng-click="ctrl.sampleAction(\'undo\', $event)"> Undo <span class="md-alt-text">{{ \'M-Z\' | keyboardShortcut }}</span> </md-button> </md-menu-item> <md-menu-item class="md-indent"> <md-icon md-svg-icon="redo"></md-icon> <md-button ng-click="ctrl.sampleAction(\'redo\', $event)"> Redo <span class="md-alt-text">{{ \'M-Y\' | keyboardShortcut }}</span> </md-button> </md-menu-item> <md-menu-divider></md-menu-divider> <md-menu-item class="md-indent"> <md-icon md-svg-icon="content-cut"></md-icon> <md-button ng-click="ctrl.sampleAction(\'cut\', $event)"> Cut <span class="md-alt-text">{{ \'M-X\' | keyboardShortcut }}</span> </md-button> </md-menu-item> <md-menu-item class="md-indent"> <md-icon md-svg-icon="content-copy"></md-icon> <md-button ng-click="ctrl.sampleAction(\'copy\', $event)"> Copy <span class="md-alt-text">{{ \'M-C\' | keyboardShortcut }}</span> </md-button> </md-menu-item> <md-menu-item class="md-indent"> <md-icon md-svg-icon="content-paste"></md-icon> <md-button ng-click="ctrl.sampleAction(\'paste\', $event)"> Paste <span class="md-alt-text">{{ \'M-P\' | keyboardShortcut }}</span> </md-button> </md-menu-item> <md-menu-divider></md-menu-divider> <md-menu-item class="md-indent"> <md-button ng-click="ctrl.sampleAction(\'Find and replace\', $event)"> Find and replace... <span class="md-alt-text">{{ \'M-S-H\' | keyboardShortcut }}</span> </md-button> </md-menu-item> </md-menu-content> </md-menu> <md-menu> <button ng-click="$mdOpenMenu()"> View </button> <md-menu-content> <md-menu-item type="checkbox" ng-model="ctrl.settings.printLayout">Print layout</md-menu-item> <md-menu-item class="md-indent"> <md-menu> <md-button ng-click="$mdOpenMenu()">Mode</md-button> <md-menu-content width="3"> <md-menu-item type="radio" ng-model="ctrl.settings.presentationMode" value="\'presentation\'">Presentation</md-menu-item> <md-menu-item type="radio" ng-model="ctrl.settings.presentationMode" value="\'edit\'">Edit</md-menu-item> <md-menu-item type="radio" ng-model="ctrl.settings.presentationMode" value="\'modifiable\'">Modifiable</md-menu-item> </md-menu-content> </md-menu> </md-menu-item> <md-menu-divider></md-menu-divider> <md-menu-item type="checkbox" ng-model="ctrl.settings.showRuler">Show ruler</md-menu-item> <md-menu-item type="checkbox" ng-model="ctrl.settings.showEquationToolbar">Show equation toolbar</md-menu-item> <md-menu-item type="checkbox" ng-model="ctrl.settings.showSpellingSuggestions">Show spelling suggestions</md-menu-item> <md-menu-divider></md-menu-divider> <md-menu-item type="checkbox" ng-model="ctrl.settings.compactControls">Compact controls</md-menu-item> <md-menu-item type="checkbox" ng-model="ctrl.settings.fullScreen">Full screen</md-menu-item> </md-menu-content> </md-menu> <md-menu> <button ng-click="$mdOpenMenu()"> Format </button> <md-menu-content> <md-menu-item> <md-button ng-click="ctrl.sampleAction(\'bold\', $event)"> Bold <span class="md-alt-text"> {{ \'M-B\' | keyboardShortcut }}</span> </md-button> </md-menu-item> <md-menu-item> <md-button ng-click="ctrl.sampleAction(\'italic\', $event)"> Italic <span class="md-alt-text">{{ \'M-I\' | keyboardShortcut }}</span> </md-button> </md-menu-item> <md-menu-item> <md-button ng-click="ctrl.sampleAction(\'underline\', $event)"> Underline <span class="md-alt-text">{{ \'M-U\' | keyboardShortcut }}</span> </md-button> </md-menu-item> <md-menu-item> <md-button ng-click="ctrl.sampleAction(\'strikethrough\', $event)"> Strikethrough <span class="md-alt-text">{{ \'A-S-5\' | keyboardShortcut }}</span> </md-button> </md-menu-item> <md-menu-item> <md-button ng-click="ctrl.sampleAction(\'superscript\', $event)"> Superscript <span class="md-alt-text">{{ \'M-.\' | keyboardShortcut }}</span> </md-button> </md-menu-item> <md-menu-item> <md-button ng-click="ctrl.sampleAction(\'subscript\', $event)"> Subscript <span class="md-alt-text">{{ \'M-,\' | keyboardShortcut }}</span> </md-button> </md-menu-item> <md-menu-divider></md-menu-divider> <md-menu-item><md-button ng-click="ctrl.toggleSetting(\'clearFormatting\')">Clear Formatting</md-button></md-menu-item> </md-menu-content> </md-menu> </md-menu-bar> </div> </div> </md-toolbar> <div class="svg-container" ng-class="{\'use-cross-hairs\': ctrl.svgArtistDemo.createLineActive, \'use-grab\': ctrl.svgArtistDemo.selectItemActive}"> <svg xmlns="http://www.w3.org/2000/svg" preserveaspectratio="none" class="svg-artist-demo" style="width:80%;height:400px;border: 1px solid black"></svg> </div> </div>')}]);