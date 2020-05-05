var fixedHeaderContainer = '.fixed-header-box';
var fixedHeader = '.fixed-header';

$(function() {
    //маска телефонов
    $('[data-mask]').each(function() {
        input = $(this);
        mask = input.attr('data-mask');
        input.inputmask({"mask": mask});
    });
    //сворачивание мобильного меню
    $('.toggle-menu-js').on('click', function (e) {
        e.preventDefault();
        if ($('body').hasClass('show-slide-menu')) {
            /*
            $('.mobile-menu').slideUp(300, function() {
                $('.mobile-menu').stop(true, true);
            });
             */
            $('body').removeClass('show-slide-menu')
        } else {
            /*
            $('.mobile-menu').slideDown(300, function() {
                $('.mobile-menu').stop(true, true);
            });
             */
            $('body').addClass('show-slide-menu')
        }
    });

    //разворачивание второго уровня меню в мобильной версии
    $('body').on('click', '.mobile-menu__item--parent > a', function(e) {
        e.preventDefault();
        var parent = $(this).closest('.mobile-menu__item--parent');
        if (parent.hasClass('open')) {
            parent.find('.mobile-menu__childs').slideUp(300, function() {
                $('.mobile-menu__childs').stop(true, true);
            });
            parent.removeClass('open')
        } else {
            parent.find('.mobile-menu__childs').slideDown(300, function() {
                $('.mobile-menu__childs').stop(true, true);
            });
            parent.addClass('open')
        }
    });

    //разворачивание поиска при фокусе на нем
    $('.search input').on('click', function (e) {
        e.preventDefault();
        if ($('body').hasClass('show-search')) {
            $('body').removeClass('show-search')
        } else {
            $('body').addClass('show-search')
        }
    });

    //сворачивание и разворачивание группы в фильтре
    $('body').on('click', '.filter__caption', function (e) {
        e.preventDefault();
        console.log('filter__caption');
        var filterGroup = $(this).closest('.filter__group');
        var filterBody = filterGroup.find('.filter__body');
        if (filterGroup.hasClass('active')) {
            filterBody.slideUp(500, function() {
                filterBody.stop(true, true);
                filterGroup.removeClass('active');
            });

        } else {
            filterBody.slideDown(500, function() {
                filterBody.stop(true, true);
                filterGroup.addClass('active');
            });

        }
    });

    //сворачивание и разворачивание подменю для мобильного
    $('body').on('click', '.mobile-menu__toggle', function(e) {
        e.preventDefault();
        $(this).closest('li').toggleClass('open');
    });

    //плавный переход по контенту
    $('body').on('click', '[data-goto]', function(e) {
        e.preventDefault();
        $('.mobile-menu').slideUp();
        var hx = 0;
        var selector = $(this).attr('data-goto');
        $('html, body').animate({ scrollTop: $(selector).offset().top + hx}, 1200);
    });
    //обрабатываем событие клика по табу
    $('[data-tab]').click(function(e){
        e.preventDefault();
        if ($(this).hasClass('active')) return false;
        var parent = $(this).parents('.xtab-container');
        var xtab = parent.find('.xtab');
        xtab.stop(true, true);
        parent.find('[data-tab]').removeClass('active');
        //$(this).addClass('active');
        var data_tab = $(this).attr('data-tab');
        $('[data-tab="'+data_tab+'"]').addClass('active');
        xtab.animate({"opacity": 0.2}, 300, function() {
            xtab.removeClass('active');
            xtab.animate({"opacity": 1});
            $(data_tab).addClass('active');
        });
        return false;
    });
    //инициализация верхнего слайдера
    initMainSlider();
    //инициализация слайдера Акций
    //инициализация слайдера похожих статей
    initRelatedArticles();
    //инициализация всех табов
    initXtab();
    //установка высоты плавающего хедера
    setHeaderHeight();
    //установка высоты страницы 404
    initErrorPageHeigth();
    //установка видимости кнопки наверх
    initGotoTopButton();

    //показ всех товаров в каталоге при клике на "Показать еще"
    $('body').on('click', '.more-js', function(e) {
        e.preventDefault();
        var box = $(this).parents('.services').find('.hidden').removeClass('hidden');
        $(this).addClass('hidden');
    });

    $('body').on('click', '.about-faq__item', function() {
        var item = $(this);
        $('.about-faq__item.active').find('.about-faq__answer').slideUp(400, function() {
            $(this).closest('.about-faq__item').removeClass('active');
        });
        $(this).find('.about-faq__answer').slideDown(400, function() {
            item.addClass('active');
        });

        //$(this).toggleClass('active');
    });

    $('select.styler').styler();
    $('.checkbox-styler').styler();

    //скрываем фильтр при нажатии на крестик
    $('body').on('click', '.catalog-filter-button, .sidebar-close', function(e) {
        e.stopPropagation();
        e.preventDefault();
        var sidebar = $('.catalog__sidebar');
        var overlay = $('.overlay-light');
        if (sidebar.hasClass('open')) {
            sidebar.removeClass('open');
            setTimeout(function() {
                overlay.hide();

            }, 150);

        } else {
            sidebar.addClass('open');
            overlay.show();
        }
    });

    //прокрутка к верху страницы
    $('body').on('click', '.goto-top', function(e) {
        e.preventDefault();
        $('body,html').animate({
            scrollTop: 0,
        }, 700);
    });

});


