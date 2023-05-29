jQuery(document).ready(function ($) {
    // $('.splash-container').show();
    $('body').on('click', '.vw-navigation > li > a', function (e) {
        var that = $(this);
        var opened = $('.vw-navigation .opened');
        that.next().slideToggle(function () {
            that.toggleClass('opened');
            if (that.hasClass('opened')) {
                opened.next().slideToggle(function () {
                    opened.toggleClass('opened');
                    var container = $('.column-narrow:not(.column-last)'),
                        scrollTo = that;
                    container.animate({ scrollTop: (scrollTo.offset().top - container.offset().top - 10 + container.scrollTop()) });
                });
            }
        });
    });

    $('.vw-navigation > li').each(function (idx, el) {
        if ($(el).find('ul').length == 0) {
            $(el).addClass('no-dropdown');
        }
    });

    var href = window.location.href;
    var page_lang = '';
    var uri_param = href.slice(-8);
    if (uri_param == '&lang=by') {
        page_lang = 'by';
    } else {
        page_lang = 'ru';
    }
    href = href.split('&')[0];
    var html = [];
    var counter = 0;
    var el = $('.vw-navigation a[href="' + href + '"]');
    do {
        if (el.prop("tagName") == 'A') {
            html.push('<a href="' + el.attr('href') + '">' + el.text() + '</a>');

            if (el.is('.vw-chapter > li > a')) {
                var li = el.parent();
                var nextEl = li.next();
                var nextUrl = ''; console.log($(nextEl).length);
                if ($(nextEl).length) {
                    nextUrl = nextEl.children('a').attr('href');
                } else {
                    var nextEl = $($(li).parent().parent().next().find('.vw-chapter > li > a')[0]);
                    nextUrl = nextEl.attr('href');
                }

                var prevEl = li.prev();
                var prevUrl = ''; console.log($(prevEl).length);
                if ($(prevEl).length) {
                    prevUrl = prevEl.children('a').attr('href');
                } else {
                    var els = $(li).parent().parent().prev().find('.vw-chapter > li > a');
                    var prevEl = $(els[els.length - 1]);
                    prevUrl = prevEl.attr('href');
                }
                if (page_lang == 'ru') {
                    $('.entry-content').append('<div class="navigation-chapter">' + (prevUrl ? '<a href="' + prevUrl + '" class="navigation-chapter-prev">&larr; Предыдущий параграф</a>' : '') + (nextUrl ? '<a href="' + nextUrl + '" class="navigation-chapter-next">Следующий параграф &rarr;</a>' : '') + '</div>');
                } else {
                    $('.entry-content').append('<div class="navigation-chapter">' + (prevUrl ? '<a href="' + prevUrl + '" class="navigation-chapter-prev">&larr; Папярэднi параграф</a>' : '') + (nextUrl ? '<a href="' + nextUrl + '" class="navigation-chapter-next">Наступны параграф &rarr;</a>' : '') + '</div>');
                }
            }
        }
        if (el.prop('tagName') == 'UL') {
            if (el.hasClass('vw-chapter')) {
                el.show();
                $(this).next().slideToggle();
                el.prev().toggleClass('opened');
                var container = $('.column-narrow:not(.column-last)'),
                    scrollTo = el.prev();
                container.animate({ scrollTop: (scrollTo.offset().top - container.offset().top - 10 + container.scrollTop()) });
            }
            el = el.prev();
        } else {
            el = el.parent();
        }
        counter++;
    }
    while (el.hasClass('vw-navigation'));
    html.reverse();
    $('#crumbs p').html(html.join('»'));

    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }
    // var isVisited = getCookie('visited') !== undefined;
    // if(isVisited){$('.splash').remove();}
    if ($('.splash').length > 0) {
        var clone = $('.splash img').clone();
        $('.splash-container').append(clone);
        $('.splash').remove();
        $('.splash-container').show();
        var offset = 1;
        setInterval(function () { $('.splash-container').css({ 'background-position': offset }); offset++; }, 50);
        document.cookie = 'visited=1';
    }
    $('.splash-container').click(function () {
        $('.splash-container').animate({ opacity: 0 }, function () {
            $('.splash-container').remove();
        });
    });
    $('#crumbs').css({ 'left': $('.column-narrow').width() + 25 + 'px' });

    $('#change-size a').click(function () {
        var direct = $(this).hasClass('minus') ? -1 : 1;
        $('.entry-content [style*="font-size"], .entry-content p, .entry-content td, .entry-content th, .entry-content label, h3').each(function (idx, el) {
            var size = $(this).css('font-size');
            var dem = '';
            var step = 1;
            var sizept = 0;
            if (size) {
                dem = size.indexOf('px') > -1 ? 'px' : 'pt';
                step = (dem == 'px') ? 1 : 0.5;
                sizept = 13.5;
                if (size == 'large')
                    sizept = 13.5;
                else if (size == 'xx-small') {
                    sizept = 7;
                } else {
                    console.log(size);
                    sizept = parseFloat(size);
                }
                console.log(sizept);
            } else if ($(this).prop('tagName') == 'H3') {
                sizept = 20;
                step = 1;
                dem = 'px';
            }
            if (direct == -1) { sizept -= step; } else { sizept += step; }
            $(this).css({ 'font-size': sizept + dem });
        })
    });

    $('.right-panel').each(function (idx, el) {
        $('.custom-html-widget').append($(el).clone().removeClass('right-panel'));
        //if($(el).parent().prop('tagName') == 'P'){$(el).parent().remove();}
        //$(el).remove();
    });
    if ($('.custom-html-widget').html().length == 0) {
        //$('.toggle-sidebar-left').addClass('rev');
        //$('.column-content.single').addClass('right-hidden');
        setTimeout(function () {
            $('.toggle-sidebar-left').click();
        }, 300)
    }
    if ($(window).width() <= 1000) {
        $('.column-narrow:not(.column-last)').addClass('rev').css({ left: '-' + ($('.column-narrow').width() + 20) + 'px' });
        $('.column-narrow.column-last').addClass('rev').css({ right: '-' + ($('.column-narrow').width() + 20) + 'px' });
        $('.column-content').addClass('left-hidden');
        $('.column-content').addClass('right-hidden');
        $('.toggle-sidebar-right').addClass('rev');
        $('.toggle-sidebar-left').addClass('rev');
    }
    $('.toggle-sidebar-right').click(function () {
        if ($(this).hasClass('rev')) {
            $(this).removeClass('rev');
            $('.column-content').removeClass('left-hidden');
            $('.column-narrow:not(.column-last)').animate({ left: '0px' });
        } else {
            $(this).addClass('rev');
            $('.column-content').addClass('left-hidden');
            $('.column-narrow:not(.column-last)').animate({ left: '-' + ($('.column-narrow').width() + 20) + 'px' });
        }
    });
    $('.toggle-sidebar-left').click(function () {
        if ($(this).hasClass('rev')) {
            $(this).removeClass('rev');
            $('.column-content').removeClass('right-hidden');
            $('.column-narrow.column-last').animate({ right: '0px' })
        } else {
            $(this).addClass('rev');
            $('.column-content').addClass('right-hidden');
            $('.column-narrow.column-last').animate({ right: '-' + ($('.column-narrow').width() + 20) + 'px' })
        }
    });

    $('.toggle-slide').each(function (idx, el) {
        if ($(el).parent().prop('tagName') == 'P') {
            $(el).parent().replaceWith($(el));
        }
    });

    function getResized(width, height) {
        width *= 2;
        height *= 2;
        var maxWidth = ($('body').width() <= 320) ? $('body').width() : $(window).width() - 150; // Max width for the image
        var maxHeight = $(window).height() - 150;    // Max height for the image
        var ratio = 0;  // Used for aspect ratio
        var newWidth = width;
        var newHeight = height;

        // Check if the current width is larger than the max
        if (width > maxWidth) {
            ratio = maxWidth / width;   // get ratio for scaling image
            newWidth = maxWidth; // Set new width
            newHeight = height * ratio;  // Scale height based on ratio
            height = height * ratio;    // Reset height to match scaled image
            width = width * ratio;    // Reset width to match scaled image
        }

        // Check if current height is larger than max
        if (height > maxHeight) {
            ratio = maxHeight / height; // get ratio for scaling image
            newHeight = maxHeight;   // Set new height
            newWidth = width * ratio;    // Scale width based on ratio
            width = width * ratio;    // Reset width to match scaled image
            height = height * ratio;    // Reset height to match scaled image
        }

        return { width: newWidth, height: newHeight };
    }

    $('.have-wide').click(function () {
        if ($(this).parent().hasClass('not-wide')) { return; }
        var url = $(this).attr('data-origin');
        var height = $(window).height() - 150;

        var img = new Image();
        img.onload = function () {
            console.log('aaaa');
            var sizes = getResized(this.width, this.height);
            var top = (($(window).height() - sizes.height) / 2);
            var left = (($(window).width() - sizes.width) / 2);
            $('body').append($('<div class="shadow"></div>'));
            $('body').append($('<div>').css({ height: sizes.height, width: sizes.width, top: top + 'px', left: left + 'px' }).addClass('wide-photo').append(img));
        }
        img.src = url;

    });

    function doOnOrientationChange(e) {
        if (window.hasOwnProperty('orientation')) {
            switch (window.orientation) {
                case -90:
                case 90:
                    console.log('Current orientation: landscape');
                    break;
                default:
                    setTimeout(function () {
                        !$('.toggle-sidebar-right').hasClass('rev') ? $('.toggle-sidebar-right').click() : null;
                        !$('.toggle-sidebar-left').hasClass('rev') ? $('.toggle-sidebar-left').click() : null;
                    }, 300);
                    console.log('Current orientation: portrait');
                    break;
            }
        }
    }

    window.addEventListener('orientationchange', doOnOrientationChange);

    // Initial execution if needed
    doOnOrientationChange();

    $(".custom-html-widget .have-wide").one("load", function () {
        var icon = $('<div class="have-wide-icon"></div>');
        var fn = function (icon, that) {
            console.log(that);
            icon.css({ top: that.position().top, left: that.position().left });
        }
        fn(icon, $(this));
        //setTimeout(function(){fn(icon, $(this))}, 500);
        $(this).parent().prepend(icon);
    });
    var isExternalRegexClosure = (function () {
        var domainRe = /https?:\/\/((?:[\w\d-]+\.)+[\w\d]{2,})/i;

        return function (url) {
            function domain(url) {
                var r = domainRe.exec(url);
                return r && r.length >= 1 ? r[1] : '';
            }

            return domain(location.href) !== domain(url);
        }
    })();
    $('a').each(function (idx, elm) {
        var href = $(elm).attr('href');
        if (href == undefined) return;
        if (href.indexOf('#') === 0) return;
        if (href) {
            if (isExternalRegexClosure(href)) { $(elm).attr('target', '_blank'); }
        }
    });

    $('body').on('click', '.wide-photo, .shadow', function () { $('.wide-photo').remove(); $('.shadow').remove() });
})
