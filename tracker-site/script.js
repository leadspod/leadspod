$('ul#menu li').on('click', function() {
    setTimeout(function() {
        $('nav').fadeOut("slow", function() {
            $('.toggle-menu').click();
            $('nav').fadeIn("fast", function() {});
        });
    }, 100);
});
var $header_top = $('.header-top');
var $nav = $('nav');

$header_top.find('a').on('click', function() {
    $(this).parent().toggleClass('open-menu');
});

$('#fullpage').fullpage({
    sectionsColor: ['#e8ded2', '#ffffff', '#e3f6f5', '#bae8e8', '#e3f6f5', '#e8ded2'],
    sectionSelector: '.vertical-scrolling',
    navigation: true,
    slidesNavigation: true,
    controlArrows: false,
    anchors: ['firstSection', 'secondSection', 'thirdSection', 'fourthSection', 'fifthSection', 'sixthSection'],
    menu: '#menu',

    afterLoad: function(anchorLink, index) {
        $header_top.css('background', 'rgba(0, 47, 77, .3)');
        $nav.css('background', 'rgba(0, 47, 77, .25)');
        if (index == 5) {
            $('#fp-nav').hide();
        }
    },

    onLeave: function(index, nextIndex, direction) {
        if (index == 5) {
            $('#fp-nav').show();
        }
    },


});

document.body.addEventListener('touchmove', onTouchMove, { passive: false });

function onTouchMove(e) {
    e.preventDefault;
    try {
        if (!screenfull.isFullscreen) {
            setTimeout(function() {
                document.querySelector('a.logo').click();
            }, 1000);
            screenfull.request($('body')[0]);
        }
    } catch (error) {}
}

setInterval(function() {

    let sections = document.querySelectorAll('section.vertical-scrolling > div');
    for (let index = 0; index < sections.length; index++) {
        const section = sections[index];
        if (section.style.height != window.visualViewport.height) {
            section.setAttribute('style', "height:" + window.visualViewport.height + "px !important");
        }
    }
}, 300);