var initXtab = function() {
    setTimeout(function() {
        $('.xtab-container').each(function() {
            $(this).addClass('xtab-initialized');
        });
    }, 100);
};

var isInitMainSlider = false;
var initMainSlider = function() {
    var selector = '.main-slider-js';
    $(selector).owlCarousel({
        loop: true,
        margin: 20,
        responsiveClass:true,
        responsive:{
            0:{
                items: 1,
                nav: false,
                dots: true,
            }
        }
    });
};

var initRelatedArticles = function() {
    var selector = '.related-articles-js';
    $(selector).owlCarousel({
        loop: true,
        margin: 0,
        responsiveClass:true,
        //autoWidth:true,
        responsive:{
            0:{
                items: 1,
                nav: false,
                dots: true,
            },
            750:{
                items: 2,
                nav: false,
                dots: true,
            },
            1000:{
                items: 3,
                nav: false,
                dots: true,
            }
        }
    });
};

var hideSlideMenu = function() {
    $('body').removeClass('show-slide-menu');
};

var setHeaderHeight = function() {
  var headerHeight = $(fixedHeader).height();
  $(fixedHeaderContainer).css({'height': headerHeight});
};

var setFixedHeader = function() {
    var topFixedStart = parseInt($('.topline').offset().top) + parseInt($('.topline').height());
    var scroll = $(window).scrollTop();
    if (scroll > topFixedStart) {
        $('body').addClass('fix-header');
    } else {
        $('body').removeClass('fix-header');
    }
};

var initErrorPageHeigth = function() {
  var errorPageBody = $('.fix-height');
  if (errorPageBody.length == 1) {
      var windowHeight = $(window).outerHeight();
      var bodyHeight = $('body').outerHeight();
      var errorPageBodyHeight = errorPageBody.outerHeight();
      var newErrorPageHeight = windowHeight - (bodyHeight - errorPageBodyHeight);
      if (bodyHeight < windowHeight) {
          errorPageBody.css({'min-height': newErrorPageHeight});
      }
  }
};

var initGotoTopButton = function() {
    var scroll = $(window).scrollTop();
    if (scroll > 400) {
        $('.goto-top').addClass('goto-top--visible');
    } else {
        $('.goto-top').removeClass('goto-top--visible');
    }
};

var doit;
$(window).resize(function(){
    clearTimeout(doit);
    doit = setTimeout(resizedw, 100);
});

var resizedw = function(){
    //setCountProducts();
    //setHeaderHeight();
    //setFixedHeader();
    $('body').removeClass('show-slide-menu')
    //$('.mobile-menu').slideUp();
};

$(document).scroll(function(){
    setFixedHeader();
    initGotoTopButton();
});

$(window).on("load",function(){
    $(".filter__items").mCustomScrollbar({
        setHeight: 116,
        theme: "dark"
    });
});