$(function () {
    AOS.init({
        duration: 1200,
    });

    // 加载页面和设置导航栏active状态的函数
    function loadPageAndSetNavbar() {
        var currentPageId = $('body').attr('id'); // 获取当前页面的 ID

        // 根据当前页面的 ID 添加 active 类
        $("#navbar a").removeClass("active");

        // 加载页面
        if ($('#home').length > 0) {
            // 添加home-navbar类
            $("#navbar").addClass("home-navbar");

        } else {
            // 移除home-navbar类
            $("#navbar").removeClass("home-navbar");
            $("#navbar a[href='./" + currentPageId + ".html']").addClass("active");
        }
    }

    // 初始化加载页面和设置导航栏active状态
    loadPageAndSetNavbar();

    // 点击导航链接时的事件处理程序
    $(document).on('click', 'a', function (event) {
        if (event.target.className.includes("btn-download")) {
            return;
        }
        event.preventDefault();
        var href = $(this).attr('href');
        if (!href.startsWith('http')) { // 排除以http开头的链接
            var hash = href.substring(href.lastIndexOf("/") + 1);
            var basePath = window.location.href.split("/").slice(0, -1).join("/") + "/";
            window.location.href = basePath + hash;
        } else {
            // 处理外部链接，例如重定向至外部链接或其他操作
            window.location.href = href;
        }
    });

    $(window).on('hashchange', function () {
        loadPageAndSetNavbar();
    });


    $(document).ready(function () {
        // Check if cookies have been accepted
        if (localStorage.getItem('cookiesAccepted') === 'true') {
            $('#cookieBox').hide();
        }

        // Accept cookies button click event
        $('#acceptCookies').on('click', function () {
            localStorage.setItem('cookiesAccepted', 'true');
            $('#cookieBox').addClass('fade-out');
            setTimeout(function () {
                $('#cookieBox').hide();
            }, 500);
        });
    });

    $(document).ready(function () {
        // privacy
        if (localStorage.getItem('cookiesAccepted') === 'true') {
            $('#cookieBox').hide();
        }

        $('#acceptCookies').on('click', function () {
            localStorage.setItem('cookiesAccepted', 'true');
            $('#cookieBox').addClass('fade-out');
            setTimeout(function () {
                $('#cookieBox').hide();
            }, 500);
        });

        $(window).scroll(function () {
            var scroll = $(window).scrollTop(); // 获取滚动的距离
            var navbar = $('.navbar'); // 导航栏元素
            var pageLoad = $('.pageLoad');

            if (scroll > 10) { // 当滚动超过10个像素时
                navbar.addClass('navbar-scroll'); // 添加滚动时的样式类
                pageLoad.addClass('scroll');
            } else {
                navbar.removeClass('navbar-scroll'); // 移除滚动时的样式类
                pageLoad.removeClass('scroll');
            }

            // Gototop
            if (scroll > 10) {
                $('.scroll-to-top').fadeIn();
            } else {
                $('.scroll-to-top').fadeOut();
            }

        });
        $('.scroll-to-top').click(function () {
            $('html, body').animate({ scrollTop: 0 }, 800);
            return false;
        });
    });
});
