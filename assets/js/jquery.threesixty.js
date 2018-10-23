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
            $this.find('.mascaras').css({display: 'none'});
            $this.find('.mascaras:eq(' + val + ')').css({display: 'block'});

////////////////////////////////////////////////////////////////////////////////////////////
            $this.find('.highlights_blue').css({display: 'none'});
////////////////////////////////////////////////////////////////////////////////////////////
            $this.find('.highlights_red').css({display: 'none'});
     

detectar_color ();





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
            $this.find('.mascaras').css({display: 'none'});
            $this.find('.mascaras:eq(' + val + ')').css({display: 'block'});


////////////////////////////////////////////////////////////////////////////////////////////
            $this.find('.highlights_blue').css({display: 'none'});
////////////////////////////////////////////////////////////////////////////////////////////
            $this.find('.highlights_red').css({display: 'none'});
      
detectar_color ();





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


path_mascaras="https://raw.githubusercontent.com/jcastillovnz/Orbital-3D/master/assets/img/masks/"

path_highlights_blue="assets/img/highlights/blue/"
path_highlights_red="assets/img/highlights/red/"
extencion=".png"



html += '<img class="threesixty-frame" style="display:' +display + ';" data-index="' + i + '"  id="' + i + '" src="' + pathTemplate.replace('{index}', i) + '"/>';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




if (i==0) {

html += '<img class="mascaras" alt="'+i+'" crossOrigin = "Anonymous"  style="display:' + display + ';" id="true"     data-index="' + i + '"   src="' + path_mascaras+''+i+extencion+'"/>';


}

else
{
html += '<img class="mascaras" alt="'+i+'"   crossOrigin = "Anonymous"  style="display:' + display + ';" id="false"     data-index="' + i + '"   src="' + path_mascaras+''+i+extencion+'"/>';


}

html += '<img class="highlights_blue" style="display:' + none + ';" data-index="' + i + '"  id="highlights_blue_' + i + '" src="' + path_highlights_blue+''+i+extencion+'"/>';

html += '<img class="highlights_red" style="display:' + none+ ';" data-index="' + i + '"  id="highlights_red_' + i + '" src="' + path_highlights_red+''+i+extencion+'"/>';










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
            detectar_color ();

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
        e.preventDefault();
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
            $downElem.find('.mascaras').css({display: 'none'}).attr("id","false")  ;
            $downElem.find('.mascaras:eq(' + val + ')').css({display: 'block'});
///////////////////////////////activar mascara/////////////////////////////////////////////////////
            $downElem.find('.mascaras:eq(' + val + ')').attr("id","true")
///////////////////////////////////////////////////////////////////////////////////////////////
            $downElem.find('.highlights_blue').css({display: 'none'});
       
///////////////////////////////////////////////////////////////////////////////////////////////
            $downElem.find('.highlights_red').css({display: 'none'});





detectar_color ();



        }
    };

window.onload = function () {

detectar_color ();
}


function detectar_color() {
  

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
//Covierto Color RGBA a Hexadecimal
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


if (hex=="#ed8e8f") {


var id = img.alt; 
var url="highlights_red_";
var highlights_red = document.getElementById(url+id);
highlights_red.style.display = "block";


event.preventDefault();
document.getElementById("true").addEventListener("click", function( event ) {
event.stopImmediatePropagation();
var x= event.type;
alert("ES ROJO, AQUI SUCEDERA UNA ACCION PROGRAMABLE"+x);


});







}
else
{
var id = img.alt; 
var url="highlights_red_";
var highlights_red = document.getElementById(url+id);
highlights_red.style.display = "none";


}



if (hex=="#6f9c9f") {
 
var id = img.alt; 
var url="highlights_blue_";
var highlights_blue = document.getElementById(url+id);
highlights_blue.style.display = "block";

event.preventDefault();
document.getElementById("true").addEventListener("click", function(event) {
event.stopImmediatePropagation();

var x= event.type;
alert(hex+x);



});

}
else {

var id = img.alt; 
var url="highlights_blue_";
var highlights_blue = document.getElementById(url+id);
highlights_blue.style.display = "none";

}





               
});







}









    ThreeSixty.prototype.onKeyDown = function(e) {
        switch(e.keyCode){
            case 37: // left
                $el.prevFrame();
                $el.detectar_color();
                break;
            case 39: // right
                $el.nextFrame();

                $el.detectar_color();
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

