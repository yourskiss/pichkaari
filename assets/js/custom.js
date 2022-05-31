jQuery(function ($) {

    function populate_animations() {
        var cls = "animate";
        $("." + cls).each(function () {
            if (isEleInView($(this), 120)) {
                $(this).removeClass(cls);
                animation_class($(this));
            }
        });
    }
	
		// init controller
		function populate_scroll() {		
		var controller = new ScrollMagic.Controller();	
		
		
		$(".section.active").each(function(i) {	
			var sec = this;
		    var tl = new TimelineMax()
			tl.from(".fadeInSmall", 0.8, { opacity:0, y:100, immediateRender:false})
			tl.to(".fadeInSmall ", 0.8, { opacity:1, y:0, immediateRender:false} );		
			
		var scene = new ScrollMagic.Scene({
		triggerElement:'.fadeInSmall',
		reverse: true,
		triggerHook: 1
		})
		 .setTween(tl)
		 .setClassToggle('.fadeInSmall', "loaded")
		 .addIndicators({name: "1 (duration: 0)"}) // add indicators (requires plugin)
		 .addTo(controller);
		 })		
		}	

    function isEleInView(ele, verticaloffset) {
        var win = $(window);

        var viewport = {
            top: win.scrollTop(),
            left: win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();

        var bounds = ele.offset();
        bounds.right = bounds.left + ele.outerWidth();
        bounds.bottom = bounds.top + ele.outerHeight();

        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top + verticaloffset || viewport.top > bounds.bottom));
    }

    function animation_class(ele) {
        ele.addClass("animated");
        // anim class for media(video/audio) elements - added directly to the video/audio tag
        if (ele.hasClass('anim')) {
            el.get(0).play();
        } else if (ele.hasClass('up')) {
            ele.addClass('fadeInUp');
        } else if (ele.hasClass('right')) {
            ele.addClass('fadeInRight');
        } else if (ele.hasClass('down')) {
            ele.addClass('fadeInDown');
        } else if (ele.hasClass('left')) {
            ele.addClass('fadeInLeft');
        } else if (ele.hasClass('shrink')) {
            ele.addClass('fadeInShrink');
        } else if (ele.hasClass('explode')) {
            ele.addClass('fadeInExplode');
        } else if (ele.hasClass('scale')) {
            ele.addClass('fadeInScale');
		} else if (ele.hasClass('zoom')) {
            ele.addClass('zoomOut');
		}		
        
    }

    function equalHeight(selector) {
        var maxHeight = 0,
            elements = $(selector);

        elements.each(function () {
            var height = $(this).innerHeight();
            if (height > maxHeight) {
                maxHeight = height;
            }
        });

        elements.innerHeight(maxHeight);
    }

    function themeChanges() {
        var scrollPos = $(window).scrollTop();

        sections.each(function () {
            var secPos = $(this).offset().top;
            var navTheme = $(this).data('nav') || '';
            var theme = $(this).data('theme') || '';
			 var themeSub = $(this).find('.sub-section').data('theme') || '';
            var floats = $(this).data('float') || '';

            if ((scrollPos + headerHeight / 2) >= secPos) {
                header.removeClass().addClass(navTheme);
            }
			
            if ((scrollPos >= 50)) {
                header.removeClass().addClass('white');
            }			

            if ((scrollPos + screenHeight / 2) >= secPos) {
                if (floats === 'hide') {
                    scrollTop.hide();
                } else {
                    scrollTop.show();
                }

                scrollTop.removeClass('dark').addClass(theme);
            }
					

            if ((scrollPos + screenHeight) >= secPos) {
                if (floats === 'hide') {
                    connect.hide();
                } else {
                    connect.show();
                }

                connect.removeClass('dark').addClass(theme);
            }
        });
    }

    $.rand = function(arg) {
        if ($.isArray(arg)) {
            return arg[$.rand(arg.length)];
        } else if (typeof arg === "number") {
            return Math.floor(Math.random() * arg);
        } else {
            return 4;  // chosen by fair dice roll
        }
    };

    var screenHeight = $(window).height(),
        headerHeight = $('#header-menu').height(),
        sections = $('section'),
        header = $('header'),
        scrollTop = $('#scrollToTop'),
        connect = $('.connectFloat');

    var actions = {
        preload: {
            init: function () {

                
            }
        },
        home: {
            init: function () {
                var categories = ['Branding & Merchandising', 'marketing & communication', 'ui/ux design', 'information design', 'motion graphics & video','package design'];
                
                var $locations = $('.clientLocation');
                var $totalLocations = $($locations).length;

                if($totalLocations>0){
                    $($locations).each(function (i,v) {
                        const ele = this;
                        setTimeout(() => {
                            switchCountry(ele);
                            setInterval(() => {
                                switchCountry(ele);
                            }, $totalLocations * 1000);
                        }, i*1000);
                    });
                }

                function switchCountry(ele) {
                    $('.clientLocation.active').removeClass('active');
                    $(ele).addClass('active');
                    $('.clientCountry').html($(ele).data('location'));
                }

                $('#categorySlider').slick({
                    arrows: false, // disable
                    infinite: true,
                    dots: true,
                    autoplay: false,
                    autoplaySpeed: 5000,
                    adaptiveHeight: true,
                    customPaging: function (slider, i) {
                        return '<div class="ttu fc4 fw5 fs1">' + categories[i] + '</div>';
                    },
                    appendDots: "#categorySliderLinks",
                    responsive: [
                        {
                            breakpoint: 991,
                            settings: {
                                appendDots: "#categorySliderDots",
                                customPaging: function (slider, i) {
                                    return '<button type="button" data-role="none" role="button"></button>';
                                },
                            }
                        }
                    ]
                });

                $('#brandSlider').slick({
                    centerMode: true,
                    infinite: true,
                    variableWidth: true,
                    autoplay: true,
                    autoplaySpeed: 1000,
                    prevArrow: $("#brandSliderArrow1"),
                    nextArrow: $("#brandSliderArrow2"),
                    responsive: [
                        {
                            breakpoint: 991,
                            settings: {
                                arrows: false
                            }
                        }
                    ]
                });

                $('#testimonialSlider').on('init', function (event, slick) {
                    $('#testimonialSliderPosition').html(slick.currentSlide + 1);
                    $('#testimonialSliderLength').html(slick.slideCount);
                }).on('afterChange', function (event, slick, currentSlide) {
                    $('#testimonialSliderPosition').html(slick.currentSlide + 1);
                }).slick({
                    infinite: false,
                    variableWidth: true,
                    autoplay: false,
                    autoplaySpeed: 5000,
                    adaptiveHeight: true,
                    prevArrow: $("#testimonialSliderArrow1"),
                    nextArrow: $("#testimonialSliderArrow2"),
                    responsive: [
                        {
                            breakpoint: 991,
                            settings: {
                                arrows: false,
                                dots: true
                            }
                        }
                    ]
                });
            }
        },
        career: {
            init: function () {
                $('#dealSlider').on('init', function (event, slick) {
                    $('#dealSliderPosition').html(slick.currentSlide + 1);
                    $('#dealSliderLength').html(slick.slideCount);
                }).on('afterChange', function (event, slick, currentSlide) {
                    $('#dealSliderPosition').html(slick.currentSlide + 1);
                }).slick({
                    infinite: true,
                    variableWidth: true,
                    autoplay: false,
                    autoplaySpeed: 5000,
                    adaptiveHeight: true,
                    prevArrow: $("#dealSliderArrow1"),
                    nextArrow: $("#dealSliderArrow2"),
                    responsive: [
                        {
                            breakpoint: 991,
                            settings: {
                                arrows: false,
                                dots: true
                            }
                        }
                    ]
                });

                $('#slaySlider').slick({
                    infinite: true,
                    autoplay: false,
                    autoplaySpeed: 5000,
                    adaptiveHeight: true,
                    prevArrow: $("#slaySliderArrow1"),
                    nextArrow: $("#slaySliderArrow2"),
                    responsive: [
                        {
                            breakpoint: 991,
                            settings: {
                                variableWidth: true,
                                arrows: false,
                                dots: true
                            }
                        }
                    ]
                });

                $('#jobsSlider').slick({
                    infinite: true,
                    slidesToShow: 3,
                    autoplay: false,
                    autoplaySpeed: 5000,
                    adaptiveHeight: false,
                    prevArrow: $("#jobsSliderArrow1"),
                    nextArrow: $("#jobsSliderArrow2"),
                    responsive: [
                        {
                            breakpoint: 991,
                            settings: {
                                variableWidth: true,
                                arrows: false,
                                dots: true
                            }
                        }
                    ]
                });
            }
        },
        about: {
            init: function () {
                $('#motifSlider').slick({
                    infinite: true,
                    autoplay: false,
                    autoplaySpeed: 5000,
                    adaptiveHeight: false,
                    prevArrow: $("#motifSliderArrow1"),
                    nextArrow: $("#motifSliderArrow2"),
                    responsive: [
                        {
                            breakpoint: 991,
                            settings: {
                                adaptiveHeight: true,
                                arrows: false,
                                dots: true
                            }
                        }
                    ]
                });

                $('#founderSlider').slick({
                    infinite: true,
                    autoplay: false,
                    autoplaySpeed: 5000,
                    adaptiveHeight: true,
                    prevArrow: $("#founderSliderArrow1"),
                    nextArrow: $("#founderSliderArrow2"),
                    responsive: [
                        {
                            breakpoint: 991,
                            settings: {
                                arrows: false,
                                dots: true
                            }
                        }
                    ]
                });

                if($('.faceTile').length > 0)  {
                    var cw = $('.faceTile').width();
                    $('.faceTile').css({'height':cw+'px'});
                }

            }
        },		
        portfolio: {
            init: function () {
                var categories = {
                    'branding': 'Branding & Merchandising',
                    'packaging': 'Package Design',
                    'marketing': 'Marketing & Communication',
                    'uiux': 'UI/UX design',
                    'information': 'Information Design',
                    'video': 'Motion Graphics & Video'
                }

                var pageLength = 6,
                    portfolioData ,
                    portfolioItems = [];
                    
                populateCategories();
                
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const page_filter = urlParams.get('category');
                var mixitConfig = {
                    animation: {
                        enable: true,
                        duration: 200,
                        effects: 'fade translateZ(-100px)'
                    },
                    selectors: {
                        target: '.portfolioCard',
                        control: '.portfolioFilter'
                    }
                };

                if(page_filter){
                    mixitConfig = {...mixitConfig, 
                        load: {
                            filter: '.'+page_filter
                        }
                    }
                    $('html, body').animate({
                        scrollTop: $('#portfolioSec2').offset().top
                    }, 300);
                }

                var mixer = mixitup('#portfolioCards', mixitConfig);


                $.getJSON( "./assets/json/portfolio.json").done(function( data ) {
                    portfolioData = data;
                    portfolioItems = memoize(data);
                    addCards();
                }).fail(function( jqxhr, textStatus, error ) {
                    alert( "Request Failed: " + textStatus + ", " + error);
                });

                function memoize(data) {
                    var newArray = [];
                    $.each(data, function (clientSlug, clientObject) {
                        $.each(clientObject, function (category, projectObject) {
                            if(projectObject.active){
                                var newObj = {...projectObject, category, clientSlug};
                                newObj.visible = false;
                                newObj.slug = clientSlug + '-' + category;
                                newArray.push(newObj);
                            }
                        });
                    });

                    newArray.sort(function() {return 0.5 - Math.random()});

                    return newArray;
                }

                function addCards(category = '') {
                    var elements = '',
                        firstGap = $('#portfolioCards .gap'),
                        projects = $.grep(portfolioItems, function(project) {
                            return !project.visible;
                        });

                    if(category.length) {
                        projects = $.grep(projects, function(project) {
                            return project.category.toLowerCase() === category.toLowerCase();
                        });
                    }

                    if(!projects.length) {
                        $('#loadMoreCards').hide();
                        return false;
                    }

                    if(projects.length > pageLength) {
                        projects = projects.slice(0, pageLength);
                    }

                    $.each(projects, function (i, project) {
                        var objIndex = portfolioItems.findIndex((obj => obj == project));
                        portfolioItems[objIndex].visible = true;
                        elements += renderProject(project);
                    });
                    
                    mixer.insertBefore(elements, firstGap);
                    var state = mixer.getState();
                    if (state.totalTargets === portfolioItems.length) {
                        $('#loadMoreCards').hide();
                    }
                }

                function renderProject(project) {
                    var html = '';
                    html += '<div class="portfolioCard text-left d-inline pos-rel ' + project.category + '">';
                    if(project.hasOwnProperty('thumbnail') && project.thumbnail.length){
                        html += '<a href="https://www.pichkaari.com/portfolio/' + project.link + '" target="_blank" class="absolute-bg"></a>';
                    }
                    html += '<div class="cardImage secText">';
                    html += '<img src="assets/images/thumbnails/' + project.thumbnail +'.png"></div>';
                    html += '<div class="fs3 fwb cardTitle"> ' + project.title + '</div>';
                    html += '<div class="fs2 cardCategory">' + project.description + '</div></div>';

                    return html;
                }

                function populateCategories() {
                    var output = '<li><button data-filter="all" class="fc3 fs2 portfolioFilter is-checked">All</button></li>';
                    for (var key in categories) {
                        if (categories.hasOwnProperty(key)) {
                            output += '<li><button data-filter=".' + key + '" class="fc3 fs2 ttc portfolioFilter">' + categories[key] + '</button></li>';
                        }
                    }

                    $('#portfolioFilters').html(output);
                }

                $('#loadMoreCards').click(function () {
                    var state = mixer.getState();
                    var activeFilter = '';
                    console.log(state);
                    if (state.totalTargets === portfolioItems.length) {
                        $(this).hide();
                        return false;
                    }

                    if(state.totalTargets !== state.totalMatching) {
                        activeFilter = state.activeFilter.selector;
                        activeFilter = activeFilter.substring(1);
                    }
                    addCards(activeFilter);
                });

                $('#portfolioCards').on('mixEnd', function (e) {
                    var state = mixer.getState();
                    var activeFilter = state.activeFilter.selector;
                    activeFilter = activeFilter.substring(1);
                    if((activeFilter === 'portfolioCard') && (state.totalTargets != portfolioItems.length)) {
                        $('#loadMoreCards').show();
                    } else {
                        $('#loadMoreCards').hide();
                        addCards(activeFilter);
                    }
                });
            }
        },
        contact: {
            init: function () {
                $('.phoneInput').on('keydown',function(evt){
                    evt = (evt) ? evt : window.event;
                    var charCode = (evt.which) ? evt.which : evt.keyCode;
                    if ($.inArray(charCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                         // Allow: Ctrl/cmd+A
                        (charCode == 65 && (evt.ctrlKey === true || evt.metaKey === true)) ||
                         // Allow: Ctrl/cmd+C
                        (charCode == 67 && (evt.ctrlKey === true || evt.metaKey === true)) ||
                         // Allow: Ctrl/cmd+X
                        (charCode == 88 && (evt.ctrlKey === true || evt.metaKey === true)) ||
                         // Allow: Ctrl/cmd+V
                        (charCode == 86 && (evt.ctrlKey === true || evt.metaKey === true)) ||
                         // Allow: home, end, left, right
                        (charCode >= 35 && charCode <= 39)) {
                             return;
                    }
                    
                    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 105)) {
                        return false;
                    }      
                });

                $('#contactForm').submit(function(e){
                    e.preventDefault();
                    var formData = new FormData();
                    $('.form-control').each(function (){
                        formData.append($(this).attr('name'), $(this).val());
                    });
                    //console.log(formData);
                    //debugger;
                    $.ajax({
                        type: 'POST',
                        contentType: 'application/json',
                        url: "./api/sendmail.php",
                        data : formData,
                        contentType: false,
                        processData: false,
                        success: function(response){
                            console.log(response);
                            var text = response.message;
                            $('.formSec').append('<div class="subscribeText">'+ response +'</div>');
                            document.getElementById('contactForm').reset();
                        },
                        error: function(error){
                            console.log(error);
                            return false;
                        }
                    });
                });
            }
        },
        postload: {
            init: function () {        
                var win = $(window);

                var screen = {
                    width: win.width(),
                    height: win.height()
                };

                // $('#device_dimensions').html(screen.width + ' x ' + screen.height);

                if((screen.width > 992)) {
                    if ($('#fullpage').length > 0) {
                        var fullpageOptions = {
                            //options here
                            autoScrolling: true,
                            slideSelector: '.fullpageSlide',
                            licenseKey: '897A7684-99CB4ACB-931F45AA-AA7D475B',
                            scrollOverflow: true,
							css3: true,
							responsiveWidth: 767.98,
                            touchSensitivity: 25,
							scrollingSpeed: 800,
                            normalScrollElements: '.scrollable-content',
                            afterLoad: function (origin, destination, direction) {
                                              //  history.pushState(null, null, "bar.html");


                                populate_animations();
                                themeChanges();
                            },
							afterRender: function(){
							var pluginContainer = this;
							},
                            onLeave: function (origin, destination, direction) {
                                if (origin.index === 0) {
                                    if ($('#dealSlider').length > 0) {
                                        equalHeight($('#dealSlider .slide .secText'));
                                    }
                                }
                            }
                        };
                        if($('body').hasClass('home')){
                            fullpageOptions = {...fullpageOptions, anchors:['banner', 'cause-and-effect', 'services', 'geographics', 'testimonials', 'interact', 'contactus']}
                        }
                        $('#fullpage').fullpage(fullpageOptions);
                        //methods
                        $.fn.fullpage.setAllowScrolling(true);

                        $('#scrollToTopBtn').click(function () {
                            $.fn.fullpage.moveTo(1);
                            $("html, body").animate({ scrollTop: "0" });
                        });
                    } else 
						{
							$('#scrollToTopBtn').click(function () {
								$("html, body").animate({ scrollTop: "0" });
							});
						}
						
						

                     populate_animations();


                    $(window).on("scroll", function () {
                        populate_animations();
                    });
                   } else {
                    
                    $('#scrollToTopBtn').click(function () {
                        $("html, body").animate({ scrollTop: "0" });
                    });
                }

                var $navbar = $('#header-menu');

                $('#navbar-toggle').click(function () {
                    $navbar.toggleClass('open');
                });

                $(window).on("scroll", function () {
                    themeChanges();
                });
                themeChanges();

                $('section').each(function(){
                    var secHeight = $(this).innerHeight();
                    if(secHeight === screen.height){
                        $(this).css('height',secHeight);
                    }
                });

                $('#page_loader').fadeOut();

                if ($('#causeAndPlayLottie').length) {
                    var causeAndPlayLottie = document.getElementById('causeAndPlayLottie');
                    lottie.loadAnimation({
                        container: causeAndPlayLottie, // the dom element that will contain the animation
                        renderer: 'svg',
                        loop: true,
                        autoplay: true,
                        path: 'assets/json/cause-and-effect.json' // the path to the animation json
                    });
                }

                // if($(".js-video-button").length) {
                //     $(".js-video-button").modalVideo();
                //     setTimeout(function() {
                //         $(".js-video-button").trigger('click');
                //     }, 500);
                // }


            }
        }
    },
        page = {
            fire: function (func, funcname, args) {
                var namespace = actions;
                funcname = (funcname === undefined) ? 'init' : funcname;
                if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
                    namespace[func][funcname](args);
                }
            },
            readyEvents: function () {
                window.scrollTo(0, 0);
                page.fire("preload");

                $.each(document.body.className.replace(/-/g, "_").split(/\s+/), function (i, v) {
                    page.fire(v);
                });
            },
            loadEvents: function () {
                page.fire("postload");
            }
        };

    $(document).ready(page.readyEvents);
    $(window).on('load', function(){
        page.loadEvents();
    });
});