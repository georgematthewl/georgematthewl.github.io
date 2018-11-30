$(document).ready(function () {

    // Smooth scrolling effect
    $(".fa-angle-double-down").click(function () {
        $('html, body').animate({
            scrollTop: $("#skills").offset().top
        }, 800);
    });

    if ($(window).width() < 768) {
        $('.navbar').addClass("navbar-dark");
        $('#mainNav li').removeClass("active");
    } else {
        // Dynamic navbar
        var skills = $('#skills').offset().top;
        $(document).scroll(function () {
            var scrollPos = $(document).scrollTop();
            if ($(window).width() > 767) {
                if (scrollPos >= skills) {
                    $('#nav').css('background-color', '#3D618B');
                    $('.nav-item .nav-link').css('color', 'white');

                } else if (scrollPos <= skills) {
                    $('#nav').css('background-color', 'transparent');
                    $('.nav-item .nav-link').css('color', 'black');
                }
            }
        });

        // Dynamic highlighted navbar
        var lastId,
            topMenu = $("#mainNav"),
            topMenuHeight = topMenu.outerHeight() + 1,
            // All list items
            menuItems = topMenu.find("a"),
            // Anchors corresponding to menu items
            scrollItems = menuItems.map(function () {
                var item = $($(this).attr("href"));
                if (item.length) {
                    return item;
                }
            });

        // Bind click handler to menu items
        // so we can get a fancy scroll animation
        menuItems.click(function (e) {
            var href = $(this).attr("href"),
                offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 50;
            $('html, body').stop().animate({
                scrollTop: offsetTop
            }, 850);
            e.preventDefault();
        });

        // Bind to scroll
        $(window).scroll(function () {
            // Get container scroll position
            var fromTop = $(this).scrollTop() + topMenuHeight + 100;

            // Get id of current scroll item
            var cur = scrollItems.map(function () {
                if ($(this).offset().top < fromTop)
                    return this;
            });
            // Get the id of the current element
            cur = cur[cur.length - 1];
            var id = cur && cur.length ? cur[0].id : "";
            if (lastId !== id) {
                lastId = id;
                // Set/remove active class
                menuItems.parent().removeClass("active");
                var selectedNavigation;
                for (var i = 0; i < menuItems.length; i++) {
                    if ($(menuItems[i]).attr('href') === ('#' + id)) {
                        selectedNavigation = menuItems[i];
                        break;
                    }
                }
                $(selectedNavigation).parent().addClass("active");
            }
        });
    }
});