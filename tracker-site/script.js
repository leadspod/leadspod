// Code By Webdevtrick ( https://webdevtrick.com )
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

let sections = document.querySelectorAll('section');
for (let index = 0; index < sections.length; index++) {
    const section = sections[index];
    section.addEventListener('touchend', onTouchMove, { passive: false });
    //section.addEventListener('touchmove', onTouchMove, { passive: false });
    //section.addEventListener('click', onTouchMove, { passive: false });
    //section.addEventListener('scroll', onTouchMove, { passive: false });
}


function onTouchMove(e) {
    e.preventDefault;
    if (screenfull.isEnabled) {
        if (!screenfull.isFullscreen) {
            try {
                document.querySelector('#toggle').click();
            } catch (error) {}
        }
    }
}


$('#toggle').click(function() {
    screenfull.request();
    //screenfull.toggle($('body')[0]).then(function() {
    //    console.log('Fullscreen mode: ' + (screenfull.isFullscreen ? 'enabled' : 'disabled'))
    //});
});