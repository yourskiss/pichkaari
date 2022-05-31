 


$('#csSlider').slick({
    infinite: false,
    variableWidth: false,
    autoplay: false,
    autoplaySpeed: 5000,
    adaptiveHeight: false,
    arrows:true,
    dots:false,
    prevArrow: $("#csSliderArrow1"),
    nextArrow: $("#csSliderArrow2")
});



$('#whattheySaySlider').on('init', function (event, slick){
    $('#whattheySaySliderPosition').html(slick.currentSlide + 1);
    $('#whattheySaySliderLength').html(slick.slideCount);
}).on('afterChange', function (event, slick, currentSlide){
    $('#whattheySaySliderPosition').html(slick.currentSlide + 1);
}).slick({
    infinite: false,
    variableWidth: false,
    autoplay: false,
    autoplaySpeed: 5000,
    adaptiveHeight: false,
    arrows:true,
    dots:false,
    prevArrow: $("#whattheySaySliderArrow1"),
    nextArrow: $("#whattheySaySliderArrow2"),
    slidesToShow: 2,
    slidesToScroll: 2,
    centerMode: false,
    centerPadding: '10px',
    initialSlide:0,
    responsive:
            [
                {
                    breakpoint: 1565,
                    settings: { slidesToScroll: 1, slidesToShow: 1 }
                },
                {
                    breakpoint: 479,
                    settings: { slidesToScroll: 1, slidesToShow: 1 }
                } 
            ]
});


$('#ourprocessSlider').slick({
    infinite: false,
    variableWidth: false,
    autoplay: false,
    autoplaySpeed: 5000,
    adaptiveHeight: false,
    arrows:true,
    dots:false,
 // vertical: true,
 // verticalSwiping: true,
    prevArrow: $("#ourprocessSliderArrow1"),
    nextArrow: $("#ourprocessSliderArrow2")
});

