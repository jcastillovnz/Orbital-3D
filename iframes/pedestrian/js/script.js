 $( window ).on( "load", function() {

  document.getElementById("loader").style.display = "none";


    });



    $(document).ready(function(){

                var $threeSixty = $('.threesixty');

                $threeSixty.threeSixty({
                    dragDirection: 'horizontal',
                    useKeys: true,
                    draggable: true,




                });

                $('.next').click(function(){
                    $threeSixty.nextFrame();

                });

                $('.prev').click(function(){
                    $threeSixty.prevFrame();
                
                });




                $threeSixty.on('down', function(){
                    $('.ui, h1, h2, .label, .examples').stop().animate({opacity:0}, 300);
                });



                $threeSixty.on('up', function(){
                    $('.ui, h1, h2, .label, .examples').stop().animate({opacity:1}, 500);
                });


            });








