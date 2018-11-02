/*!
 * ThreeSixty: A jQuery plugin for generating a draggable 360 preview from an image sequence.
 * Version: 0.1.2
 * Original author: @nick-jonas
 * Website: http://www.nickjonas.nyc
 * Licensed under the Apache License Version 2.0
 */

$(document).ready(function(){
(function ( $, window, document, undefined ) {


var scope,
    pluginName = 'threeSixty',
    defaults = {
        dragDirection: 'horizontal',
        useKeys: false,
        draggable: true
    },
    dragDirections = ['horizontal', 'vertical'],
    options = {},
    $el = {},
    data = [],
    total = 0,
    loaded = 0;

    /**
     * Constructor
     * @param {jQuery Object} element       main jQuery object
     * @param {Object} customOptions        options to override defaults
     */
    function ThreeSixty( element, customOptions ) {
        scope = this;
        this.element = element;
        options = options = $.extend( {}, defaults, customOptions) ;
        this._defaults = defaults;
        this._name = pluginName;

        // make sure string input for drag direction is valid
        if($.inArray(options.dragDirection, dragDirections) < 0){
            options.dragDirection = defaults.dragDirection;
        }

        this.init();
    }

    // PUBLIC API -----------------------------------------------------

    $.fn.destroy = ThreeSixty.prototype.destroy = function(){
        if(options.useKeys === true) $(document).unbind('keydown', this.onKeyDown);
        $(this).removeData();
        $el.html('');
    };

    $.fn.nextFrame = ThreeSixty.prototype.nextFrame = function(){
        $(this).each(function(i){
            var $this = $(this),
                val = $this.data('lastVal') || 0,
                thisTotal = $this.data('count');

            val = val + 1;

            $this.data('lastVal', val);

            if(val >= thisTotal) val = val % (thisTotal - 1);
            else if(val <= -thisTotal) val = val % (thisTotal - 1);
            if(val > 0) val = thisTotal - val;

            val = Math.abs(val);

            $this.find('.threesixty-frame').css({display: 'none'});
            $this.find('.threesixty-frame:eq(' + val + ')').css({display: 'block'});
////////////////////////////////////////////////////////////////////////////////////////////
            $this.find('.masks').css({display: 'none'});
            $this.find('.masks:eq(' + val + ')').css({display: 'block'});

////////////////////////////////////////////////////////////////////////////////////////////
            $this.find('.highlights_blue').css({display: 'none'});
////////////////////////////////////////////////////////////////////////////////////////////
            $this.find('.highlights_red').css({display: 'none'});
     

              canvas();




        });
    };

    $.fn.prevFrame = ThreeSixty.prototype.prevFrame = function(){
        $(this).each(function(i){
            var $this = $(this),
                val = $this.data('lastVal') || 0,
                thisTotal = $this.data('count');

            val = val - 1;

            $this.data('lastVal', val);

            if(val >= thisTotal) val = val % (thisTotal - 1);
            else if(val <= -thisTotal) val = val % (thisTotal - 1);
            if(val > 0) val = thisTotal - val;

            val = Math.abs(val);
            $this.find('.threesixty-frame').css({display: 'none'});
            $this.find('.threesixty-frame:eq(' + val + ')').css({display: 'block'});
////////////////////////////////////////////////////////////////////////////////////////////
            $this.find('.masks').css({display: 'none'});
            $this.find('.masks:eq(' + val + ')').css({display: 'block'});
////////////////////////////////////////////////////////////////////////////////////////////
            $this.find('.highlights_blue').css({display: 'none'});
////////////////////////////////////////////////////////////////////////////////////////////
            $this.find('.highlights_red').css({display: 'none'});
      
                    canvas();





        });
    };

    // PRIVATE METHODS -------------------------------------------------

    /**
     * Initializiation, called once from constructor
     * @return null
     */
    ThreeSixty.prototype.init = function () {
        var $this = $(this.element);

        // setup main container
        $el = $this;

        // store data attributes for each 360
        $this.each(function(){
            var $this = $(this),
                path = $this.data('path'),
                count = $this.data('count');
            data.push({'path': path, 'count': count, 'loaded': 0, '$el': $this});
            total += count;
        });

        _disableTextSelectAndDragIE8();

        this.initLoad();
    };

    /**
     * Start loading all images
     * @return null
     */
    ThreeSixty.prototype.initLoad = function() {
        var i = 0, len = data.length, url, j;
        $el.addClass('preloading');
        for(i; i < len; i++){
            j = 0;
            for(j; j < data[i].count; j++){
                url = data[i].path.replace('{index}', j);
                $('<img/>').data('index', i).attr('src', url).load(this.onLoadComplete);
            }
        }
    };

ThreeSixty.prototype.onLoadComplete = function(e) {
var index = $(e.currentTarget).data('index'),
thisObj = data[index];
thisObj.loaded++;
if(thisObj.loaded === thisObj.count){
scope.onLoadAllComplete(index);
}
};

ThreeSixty.prototype.onLoadAllComplete = function(objIndex) {
var $this = data[objIndex].$el,
html = '',
l = data[objIndex].count,
pathTemplate = data[objIndex].path,
i = 0;
// remove preloader
$this.html('');
$this.removeClass('preloading');
// add 360 images
for(i; i < l; i++){
var display = (i === 0) ? 'block' : 'none';
var none = 'none'
path_masks="https://raw.githubusercontent.com/jcastillovnz/Orbital-3D/master/iframes/r4/img/r4/masks/"
path_highlights_A401="img/r4/highlights/A401/"
path_highlights_A402="img/r4/highlights/A402/"
path_highlights_A403="img/r4/highlights/A403/"
path_highlights_B301="img/r4/highlights/B301/"
path_highlights_B302="img/r4/highlights/B302/"





extencion=".png"
html += '<img class="threesixty-frame" style="display:' +display + ';" data-index="' + i + '"  id="' + i + '" src="' + pathTemplate.replace('{index}', i) + '"/>';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
html += '<img class="masks" alt="'+i+'" crossOrigin = "Anonymous"  style="display:' + display + ';" id="true"     data-index="' + i + '"   src="' + path_masks+''+i+extencion+'"/>';
html += '<img class="highlights_A401"     style="display:' + none + ';" data-index="' + i + '"  id="highlights_A401_' + i + '" src="' + path_highlights_A401+''+i+extencion+'"/>';
html += '<img class="highlights_A402"   style="display:' + none+ ';" data-index="' + i + '"  id="highlights_A402_' + i + '" src="' + path_highlights_A402+''+i+extencion+'"/>';
html += '<img class="highlights_A403"   style="display:' + none+ ';" data-index="' + i + '"  id="highlights_A403_' + i + '" src="' + path_highlights_A403+''+i+extencion+'"/>';
html += '<img class="highlights_B301"   style="display:' + none+ ';" data-index="' + i + '"  id="highlights_B301_' + i + '" src="' + path_highlights_B301+''+i+extencion+'"/>';
html += '<img class="highlights_B302"   style="display:' + none+ ';" data-index="' + i + '"  id="highlights_B302_' + i + '" src="' + path_highlights_B302+''+i+extencion+'"/>';




        }
        $this.html(html);

        this.attachHandlers(objIndex);
    };

    var startY = 0,
        thisTotal = 0,
        $downElem = null,
        lastY = 0,
        lastX = 0,
        lastVal = 0,
        isMouseDown = false;
    ThreeSixty.prototype.attachHandlers = function(objIndex) {
        var that = this;
        var $this = data[objIndex].$el;

        // add draggable events
        if(options.draggable){
            // if touch events supported, use
            if(typeof document.ontouchstart !== 'undefined' &&
                typeof document.ontouchmove !== 'undefined' &&
                typeof document.ontouchend !== 'undefined' &&
                typeof document.ontouchcancel !== 'undefined'){
                var elem = $this.get()[0];
                elem.addEventListener('touchstart', that.onTouchStart);
                elem.addEventListener('touchmove', that.onTouchMove);
                elem.addEventListener('touchend', that.onTouchEnd);
                elem.addEventListener('touchcancel', that.onTouchEnd);
            }
        }

        // mouse down
        $this.mousedown(function(e){
            e.preventDefault();
            thisTotal = $(this).data('count');
            $downElem = $(this);
            startY = e.screenY;
            lastVal = $downElem.data('lastVal') || 0;
            lastX = $downElem.data('lastX') || 0;
            lastY = $downElem.data('lastY') || 0;
            isMouseDown = true;
            $downElem.trigger('down');




        });

        // arrow keys
        if(options.useKeys === true){
            $(document).bind('keydown', that.onKeyDown);
        }
        // mouse up
        $(document, 'html', 'body').mouseup(that.onMouseUp);
        $(document).blur(that.onMouseUp);
        $('body').mousemove(function(e){
            that.onMove(e.screenX, e.screenY);
        });
    };

    ThreeSixty.prototype.onTouchStart = function(e) {
        var touch = e.touches[0];
        //e.preventDefault();
        $downElem = $(e.target).parent();
        thisTotal = $downElem.data('count');
        startX = touch.pageX;
        startY = touch.pageY;
        lastVal = $downElem.data('lastVal') || 0;
        lastX = $downElem.data('lastX') || 0;
        lastY = $downElem.data('lastY') || 0;
        isMouseDown = true;
        $downElem.trigger('down');
    };

    ThreeSixty.prototype.onTouchMove = function(e) {
        e.preventDefault();
        var touch = e.touches[0];
        scope.onMove(touch.pageX, touch.pageY);

    };

    ThreeSixty.prototype.onTouchEnd = function(e) {

    };

    ThreeSixty.prototype.onMove = function(screenX, screenY){
        if(isMouseDown){
            var x = screenX,
                y = screenY,
                val = 0;

            $downElem.trigger('move');


            if(options.dragDirection === 'vertical'){
                if(y > lastY){
                    val = lastVal + 1;
                }else{
                    val = lastVal - 1;
                }
            }else{
                if(x > lastX){
                    val = lastVal + 1;
                }else if(x === lastX){
                    return;
                }else{
                    val = lastVal - 1;
                }
            }

            lastVal = val;
            lastY = y;
            lastX = x;
            $downElem.data('lastY', lastY);
            $downElem.data('lastX', lastX);
            $downElem.data('lastVal', lastVal);
            if(val >= thisTotal) val = val % (thisTotal - 1);
            else if(val <= -thisTotal) val = val % (thisTotal - 1);
            if(val > 0) val = thisTotal - val;
            val = Math.abs(val);



            $downElem.find('.threesixty-frame').css({display: 'none'});
            $downElem.find('.threesixty-frame:eq(' + val + ')').css({display: 'block'});
/////////////////////////////////////////////////////////////////////////////////////////
            $downElem.find('.mascaras').css({display: 'none'});
///////////////////////////////desactivar mascara/////////////////////////////////////////////////////
            $downElem.find('.masks').css({display: 'none'}).attr("id","false")  ;
            $downElem.find('.masks:eq(' + val + ')').css({display: 'block'});
///////////////////////////////activar mascara/////////////////////////////////////////////////////
            $downElem.find('.masks:eq(' + val + ')').attr("id","true")
///////////////////////////////////////////////////////////////////////////////////////////////
            $downElem.find('.highlights_blue').css({display: 'none'});
       
///////////////////////////////////////////////////////////////////////////////////////////////
            $downElem.find('.highlights_red').css({display: 'none'});


    canvas();



        }
    };



window.onload = function(e) {
canvas();
  }


function canvas() {

var img= document.getElementById('true');
img.addEventListener('mousemove', function (e) {
  let ctx;
  if(!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      ctx=this.canvas.getContext('2d');
      ctx.drawImage(this, 0, 0, this.width, this.height);
  } else {
    ctx=this.canvas.getContext('2d');
  }
const pixel = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;

detectar_color(ctx,e,img);

               
});





}





function detectar_color(ctx,e,img) {
////DETECTAR COLORES
//Covierto Color RGBA a Hexadecimal
const pixel = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;


r=pixel[0] ;
g=pixel[1] ;
b=pixel[2] ;

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}




function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}



var hex =rgbToHex(r, g, b);

if (hex==="#ed8e8f") {
var id = img.alt; 
var url="highlights_red_";
var highlights_red = document.getElementById(url+id);
highlights_red.style.display = "block";

$(document).click(function(e){
     e.preventDefault();
    //alert("ROJO");

   $('#Modal_rojo').modal();


    // si lo deseamos podemos eliminar el evento click
    // una vez utilizado por primera vez
    $(document).unbind("click");
    e.stopImmediatePropagation()
})


}
else
{


var id = img.alt; 
var url="highlights_red_";
var highlights_red = document.getElementById(url+id);
highlights_red.style.display = "none";

$(document).unbind("click");



}
if (hex==="#6f9c9f") {

var id = img.alt; 
var url="highlights_blue_";
var highlights_blue = document.getElementById(url+id);
highlights_blue.style.display = "block";
$(document).click(function(e){
     e.preventDefault();
 $('#Modal_azul').modal();
 
    // si lo deseamos podemos eliminar el evento click
    // una vez utilizado por primera vez
    $(document).unbind("click");
    e.stopImmediatePropagation()
})


}
else {

var x = null;
var id = img.alt; 
var url="highlights_blue_";
var highlights_blue = document.getElementById(url+id);
highlights_blue.style.display = "none";

}


if (hex==="#6f9c9f") {

var id = img.alt; 
var url="highlights_blue_";
var highlights_blue = document.getElementById(url+id);
highlights_blue.style.display = "block";
$(document).click(function(e){
     e.preventDefault();
 $('#Modal_azul').modal();
 
    // si lo deseamos podemos eliminar el evento click
    // una vez utilizado por primera vez
    $(document).unbind("click");
    e.stopImmediatePropagation()
})


}
else {

var x = null;
var id = img.alt; 
var url="highlights_blue_";
var highlights_blue = document.getElementById(url+id);
highlights_blue.style.display = "none";

}



if (hex==="#6f9c9f") {

var id = img.alt; 
var url="highlights_blue_";
var highlights_blue = document.getElementById(url+id);
highlights_blue.style.display = "block";
$(document).click(function(e){
     e.preventDefault();
 $('#Modal_azul').modal();
 
    // si lo deseamos podemos eliminar el evento click
    // una vez utilizado por primera vez
    $(document).unbind("click");
    e.stopImmediatePropagation()
})


}
else {

var x = null;
var id = img.alt; 
var url="highlights_blue_";
var highlights_blue = document.getElementById(url+id);
highlights_blue.style.display = "none";

}


if (hex==="#36f9c9f") {

var id = img.alt; 
var url="highlights_blue_";
var highlights_blue = document.getElementById(url+id);
highlights_blue.style.display = "block";
$(document).click(function(e){
     e.preventDefault();
 $('#Modal_azul').modal();
 
    // si lo deseamos podemos eliminar el evento click
    // una vez utilizado por primera vez
    $(document).unbind("click");
    e.stopImmediatePropagation()
})


}
else {

var x = null;
var id = img.alt; 
var url="highlights_blue_";
var highlights_blue = document.getElementById(url+id);
highlights_blue.style.display = "none";

}






if (hex==="#436f9c9f") {

var id = img.alt; 
var url="highlights_blue_";
var highlights_blue = document.getElementById(url+id);
highlights_blue.style.display = "block";
$(document).click(function(e){
     e.preventDefault();
 $('#Modal_azul').modal();
 
    // si lo deseamos podemos eliminar el evento click
    // una vez utilizado por primera vez
    $(document).unbind("click");
    e.stopImmediatePropagation()
})


}
else {

var x = null;
var id = img.alt; 
var url="highlights_blue_";
var highlights_blue = document.getElementById(url+id);
highlights_blue.style.display = "none";

}






if (hex==="#739C9F") {

var id = img.alt; 
var url="highlights_blue_";
var highlights_blue = document.getElementById(url+id);
highlights_blue.style.display = "block";
$(document).click(function(e){
     e.preventDefault();
 $('#Modal_azul').modal();
 
    // si lo deseamos podemos eliminar el evento click
    // una vez utilizado por primera vez
    $(document).unbind("click");
    e.stopImmediatePropagation()
})


}
else {

var x = null;
var id = img.alt; 
var url="highlights_blue_";
var highlights_blue = document.getElementById(url+id);
highlights_blue.style.display = "none";

}















}










    ThreeSixty.prototype.onKeyDown = function(e) {
        switch(e.keyCode){
            case 37: // left
             $el.prevFrame();
             //$el.canvas();
                break;
            case 39: // right
                $el.nextFrame();
               // $el.canvas();
                break;
        }
    };

    ThreeSixty.prototype.onMouseUp = function(e) {
        isMouseDown = false;
        $downElem.trigger('up');
         

     





    };

    /**
     * Disables text selection and dragging on IE8 and below.
     */
    var _disableTextSelectAndDragIE8 = function() {
      // Disable text selection.
      document.body.onselectstart = function() {
          return false;
      };

      // Disable dragging.
      document.body.ondragstart = function() {
          return false;
      };
    };


    /**
     * A really lightweight plugin wrapper around the constructor,
        preventing against multiple instantiations
     * @param  {Object} options
     * @return {jQuery Object}
     */
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new ThreeSixty( this, options ));
            }
        });
    };

})( jQuery, window, document );









  });
