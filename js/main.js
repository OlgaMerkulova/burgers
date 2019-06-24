//one page scroll
$(function(){

  var sections = $('.section'),
      display = $('.maincontent'),
      inScroll = false;

  var scrollToSection = function (sectionEq) {
    var position = 0;

    if(!inScroll) {
      inScroll = true;
      position = (sections.eq(sectionEq).index() * -100) + '%';
      sections.eq(sectionEq).addClass('active')
        .siblings().removeClass('active');
      display.css({
        'transform' : 'translate3d(0, ' + position + ', 0)'
      });
      setTimeout(function () {
        inScroll = false;
        $('.fixed-menu__item').eq(sectionEq).addClass('active')
          .siblings().removeClass('active');
      }, 1000)
    }
  }

  $('.wrapper').on('wheel', function(e) {
    var deltaY = e.originalEvent.deltaY,
        activeSection = sections.filter('.active'),
        nextSection = activeSection.next(),
        prevSection = activeSection.prev();

    if(deltaY > 0) { //скролл вниз
      if (nextSection.length) {
        scrollToSection(nextSection.index());
      }
    }
    if(deltaY < 0) { //скролл вверх
      if (prevSection.length) {
        scrollToSection(prevSection.index());
      }
    }
  });

  $('.fixed-menu__link, .nav-list__link, .nav-list__button').on('click', function(e){
    e.preventDefault();
    var href = parseInt($(this).attr('href'));
    scrollToSection(href);
  })

  $('.down-arrow').on('click', function(e) {
    e.preventDefault();
    scrollToSection(1);
  });

  $(document).on('keydown', function(e) {
    var activeSection=sections.filter('.active'),
        nextSection=activeSection.next(),
        prevSection=activeSection.prev();
    if ((e.keyCode == 40) && (nextSection.length)) {
    			scrollToSection(nextSection.index());
    }

    if ((e.keyCode == 38) && (prevSection.length)) {
    			scrollToSection(prevSection.index());
    }
  });
});


//slider
$(function() {

  var sliders = $('.slider__item'),
      display = $('.burger-slider');

  var scrollToSlider = function(slideNum) {
    var position = 0;

    position = (sliders.eq(slideNum).index() * -100) + '%';

    sliders.eq(slideNum).addClass('active')
      .siblings().removeClass('active');

    display.css({
      'left' : position
    });
  };

  $('.slider__button').on('click', function(e) {
    var activeSlide = sliders.filter('.active'),
        nextSlide = activeSlide.next(),
        prevSlide = activeSlide.prev(),
        $this = $(this);


    if ($this.hasClass('slider__button--right')) {
      if(nextSlide.length) {
        scrollToSlider(nextSlide.index());
      } else {
        scrollToSlider(0);
      }
    } else {
      scrollToSlider(prevSlide.index());
    }
  });

  $(document).on('keydown', function(e) {
    var activeSlide = sliders.filter('.active'),
        nextSlide = activeSlide.next(),
        prevSlide = activeSlide.prev();
    if (e.keyCode == 39) {
      if (nextSlide.length) {
        scrollToSlider(nextSlide.index());
      } else {
        scrollToSlider(0);
      }
    }
    if (e.keyCode == 37) {
      scrollToSlider(prevSlide.index());
    }
  });
});


//team accordeon
$(function() {
  $('.team-list__item').on('click', function(e) {
    e.preventDefault();
    var $this=$(this);
    if ($this.hasClass('active')) {
      $this.removeClass('active');
    }
    else {
      $this.addClass('active');
      $this.siblings().removeClass('active');
    }
  });
});


//menu accordeon
$(function() {
  $('.menu-list__head').on('click', function(e) {
    e.preventDefault();
    var $this=$(this),
        item = $this.closest('.menu-list__item'),
        container = $this.closest('.menu-list'),
        items = container.find('.menu-list__item'),
        activeItem = items.filter('.active'),
        content = item.find('.menu-list__content'),
        activeContent = activeItem.find('.menu-list__content');
    if(!item.hasClass('active')) {
      items.removeClass('active');
      item.addClass('active');
    } else {
      item.removeClass('active');
    }
  });
  $(document).on('click', function(e) {
    var $this = $(e.target);

    if(!$this.closest('.menu-list').length) {
      $('.menu-list__item').removeClass('active');
    }
  });
});


//phone mask
$(function() {
  $('.phone-mask').mask("+7 (999) 999 99 99");
});

//fancybox
$(function() {
  $('.reviews__button--text').fancybox({
    type: 'inline',
    maxWidth: 460,
    fitToView: false,
    padding: 0
  });
  $('.full-review__close').on('click', function(e) {
    e.preventDefault();
    $.fancybox.close();
  });
});

//yandex map
$(function() {
    ymaps.ready(init);
    var myMap;

    function init(){
        myMap = new ymaps.Map("map", {
            center: [59.91807704072416,30.30557799999997],
            zoom: 11,
            controls: []
        });

        var coords = [
                [59.96596334156446,30.30454803173824],
                [59.943923592410066,30.374414212158154],
                [59.89047539500241,30.32226627082614],
                [59.91158672941606,30.49843285769328],
              ],
              myCollection = new ymaps.GeoObjectCollection({}, {
                  iconLayout: 'default#image',
                  iconImageHref: 'img/icons/map-marker.svg',
                  iconImageSize: [46, 57],
                  iconImageOffset: [-26, -52],
                  draggable: false // и их можно перемещать
              });
        for (var i = 0; i < coords.length; i++) {
            myCollection.add(new ymaps.Placemark(coords[i]));
        }


        /*var myPlacemark = new ymaps.Placemark([59.91807704072416,30.30557799999997], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'img/icons/map-marker.svg',
        iconImageSize: [46, 57],
        iconImageOffset: [-26, -52]
    });*/
        myMap.geoObjects.add(myCollection);
        myMap.behaviors.disable('scrollZoom');
    }

});
