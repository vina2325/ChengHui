
$(function () {
    // 加载导航栏和页脚
    $("#footer").load("footer.html");
    $("#navbar").load("navbar.html");

    AOS.init({
        duration: 1200,
    })

    // 检查URL是否以"/index.html"结尾，如果是则重定向到"/"
    if (window.location.pathname.endsWith('/index.html')) {
        var newUrl = window.location.href.replace('/index.html', '/');
        window.location.replace(newUrl);
    }

    // 加载页面和设置导航栏active状态的函数
    function loadPageAndSetNavbar() {
        var newHash1 = window.location.hash.substr(1);

        // 加载页面
        if (window.location.hash === "") {
            // 引入home并加载navbar.css
            $('.pageLoad').load('home.html', function () {
                $("#navbar").load("navbar.html", function () {
                    // 添加home-navbar类
                    $("#navbar").addClass("home-navbar");
                    // 移除其他导航链接的active类
                    $("#navbar a").removeClass("active");
                    // 添加active类到当前链接
                    $("#navbar a[href='#']").addClass("active");
                });
            });
        } else {
            // 引入其他分页并加载navbar.css
            $('.pageLoad').load(newHash1, function () {
                $("#navbar").load("navbar.html", function () {
                    // 移除home-navbar类
                    $("#navbar").removeClass("home-navbar");
                    // 移除其他导航链接的active类
                    $("#navbar a").removeClass("active");
                    // 添加active类到当前链接
                    $("#navbar a[href='" + newHash1 + "']").addClass("active");
                });
            });
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
            $(window).scrollTop(0);
            window.location.hash = href;
            loadPageAndSetNavbar();
        } else {
            // 处理外部链接，例如重定向至外部链接或其他操作
            window.location.href = href;
        }
    });

    $(window).on('hashchange', function () {
        loadPageAndSetNavbar();
    });

    $(document).ready(function () {
        $(window).scroll(function () {
            var scroll = $(window).scrollTop(); // 获取滚动的距离
            var navbar = $('.navbar'); // 导航栏元素
            var pageLoad = $('.pageLoad')

            if (scroll > 10) { // 当滚动超过10个像素时
                navbar.addClass('navbar-scroll'); // 添加滚动时的样式类
                pageLoad.addClass('scroll');
            } else {
                navbar.removeClass('navbar-scroll'); // 移除滚动时的样式类
                pageLoad.removeClass('scroll');
            }

            // Gototop

            if (scroll > window.innerHeight) {
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


