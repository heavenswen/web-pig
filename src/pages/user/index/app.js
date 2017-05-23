import "swiper/dist/css/swiper.min.css"
import "animate.css/animate.min.css"
import "photoswipe/dist/photoswipe.css"
import "photoswipe/dist/default-skin/default-skin.css"
import 'assets/css/react.scss'
//rem 
import rem from "assets/js/rem.js"
import Swiper from "swiper"
import PhotoSwipe from "photoswipe"
import PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default.min.js"
import p4_1_img from "assets/images/p04-1.png"
import p05_20 from "assets/images/p05-20.png"
(function () {
  window.PhotoSwipe = PhotoSwipe
  //rem init
  new rem();
  //+classname
  function objAddClass(objs, className) {
    let reg = new RegExp(className)
    if (!objs) return;

    if (objs instanceof Array) {
      for (let o of objs) {
        let cl = o.className;
        if (!cl.match(reg)) {
          o.className = cl + " " + className
        }
      }
    } else {
      let o = objs
      let cl = o.className;
      if (!cl.match(reg)) {
        o.className = cl + " " + className
        o.style.opacity = '1'//独立动画显示
      }
    }

  }
  //animateed 兼容
  function whichTransitionEvent() {
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'webkitAnimation': 'webkitAnimationEnd',
      'MozAnimation': 'mozAnimationEnd',
      'MSAnimation': 'MSAnimationEnd',
      'OAnimation': 'oanimationend',
      'animation': 'animationend'
    }

    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }
  };
  //删除样式
  function removeClass() {
    let o = this
    o.style.opacity = 1;
    initAnimate(o)
  }
  //去除动画样式
  function initAnimate(o) {
    let reg = /animated(.*)/
    let cl = o.className
    if (cl.match(reg)) {
      cl = cl.replace(reg, '')
    }
    o.className = cl;
  }

  const animatend = whichTransitionEvent()
  //传播场景
  const p4_1 = document.querySelector("#p4-1")
  const p4_2 = document.querySelector("#p4-2")
  const p04_3_1 = document.querySelector("#p04-3-1")
  const p5_1 = document.querySelector("#p5-1")
  const p5_2 = document.querySelector("#p5-2")
  const p5_3 = document.querySelector("#p5-3")
  const p05_1_1 = document.querySelector("#p05-1-1")
  const p6_1 = document.querySelector("#p6-1")
  const p6_2 = document.querySelector("#p6-2")
  const p6_3 = document.querySelector("#p6-3")
  const p06_1_1 = document.querySelector("#p06-1-1")
  const p06_3_1 = document.querySelector("#p06-3-1")
  const p6_4 = document.querySelector("#p6-4")
  const p6_5 = document.querySelector("#p6-5")
  let t //队列动画
  //if animatend div remove class (重播动画)

  let anis = document.querySelectorAll("[data-animate]");
  for (let i = 0; i < anis.length; i++) {
    anis[i].addEventListener(animatend, removeClass, false)
  }



  var mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    // 如果需要分页器
    // pagination: '.swiper-pagination',
    preloadImages: false,
    lazyLoading: true,
    hashnav: true,
    onInit: function (swiper) {
      let index = swiper.activeIndex
      if (index == 0) {
        index = index + 1
        let parent = ".page" + (index >= 10 ? index : '0' + index)
        //let page = document.querySelector(parent)
        let objs = document.querySelectorAll(parent + " [data-animate]")
        for (let i = 0; i < objs.length; i++) {
          let cl = objs[i].dataset.animate
          objAddClass(objs[i], cl);
        }
      }
    },
    onTransitionEnd: function (swiper) {
      let index = swiper.activeIndex
      index = index + 1
      let parent = ".page" + (index >= 10 ? index : '0' + index)

      //let page = document.querySelector(parent)
      let objs = document.querySelectorAll(parent + " [data-animate]")

      for (let i = 0; i < objs.length; i++) {
        let cl = objs[i].dataset.animate
        objAddClass(objs[i], cl);
      }
      //init animate
      let index_p = swiper.previousIndex + 1 //上一屏
      if (index == index_p) return;
      console.log(index, objs, index_p)
      let parent_p = ".page" + (index_p >= 10 ? index_p : '0' + index_p)
      let objs_p = document.querySelectorAll(parent_p + " [data-animate]")
      if (t) clearTimeout(t);
      for (let i = 0; i < objs_p.length; i++) {
        let o = objs_p[i]
        o.style.opacity = "0"
        initAnimate(o)
      }
      if (index_p == 4) {
        //init mobile status the img
        p4_1.querySelector("img").src = p05_20
      } else if (index_p == 5) {
        p5_1.querySelector("img").src = p05_20
      } else if (index_p == 6) {
        p6_1.querySelector("img").src = p05_20
      }

    }

  })

  //拨打电话
  p4_2.addEventListener(animatend, function () {
    p4_1.querySelector("img").src = p4_1_img
    objAddClass(p4_1, "animated tada");
    //弹屏
    t = setTimeout(function () {
      p04_3_1.style.opacity = 1
      objAddClass(p04_3_1, "animated zoomIn")
    }, 500)
  }, false)

  p5_2.addEventListener(animatend, function () {
    p5_1.querySelector("img").src = p4_1_img
    objAddClass(p5_1, "animated tada");
    //弹屏
    t = setTimeout(function () {
      p05_1_1.style.opacity = 1
      objAddClass(p05_1_1, "animated zoomIn")
    }, 500)
  }, false)
  p6_2.addEventListener(animatend, function () {
    p6_1.querySelector("img").src = p4_1_img
    objAddClass(p6_1, "animated tada");
    //弹屏
    t = setTimeout(function () {
      p06_1_1.style.opacity = 1
      objAddClass(p06_1_1, "animated zoomIn")
      objAddClass(p06_3_1, "animated zoomIn")
    }, 500)
  })



  //zoom pic
  const initPhotoSwipeFromDOM = function (gallerySelector) {
    // 解析来自DOM元素幻灯片数据（URL，标题，大小...）
    // (children of gallerySelector)
    var parseThumbnailElements = function (el) {
      var thumbElements = el.childNodes,
        numNodes = thumbElements.length,
        items = [],
        figureEl,
        linkEl,
        size,
        item;
      for (var i = 0; i < numNodes; i++) {

        figureEl = thumbElements[i]; // <figure> element
        // 仅包括元素节点
        if (figureEl.nodeType !== 1) {
          continue;
        }
        //window width
        let ww = window.innerWidth
        linkEl = figureEl.children[0]; // <a> element

        // 创建幻灯片对象
        item = {
          src: linkEl.getAttribute('src'),
          w: ww,
          h: linkEl.height * (ww / linkEl.width)
        };
        if (figureEl.children.length > 1) {
          // <figcaption> content
          item.title = figureEl.children[1].innerHTML;
        }

        if (linkEl.children.length > 0) {
          // <img> 缩略图节点, 检索缩略图网址
          item.msrc = linkEl.children[0].getAttribute('src');
        }

        item.el = figureEl; // 保存链接元素 for getThumbBoundsFn
        items.push(item);
      }
      return items;
    };

    // 查找最近的父节点
    var closest = function closest(el, fn) {
      return el && (fn(el) ? el : closest(el.parentNode, fn));
    };

    // 当用户点击缩略图触发
    var onThumbnailsClick = function (e) {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : e.returnValue = false;

      var eTarget = e.target || e.srcElement;

      // find root element of slide
      var clickedListItem = closest(eTarget, function (el) {
        return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
      });

      if (!clickedListItem) {
        return;
      }

      // find index of clicked item by looping through all child nodes
      // alternatively, you may define index via data- attribute
      var clickedGallery = clickedListItem.parentNode,
        childNodes = clickedListItem.parentNode.childNodes,
        numChildNodes = childNodes.length,
        nodeIndex = 0,
        index;

      for (var i = 0; i < numChildNodes; i++) {
        if (childNodes[i].nodeType !== 1) {
          continue;
        }

        if (childNodes[i] === clickedListItem) {
          index = nodeIndex;
          break;
        }
        nodeIndex++;
      }



      if (index >= 0) {
        // open PhotoSwipe if valid index found
        openPhotoSwipe(index, clickedGallery);
      }
      return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function () {
      var hash = window.location.hash.substring(1),
        params = {};

      if (hash.length < 5) {
        return params;
      }

      var vars = hash.split('&');
      for (var i = 0; i < vars.length; i++) {
        if (!vars[i]) {
          continue;
        }
        var pair = vars[i].split('=');
        if (pair.length < 2) {
          continue;
        }
        params[pair[0]] = pair[1];
      }

      if (params.gid) {
        params.gid = parseInt(params.gid, 10);
      }

      return params;
    };

    var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
      var pswpElement = document.querySelectorAll('.pswp')[0],
        gallery,
        options,
        items;
      //get img data
      items = parseThumbnailElements(galleryElement);
      // 这里可以定义参数
      options = {
        barsSize: {
          top: 100,
          bottom: 100
        },

        fullscreenEl: false, // 是否支持全屏按钮

        // shareButtons: [
        //   { id: 'wechat', label: '分享微信', url: '#' },
        //   { id: 'weibo', label: '新浪微博', url: '#' },
        //   { id: 'download', label: '保存图片', url: '{{raw_image_url}}', download: true }
        // ], // 分享按钮

        // define gallery index (for URL)
        galleryUID: galleryElement.getAttribute('data-pswp-uid'),

        getThumbBoundsFn: function (index) {
          // See Options -> getThumbBoundsFn section of documentation for more info
          var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
            pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
            rect = thumbnail.getBoundingClientRect();

          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        },
        //bg
        bgOpacity: .8,
        //url 历史
        history: false

      };

      // PhotoSwipe opened from URL
      if (fromURL) {
        if (options.galleryPIDs) {
          // parse real index when custom PIDs are used 
          for (var j = 0; j < items.length; j++) {
            if (items[j].pid == index) {
              options.index = j;
              break;
            }
          }
        } else {
          // in URL indexes start from 1
          options.index = parseInt(index, 10) - 1;
        }
      } else {
        options.index = parseInt(index, 10);
      }

      // exit if index not found
      if (isNaN(options.index)) {
        return;
      }

      if (disableAnimation) {
        options.showAnimationDuration = 0;
      }

      // Pass data to PhotoSwipe and initialize it
      gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll(gallerySelector);

    for (var i = 0, l = galleryElements.length; i < l; i++) {
      galleryElements[i].setAttribute('data-pswp-uid', i + 1);
      galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
      openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
    }
  };

  // execute above function
  initPhotoSwipeFromDOM('.my-gallery');
})()