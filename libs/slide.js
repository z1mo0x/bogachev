jQuery(document).ready(function ($) {
    $('body').on('click', '.toggle-slide', function () {
        var hasClass = $(this).hasClass('slide-opened');
        var that = $(this);

        $(this).toggleClass('slide-opened');
        var id = $(this).attr('id');
        $('.slide[id="' + id + '"]').slideToggle(400, function () {
            if (!hasClass) {
                var container = $('.single > .page'),
                    scrollTo = that;
                container.animate({ scrollTop: (scrollTo.offset().top - container.offset().top + container.scrollTop()) });
            }
        });
    });

    $('.nav-ex').click(function () {
        var id = $(this).attr('data-id');
        var container = $('.column-last'),
            scrollTo = $('.custom-html-widget [data-ex-id="' + id + '"]');

        if ($('.single').hasClass('right-hidden')) {
            $('.toggle-sidebar-left').click();
        }

        container.animate({ scrollTop: (scrollTo.offset().top - container.offset().top + container.scrollTop()) });
    });

    $('#popover-info').webuiPopover();

    $('.exercise-table-dnd').each(function (idx, elm) {
        var reorder = function (table) {
            table.find('tr').each(function (idxRow, elmRow) {
                $(elmRow).find('.table-drag-idx').html(idxRow + 1);
            });
        }
        var that = $(this);
        var fixHelperModified = function (e, tr) {
            var $originals = tr.children();
            var $helper = tr.clone();
            $helper.children().each(function (index) {
                $(this).width($originals.eq(index).width())
            });
            return $helper;
        },
            updateIndex = function (e, ui) {
                //reorder(that);
            };
        $(this).find("tbody").sortable({ helper: fixHelperModified, stop: updateIndex }).disableSelection();

        reorder($(this));
    });
})
