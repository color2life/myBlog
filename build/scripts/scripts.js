'use strict';
angular.module('appApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngProgress'
]).config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    }).when('/blog', {
      templateUrl: 'views/blog.html',
      controller: 'BlogCtrl'
    }).when('/blog/matchdep', {
      templateUrl: 'views/blog/matchdep.html',
      controller: 'BlogMatchdepCtrl'
    }).otherwise({ redirectTo: '/' });
  }
]);
'use strict';
angular.module('appApp').controller('MainCtrl', [
  '$scope',
  function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }
]);
'use strict';
angular.module('appApp').controller('BlogCtrl', [
  '$scope',
  function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }
]);
'use strict';
angular.module('appApp').controller('BlogMatchdepCtrl', [
  '$scope',
  function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }
]);
/*!
 * fireshell
 * Fiercely quick and opinionated front-ends
 * http://getfireshell.com
 * @author Todd Motto
 * @version 1.1.0
 * Copyright 2013. MIT licensed.
 */
var Drawer = function ($, Mzr) {
    'use strict';
    var transEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd otransitionend',
        'transition': 'transitionend'
      }, transEndEventName = transEndEventNames[Mzr.prefixed('transition')];
    var _body = $('body'), _container = $('#container'), _overlay = $('.drawer-overlay');
    var module = {
        open: function () {
          _body.addClass('drawer-open drawer-transition');
        },
        close: function () {
          _body.removeClass('drawer-open');
        },
        isOpen: function () {
          return _body.hasClass('drawer-open');
        },
        bindOverlay: function () {
          _overlay.on('click', function (e) {
            e.preventDefault();
            if (_body.hasClass('drawer-open')) {
              module.close();
            }
          });
        },
        bindAnchors: function () {
          $('.drawer-list a').on('click', function (e) {
            module.close();
          });
        },
        bindContainerTransEnd: function () {
          _container.on(transEndEventName, function (e) {
            if (!_body.hasClass('drawer-open')) {
              _body.removeClass('drawer-transition');
            }
          });
        },
        init: function () {
          module.bindOverlay();
          module.bindAnchors();
          module.bindContainerTransEnd();
        }
      };
    return {
      init: module.init,
      open: module.open,
      close: module.close,
      isOpen: module.isOpen
    };
  }(jQuery, Modernizr);
var ImageLoader = function ($) {
    'use strict';
    var _body = $('body'), _container = $('#container'), _overlay = $('.drawer-overlay');
    var module = {
        done: function (e) {
          e.addClass('image-loaded');
        },
        success: function (e, image) {
          e.css('background-image', 'url(' + image.src + ')');
          module.done(e);
        },
        init: function ($el) {
          var image = new Image(), src = $el.data('load-image');
          if (src.length) {
            image.src = src;
            image.onload = module.success($el, image);
            image.onerror = module.done($el);
            image.onabort = module.done($el);
          }
          return image;
        }
      };
    return { load: module.init };
  }(jQuery);
(function ($, window, document, undefined) {
  'use strict';
  $(function () {
    // Cache a couple of useful elements
    // =================
    var $window = $(window), $document = $(document), $html = $(document.documentElement), $body = $(document.body), $surface = $body, $content = $('.content', $surface);
    // FastClick bindings
    // =================
    FastClick.attach(document.body);
    // Drawer bindings
    // =================
    Drawer.init();
    // PrismJS handler
    // =================
    Prism.languages.html = Prism.languages.markup;
    var _prismHandler = function () {
      $('code').not('[class*="language-"]').addClass(function () {
        var _lang = $(this).attr('class') || 'markup';
        _lang = _lang.replace(/(language|lang)+\-/gi, '');
        return 'language-' + (Prism.languages.hasOwnProperty(_lang) ? _lang : 'markup');
      });
      Prism.highlightAll();
    };
    _prismHandler();
    // PJax bindings
    // =================
    if ($.support.pjax) {
      $document.on('pjax:start', function () {
        NProgress.start();
        $surface.scrollTop(0);
      });
      $document.on('pjax:end', function () {
        if (typeof ga === 'function') {
          ga('set', 'location', window.location.href);
          ga('send', 'pageview');
        }
        if (typeof DISQUS === 'object' && $('#disqus_thread').length) {
          DISQUS.reset({
            reload: true,
            config: function () {
              this.page.identifier = disqus_identifier;
            }
          });
        }
        if (typeof DISQUSWIDGETS === 'object') {
          DISQUSWIDGETS.getCount();
        }
        $('[data-load-image]', $content).each(function () {
          ImageLoader.load($(this));
        });
        _prismHandler();
        NProgress.done();
      });
      var _pjaxOptions = {
          container: '[data-pjax-container]',
          fragment: '[data-pjax-container]'
        };
      $document.pjax('a[data-pjax]', _pjaxOptions);
      $document.on('submit', 'form[data-pjax]', function (e) {
        $.pjax.submit(e, _pjaxOptions);
      });
    }
    // Data API bindings
    // =================
    $document.on('click', '[data-action]', function (e) {
      var _self = $(this), action = _self.data('action');
      var _openWindow = function (url, h, w) {
        var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left, dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top, left = screen.width / 2 - w / 2 + dualScreenLeft, top = screen.height / 2 - h / 2 + dualScreenTop;
        var newWindow = window.open(url, '', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no' + ', width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
        // Puts focus on the newWindow
        if (window.focus) {
          newWindow.focus();
        }
        return newWindow;
      };
      e.preventDefault();
      switch (action) {
      case 'open-drawer':
        Drawer.open();
        break;
      case 'close-drawer':
        Drawer.close();
        break;
      case 'share-gplus':
        _openWindow('https://plus.google.com/share?url=' + encodeURIComponent(location.href), 600, 600);
        break;
      case 'share-facebook':
        _openWindow('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(location.href), 436, 626);
        break;
      case 'share-twitter':
        _openWindow('https://twitter.com/share?url=' + encodeURIComponent(location.href) + '&text=' + encodeURIComponent(document.title), 440, 550);
        break;
      }
      return false;
    });
    // Async load images
    $('[data-load-image]', $body).each(function () {
      ImageLoader.load($(this));
    });
    // Hide drawer button on scroll for best readability
    // =================
    $surface.on('scroll', function () {
      var offset = $surface.scrollTop(), btn = $('#drawer-button');
      if (offset === 0) {
        btn.removeClass('drawer-button-hidden');
      } else if (!btn.hasClass('drawer-button-hidden')) {
        btn.addClass('drawer-button-hidden');
      }
    });
    // Smooth scrolling for same page anchors
    // =================
    $document.on('click', 'a[href^=#]:not([href=#])', function (e) {
      e.preventDefault();
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $surface.animate({ scrollTop: target.offset().top }, 500);
        location.hash = this.hash;
        return false;
      }
    });
    // Fix oveflow-scrolling on iOS7
    // =================
    $surface.on('touchstart', function (e) {
    });
    // Fix keyboard scrolling not working when page load
    // =================
    if ($body.hasClass('home-template')) {
      $('.wrapper').eq(0).focus();
    }
  });
}(jQuery, window, document));