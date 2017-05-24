import "swiper/dist/css/swiper.min.css"
import "animate.css/animate.min.css"
import 'assets/css/react.scss'
//rem 
import rem from "assets/js/rem.js"
import Swiper from "swiper"

(function () {
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
  //去除动画样式 去除 animated 后的样式
  function initAnimate(o) {
    let reg = /animated(.*)/
    let cl = o.className
    if (cl.match(reg)) {
      cl = cl.replace(reg, '')
    }
    o.className = cl;
  }

  const animatend = whichTransitionEvent()

  //if animatend div remove class (重播动画)

  let anis = document.querySelectorAll("[data-animate]");
  for (let i = 0; i < anis.length; i++) {
    anis[i].addEventListener(animatend, removeClass, false)
  }

  //page selected addClass
  function pageAddClass(index) {
    //get page id
    let parent = ".page" + (index >= 10 ? index : '0' + index)
    //let page = document.querySelector(parent)
    let objs = document.querySelectorAll(parent + " [data-animate]")
    //addclass
    for (let i = 0; i < objs.length; i++) {
      let cl = objs[i].dataset.animate
      objAddClass(objs[i], cl);
    }

  }
  let status = ''
  const mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    // 如果需要分页器
    // pagination: '.swiper-pagination',
    preloadImages: false,
    lazyLoading: true,
    //href list
    hashnav: true,
    onInit(swiper) {
      //第一次不会触发transitioned ，手动检测
      let index = swiper.activeIndex
      if (index == 0) {
        index = index + 1
        pageAddClass(index)
      }
    },
    onTransitionEnd(swiper) {
      let index = swiper.activeIndex + 1
      let index_p = swiper.previousIndex + 1 //上一屏
      if (index_p == index) return
      //addClass 
      pageAddClass(index);
      //init animate the prev swiper 
      let parent_p = ".page" + (index_p >= 10 ? index_p : '0' + index_p)
      let objs_p = document.querySelectorAll(parent_p + " [data-animate]")
      //remove class 
      for (let i = 0; i < objs_p.length; i++) {
        let o = objs_p[i]
        o.style.opacity = "0"
        initAnimate(o)
      }
    },
  })
  document.querySelector(".goto").addEventListener("click", function () {
    mySwiper.slideTo(1, 1000);//切换到第一个slide，速度为1秒
  }, false)
  //后续动画
  const again = document.querySelectorAll("[data-again]");
  for (let i = 0; i < again.length; i++) {
    let obj = again[i]
    obj.addEventListener(animatend, function () {
      let cl = this.dataset.again
      let reg = /animated(.*)/
      let clName = this.className
      if (!clName.match(reg)) objAddClass(this, cl)
    }, false)
  }



})()