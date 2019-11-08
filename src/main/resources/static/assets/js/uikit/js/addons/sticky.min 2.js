/*! UIkit 2.10.0 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */

!function(a){var b;jQuery&&jQuery.UIkit&&(b=a(jQuery,jQuery.UIkit)),"function"==typeof define&&define.amd&&define("uikit-sticky",["uikit"],function(){return b||a(jQuery,jQuery.UIkit)})}(function(a,b){function c(){if(f.length){var b,c=d.scrollTop(),g=e.height(),h=g-d.height(),i=c>h?h-c:0;if(!(0>c))for(var j=0;j<f.length;j++)if(f[j].element.is(":visible")&&!f[j].animate){var k=f[j];if(k.check()){if(k.options.top<0?b=0:(b=g-k.element.outerHeight()-k.options.top-k.options.bottom-c-i,b=0>b?b+k.options.top:k.options.top),k.currentTop!=b){if(k.element.css({position:"fixed",top:b,width:"undefined"!=typeof k.getWidthFrom?a(k.getWidthFrom).width():k.element.width(),left:k.wrapper.offset().left}),!k.init&&(k.element.addClass(k.options.clsinit),location.hash&&c>0&&k.options.target)){var l=a(location.hash);l.length&&setTimeout(function(a,b){return function(){b.element.width();var d=a.offset(),e=d.top+a.outerHeight(),f=b.element.offset(),g=b.element.outerHeight(),h=f.top+g;f.top<e&&d.top<h&&(c=d.top-g-b.options.target,window.scrollTo(0,c))}}(l,k),0)}k.element.addClass(k.options.clsactive),k.element.css("margin",""),k.options.animation&&k.init&&k.element.addClass(k.options.animation),k.currentTop=b}}else null!==k.currentTop&&k.reset();k.init=!0}}}var d=b.$win,e=b.$doc,f=[];return b.component("sticky",{defaults:{top:0,bottom:0,animation:"",clsinit:"uk-sticky-init",clsactive:"uk-active",getWidthFrom:"",media:!1,target:!1},init:function(){var c=a('<div class="uk-sticky-placeholder"></div>').css({height:"absolute"!=this.element.css("position")?this.element.outerHeight():"","float":"none"!=this.element.css("float")?this.element.css("float"):"",margin:this.element.css("margin")});c=this.element.css("margin",0).wrap(c).parent(),this.sticky={options:this.options,element:this.element,currentTop:null,wrapper:c,init:!1,getWidthFrom:this.options.getWidthFrom||c,reset:function(a){var c=function(){this.element.css({position:"",top:"",width:"",left:"",margin:"0"}),this.element.removeClass([this.options.animation,"uk-animation-reverse",this.options.clsactive].join(" ")),this.currentTop=null,this.animate=!1}.bind(this);!a&&this.options.animation&&b.support.animation?(this.animate=!0,this.element.removeClass(this.options.animation).one(b.support.animation.end,function(){c()}).width(),this.element.addClass(this.options.animation+" uk-animation-reverse")):c()},check:function(){if(this.options.media)switch(typeof this.options.media){case"number":if(window.innerWidth<this.options.media)return!1;break;case"string":if(window.matchMedia&&!window.matchMedia(this.options.media).matches)return!1}var a=d.scrollTop(),b=e.height(),c=b-d.height(),f=a>c?c-a:0,g=this.wrapper.offset().top,h=g-this.options.top-f;return a>=h}},f.push(this.sticky)},update:function(){c()}}),e.on("uk-scroll",c),d.on("resize orientationchange",b.Utils.debounce(function(){if(f.length){for(var a=0;a<f.length;a++)f[a].reset(!0);c()}},100)),b.ready(function(d){setTimeout(function(){a("[data-uk-sticky]",d).each(function(){var c=a(this);c.data("sticky")||b.sticky(c,b.Utils.options(c.attr("data-uk-sticky")))}),c()},0)}),a.fn.uksticky});