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


document.querySelector('a.logo').addEventListener('click', onLogoClick, { passive: false });

function onLogoClick(e) {
    e.preventDefault;
    try {
        screenfull.toggle($('body')[0]);
    } catch (error) {}
}

let setHeight = function(newViewportHeight) {
    let sections = document.querySelectorAll('section.vertical-scrolling > div');
    for (let index = 0; index < sections.length; index++) {
        const section = sections[index];
        section.setAttribute('style', "height:" + newViewportHeight + "px !important");
    }
}

setInterval(() => {
    setHeight(document.body);
}, 300);