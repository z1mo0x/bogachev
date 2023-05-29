jQuery(document).ready(function ($) {
    $('body').on('click', '.exer-check', function () {
        var id = $(this).attr('data-id');
        var type = ($(this).prev().prop('tagName') == 'TABLE') ? 3 : 1;
        var isCorrent = true;
        if (type != 3) {
            var ex = $('.exercise[data-id="' + id + '"]');
            var inputs = ex.find('input');


            for (var i = 0; i < inputs.length; i++) {
                var el = inputs[i];

                if ($(el).attr('data-is-correct') == 1 && !$(el).is(':checked')) {
                    isCorrent = false;
                    break;
                }

                if ($(el).attr('data-is-correct') == 0 && $(el).is(':checked')) {
                    isCorrent = false;
                    break;
                }
            }
        } else {
            var table = $(this).prev();
            table.find('tr').each(function (idx, elm) {
                if ($(elm).attr('data-right-pos') != idx + 1) { isCorrent = false; };
            });
        }

        alert(isCorrent ? 'Правильно' : 'Неправильно');
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip({
            open: function () {
                // We make sure that the tootlip closes on
                // touch devices if there is a touch event anywhere.
                $('body').on('touchend', closeTooltipOnClick);
            }
        });
        var closeTooltipOnClick = function (e) {

            // This code if for touch devices only.
            // We want to tooltip to close, when we touch
            // anywhere on the page, except if we touch on
            // the link itself.

            if ($(e.target).closest($(this)).size()) {
                // We just clicked on the link, so let's
                // not close the tooltip.
                return;
            }

            $('body').off('touchend', closeTooltipOnClick);
            $el.tooltip('close');
        };

    });

    $('.widget_nav_menu h3.heading').click(function () {
        $(this).next().toggleClass('menu-open');
    });

    $('.widget_nav_menu').each(function (idx, el) {
        if ($(el).find('h3.heading').length == 0) {
            $(el).find('div[class*="menu-"]').addClass('menu-open');
        }
    });
})

