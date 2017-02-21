/*!
	Simple Magnifier ES6 0.1
    by Rakitski Aleksei (alexey62soft)
	license: Opensource
	https://github.com/uharbachou/zoomImage
*/

(($ => {
    
	$.simpleMagnifierCore = (source, settings) => {
        let originalWidth = 0;
        let originalHeight = 0;
        const $source = $(source);
        let targetHeight = 0;
        let targetWidth = 0;

        //Struct create
        $source.append('<div class="large"></div>');
        $source.append('<div class="imgbox"></div>');
        $source.find('.imgbox').append('<img class="thumb" />');

        //Create struct objects
        const $magnifierLarge = $source.find('.large');
        const $magnifierThumb = $source.find('.thumb');

        return {
			init() {    
                
                //Add image into html elements of the plugin
                $magnifierLarge.css('background', `url('${settings.url}') no-repeat`);
                $magnifierThumb.attr('src', settings.url);
                
                //Get origial width and height of image (by temporary coping image in memory - avoid css conflicts)
                $("<img/>").attr("src", settings.url).load(function() {
                    originalWidth = this.width;
                    originalHeight = this.height;
                    
                    //Set target width and height of element
                    //If width set in html - save this
                    if ($source.width() != 0 && $source.width() < document.body.clientWidth * 0.99) {
                        targetWidth = $source.width();
                        targetHeight = (targetWidth / originalWidth) * originalHeight;
                        $source.height(targetHeight);
                    }
                    
                    //Else - calculate by defaults
                    else {
                        targetWidth = document.body.clientWidth * 0.8;
                        $source.width(targetWidth);
                        targetHeight = (targetWidth / originalWidth) * originalHeight;
                        $source.height(targetHeight);
                    }
                    
                    //Styling elements of the plugin
                    $source.css({
                        margin: '50px auto',
                        position: 'relative',
                        cursor: 'none'
                    });

                    $magnifierLarge.css({
                        display: 'none',
                        width: settings.magnifierWidth,
                        height: settings.magnifierWidth,
                        position: 'absolute',
                        borderRadius: '100%',
                        '-webkit-box-shadow': `0 0 0 7px${settings.magnifierColor}, 0 0 7px 7px rgba(0, 0, 0, 0.25), inset 0 0 40px 2px rgba(0, 0, 0, 0.25)`,
                        '-moz-box-shadow': `0 0 0 7px${settings.magnifierColor}, 0 0 7px 7px rgba(0, 0, 0, 0.25), inset 0 0 40px 2px rgba(0, 0, 0, 0.25)`,
                        boxShadow: `0 0 0 7px${settings.magnifierColor}, 0 0 7px 7px rgba(0, 0, 0, 0.25), inset 0 0 40px 2px rgba(0, 0, 0, 0.25)`
                    });

                    $magnifierThumb.css({
                        width: targetWidth,
                        height: targetHeight,
                        display: 'block'
                    });

                    $source.find('.imgbox').css({
                        display: 'block',
                        width: '100%',
                        textAlign: 'center'
                    });
                    
                    $source.find('.imgbox').find('img').css({
                        '-webkit-box-shadow': '1px 4px 9px -1px rgba(0, 0, 0, 0.65)',
                        '-moz-box-shadow': '1px 4px 9px -1px rgba(0, 0, 0, 0.65)',
                        boxShadow: '1px 4px 9px -1px rgba(0, 0, 0, 0.65)'
                    });
                });
			},
			move(e) {
                
                //Get client mouse position (in img)
				const magnifierOffset = $source.offset();
                const mouseX = e.pageX - magnifierOffset.left;
                const mouseY = e.pageY - magnifierOffset.top;

                //If mouse cursor in img - display maghifier
                if(mouseX < $source.width() && mouseY < $source.height() && mouseX > 0 && mouseY > 0) {
                    $magnifierLarge.fadeIn(settings.duration);
                }
                //Else - hide magnifier
                else
                {
                    $magnifierLarge.fadeOut(settings.duration);
                }
                
                //If magnifier visible - set positions of magnifier and original image in them
                if($magnifierLarge.is(':visible'))
                {
                    //Get original image position in magnifier
                    const magnifierPosX = Math.round(mouseX / $magnifierThumb.width() * originalWidth - $magnifierLarge.width() / 2) * -1;
                    const magnifierPosY = Math.round(mouseY / $magnifierThumb.height() * originalHeight - $magnifierLarge.height() / 2) * -1;
                    
                    const backgroundPosition = `${magnifierPosX}px ${magnifierPosY}px`;
                    
                    //Get magnifier position
                    const magnifierOffsetX = mouseX - $magnifierLarge.width() / 2;
                    const magnifierOffsetY = mouseY - $magnifierLarge.height() / 2;

                    //Set this by css properties
                    $magnifierLarge.css({
                        left: magnifierOffsetX, 
                        top: magnifierOffsetY, 
                        backgroundPosition,
                    });
                }
			}
		};
    };
    
    $.fn.simpleMagnifier = function(options) {
        
        //For support few magnifier elements on the same page
        return this.each(function () {
            
            // Initialize default options.
            const settings = $.extend({
                url: false,
                duration: 100,
                magnifierWidth: '150px',
                magnifierColor: '#fff'
            }, options );
            
            if(settings.url != false) {
                //Initialize magnifier plugin core
                const core = $.simpleMagnifierCore(this, settings);

                //Initialize plugin
                core.init();

                //Mousemove event: execute plugin
                $(this).on('mousemove', e => {
                    core.move(e);
                });
            }
        });
    };
    
 })(jQuery));