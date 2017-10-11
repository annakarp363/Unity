$(".menu-open_button").click(function(){
    $(".un-header__menu-block").addClass("menu-open");
    $(".abs-black").fadeIn(300);
})
$(".menu-close_button, .abs-black").click(function(){
    $(".un-header__menu-block").removeClass("menu-open");
    $(".abs-black").fadeOut(300);
})

$('.un-work__slider').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    centerMode: true,
    variableWidth: true
})
