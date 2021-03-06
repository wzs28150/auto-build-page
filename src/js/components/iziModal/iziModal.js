/*
 * iziModal | v1.0
 * http://izimodal.dolce.ninja
 * by Marcelo Dolce.
 */
(function (e) {
  "use strict";

  function t() {
    var e, t = document.createElement("fakeelement"),
      i = {
        animation: "animationend",
        OAnimation: "oAnimationEnd",
        MozAnimation: "animationend",
        WebkitAnimation: "webkitAnimationEnd"
      };
    for (e in i)
      if (void 0 !== t.style[e]) return i[e]
  }
  var i = "iziModal",
    n = {
      CLOSING: "closing",
      CLOSED: "closed",
      OPENING: "opening",
      OPENED: "opened",
      DESTROYED: "destroyed"
    },
    s = t(),
    o = !1;
  /Mobi/.test(navigator.userAgent) && (o = !0);
  var a = function (e, t) {
    this.init(e, t)
  };
  a.prototype = {
    constructor: a,
    init: function (t, s) {
      var o = this;
      this.$element = e(t), this.id = this.$element.attr("id"), this.state = n.CLOSED, this.options = s, this.timer = null, this.headerHeight = 0, this.$header = e('<div class="' + i + '-header"><h2 class="' + i + '-header-title">' + s.title + '</h2><p class="' + i + '-header-subtitle">' + s.subtitle + '</p><a href="javascript:void(0)" class="' + i + '-button-close" data-' + i + "-close></a></div>"), this.$overlay = e('<div class="' + i + '-overlay" style="background-color:' + s.overlayColor + '"></div>'), "" === s.subtitle && this.$header.addClass(i + "-noSubtitle"), s.iframe === !0 ? (this.$element.html('<div class="' + i + '-wrap"><div class="' + i + "-content " + i + '-content-loader"><iframe class="' + i + '-iframe"></iframe>' + this.$element.html() + "</div></div>"), null !== s.iframeHeight && this.$element.find("." + i + "-iframe").css("height", s.iframeHeight)) : this.$element.html('<div class="' + i + '-wrap"><div class="' + i + '-content">' + this.$element.html() + "</div></div>"), e(document.body).find("style[rel=" + this.id + "]").remove(), "undefined" == typeof s.padding && 0 === s.padding || this.$element.find("." + i + "-content").css("padding", s.padding), "" === s.title && "" === s.subtitle || (null !== s.headerColor && (this.$element.css("border-bottom", "3px solid " + s.headerColor), this.$header.css("background", this.options.headerColor)), null !== s.iconClass && (this.$header.prepend('<i class="' + i + "-header-icon " + s.iconClass + '"></i>'), this.$header.find("." + i + "-header-icon").css("color", s.iconColor)), this.$element.prepend(this.$header));
      var a = /%|px|em|cm/,
        l = String(s.width).split(a),
        r = String(s.width),
        h = "px";
      l = String(l).split(",")[0], isNaN(s.width) && (h = -1 != String(s.width).indexOf("%") ? "%" : r.slice("-2")), this.$element.css({
        "margin-left": -(l / 2) + h,
        "max-width": parseInt(l) + h
      }), this.mediaQueries = '<style rel="' + this.id + '">@media handheld, only screen and (max-width: ' + l + "px) { #" + this.$element[0].id + "{ width: 100% !important; max-width: 100% !important; margin-left: 0 !important; left: 0 !important; } }</style>", e(document.body).append(this.mediaQueries), this.$element.addClass(i + " " + s.theme), this.$element.css("margin-top", parseInt(-(this.$element.innerHeight() / 2)) + "px"), this.$element.find("." + i + "-header").length && this.$element.css("overflow", "hidden"), this.$overlay.click(function () {
        o.options.overlayClose && !o.$element.hasClass(o.options.transitionOutModal) && o.close()
      }), this.$element.on("click", "[data-" + i + "-close]", function (e) {
        e.preventDefault(), o.close()
      })
    },
    toggle: function () {
      this.state == n.OPENED && this.close(), this.state == n.CLOSED && this.open()
    },
    open: function (t) {
      function a() {
        l.$element.trigger(n.OPENED), l.state = n.OPENED, console.info("[ " + i + " | " + l.id + " ] Opened."), l.options.onOpened.call(this)
      }
      var l = this;
      if (t && "function" == typeof t && t(l), this.options.iframe === !0) {
        var r = null;
        if (null !== this.options.iframeURL) r = this.options.iframeURL;
        else try {
          r = t.target.href, void 0 !== r && (r = t.target.href)
        } catch (h) {
          console.warn(h)
        }
        this.$element.find("." + i + "-iframe").attr("src", r)
      }
      this.$element.trigger(n.OPENING), this.state = n.OPENING, console.info("[ " + i + " | " + this.id + " ] Opening..."), (this.options.bodyOverflow || o) && e(document.body).css({
          "overflow": "hidden",
          "height": "100%"
        }), l.options.onOpening.call(this), this.$overlay.appendTo("main"), this.options.transitionInOverlay && this.$overlay.addClass(this.options.transitionInOverlay), "" !== this.options.transitionInModal ? (this.$element.addClass(this.options.transitionInModal).show(), this.$element.find("." + i + "-wrap").one(s, function () {
          l.$element.removeClass(l.options.transitionInModal), l.$overlay.removeClass(l.options.transitionInOverlay), a()
        })) : (this.$element.show(), a()), l.options.focusInput && l.$element.find(":input:not(button):enabled:visible:first").focus(),
        function d() {
          l.recalculateLayout(), l.timer = setTimeout(d, 500)
        }(), e(document).keydown(function (e) {
          l.options.closeOnEscape && 27 === e.keyCode && l.close()
        })
    },
    close: function (t) {
      function a() {
        l.options.iframe === !0 && l.$element.find("." + i + "-iframe").attr("src", ""), (l.options.bodyOverflow || o) && e(document.body).css({
          "overflow": "initial",
          "height": "auto"
        }), e(document.body).removeClass(i + "-attached"), l.$element.trigger(n.CLOSED), l.state = n.CLOSED, console.info("[ " + i + " | " + l.id + " ] Closed."), l.options.onClosed.call(this)
      }
      var l = this;
      t && "function" == typeof t && t(l), e(document).off("keydown"), this.state = n.CLOSING, this.$element.trigger(n.CLOSING), console.info("[ " + i + " | " + this.id + " ] Closing..."), clearTimeout(l.timer), l.options.onClosing.call(this), "" !== this.options.transitionOutModal ? (this.$element.attr("class", i + " " + this.options.theme + " " + this.options.transitionOutModal), this.$overlay.attr("class", i + "-overlay " + this.options.transitionOutOverlay), this.$element.one(s, function () {
        l.$element.hasClass(l.options.transitionOutModal) && (l.$element.removeClass(l.options.transitionOutModal).hide(), l.$overlay.removeClass(l.options.transitionOutOverlay).remove(), a())
      })) : (this.$element.hide(), this.$overlay.remove(), a())
    },
    destroy: function () {
      var t = e.Event("destroy");
      this.$element.trigger(t), e(document).off("keydown"), clearTimeout(this.timer), this.options.iframe === !0 && this.$element.find("." + i + "-iframe").remove(), this.$element.html(this.$element.find("." + i + "-content").html()), e(document.body).find("style[rel=" + this.id + "]").remove(), this.$element.off("click", "[data-" + i + "-close]"), this.$element.off("." + i).removeData(i).attr("style", ""), this.$overlay.remove(), this.$element.trigger(n.DESTROYED), this.$element = null
    },
    getState: function () {
      return console.info(this.state), this.state
    },
    setTitle: function (e) {
      null !== this.options.title && (this.$header.find("." + i + "-header-title").html(e), this.options.title = e)
    },
    setSubtitle: function (e) {
      null !== this.options.subtitle && (this.$header.find("." + i + "-header-subtitle").html(e), this.options.subtitle = e)
    },
    setIconClass: function (e) {
      null !== this.options.iconClass && (this.$header.find("." + i + "-header-icon").attr("class", i + "-header-icon " + e), this.options.iconClass = e)
    },
    setHeaderColor: function (e) {
      null !== this.options.headerColor && (this.$element.css("border-bottom", "3px solid " + e), this.$header.css("background", e), this.options.headerColor = e)
    },
    startLoading: function () {
      this.$element.find("." + i + "-loader").length || this.$element.append('<div class="' + i + "-loader " + this.options.transitionInOverlay + '"></div>')
    },
    stopLoading: function () {
      var e = this;
      this.$element.find("." + i + "-loader").removeClass(this.options.transitionInOverlay).addClass(this.options.transitionOutOverlay), this.$element.find("." + i + "-loader").one(s, function () {
        e.$element.find("." + i + "-loader").removeClass(e.options.transitionOutOverlay).remove()
      })
    },
    recalculateLayout: function () {
      this.$element.find("." + i + "-header").length && (this.headerHeight = parseInt(this.$element.find("." + i + "-header").innerHeight()) + 2, this.$element.css("overflow", "hidden"));
      var t = e(window).height(),
        s = this.$element.find("." + i + "-content")[0].scrollHeight,
        o = parseInt(-((this.$element.innerHeight() + 1) / 2)) + "px";
      if (this.state == n.OPENED || this.state == n.OPENING)
        if (this.options.iframe === !0) t < this.options.iframeHeight + this.headerHeight ? (e(document.body).addClass(i + "-attached"), this.$element.find("." + i + "-iframe").css({
          height: parseInt(t - this.headerHeight) + "px"
        })) : (e(document.body).removeClass(i + "-attached"), this.$element.find("." + i + "-iframe").css({
          height: parseInt(this.options.iframeHeight) + "px"
        }));
        else {
          t > s + this.headerHeight && (e(document.body).removeClass(i + "-attached"), this.$element.find("." + i + "-wrap").css({
            height: "auto"
          })), (this.$element.innerHeight() > t || this.$element.innerHeight() < s) && (e(document.body).addClass(i + "-attached"), this.$element.find("." + i + "-wrap").css({
            height: parseInt(t - this.headerHeight) + "px"
          }));
          var a = this.$element.find("." + i + "-wrap").scrollTop(),
            l = this.$element.find("." + i + "-content").innerHeight(),
            r = this.$element.find("." + i + "-wrap").innerHeight();
          l - 50 > r + a ? this.$element.addClass("hasScroll") : this.$element.removeClass("hasScroll")
        }
      this.$element.css("margin-top") != o && "0px" != this.$element.css("margin-top") && this.$element.css("margin-top", o)
    }
  }, e.fn[i] = function (t, n) {
    return this.each(function () {
      var s = e(this),
        o = s.data(i),
        l = e.extend({}, e.fn.iziModal.defaults, s.data(), "object" == typeof t && t);
      o || t && "object" != typeof t || s.data(i, o = new a(this, l)), "string" == typeof t && "undefined" != typeof o ? o[t].apply(o, [].concat(n)) : l.autoOpen && o.open()
    })
  }, e.fn[i].defaults = {
    title: "",
    subtitle: "",
    theme: "",
    headerColor: "#88A0B9",
    overlayColor: "rgba(0, 0, 0, 0.4)",
    iconColor: "",
    iconClass: null,
    width: 600,
    padding: 0,
    iframe: !1,
    iframeHeight: 400,
    iframeURL: null,
    overlayClose: !0,
    closeOnEscape: !0,
    bodyOverflow: !1,
    focusInput: !0,
    autoOpen: !1,
    transitionInModal: "transitionIn",
    transitionOutModal: "transitionOut",
    transitionInOverlay: "fadeIn",
    transitionOutOverlay: "fadeOut",
    onOpening: function () {},
    onOpened: function () {},
    onClosing: function () {},
    onClosed: function () {}
  }, e.fn[i].Constructor = a
}).call(this, window.jQuery);
