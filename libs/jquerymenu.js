/*
 * jQuery mmenu v5.7.8
 * @requires jQuery 1.7.0 or later
 *
 * mmenu.frebsite.nl
 *	
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * License: CC-BY-NC-4.0
 * http://creativecommons.org/licenses/by-nc/4.0/
 */
!function (e) {
    function n() {
        e[t].glbl || (r = {
            $wndw: e(window),
            $docu: e(document),
            $html: e("html"),
            $body: e("body")
        },
            s = {},
            a = {},
            o = {},
            e.each([s, a, o], function (e, n) {
                n.add = function (e) {
                    e = e.split(" ");
                    for (var t = 0, i = e.length; t < i; t++)
                        n[e[t]] = n.mm(e[t])
                }
            }),
            s.mm = function (e) {
                return "mm-" + e
            }
            ,
            s.add("wrapper menu panels panel nopanel current highest opened subopened navbar hasnavbar title btn prev next listview nolistview inset vertical selected divider spacer hidden fullsubopen"),
            s.umm = function (e) {
                return "mm-" == e.slice(0, 3) && (e = e.slice(3)),
                    e
            }
            ,
            a.mm = function (e) {
                return "mm-" + e
            }
            ,
            a.add("parent child"),
            o.mm = function (e) {
                return e + ".mm"
            }
            ,
            o.add("transitionend webkitTransitionEnd click scroll keydown mousedown mouseup touchstart touchmove touchend orientationchange"),
            e[t]._c = s,
            e[t]._d = a,
            e[t]._e = o,
            e[t].glbl = r)
    }
    var t = "mmenu"
        , i = "5.7.8";
    if (!(e[t] && e[t].version > i)) {
        e[t] = function (e, n, t) {
            this.$menu = e,
                this._api = ["bind", "getInstance", "update", "initPanels", "openPanel", "closePanel", "closeAllPanels", "setSelected"],
                this.opts = n,
                this.conf = t,
                this.vars = {},
                this.cbck = {},
                "function" == typeof this.___deprecated && this.___deprecated(),
                this._initMenu(),
                this._initAnchors();
            var i = this.$pnls.children();
            return this._initAddons(),
                this.initPanels(i),
                "function" == typeof this.___debug && this.___debug(),
                this
        }
            ,
            e[t].version = i,
            e[t].addons = {},
            e[t].uniqueId = 0,
            e[t].defaults = {
                extensions: [],
                initMenu: function () { },
                initPanels: function () { },
                navbar: {
                    add: !0,
                    title: "Menu",
                    titleLink: "panel"
                },
                onClick: {
                    setSelected: !0
                },
                slidingSubmenus: !0
            },
            e[t].configuration = {
                classNames: {
                    divider: "Divider",
                    inset: "Inset",
                    panel: "Panel",
                    selected: "Selected",
                    spacer: "Spacer",
                    vertical: "Vertical"
                },
                clone: !1,
                openingInterval: 25,
                panelNodetype: "ul, ol, div",
                transitionDuration: 400
            },
            e[t].prototype = {
                init: function (e) {
                    this.initPanels(e)
                },
                getInstance: function () {
                    return this
                },
                update: function () {
                    this.trigger("update")
                },
                initPanels: function (e) {
                    e = e.not("." + s.nopanel),
                        e = this._initPanels(e),
                        this.opts.initPanels.call(this, e),
                        this.trigger("initPanels", e),
                        this.trigger("update")
                },
                openPanel: function (n) {
                    var i = n.parent()
                        , a = this;
                    if (i.hasClass(s.vertical)) {
                        var o = i.parents("." + s.subopened);
                        if (o.length)
                            return void this.openPanel(o.first());
                        i.addClass(s.opened),
                            this.trigger("openPanel", n),
                            this.trigger("openingPanel", n),
                            this.trigger("openedPanel", n)
                    } else {
                        if (n.hasClass(s.current))
                            return;
                        var r = this.$pnls.children("." + s.panel)
                            , l = r.filter("." + s.current);
                        r.removeClass(s.highest).removeClass(s.current).not(n).not(l).not("." + s.vertical).addClass(s.hidden),
                            e[t].support.csstransitions || l.addClass(s.hidden),
                            n.hasClass(s.opened) ? n.nextAll("." + s.opened).addClass(s.highest).removeClass(s.opened).removeClass(s.subopened) : (n.addClass(s.highest),
                                l.addClass(s.subopened)),
                            n.removeClass(s.hidden).addClass(s.current),
                            a.trigger("openPanel", n),
                            setTimeout(function () {
                                n.removeClass(s.subopened).addClass(s.opened),
                                    a.trigger("openingPanel", n),
                                    a.__transitionend(n, function () {
                                        a.trigger("openedPanel", n)
                                    }, a.conf.transitionDuration)
                            }, this.conf.openingInterval)
                    }
                },
                closePanel: function (e) {
                    var n = e.parent();
                    n.hasClass(s.vertical) && (n.removeClass(s.opened),
                        this.trigger("closePanel", e),
                        this.trigger("closingPanel", e),
                        this.trigger("closedPanel", e))
                },
                closeAllPanels: function () {
                    this.$menu.find("." + s.listview).children().removeClass(s.selected).filter("." + s.vertical).removeClass(s.opened);
                    var e = this.$pnls.children("." + s.panel)
                        , n = e.first();
                    this.$pnls.children("." + s.panel).not(n).removeClass(s.subopened).removeClass(s.opened).removeClass(s.current).removeClass(s.highest).addClass(s.hidden),
                        this.openPanel(n)
                },
                togglePanel: function (e) {
                    var n = e.parent();
                    n.hasClass(s.vertical) && this[n.hasClass(s.opened) ? "closePanel" : "openPanel"](e)
                },
                setSelected: function (e) {
                    this.$menu.find("." + s.listview).children("." + s.selected).removeClass(s.selected),
                        e.addClass(s.selected),
                        this.trigger("setSelected", e)
                },
                bind: function (e, n) {
                    e = "init" == e ? "initPanels" : e,
                        this.cbck[e] = this.cbck[e] || [],
                        this.cbck[e].push(n)
                },
                trigger: function () {
                    var e = this
                        , n = Array.prototype.slice.call(arguments)
                        , t = n.shift();
                    if (t = "init" == t ? "initPanels" : t,
                        this.cbck[t])
                        for (var i = 0, s = this.cbck[t].length; i < s; i++)
                            this.cbck[t][i].apply(e, n)
                },
                _initMenu: function () {
                    this.conf.clone && (this.$orig = this.$menu,
                        this.$menu = this.$orig.clone(!0),
                        this.$menu.add(this.$menu.find("[id]")).filter("[id]").each(function () {
                            e(this).attr("id", s.mm(e(this).attr("id")))
                        })),
                        this.opts.initMenu.call(this, this.$menu, this.$orig),
                        this.$menu.attr("id", this.$menu.attr("id") || this.__getUniqueId()),
                        this.$pnls = e('<div class="' + s.panels + '" />').append(this.$menu.children(this.conf.panelNodetype)).prependTo(this.$menu),
                        this.$menu.parent().addClass(s.wrapper);
                    var n = [s.menu];
                    this.opts.slidingSubmenus || n.push(s.vertical),
                        this.opts.extensions = this.opts.extensions.length ? "mm-" + this.opts.extensions.join(" mm-") : "",
                        this.opts.extensions && n.push(this.opts.extensions),
                        this.$menu.addClass(n.join(" ")),
                        this.trigger("_initMenu")
                },
                _initPanels: function (n) {
                    var i = this
                        , o = this.__findAddBack(n, "ul, ol");
                    this.__refactorClass(o, this.conf.classNames.inset, "inset").addClass(s.nolistview + " " + s.nopanel),
                        o.not("." + s.nolistview).addClass(s.listview);
                    var r = this.__findAddBack(n, "." + s.listview).children();
                    this.__refactorClass(r, this.conf.classNames.selected, "selected"),
                        this.__refactorClass(r, this.conf.classNames.divider, "divider"),
                        this.__refactorClass(r, this.conf.classNames.spacer, "spacer"),
                        this.__refactorClass(this.__findAddBack(n, "." + this.conf.classNames.panel), this.conf.classNames.panel, "panel");
                    var l = e()
                        , d = n.add(n.find("." + s.panel)).add(this.__findAddBack(n, "." + s.listview).children().children(this.conf.panelNodetype)).not("." + s.nopanel);
                    this.__refactorClass(d, this.conf.classNames.vertical, "vertical"),
                        this.opts.slidingSubmenus || d.addClass(s.vertical),
                        d.each(function () {
                            var n = e(this)
                                , t = n;
                            n.is("ul, ol") ? (n.wrap('<div class="' + s.panel + '" />'),
                                t = n.parent()) : t.addClass(s.panel);
                            var a = n.attr("id");
                            n.removeAttr("id"),
                                t.attr("id", a || i.__getUniqueId()),
                                n.hasClass(s.vertical) && (n.removeClass(i.conf.classNames.vertical),
                                    t.add(t.parent()).addClass(s.vertical)),
                                l = l.add(t)
                        });
                    var c = e("." + s.panel, this.$menu);
                    l.each(function (n) {
                        var o, r, l = e(this), d = l.parent(), c = d.children("a, span").first();
                        if (d.is("." + s.panels) || (d.data(a.child, l),
                            l.data(a.parent, d)),
                            d.children("." + s.next).length || d.parent().is("." + s.listview) && (o = l.attr("id"),
                                r = e('<a class="' + s.next + '" href="#' + o + '" data-target="#' + o + '" />').insertBefore(c),
                                c.is("span") && r.addClass(s.fullsubopen)),
                            !l.children("." + s.navbar).length && !d.hasClass(s.vertical)) {
                            d.parent().is("." + s.listview) ? d = d.closest("." + s.panel) : (c = d.closest("." + s.panel).find('a[href="#' + l.attr("id") + '"]').first(),
                                d = c.closest("." + s.panel));
                            var h = !1
                                , u = e('<div class="' + s.navbar + '" />');
                            if (i.opts.navbar.add && l.addClass(s.hasnavbar),
                                d.length) {
                                switch (o = d.attr("id"),
                                i.opts.navbar.titleLink) {
                                    case "anchor":
                                        h = c.attr("href");
                                        break;
                                    case "panel":
                                    case "parent":
                                        h = "#" + o;
                                        break;
                                    default:
                                        h = !1
                                }
                                u.append('<a class="' + s.btn + " " + s.prev + '" href="#' + o + '" data-target="#' + o + '" />').append(e('<a class="' + s.title + '"' + (h ? ' href="' + h + '"' : "") + " />").text(c.text())).prependTo(l)
                            } else
                                i.opts.navbar.title && u.append('<a class="' + s.title + '">' + e[t].i18n(i.opts.navbar.title) + "</a>").prependTo(l)
                        }
                    });
                    var h = this.__findAddBack(n, "." + s.listview).children("." + s.selected).removeClass(s.selected).last().addClass(s.selected);
                    h.add(h.parentsUntil("." + s.menu, "li")).filter("." + s.vertical).addClass(s.opened).end().each(function () {
                        e(this).parentsUntil("." + s.menu, "." + s.panel).not("." + s.vertical).first().addClass(s.opened).parentsUntil("." + s.menu, "." + s.panel).not("." + s.vertical).first().addClass(s.opened).addClass(s.subopened)
                    }),
                        h.children("." + s.panel).not("." + s.vertical).addClass(s.opened).parentsUntil("." + s.menu, "." + s.panel).not("." + s.vertical).first().addClass(s.opened).addClass(s.subopened);
                    var u = c.filter("." + s.opened);
                    return u.length || (u = l.first()),
                        u.addClass(s.opened).last().addClass(s.current),
                        l.not("." + s.vertical).not(u.last()).addClass(s.hidden).end().filter(function () {
                            return !e(this).parent().hasClass(s.panels)
                        }).appendTo(this.$pnls),
                        this.trigger("_initPanels", l),
                        l
                },
                _initAnchors: function () {
                    var n = this;
                    r.$body.on(o.click + "-oncanvas", "a[href]", function (i) {
                        var a = e(this)
                            , o = !1
                            , r = n.$menu.find(a).length;
                        for (var l in e[t].addons)
                            if (e[t].addons[l].clickAnchor.call(n, a, r)) {
                                o = !0;
                                break
                            }
                        var d = a.attr("href");
                        if (!o && r && d.length > 1 && "#" == d.slice(0, 1))
                            try {
                                var c = e(d, n.$menu);
                                c.is("." + s.panel) && (o = !0,
                                    n[a.parent().hasClass(s.vertical) ? "togglePanel" : "openPanel"](c))
                            } catch (h) { }
                        if (o && i.preventDefault(),
                            !o && r && a.is("." + s.listview + " > li > a") && !a.is('[rel="external"]') && !a.is('[target="_blank"]')) {
                            n.__valueOrFn(n.opts.onClick.setSelected, a) && n.setSelected(e(i.target).parent());
                            var u = n.__valueOrFn(n.opts.onClick.preventDefault, a, "#" == d.slice(0, 1));
                            u && i.preventDefault(),
                                n.__valueOrFn(n.opts.onClick.close, a, u) && n.close()
                        }
                    }),
                        this.trigger("_initAnchors")
                },
                _initAddons: function () {
                    var n;
                    for (n in e[t].addons)
                        e[t].addons[n].add.call(this),
                            e[t].addons[n].add = function () { }
                            ;
                    for (n in e[t].addons)
                        e[t].addons[n].setup.call(this);
                    this.trigger("_initAddons")
                },
                _getOriginalMenuId: function () {
                    var e = this.$menu.attr("id");
                    return e && e.length && this.conf.clone && (e = s.umm(e)),
                        e
                },
                __api: function () {
                    var n = this
                        , t = {};
                    return e.each(this._api, function (e) {
                        var i = this;
                        t[i] = function () {
                            var e = n[i].apply(n, arguments);
                            return "undefined" == typeof e ? t : e
                        }
                    }),
                        t
                },
                __valueOrFn: function (e, n, t) {
                    return "function" == typeof e ? e.call(n[0]) : "undefined" == typeof e && "undefined" != typeof t ? t : e
                },
                __refactorClass: function (e, n, t) {
                    return e.filter("." + n).removeClass(n).addClass(s[t])
                },
                __findAddBack: function (e, n) {
                    return e.find(n).add(e.filter(n))
                },
                __filterListItems: function (e) {
                    return e.not("." + s.divider).not("." + s.hidden)
                },
                __transitionend: function (n, t, i) {
                    var s = !1
                        , a = function (i) {
                            if ("undefined" != typeof i) {
                                if (!e(i.target).is(n))
                                    return !1;
                                n.unbind(o.transitionend),
                                    n.unbind(o.webkitTransitionEnd)
                            }
                            s || t.call(n[0]),
                                s = !0
                        };
                    n.on(o.transitionend, a),
                        n.on(o.webkitTransitionEnd, a),
                        setTimeout(a, 1.1 * i)
                },
                __getUniqueId: function () {
                    return s.mm(e[t].uniqueId++)
                }
            },
            e.fn[t] = function (i, s) {
                n(),
                    i = e.extend(!0, {}, e[t].defaults, i),
                    s = e.extend(!0, {}, e[t].configuration, s);
                var a = e();
                return this.each(function () {
                    var n = e(this);
                    if (!n.data(t)) {
                        var o = new e[t](n, i, s);
                        o.$menu.data(t, o.__api()),
                            a = a.add(o.$menu)
                    }
                }),
                    a
            }
            ,
            e[t].i18n = function () {
                var n = {};
                return function (t) {
                    switch (typeof t) {
                        case "object":
                            return e.extend(n, t),
                                n;
                        case "string":
                            return n[t] || t;
                        case "undefined":
                        default:
                            return n
                    }
                }
            }(),
            e[t].support = {
                touch: "ontouchstart" in window || navigator.msMaxTouchPoints || !1,
                csstransitions: function () {
                    if ("undefined" != typeof Modernizr && "undefined" != typeof Modernizr.csstransitions)
                        return Modernizr.csstransitions;
                    var e = document.body || document.documentElement
                        , n = e.style
                        , t = "transition";
                    if ("string" == typeof n[t])
                        return !0;
                    var i = ["Moz", "webkit", "Webkit", "Khtml", "O", "ms"];
                    t = t.charAt(0).toUpperCase() + t.substr(1);
                    for (var s = 0; s < i.length; s++)
                        if ("string" == typeof n[i[s] + t])
                            return !0;
                    return !1
                }(),
                csstransforms: function () {
                    return "undefined" == typeof Modernizr || "undefined" == typeof Modernizr.csstransforms || Modernizr.csstransforms
                }(),
                csstransforms3d: function () {
                    return "undefined" == typeof Modernizr || "undefined" == typeof Modernizr.csstransforms3d || Modernizr.csstransforms3d
                }()
            };
        var s, a, o, r
    }
}(jQuery),
    /*	
     * jQuery mmenu offCanvas add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var n = "mmenu"
            , t = "offCanvas";
        e[n].addons[t] = {
            setup: function () {
                if (this.opts[t]) {
                    var s = this.opts[t]
                        , a = this.conf[t];
                    o = e[n].glbl,
                        this._api = e.merge(this._api, ["open", "close", "setPage"]),
                        "top" != s.position && "bottom" != s.position || (s.zposition = "front"),
                        "string" != typeof a.pageSelector && (a.pageSelector = "> " + a.pageNodetype),
                        o.$allMenus = (o.$allMenus || e()).add(this.$menu),
                        this.vars.opened = !1;
                    var r = [i.offcanvas];
                    "left" != s.position && r.push(i.mm(s.position)),
                        "back" != s.zposition && r.push(i.mm(s.zposition)),
                        this.$menu.addClass(r.join(" ")).parent().removeClass(i.wrapper),
                        e[n].support.csstransforms || this.$menu.addClass(i["no-csstransforms"]),
                        e[n].support.csstransforms3d || this.$menu.addClass(i["no-csstransforms3d"]),
                        this.setPage(o.$page),
                        this._initBlocker(),
                        this["_initWindow_" + t](),
                        this.$menu[a.menuInjectMethod + "To"](a.menuWrapperSelector);
                    var l = window.location.hash;
                    if (l) {
                        var d = this._getOriginalMenuId();
                        d && d == l.slice(1) && this.open()
                    }
                }
            },
            add: function () {
                i = e[n]._c,
                    s = e[n]._d,
                    a = e[n]._e,
                    i.add("offcanvas slideout blocking modal background opening blocker page no-csstransforms3d"),
                    s.add("style"),
                    a.add("resize")
            },
            clickAnchor: function (e, n) {
                var s = this;
                if (this.opts[t]) {
                    var a = this._getOriginalMenuId();
                    if (a && e.is('[href="#' + a + '"]')) {
                        if (n)
                            return !0;
                        var r = e.closest("." + i.menu);
                        if (r.length) {
                            var l = r.data("mmenu");
                            if (l && l.close)
                                return l.close(),
                                    s.__transitionend(r, function () {
                                        s.open()
                                    }, s.conf.transitionDuration),
                                    !0
                        }
                        return this.open(),
                            !0
                    }
                    if (o.$page)
                        return a = o.$page.first().attr("id"),
                            a && e.is('[href="#' + a + '"]') ? (this.close(),
                                !0) : void 0
                }
            }
        },
            e[n].defaults[t] = {
                position: "left",
                zposition: "back",
                blockUI: !0,
                moveBackground: !0
            },
            e[n].configuration[t] = {
                pageNodetype: "div",
                pageSelector: null,
                noPageSelector: [],
                wrapPageIfNeeded: !0,
                menuWrapperSelector: "body",
                menuInjectMethod: "prepend"
            },
            e[n].prototype.open = function () {
                if (!this.vars.opened) {
                    var e = this;
                    this._openSetup(),
                        setTimeout(function () {
                            e._openFinish()
                        }, this.conf.openingInterval),
                        this.trigger("open")
                }
            }
            ,
            e[n].prototype._openSetup = function () {
                var n = this
                    , r = this.opts[t];
                this.closeAllOthers(),
                    o.$page.each(function () {
                        e(this).data(s.style, e(this).attr("style") || "")
                    }),
                    o.$wndw.trigger(a.resize + "-" + t, [!0]);
                var l = [i.opened];
                r.blockUI && l.push(i.blocking),
                    "modal" == r.blockUI && l.push(i.modal),
                    r.moveBackground && l.push(i.background),
                    "left" != r.position && l.push(i.mm(this.opts[t].position)),
                    "back" != r.zposition && l.push(i.mm(this.opts[t].zposition)),
                    this.opts.extensions && l.push(this.opts.extensions),
                    o.$html.addClass(l.join(" ")),
                    setTimeout(function () {
                        n.vars.opened = !0
                    }, this.conf.openingInterval),
                    this.$menu.addClass(i.current + " " + i.opened)
            }
            ,
            e[n].prototype._openFinish = function () {
                var e = this;
                this.__transitionend(o.$page.first(), function () {
                    e.trigger("opened")
                }, this.conf.transitionDuration),
                    o.$html.addClass(i.opening),
                    this.trigger("opening")
            }
            ,
            e[n].prototype.close = function () {
                if (this.vars.opened) {
                    var n = this;
                    this.__transitionend(o.$page.first(), function () {
                        n.$menu.removeClass(i.current + " " + i.opened);
                        var a = [i.opened, i.blocking, i.modal, i.background, i.mm(n.opts[t].position), i.mm(n.opts[t].zposition)];
                        n.opts.extensions && a.push(n.opts.extensions),
                            o.$html.removeClass(a.join(" ")),
                            o.$page.each(function () {
                                e(this).attr("style", e(this).data(s.style))
                            }),
                            n.vars.opened = !1,
                            n.trigger("closed")
                    }, this.conf.transitionDuration),
                        o.$html.removeClass(i.opening),
                        this.trigger("close"),
                        this.trigger("closing")
                }
            }
            ,
            e[n].prototype.closeAllOthers = function () {
                o.$allMenus.not(this.$menu).each(function () {
                    var t = e(this).data(n);
                    t && t.close && t.close()
                })
            }
            ,
            e[n].prototype.setPage = function (n) {
                var s = this
                    , a = this.conf[t];
                n && n.length || (n = o.$body.find(a.pageSelector),
                    a.noPageSelector.length && (n = n.not(a.noPageSelector.join(", "))),
                    n.length > 1 && a.wrapPageIfNeeded && (n = n.wrapAll("<" + this.conf[t].pageNodetype + " />").parent())),
                    n.each(function () {
                        e(this).attr("id", e(this).attr("id") || s.__getUniqueId())
                    }),
                    n.addClass(i.page + " " + i.slideout),
                    o.$page = n,
                    this.trigger("setPage", n)
            }
            ,
            e[n].prototype["_initWindow_" + t] = function () {
                o.$wndw.off(a.keydown + "-" + t).on(a.keydown + "-" + t, function (e) {
                    if (o.$html.hasClass(i.opened) && 9 == e.keyCode)
                        return e.preventDefault(),
                            !1
                });
                var e = 0;
                o.$wndw.off(a.resize + "-" + t).on(a.resize + "-" + t, function (n, t) {
                    if (1 == o.$page.length && (t || o.$html.hasClass(i.opened))) {
                        var s = o.$wndw.height();
                        (t || s != e) && (e = s,
                            o.$page.css("minHeight", s))
                    }
                })
            }
            ,
            e[n].prototype._initBlocker = function () {
                var n = this;
                this.opts[t].blockUI && (o.$blck || (o.$blck = e('<div id="' + i.blocker + '" class="' + i.slideout + '" />')),
                    o.$blck.appendTo(o.$body).off(a.touchstart + "-" + t + " " + a.touchmove + "-" + t).on(a.touchstart + "-" + t + " " + a.touchmove + "-" + t, function (e) {
                        e.preventDefault(),
                            e.stopPropagation(),
                            o.$blck.trigger(a.mousedown + "-" + t)
                    }).off(a.mousedown + "-" + t).on(a.mousedown + "-" + t, function (e) {
                        e.preventDefault(),
                            o.$html.hasClass(i.modal) || (n.closeAllOthers(),
                                n.close())
                    }))
            }
            ;
        var i, s, a, o
    }(jQuery),
    /*	
     * jQuery mmenu scrollBugFix add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var n = "mmenu"
            , t = "scrollBugFix";
        e[n].addons[t] = {
            setup: function () {
                var s = this
                    , r = this.opts[t];
                this.conf[t];
                if (o = e[n].glbl,
                    e[n].support.touch && this.opts.offCanvas && this.opts.offCanvas.blockUI && ("boolean" == typeof r && (r = {
                        fix: r
                    }),
                        "object" != typeof r && (r = {}),
                        r = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], r),
                        r.fix)) {
                    var l = this.$menu.attr("id")
                        , d = !1;
                    this.bind("opening", function () {
                        this.$pnls.children("." + i.current).scrollTop(0)
                    }),
                        o.$docu.on(a.touchmove, function (e) {
                            s.vars.opened && e.preventDefault()
                        }),
                        o.$body.on(a.touchstart, "#" + l + "> ." + i.panels + "> ." + i.current, function (e) {
                            s.vars.opened && (d || (d = !0,
                                0 === e.currentTarget.scrollTop ? e.currentTarget.scrollTop = 1 : e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight && (e.currentTarget.scrollTop -= 1),
                                d = !1))
                        }).on(a.touchmove, "#" + l + "> ." + i.panels + "> ." + i.current, function (n) {
                            s.vars.opened && e(this)[0].scrollHeight > e(this).innerHeight() && n.stopPropagation()
                        }),
                        o.$wndw.on(a.orientationchange, function () {
                            s.$pnls.children("." + i.current).scrollTop(0).css({
                                "-webkit-overflow-scrolling": "auto"
                            }).css({
                                "-webkit-overflow-scrolling": "touch"
                            })
                        })
                }
            },
            add: function () {
                i = e[n]._c,
                    s = e[n]._d,
                    a = e[n]._e
            },
            clickAnchor: function (e, n) { }
        },
            e[n].defaults[t] = {
                fix: !0
            };
        var i, s, a, o
    }(jQuery),
    /*	
     * jQuery mmenu autoHeight add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var n = "mmenu"
            , t = "autoHeight";
        e[n].addons[t] = {
            setup: function () {
                if (this.opts.offCanvas) {
                    var s = this.opts[t];
                    this.conf[t];
                    if (o = e[n].glbl,
                        "boolean" == typeof s && s && (s = {
                            height: "auto"
                        }),
                        "string" == typeof s && (s = {
                            height: s
                        }),
                        "object" != typeof s && (s = {}),
                        s = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], s),
                        "auto" == s.height || "highest" == s.height) {
                        this.$menu.addClass(i.autoheight);
                        var a = function (n) {
                            if (this.vars.opened) {
                                var t = parseInt(this.$pnls.css("top"), 10) || 0
                                    , a = parseInt(this.$pnls.css("bottom"), 10) || 0
                                    , o = 0;
                                this.$menu.addClass(i.measureheight),
                                    "auto" == s.height ? (n = n || this.$pnls.children("." + i.current),
                                        n.is("." + i.vertical) && (n = n.parents("." + i.panel).not("." + i.vertical).first()),
                                        o = n.outerHeight()) : "highest" == s.height && this.$pnls.children().each(function () {
                                            var n = e(this);
                                            n.is("." + i.vertical) && (n = n.parents("." + i.panel).not("." + i.vertical).first()),
                                                o = Math.max(o, n.outerHeight())
                                        }),
                                    this.$menu.height(o + t + a).removeClass(i.measureheight)
                            }
                        };
                        this.bind("opening", a),
                            "highest" == s.height && this.bind("initPanels", a),
                            "auto" == s.height && (this.bind("update", a),
                                this.bind("openPanel", a),
                                this.bind("closePanel", a))
                    }
                }
            },
            add: function () {
                i = e[n]._c,
                    s = e[n]._d,
                    a = e[n]._e,
                    i.add("autoheight measureheight"),
                    a.add("resize")
            },
            clickAnchor: function (e, n) { }
        },
            e[n].defaults[t] = {
                height: "default"
            };
        var i, s, a, o
    }(jQuery),
    /*	
     * jQuery mmenu backButton add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var n = "mmenu"
            , t = "backButton";
        e[n].addons[t] = {
            setup: function () {
                if (this.opts.offCanvas) {
                    var s = this
                        , a = this.opts[t];
                    this.conf[t];
                    if (o = e[n].glbl,
                        "boolean" == typeof a && (a = {
                            close: a
                        }),
                        "object" != typeof a && (a = {}),
                        a = e.extend(!0, {}, e[n].defaults[t], a),
                        a.close) {
                        var r = "#" + s.$menu.attr("id");
                        this.bind("opened", function (e) {
                            location.hash != r && history.pushState(null, document.title, r)
                        }),
                            e(window).on("popstate", function (e) {
                                o.$html.hasClass(i.opened) ? (e.stopPropagation(),
                                    s.close()) : location.hash == r && (e.stopPropagation(),
                                        s.open())
                            })
                    }
                }
            },
            add: function () {
                return window.history && window.history.pushState ? (i = e[n]._c,
                    s = e[n]._d,
                    void (a = e[n]._e)) : void (e[n].addons[t].setup = function () { }
                    )
            },
            clickAnchor: function (e, n) { }
        },
            e[n].defaults[t] = {
                close: !1
            };
        var i, s, a, o
    }(jQuery),
    /*	
     * jQuery mmenu columns add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var n = "mmenu"
            , t = "columns";
        e[n].addons[t] = {
            setup: function () {
                var s = this.opts[t];
                this.conf[t];
                if (o = e[n].glbl,
                    "boolean" == typeof s && (s = {
                        add: s
                    }),
                    "number" == typeof s && (s = {
                        add: !0,
                        visible: s
                    }),
                    "object" != typeof s && (s = {}),
                    "number" == typeof s.visible && (s.visible = {
                        min: s.visible,
                        max: s.visible
                    }),
                    s = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], s),
                    s.add) {
                    s.visible.min = Math.max(1, Math.min(6, s.visible.min)),
                        s.visible.max = Math.max(s.visible.min, Math.min(6, s.visible.max)),
                        this.$menu.addClass(i.columns);
                    for (var a = this.opts.offCanvas ? this.$menu.add(o.$html) : this.$menu, r = [], l = 0; l <= s.visible.max; l++)
                        r.push(i.columns + "-" + l);
                    r = r.join(" ");
                    var d = function (e) {
                        u.call(this, this.$pnls.children("." + i.current))
                    }
                        , c = function () {
                            var e = this.$pnls.children("." + i.panel).filter("." + i.opened).length;
                            e = Math.min(s.visible.max, Math.max(s.visible.min, e)),
                                a.removeClass(r).addClass(i.columns + "-" + e)
                        }
                        , h = function () {
                            this.opts.offCanvas && o.$html.removeClass(r)
                        }
                        , u = function (n) {
                            this.$pnls.children("." + i.panel).removeClass(r).filter("." + i.subopened).removeClass(i.hidden).add(n).slice(-s.visible.max).each(function (n) {
                                e(this).addClass(i.columns + "-" + n)
                            })
                        };
                    this.bind("open", c),
                        this.bind("close", h),
                        this.bind("initPanels", d),
                        this.bind("openPanel", u),
                        this.bind("openingPanel", c),
                        this.bind("openedPanel", c),
                        this.opts.offCanvas || c.call(this)
                }
            },
            add: function () {
                i = e[n]._c,
                    s = e[n]._d,
                    a = e[n]._e,
                    i.add("columns")
            },
            clickAnchor: function (n, s) {
                if (!this.opts[t].add)
                    return !1;
                if (s) {
                    var a = n.attr("href");
                    if (a.length > 1 && "#" == a.slice(0, 1))
                        try {
                            var o = e(a, this.$menu);
                            if (o.is("." + i.panel))
                                for (var r = parseInt(n.closest("." + i.panel).attr("class").split(i.columns + "-")[1].split(" ")[0], 10) + 1; r !== !1;) {
                                    var l = this.$pnls.children("." + i.columns + "-" + r);
                                    if (!l.length) {
                                        r = !1;
                                        break
                                    }
                                    r++,
                                        l.removeClass(i.subopened).removeClass(i.opened).removeClass(i.current).removeClass(i.highest).addClass(i.hidden)
                                }
                        } catch (d) { }
                }
            }
        },
            e[n].defaults[t] = {
                add: !1,
                visible: {
                    min: 1,
                    max: 3
                }
            };
        var i, s, a, o
    }(jQuery),
    /*	
     * jQuery mmenu counters add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var n = "mmenu"
            , t = "counters";
        e[n].addons[t] = {
            setup: function () {
                var a = this
                    , r = this.opts[t];
                this.conf[t];
                o = e[n].glbl,
                    "boolean" == typeof r && (r = {
                        add: r,
                        update: r
                    }),
                    "object" != typeof r && (r = {}),
                    r = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], r),
                    this.bind("initPanels", function (n) {
                        this.__refactorClass(e("em", n), this.conf.classNames[t].counter, "counter")
                    }),
                    r.add && this.bind("initPanels", function (n) {
                        var t;
                        switch (r.addTo) {
                            case "panels":
                                t = n;
                                break;
                            default:
                                t = n.filter(r.addTo)
                        }
                        t.each(function () {
                            var n = e(this).data(s.parent);
                            n && (n.children("em." + i.counter).length || n.prepend(e('<em class="' + i.counter + '" />')))
                        })
                    }),
                    r.update && this.bind("update", function () {
                        this.$pnls.find("." + i.panel).each(function () {
                            var n = e(this)
                                , t = n.data(s.parent);
                            if (t) {
                                var o = t.children("em." + i.counter);
                                o.length && (n = n.children("." + i.listview),
                                    n.length && o.html(a.__filterListItems(n.children()).length))
                            }
                        })
                    })
            },
            add: function () {
                i = e[n]._c,
                    s = e[n]._d,
                    a = e[n]._e,
                    i.add("counter search noresultsmsg")
            },
            clickAnchor: function (e, n) { }
        },
            e[n].defaults[t] = {
                add: !1,
                addTo: "panels",
                update: !1
            },
            e[n].configuration.classNames[t] = {
                counter: "Counter"
            };
        var i, s, a, o
    }(jQuery),
    /*	
     * jQuery mmenu dividers add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var n = "mmenu"
            , t = "dividers";
        e[n].addons[t] = {
            setup: function () {
                var s = this
                    , r = this.opts[t];
                this.conf[t];
                if (o = e[n].glbl,
                    "boolean" == typeof r && (r = {
                        add: r,
                        fixed: r
                    }),
                    "object" != typeof r && (r = {}),
                    r = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], r),
                    this.bind("initPanels", function (n) {
                        this.__refactorClass(e("li", this.$menu), this.conf.classNames[t].collapsed, "collapsed")
                    }),
                    r.add && this.bind("initPanels", function (n) {
                        var t;
                        switch (r.addTo) {
                            case "panels":
                                t = n;
                                break;
                            default:
                                t = n.filter(r.addTo)
                        }
                        e("." + i.divider, t).remove(),
                            t.find("." + i.listview).not("." + i.vertical).each(function () {
                                var n = "";
                                s.__filterListItems(e(this).children()).each(function () {
                                    var t = e.trim(e(this).children("a, span").text()).slice(0, 1).toLowerCase();
                                    t != n && t.length && (n = t,
                                        e('<li class="' + i.divider + '">' + t + "</li>").insertBefore(this))
                                })
                            })
                    }),
                    r.collapse && this.bind("initPanels", function (n) {
                        e("." + i.divider, n).each(function () {
                            var n = e(this)
                                , t = n.nextUntil("." + i.divider, "." + i.collapsed);
                            t.length && (n.children("." + i.subopen).length || (n.wrapInner("<span />"),
                                n.prepend('<a href="#" class="' + i.subopen + " " + i.fullsubopen + '" />')))
                        })
                    }),
                    r.fixed) {
                    var l = function (n) {
                        n = n || this.$pnls.children("." + i.current);
                        var t = n.find("." + i.divider).not("." + i.hidden);
                        if (t.length) {
                            this.$menu.addClass(i.hasdividers);
                            var s = n.scrollTop() || 0
                                , a = "";
                            n.is(":visible") && n.find("." + i.divider).not("." + i.hidden).each(function () {
                                e(this).position().top + s < s + 1 && (a = e(this).text())
                            }),
                                this.$fixeddivider.text(a)
                        } else
                            this.$menu.removeClass(i.hasdividers)
                    };
                    this.$fixeddivider = e('<ul class="' + i.listview + " " + i.fixeddivider + '"><li class="' + i.divider + '"></li></ul>').prependTo(this.$pnls).children(),
                        this.bind("openPanel", l),
                        this.bind("update", l),
                        this.bind("initPanels", function (n) {
                            n.off(a.scroll + "-dividers " + a.touchmove + "-dividers").on(a.scroll + "-dividers " + a.touchmove + "-dividers", function (n) {
                                l.call(s, e(this))
                            })
                        })
                }
            },
            add: function () {
                i = e[n]._c,
                    s = e[n]._d,
                    a = e[n]._e,
                    i.add("collapsed uncollapsed fixeddivider hasdividers"),
                    a.add("scroll")
            },
            clickAnchor: function (e, n) {
                if (this.opts[t].collapse && n) {
                    var s = e.parent();
                    if (s.is("." + i.divider)) {
                        var a = s.nextUntil("." + i.divider, "." + i.collapsed);
                        return s.toggleClass(i.opened),
                            a[s.hasClass(i.opened) ? "addClass" : "removeClass"](i.uncollapsed),
                            !0
                    }
                }
                return !1
            }
        },
            e[n].defaults[t] = {
                add: !1,
                addTo: "panels",
                fixed: !1,
                collapse: !1
            },
            e[n].configuration.classNames[t] = {
                collapsed: "Collapsed"
            };
        var i, s, a, o
    }(jQuery),
    /*	
     * jQuery mmenu drag add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        function n(e, n, t) {
            return e < n && (e = n),
                e > t && (e = t),
                e
        }
        function t(t, i, s) {
            var r, l, d, c, h, u = this, f = {}, p = 0, v = !1, m = !1, g = 0, b = 0;
            switch (this.opts.offCanvas.position) {
                case "left":
                case "right":
                    f.events = "panleft panright",
                        f.typeLower = "x",
                        f.typeUpper = "X",
                        m = "width";
                    break;
                case "top":
                case "bottom":
                    f.events = "panup pandown",
                        f.typeLower = "y",
                        f.typeUpper = "Y",
                        m = "height"
            }
            switch (this.opts.offCanvas.position) {
                case "right":
                case "bottom":
                    f.negative = !0,
                        c = function (e) {
                            e >= s.$wndw[m]() - t.maxStartPos && (p = 1)
                        }
                        ;
                    break;
                default:
                    f.negative = !1,
                        c = function (e) {
                            e <= t.maxStartPos && (p = 1)
                        }
            }
            switch (this.opts.offCanvas.position) {
                case "left":
                    f.open_dir = "right",
                        f.close_dir = "left";
                    break;
                case "right":
                    f.open_dir = "left",
                        f.close_dir = "right";
                    break;
                case "top":
                    f.open_dir = "down",
                        f.close_dir = "up";
                    break;
                case "bottom":
                    f.open_dir = "up",
                        f.close_dir = "down"
            }
            switch (this.opts.offCanvas.zposition) {
                case "front":
                    h = function () {
                        return this.$menu
                    }
                        ;
                    break;
                default:
                    h = function () {
                        return e("." + o.slideout)
                    }
            }
            var _ = this.__valueOrFn(t.node, this.$menu, s.$page);
            "string" == typeof _ && (_ = e(_));
            var C = new Hammer(_[0], this.opts[a].vendors.hammer);
            C.on("panstart", function (e) {
                c(e.center[f.typeLower]),
                    s.$slideOutNodes = h(),
                    v = f.open_dir
            }).on(f.events + " panend", function (e) {
                p > 0 && e.preventDefault()
            }).on(f.events, function (e) {
                if (r = e["delta" + f.typeUpper],
                    f.negative && (r = -r),
                    r != g && (v = r >= g ? f.open_dir : f.close_dir),
                    g = r,
                    g > t.threshold && 1 == p) {
                    if (s.$html.hasClass(o.opened))
                        return;
                    p = 2,
                        u._openSetup(),
                        u.trigger("opening"),
                        s.$html.addClass(o.dragging),
                        b = n(s.$wndw[m]() * i[m].perc, i[m].min, i[m].max)
                }
                2 == p && (l = n(g, 10, b) - ("front" == u.opts.offCanvas.zposition ? b : 0),
                    f.negative && (l = -l),
                    d = "translate" + f.typeUpper + "(" + l + "px )",
                    s.$slideOutNodes.css({
                        "-webkit-transform": "-webkit-" + d,
                        transform: d
                    }))
            }).on("panend", function (e) {
                2 == p && (s.$html.removeClass(o.dragging),
                    s.$slideOutNodes.css("transform", ""),
                    u[v == f.open_dir ? "_openFinish" : "close"]()),
                    p = 0
            })
        }
        function i(n, t, i, s) {
            var l = this;
            n.each(function () {
                var n = e(this)
                    , t = n.data(r.parent);
                if (t && (t = t.closest("." + o.panel),
                    t.length)) {
                    var i = new Hammer(n[0], l.opts[a].vendors.hammer);
                    i.on("panright", function (e) {
                        l.openPanel(t)
                    })
                }
            })
        }
        var s = "mmenu"
            , a = "drag";
        e[s].addons[a] = {
            setup: function () {
                if (this.opts.offCanvas) {
                    var n = this.opts[a]
                        , o = this.conf[a];
                    d = e[s].glbl,
                        "boolean" == typeof n && (n = {
                            menu: n,
                            panels: n
                        }),
                        "object" != typeof n && (n = {}),
                        "boolean" == typeof n.menu && (n.menu = {
                            open: n.menu
                        }),
                        "object" != typeof n.menu && (n.menu = {}),
                        "boolean" == typeof n.panels && (n.panels = {
                            close: n.panels
                        }),
                        "object" != typeof n.panels && (n.panels = {}),
                        n = this.opts[a] = e.extend(!0, {}, e[s].defaults[a], n),
                        n.menu.open && t.call(this, n.menu, o.menu, d),
                        n.panels.close && this.bind("initPanels", function (e) {
                            i.call(this, e, n.panels, o.panels, d)
                        })
                }
            },
            add: function () {
                return "function" != typeof Hammer || Hammer.VERSION < 2 ? void (e[s].addons[a].setup = function () { }
                ) : (o = e[s]._c,
                    r = e[s]._d,
                    l = e[s]._e,
                    void o.add("dragging"))
            },
            clickAnchor: function (e, n) { }
        },
            e[s].defaults[a] = {
                menu: {
                    open: !1,
                    maxStartPos: 100,
                    threshold: 50
                },
                panels: {
                    close: !1
                },
                vendors: {
                    hammer: {}
                }
            },
            e[s].configuration[a] = {
                menu: {
                    width: {
                        perc: .8,
                        min: 140,
                        max: 440
                    },
                    height: {
                        perc: .8,
                        min: 140,
                        max: 880
                    }
                },
                panels: {}
            };
        var o, r, l, d
    }(jQuery),
    /*	
     * jQuery mmenu fixedElements add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var n = "mmenu"
            , t = "fixedElements";
        e[n].addons[t] = {
            setup: function () {
                if (this.opts.offCanvas) {
                    var i = this.opts[t];
                    this.conf[t];
                    o = e[n].glbl,
                        i = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], i);
                    var s = function (e) {
                        var n = this.conf.classNames[t].fixed;
                        this.__refactorClass(e.find("." + n), n, "slideout").appendTo(o.$body)
                    };
                    s.call(this, o.$page),
                        this.bind("setPage", s)
                }
            },
            add: function () {
                i = e[n]._c,
                    s = e[n]._d,
                    a = e[n]._e,
                    i.add("fixed")
            },
            clickAnchor: function (e, n) { }
        },
            e[n].configuration.classNames[t] = {
                fixed: "Fixed"
            };
        var i, s, a, o
    }(jQuery),
    /*	
     * jQuery mmenu dropdown add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var n = "mmenu"
            , t = "dropdown";
        e[n].addons[t] = {
            setup: function () {
                if (this.opts.offCanvas) {
                    var r = this
                        , l = this.opts[t]
                        , d = this.conf[t];
                    if (o = e[n].glbl,
                        "boolean" == typeof l && l && (l = {
                            drop: l
                        }),
                        "object" != typeof l && (l = {}),
                        "string" == typeof l.position && (l.position = {
                            of: l.position
                        }),
                        l = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], l),
                        l.drop) {
                        if ("string" != typeof l.position.of) {
                            var c = this.$menu.attr("id");
                            c && c.length && (this.conf.clone && (c = i.umm(c)),
                                l.position.of = '[href="#' + c + '"]')
                        }
                        if ("string" == typeof l.position.of) {
                            var h = e(l.position.of);
                            if (h.length) {
                                this.$menu.addClass(i.dropdown),
                                    l.tip && this.$menu.addClass(i.tip),
                                    l.event = l.event.split(" "),
                                    1 == l.event.length && (l.event[1] = l.event[0]),
                                    "hover" == l.event[0] && h.on(a.mouseenter + "-dropdown", function () {
                                        r.open()
                                    }),
                                    "hover" == l.event[1] && this.$menu.on(a.mouseleave + "-dropdown", function () {
                                        r.close()
                                    }),
                                    this.bind("opening", function () {
                                        this.$menu.data(s.style, this.$menu.attr("style") || ""),
                                            o.$html.addClass(i.dropdown)
                                    }),
                                    this.bind("closed", function () {
                                        this.$menu.attr("style", this.$menu.data(s.style)),
                                            o.$html.removeClass(i.dropdown)
                                    });
                                var u = function (s, a) {
                                    var r = a[0]
                                        , c = a[1]
                                        , u = "x" == s ? "scrollLeft" : "scrollTop"
                                        , f = "x" == s ? "outerWidth" : "outerHeight"
                                        , p = "x" == s ? "left" : "top"
                                        , v = "x" == s ? "right" : "bottom"
                                        , m = "x" == s ? "width" : "height"
                                        , g = "x" == s ? "maxWidth" : "maxHeight"
                                        , b = null
                                        , _ = o.$wndw[u]()
                                        , C = h.offset()[p] -= _
                                        , y = C + h[f]()
                                        , $ = o.$wndw[m]()
                                        , w = d.offset.button[s] + d.offset.viewport[s];
                                    if (l.position[s])
                                        switch (l.position[s]) {
                                            case "left":
                                            case "bottom":
                                                b = "after";
                                                break;
                                            case "right":
                                            case "top":
                                                b = "before"
                                        }
                                    null === b && (b = C + (y - C) / 2 < $ / 2 ? "after" : "before");
                                    var x, k;
                                    return "after" == b ? (x = "x" == s ? C : y,
                                        k = $ - (x + w),
                                        r[p] = x + d.offset.button[s],
                                        r[v] = "auto",
                                        c.push(i["x" == s ? "tipleft" : "tiptop"])) : (x = "x" == s ? y : C,
                                            k = x - w,
                                            r[v] = "calc( 100% - " + (x - d.offset.button[s]) + "px )",
                                            r[p] = "auto",
                                            c.push(i["x" == s ? "tipright" : "tipbottom"])),
                                        r[g] = Math.min(e[n].configuration[t][m].max, k),
                                        [r, c]
                                }
                                    , f = function (e) {
                                        if (this.vars.opened) {
                                            this.$menu.attr("style", this.$menu.data(s.style));
                                            var n = [{}, []];
                                            n = u.call(this, "y", n),
                                                n = u.call(this, "x", n),
                                                this.$menu.css(n[0]),
                                                l.tip && this.$menu.removeClass(i.tipleft + " " + i.tipright + " " + i.tiptop + " " + i.tipbottom).addClass(n[1].join(" "))
                                        }
                                    };
                                this.bind("opening", f),
                                    o.$wndw.on(a.resize + "-dropdown", function (e) {
                                        f.call(r)
                                    }),
                                    this.opts.offCanvas.blockUI || o.$wndw.on(a.scroll + "-dropdown", function (e) {
                                        f.call(r)
                                    })
                            }
                        }
                    }
                }
            },
            add: function () {
                i = e[n]._c,
                    s = e[n]._d,
                    a = e[n]._e,
                    i.add("dropdown tip tipleft tipright tiptop tipbottom"),
                    a.add("mouseenter mouseleave resize scroll")
            },
            clickAnchor: function (e, n) { }
        },
            e[n].defaults[t] = {
                drop: !1,
                event: "click",
                position: {},
                tip: !0
            },
            e[n].configuration[t] = {
                offset: {
                    button: {
                        x: -10,
                        y: 10
                    },
                    viewport: {
                        x: 20,
                        y: 20
                    }
                },
                height: {
                    max: 880
                },
                width: {
                    max: 440
                }
            };
        var i, s, a, o
    }(jQuery),
    /*	
     * jQuery mmenu iconPanels add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var n = "mmenu"
            , t = "iconPanels";
        e[n].addons[t] = {
            setup: function () {
                var s = this
                    , a = this.opts[t];
                this.conf[t];
                if (o = e[n].glbl,
                    "boolean" == typeof a && (a = {
                        add: a
                    }),
                    "number" == typeof a && (a = {
                        add: !0,
                        visible: a
                    }),
                    "object" != typeof a && (a = {}),
                    a = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], a),
                    a.visible++,
                    a.add) {
                    this.$menu.addClass(i.iconpanel);
                    for (var r = [], l = 0; l <= a.visible; l++)
                        r.push(i.iconpanel + "-" + l);
                    r = r.join(" ");
                    var d = function (n) {
                        n.hasClass(i.vertical) || s.$pnls.children("." + i.panel).removeClass(r).filter("." + i.subopened).removeClass(i.hidden).add(n).not("." + i.vertical).slice(-a.visible).each(function (n) {
                            e(this).addClass(i.iconpanel + "-" + n)
                        })
                    };
                    this.bind("openPanel", d),
                        this.bind("initPanels", function (n) {
                            d.call(s, s.$pnls.children("." + i.current)),
                                n.not("." + i.vertical).each(function () {
                                    e(this).children("." + i.subblocker).length || e(this).prepend('<a href="#' + e(this).closest("." + i.panel).attr("id") + '" class="' + i.subblocker + '" />')
                                })
                        })
                }
            },
            add: function () {
                i = e[n]._c,
                    s = e[n]._d,
                    a = e[n]._e,
                    i.add("iconpanel subblocker")
            },
            clickAnchor: function (e, n) { }
        },
            e[n].defaults[t] = {
                add: !1,
                visible: 3
            };
        var i, s, a, o
    }(jQuery),
    /*	
     * jQuery mmenu keyboardNavigation add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        function n(n, t) {
            n || (n = this.$pnls.children("." + a.current));
            var i = e();
            "default" == t && (i = n.children("." + a.listview).find("a[href]").not(":hidden"),
                i.length || (i = n.find(d).not(":hidden")),
                i.length || (i = this.$menu.children("." + a.navbar).find(d).not(":hidden"))),
                i.length || (i = this.$menu.children("." + a.tabstart)),
                i.first().focus()
        }
        function t(e) {
            e || (e = this.$pnls.children("." + a.current));
            var n = this.$pnls.children("." + a.panel)
                , t = n.not(e);
            t.find(d).attr("tabindex", -1),
                e.find(d).attr("tabindex", 0),
                e.find("input.mm-toggle, input.mm-check").attr("tabindex", -1)
        }
        var i = "mmenu"
            , s = "keyboardNavigation";
        e[i].addons[s] = {
            setup: function () {
                var o = this
                    , r = this.opts[s];
                this.conf[s];
                if (l = e[i].glbl,
                    "boolean" != typeof r && "string" != typeof r || (r = {
                        enable: r
                    }),
                    "object" != typeof r && (r = {}),
                    r = this.opts[s] = e.extend(!0, {}, e[i].defaults[s], r),
                    r.enable) {
                    r.enhance && this.$menu.addClass(a.keyboardfocus);
                    var c = e('<input class="' + a.tabstart + '" tabindex="0" type="text" />')
                        , h = e('<input class="' + a.tabend + '" tabindex="0" type="text" />');
                    this.bind("initPanels", function () {
                        this.$menu.prepend(c).append(h).children("." + a.navbar).find(d).attr("tabindex", 0)
                    }),
                        this.bind("open", function () {
                            t.call(this),
                                this.__transitionend(this.$menu, function () {
                                    n.call(o, null, r.enable)
                                }, this.conf.transitionDuration)
                        }),
                        this.bind("openPanel", function (e) {
                            t.call(this, e),
                                this.__transitionend(e, function () {
                                    n.call(o, e, r.enable)
                                }, this.conf.transitionDuration)
                        }),
                        this["_initWindow_" + s](r.enhance)
                }
            },
            add: function () {
                a = e[i]._c,
                    o = e[i]._d,
                    r = e[i]._e,
                    a.add("tabstart tabend keyboardfocus"),
                    r.add("focusin keydown")
            },
            clickAnchor: function (e, n) { }
        },
            e[i].defaults[s] = {
                enable: !1,
                enhance: !1
            },
            e[i].configuration[s] = {},
            e[i].prototype["_initWindow_" + s] = function (n) {
                l.$wndw.off(r.keydown + "-offCanvas"),
                    l.$wndw.off(r.focusin + "-" + s).on(r.focusin + "-" + s, function (n) {
                        if (l.$html.hasClass(a.opened)) {
                            var t = e(n.target);
                            t.is("." + a.tabend) && t.parent().find("." + a.tabstart).focus()
                        }
                    }),
                    l.$wndw.off(r.keydown + "-" + s).on(r.keydown + "-" + s, function (n) {
                        var t = e(n.target)
                            , i = t.closest("." + a.menu);
                        if (i.length) {
                            i.data("mmenu");
                            if (t.is("input, textarea"))
                                ;
                            else
                                switch (n.keyCode) {
                                    case 13:
                                        (t.is(".mm-toggle") || t.is(".mm-check")) && t.trigger(r.click);
                                        break;
                                    case 32:
                                    case 37:
                                    case 38:
                                    case 39:
                                    case 40:
                                        n.preventDefault()
                                }
                        }
                    }),
                    n && l.$wndw.on(r.keydown + "-" + s, function (n) {
                        var t = e(n.target)
                            , i = t.closest("." + a.menu);
                        if (i.length) {
                            var s = i.data("mmenu");
                            if (t.is("input, textarea"))
                                switch (n.keyCode) {
                                    case 27:
                                        t.val("")
                                }
                            else
                                switch (n.keyCode) {
                                    case 8:
                                        var r = t.closest("." + a.panel).data(o.parent);
                                        r && r.length && s.openPanel(r.closest("." + a.panel));
                                        break;
                                    case 27:
                                        i.hasClass(a.offcanvas) && s.close()
                                }
                        }
                    })
            }
            ;
        var a, o, r, l, d = "input, select, textarea, button, label, a[href]"
    }(jQuery),
    /*	
     * jQuery mmenu lazySubmenus add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var n = "mmenu"
            , t = "lazySubmenus";
        e[n].addons[t] = {
            setup: function () {
                var a = this.opts[t];
                this.conf[t];
                o = e[n].glbl,
                    "boolean" == typeof a && (a = {
                        load: a
                    }),
                    "object" != typeof a && (a = {}),
                    a = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], a),
                    a.load && (this.$menu.find("li").find("li").children(this.conf.panelNodetype).each(function () {
                        e(this).parent().addClass(i.lazysubmenu).data(s.lazysubmenu, this).end().remove()
                    }),
                        this.bind("openingPanel", function (n) {
                            var t = n.find("." + i.lazysubmenu);
                            t.length && (t.each(function () {
                                e(this).append(e(this).data(s.lazysubmenu)).removeData(s.lazysubmenu).removeClass(i.lazysubmenu)
                            }),
                                this.initPanels(n))
                        }))
            },
            add: function () {
                i = e[n]._c,
                    s = e[n]._d,
                    a = e[n]._e,
                    i.add("lazysubmenu"),
                    s.add("lazysubmenu")
            },
            clickAnchor: function (e, n) { }
        },
            e[n].defaults[t] = {
                load: !1
            },
            e[n].configuration[t] = {};
        var i, s, a, o
    }(jQuery),
    /*	
     * jQuery mmenu navbar add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var n = "mmenu"
            , t = "navbars";
        e[n].addons[t] = {
            setup: function () {
                var s = this
                    , a = this.opts[t]
                    , r = this.conf[t];
                if (o = e[n].glbl,
                    "undefined" != typeof a) {
                    a instanceof Array || (a = [a]);
                    var l = {};
                    if (a.length) {
                        e.each(a, function (o) {
                            var d = a[o];
                            "boolean" == typeof d && d && (d = {}),
                                "object" != typeof d && (d = {}),
                                "undefined" == typeof d.content && (d.content = ["prev", "title"]),
                                d.content instanceof Array || (d.content = [d.content]),
                                d = e.extend(!0, {}, s.opts.navbar, d);
                            var c = d.position
                                , h = d.height;
                            "number" != typeof h && (h = 1),
                                h = Math.min(4, Math.max(1, h)),
                                "bottom" != c && (c = "top"),
                                l[c] || (l[c] = 0),
                                l[c]++;
                            var u = e("<div />").addClass(i.navbar + " " + i.navbar + "-" + c + " " + i.navbar + "-" + c + "-" + l[c] + " " + i.navbar + "-size-" + h);
                            l[c] += h - 1;
                            for (var f = 0, p = 0, v = d.content.length; p < v; p++) {
                                var m = e[n].addons[t][d.content[p]] || !1;
                                m ? f += m.call(s, u, d, r) : (m = d.content[p],
                                    m instanceof e || (m = e(d.content[p])),
                                    u.append(m))
                            }
                            f += Math.ceil(u.children().not("." + i.btn).length / h),
                                f > 1 && u.addClass(i.navbar + "-content-" + f),
                                u.children("." + i.btn).length && u.addClass(i.hasbtns),
                                u.prependTo(s.$menu)
                        });
                        for (var d in l)
                            s.$menu.addClass(i.hasnavbar + "-" + d + "-" + l[d])
                    }
                }
            },
            add: function () {
                i = e[n]._c,
                    s = e[n]._d,
                    a = e[n]._e,
                    i.add("close hasbtns")
            },
            clickAnchor: function (e, n) { }
        },
            e[n].configuration[t] = {
                breadcrumbSeparator: "/"
            },
            e[n].configuration.classNames[t] = {};
        var i, s, a, o
    }(jQuery),
    /*	
     * jQuery mmenu navbar add-on breadcrumbs content
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var n = "mmenu"
            , t = "navbars"
            , i = "breadcrumbs";
        e[n].addons[t][i] = function (t, i, s) {
            var a = e[n]._c
                , o = e[n]._d;
            a.add("breadcrumbs separator");
            var r = e('<span class="' + a.breadcrumbs + '" />').appendTo(t);
            this.bind("initPanels", function (n) {
                n.removeClass(a.hasnavbar).each(function () {
                    for (var n = [], t = e(this), i = e('<span class="' + a.breadcrumbs + '"></span>'), r = e(this).children().first(), l = !0; r && r.length;) {
                        r.is("." + a.panel) || (r = r.closest("." + a.panel));
                        var d = r.children("." + a.navbar).children("." + a.title).text();
                        n.unshift(l ? "<span>" + d + "</span>" : '<a href="#' + r.attr("id") + '">' + d + "</a>"),
                            l = !1,
                            r = r.data(o.parent)
                    }
                    i.append(n.join('<span class="' + a.separator + '">' + s.breadcrumbSeparator + "</span>")).appendTo(t.children("." + a.navbar))
                })
            });
            var l = function () {
                r.html(this.$pnls.children("." + a.current).children("." + a.navbar).children("." + a.breadcrumbs).html())
            };
            return this.bind("openPanel", l),
                this.bind("initPanels", l),
                0
        }
    }(jQuery),
    /*	
     * jQuery mmenu navbar add-on close content
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var n = "mmenu"
            , t = "navbars"
            , i = "close";
        e[n].addons[t][i] = function (t, i) {
            var s = e[n]._c
                , a = e[n].glbl
                , o = e('<a class="' + s.close + " " + s.btn + '" href="#" />').appendTo(t)
                , r = function (e) {
                    o.attr("href", "#" + e.attr("id"))
                };
            return r.call(this, a.$page),
                this.bind("setPage", r),
                -1
        }
    }(jQuery),
    /*
     * jQuery mmenu navbar add-on next content
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var n = "mmenu"
            , t = "navbars"
            , i = "next";
        e[n].addons[t][i] = function (i, s) {
            var a, o, r, l = e[n]._c, d = e('<a class="' + l.next + " " + l.btn + '" href="#" />').appendTo(i), c = function (e) {
                e = e || this.$pnls.children("." + l.current);
                var n = e.find("." + this.conf.classNames[t].panelNext);
                a = n.attr("href"),
                    r = n.attr("aria-owns"),
                    o = n.html(),
                    d[a ? "attr" : "removeAttr"]("href", a),
                    d[r ? "attr" : "removeAttr"]("aria-owns", r),
                    d[a || o ? "removeClass" : "addClass"](l.hidden),
                    d.html(o)
            };
            return this.bind("openPanel", c),
                this.bind("initPanels", function () {
                    c.call(this)
                }),
                -1
        }
            ,
            e[n].configuration.classNames[t].panelNext = "Next"
    }(jQuery),
    /*
     * jQuery mmenu navbar add-on prev content
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var n = "mmenu"
            , t = "navbars"
            , i = "prev";
        e[n].addons[t][i] = function (i, s) {
            var a = e[n]._c
                , o = e('<a class="' + a.prev + " " + a.btn + '" href="#" />').appendTo(i);
            this.bind("initPanels", function (e) {
                e.removeClass(a.hasnavbar).children("." + a.navbar).addClass(a.hidden)
            });
            var r, l, d, c = function (e) {
                if (e = e || this.$pnls.children("." + a.current),
                    !e.hasClass(a.vertical)) {
                    var n = e.find("." + this.conf.classNames[t].panelPrev);
                    n.length || (n = e.children("." + a.navbar).children("." + a.prev)),
                        r = n.attr("href"),
                        d = n.attr("aria-owns"),
                        l = n.html(),
                        o[r ? "attr" : "removeAttr"]("href", r),
                        o[d ? "attr" : "removeAttr"]("aria-owns", d),
                        o[r || l ? "removeClass" : "addClass"](a.hidden),
                        o.html(l)
                }
            };
            return this.bind("openPanel", c),
                this.bind("initPanels", function () {
                    c.call(this)
                }),
                -1
        }
            ,
            e[n].configuration.classNames[t].panelPrev = "Prev"
    }(jQuery),
    /*	
     * jQuery mmenu navbar add-on searchfield content
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var n = "mmenu"
            , t = "navbars"
            , i = "searchfield";
        e[n].addons[t][i] = function (t, i) {
            var s = e[n]._c
                , a = e('<div class="' + s.search + '" />').appendTo(t);
            return "object" != typeof this.opts.searchfield && (this.opts.searchfield = {}),
                this.opts.searchfield.add = !0,
                this.opts.searchfield.addTo = a,
                0
        }
    }(jQuery),
    /*	
     * jQuery mmenu navbar add-on title content
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var n = "mmenu"
            , t = "navbars"
            , i = "title";
        e[n].addons[t][i] = function (i, s) {
            var a, o, r = e[n]._c, l = e('<a class="' + r.title + '" />').appendTo(i), d = function (e) {
                if (e = e || this.$pnls.children("." + r.current),
                    !e.hasClass(r.vertical)) {
                    var n = e.find("." + this.conf.classNames[t].panelTitle);
                    n.length || (n = e.children("." + r.navbar).children("." + r.title)),
                        a = n.attr("href"),
                        o = n.html() || s.title,
                        l[a ? "attr" : "removeAttr"]("href", a),
                        l[a || o ? "removeClass" : "addClass"](r.hidden),
                        l.html(o)
                }
            };
            return this.bind("openPanel", d),
                this.bind("initPanels", function (e) {
                    d.call(this)
                }),
                0
        }
            ,
            e[n].configuration.classNames[t].panelTitle = "Title"
    }(jQuery),
    /*	
     * jQuery mmenu RTL add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var n = "mmenu"
            , t = "rtl";
        e[n].addons[t] = {
            setup: function () {
                var s = this.opts[t];
                this.conf[t];
                o = e[n].glbl,
                    "object" != typeof s && (s = {
                        use: s
                    }),
                    s = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], s),
                    "boolean" != typeof s.use && (s.use = "rtl" == (o.$html.attr("dir") || "").toLowerCase()),
                    s.use && this.$menu.addClass(i.rtl)
            },
            add: function () {
                i = e[n]._c,
                    s = e[n]._d,
                    a = e[n]._e,
                    i.add("rtl")
            },
            clickAnchor: function (e, n) { }
        },
            e[n].defaults[t] = {
                use: "detect"
            };
        var i, s, a, o
    }(jQuery),
    /*
     * jQuery mmenu screenReader add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        function n(e, n, t) {
            e.prop("aria-" + n, t)[t ? "attr" : "removeAttr"]("aria-" + n, t)
        }
        function t(e) {
            return '<span class="' + a.sronly + '">' + e + "</span>"
        }
        var i = "mmenu"
            , s = "screenReader";
        e[i].addons[s] = {
            setup: function () {
                var o = this.opts[s]
                    , r = this.conf[s];
                if (l = e[i].glbl,
                    "boolean" == typeof o && (o = {
                        aria: o,
                        text: o
                    }),
                    "object" != typeof o && (o = {}),
                    o = this.opts[s] = e.extend(!0, {}, e[i].defaults[s], o),
                    o.aria) {
                    if (this.opts.offCanvas) {
                        var d = function () {
                            n(this.$menu, "hidden", !1)
                        }
                            , c = function () {
                                n(this.$menu, "hidden", !0)
                            };
                        this.bind("open", d),
                            this.bind("close", c),
                            n(this.$menu, "hidden", !0)
                    }
                    var h = function () { }
                        , u = function (e) {
                            var t = this.$menu.children("." + a.navbar)
                                , i = t.children("." + a.prev)
                                , s = t.children("." + a.next)
                                , r = t.children("." + a.title);
                            n(i, "hidden", i.is("." + a.hidden)),
                                n(s, "hidden", s.is("." + a.hidden)),
                                o.text && n(r, "hidden", !i.is("." + a.hidden)),
                                n(this.$pnls.children("." + a.panel).not(e), "hidden", !0),
                                n(e, "hidden", !1)
                        };
                    this.bind("update", h),
                        this.bind("openPanel", h),
                        this.bind("openPanel", u);
                    var f = function (t) {
                        var i;
                        t = t || this.$menu;
                        var s = t.children("." + a.navbar)
                            , r = s.children("." + a.prev)
                            , l = s.children("." + a.next);
                        s.children("." + a.title);
                        n(r, "haspopup", !0),
                            n(l, "haspopup", !0),
                            i = t.is("." + a.panel) ? t.find("." + a.prev + ", ." + a.next) : r.add(l),
                            i.each(function () {
                                n(e(this), "owns", e(this).attr("href").replace("#", ""))
                            }),
                            o.text && t.is("." + a.panel) && (i = t.find("." + a.listview).find("." + a.fullsubopen).parent().children("span"),
                                n(i, "hidden", !0))
                    };
                    this.bind("initPanels", f),
                        this.bind("_initAddons", f)
                }
                if (o.text) {
                    var p = function (n) {
                        var s;
                        n = n || this.$menu;
                        var o = n.children("." + a.navbar);
                        o.each(function () {
                            var n = e(this)
                                , o = e[i].i18n(r.text.closeSubmenu);
                            s = n.children("." + a.title),
                                s.length && (o += " (" + s.text() + ")"),
                                n.children("." + a.prev).html(t(o))
                        }),
                            o.children("." + a.close).html(t(e[i].i18n(r.text.closeMenu))),
                            n.is("." + a.panel) && n.find("." + a.listview).children("li").children("." + a.next).each(function () {
                                var n = e(this)
                                    , o = e[i].i18n(r.text[n.parent().is("." + a.vertical) ? "toggleSubmenu" : "openSubmenu"]);
                                s = n.nextAll("span, a").first(),
                                    s.length && (o += " (" + s.text() + ")"),
                                    n.html(t(o))
                            })
                    };
                    this.bind("initPanels", p),
                        this.bind("_initAddons", p)
                }
            },
            add: function () {
                a = e[i]._c,
                    o = e[i]._d,
                    r = e[i]._e,
                    a.add("sronly")
            },
            clickAnchor: function (e, n) { }
        },
            e[i].defaults[s] = {
                aria: !1,
                text: !1
            },
            e[i].configuration[s] = {
                text: {
                    closeMenu: "Close menu",
                    closeSubmenu: "Close submenu",
                    openSubmenu: "Open submenu",
                    toggleSubmenu: "Toggle submenu"
                }
            };
        var a, o, r, l
    }(jQuery),
    /*	
     * jQuery mmenu searchfield add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        function n(e) {
            switch (e) {
                case 9:
                case 16:
                case 17:
                case 18:
                case 37:
                case 38:
                case 39:
                case 40:
                    return !0
            }
            return !1
        }
        var t = "mmenu"
            , i = "searchfield";
        e[t].addons[i] = {
            setup: function () {
                var l = this
                    , d = this.opts[i]
                    , c = this.conf[i];
                r = e[t].glbl,
                    "boolean" == typeof d && (d = {
                        add: d
                    }),
                    "object" != typeof d && (d = {}),
                    "boolean" == typeof d.resultsPanel && (d.resultsPanel = {
                        add: d.resultsPanel
                    }),
                    d = this.opts[i] = e.extend(!0, {}, e[t].defaults[i], d),
                    c = this.conf[i] = e.extend(!0, {}, e[t].configuration[i], c),
                    this.bind("close", function () {
                        this.$menu.find("." + s.search).find("input").blur()
                    }),
                    this.bind("initPanels", function (r) {
                        if (d.add) {
                            var h;
                            switch (d.addTo) {
                                case "panels":
                                    h = r;
                                    break;
                                default:
                                    h = this.$menu.find(d.addTo)
                            }
                            if (h.each(function () {
                                var n = e(this);
                                if (!n.is("." + s.panel) || !n.is("." + s.vertical)) {
                                    if (!n.children("." + s.search).length) {
                                        var i = l.__valueOrFn(c.clear, n)
                                            , a = l.__valueOrFn(c.form, n)
                                            , r = l.__valueOrFn(c.input, n)
                                            , h = l.__valueOrFn(c.submit, n)
                                            , u = e("<" + (a ? "form" : "div") + ' class="' + s.search + '" />')
                                            , f = e('<input placeholder="' + e[t].i18n(d.placeholder) + '" type="text" autocomplete="off" />');
                                        u.append(f);
                                        var p;
                                        if (r)
                                            for (p in r)
                                                f.attr(p, r[p]);
                                        if (i && e('<a class="' + s.btn + " " + s.clear + '" href="#" />').appendTo(u).on(o.click + "-searchfield", function (e) {
                                            e.preventDefault(),
                                                f.val("").trigger(o.keyup + "-searchfield")
                                        }),
                                            a) {
                                            for (p in a)
                                                u.attr(p, a[p]);
                                            h && !i && e('<a class="' + s.btn + " " + s.next + '" href="#" />').appendTo(u).on(o.click + "-searchfield", function (e) {
                                                e.preventDefault(),
                                                    u.submit()
                                            })
                                        }
                                        n.hasClass(s.search) ? n.replaceWith(u) : n.prepend(u).addClass(s.hassearch)
                                    }
                                    if (d.noResults) {
                                        var v = n.closest("." + s.panel).length;
                                        if (v || (n = l.$pnls.children("." + s.panel).first()),
                                            !n.children("." + s.noresultsmsg).length) {
                                            var m = n.children("." + s.listview).first();
                                            e('<div class="' + s.noresultsmsg + " " + s.hidden + '" />').append(e[t].i18n(d.noResults))[m.length ? "insertAfter" : "prependTo"](m.length ? m : n)
                                        }
                                    }
                                }
                            }),
                                d.search) {
                                if (d.resultsPanel.add) {
                                    d.showSubPanels = !1;
                                    var u = this.$pnls.children("." + s.resultspanel);
                                    u.length || (u = e('<div class="' + s.panel + " " + s.resultspanel + " " + s.hidden + '" />').appendTo(this.$pnls).append('<div class="' + s.navbar + " " + s.hidden + '"><a class="' + s.title + '">' + e[t].i18n(d.resultsPanel.title) + "</a></div>").append('<ul class="' + s.listview + '" />').append(this.$pnls.find("." + s.noresultsmsg).first().clone()),
                                        this.initPanels(u))
                                }
                                this.$menu.find("." + s.search).each(function () {
                                    var t, r, c = e(this), h = c.closest("." + s.panel).length;
                                    h ? (t = c.closest("." + s.panel),
                                        r = t) : (t = e("." + s.panel, l.$menu),
                                            r = l.$menu),
                                        d.resultsPanel.add && (t = t.not(u));
                                    var f = c.children("input")
                                        , p = l.__findAddBack(t, "." + s.listview).children("li")
                                        , v = p.filter("." + s.divider)
                                        , m = l.__filterListItems(p)
                                        , g = "a"
                                        , b = g + ", span"
                                        , _ = ""
                                        , C = function () {
                                            var n = f.val().toLowerCase();
                                            if (n != _) {
                                                if (_ = n,
                                                    d.resultsPanel.add && u.children("." + s.listview).empty(),
                                                    t.scrollTop(0),
                                                    m.add(v).addClass(s.hidden).find("." + s.fullsubopensearch).removeClass(s.fullsubopen + " " + s.fullsubopensearch),
                                                    m.each(function () {
                                                        var n = e(this)
                                                            , t = g;
                                                        (d.showTextItems || d.showSubPanels && n.find("." + s.next)) && (t = b);
                                                        var i = n.data(a.searchtext) || n.children(t).text();
                                                        i.toLowerCase().indexOf(_) > -1 && n.add(n.prevAll("." + s.divider).first()).removeClass(s.hidden)
                                                    }),
                                                    d.showSubPanels && t.each(function (n) {
                                                        var t = e(this);
                                                        l.__filterListItems(t.find("." + s.listview).children()).each(function () {
                                                            var n = e(this)
                                                                , t = n.data(a.child);
                                                            n.removeClass(s.nosubresults),
                                                                t && t.find("." + s.listview).children().removeClass(s.hidden)
                                                        })
                                                    }),
                                                    d.resultsPanel.add)
                                                    if ("" === _)
                                                        this.closeAllPanels(),
                                                            this.openPanel(this.$pnls.children("." + s.subopened).last());
                                                    else {
                                                        var i = e();
                                                        t.each(function () {
                                                            var n = l.__filterListItems(e(this).find("." + s.listview).children()).not("." + s.hidden).clone(!0);
                                                            n.length && (d.resultsPanel.dividers && (i = i.add('<li class="' + s.divider + '">' + e(this).children("." + s.navbar).text() + "</li>")),
                                                                i = i.add(n))
                                                        }),
                                                            i.find("." + s.next).remove(),
                                                            u.children("." + s.listview).append(i),
                                                            this.openPanel(u)
                                                    }
                                                else
                                                    e(t.get().reverse()).each(function (n) {
                                                        var t = e(this)
                                                            , i = t.data(a.parent);
                                                        i && (l.__filterListItems(t.find("." + s.listview).children()).length ? (i.hasClass(s.hidden) && i.children("." + s.next).not("." + s.fullsubopen).addClass(s.fullsubopen).addClass(s.fullsubopensearch),
                                                            i.removeClass(s.hidden).removeClass(s.nosubresults).prevAll("." + s.divider).first().removeClass(s.hidden)) : h || (t.hasClass(s.opened) && setTimeout(function () {
                                                                l.openPanel(i.closest("." + s.panel))
                                                            }, (n + 1) * (1.5 * l.conf.openingInterval)),
                                                                i.addClass(s.nosubresults)))
                                                    });
                                                r.find("." + s.noresultsmsg)[m.not("." + s.hidden).length ? "addClass" : "removeClass"](s.hidden),
                                                    this.update()
                                            }
                                        };
                                    f.off(o.keyup + "-" + i + " " + o.change + "-" + i).on(o.keyup + "-" + i, function (e) {
                                        n(e.keyCode) || C.call(l)
                                    }).on(o.change + "-" + i, function (e) {
                                        C.call(l)
                                    });
                                    var y = c.children("." + s.btn);
                                    y.length && f.on(o.keyup + "-" + i, function (e) {
                                        y[f.val().length ? "removeClass" : "addClass"](s.hidden)
                                    }),
                                        f.trigger(o.keyup + "-" + i)
                                })
                            }
                        }
                    })
            },
            add: function () {
                s = e[t]._c,
                    a = e[t]._d,
                    o = e[t]._e,
                    s.add("clear search hassearch resultspanel noresultsmsg noresults nosubresults fullsubopensearch"),
                    a.add("searchtext"),
                    o.add("change keyup")
            },
            clickAnchor: function (e, n) { }
        },
            e[t].defaults[i] = {
                add: !1,
                addTo: "panels",
                placeholder: "Search",
                noResults: "No results found.",
                resultsPanel: {
                    add: !1,
                    dividers: !0,
                    title: "Search results"
                },
                search: !0,
                showTextItems: !1,
                showSubPanels: !0
            },
            e[t].configuration[i] = {
                clear: !1,
                form: !1,
                input: !1,
                submit: !1
            };
        var s, a, o, r
    }(jQuery),
    /*	
     * jQuery mmenu sectionIndexer add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var n = "mmenu"
            , t = "sectionIndexer";
        e[n].addons[t] = {
            setup: function () {
                var s = this
                    , r = this.opts[t];
                this.conf[t];
                o = e[n].glbl,
                    "boolean" == typeof r && (r = {
                        add: r
                    }),
                    "object" != typeof r && (r = {}),
                    r = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], r),
                    this.bind("initPanels", function (n) {
                        if (r.add) {
                            var t;
                            switch (r.addTo) {
                                case "panels":
                                    t = n;
                                    break;
                                default:
                                    t = e(r.addTo, this.$menu).filter("." + i.panel)
                            }
                            t.find("." + i.divider).closest("." + i.panel).addClass(i.hasindexer)
                        }
                        if (!this.$indexer && this.$pnls.children("." + i.hasindexer).length) {
                            this.$indexer = e('<div class="' + i.indexer + '" />').prependTo(this.$pnls).append('<a href="#a">a</a><a href="#b">b</a><a href="#c">c</a><a href="#d">d</a><a href="#e">e</a><a href="#f">f</a><a href="#g">g</a><a href="#h">h</a><a href="#i">i</a><a href="#j">j</a><a href="#k">k</a><a href="#l">l</a><a href="#m">m</a><a href="#n">n</a><a href="#o">o</a><a href="#p">p</a><a href="#q">q</a><a href="#r">r</a><a href="#s">s</a><a href="#t">t</a><a href="#u">u</a><a href="#v">v</a><a href="#w">w</a><a href="#x">x</a><a href="#y">y</a><a href="#z">z</a>'),
                                this.$indexer.children().on(a.mouseover + "-sectionindexer " + i.touchstart + "-sectionindexer", function (n) {
                                    var t = e(this).attr("href").slice(1)
                                        , a = s.$pnls.children("." + i.current)
                                        , o = a.find("." + i.listview)
                                        , r = !1
                                        , l = a.scrollTop();
                                    a.scrollTop(0),
                                        o.children("." + i.divider).not("." + i.hidden).each(function () {
                                            r === !1 && t == e(this).text().slice(0, 1).toLowerCase() && (r = e(this).position().top)
                                        }),
                                        a.scrollTop(r !== !1 ? r : l)
                                });
                            var o = function (e) {
                                s.$menu[(e.hasClass(i.hasindexer) ? "add" : "remove") + "Class"](i.hasindexer)
                            };
                            this.bind("openPanel", o),
                                o.call(this, this.$pnls.children("." + i.current))
                        }
                    })
            },
            add: function () {
                i = e[n]._c,
                    s = e[n]._d,
                    a = e[n]._e,
                    i.add("indexer hasindexer"),
                    a.add("mouseover touchstart")
            },
            clickAnchor: function (e, n) {
                if (e.parent().is("." + i.indexer))
                    return !0
            }
        },
            e[n].defaults[t] = {
                add: !1,
                addTo: "panels"
            };
        var i, s, a, o
    }(jQuery),
    /*	
     * jQuery mmenu setSelected add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var n = "mmenu"
            , t = "setSelected";
        e[n].addons[t] = {
            setup: function () {
                var a = this
                    , r = this.opts[t];
                this.conf[t];
                if (o = e[n].glbl,
                    "boolean" == typeof r && (r = {
                        hover: r,
                        parent: r
                    }),
                    "object" != typeof r && (r = {}),
                    r = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], r),
                    "detect" == r.current) {
                    var l = function (e) {
                        e = e.split("?")[0].split("#")[0];
                        var n = a.$menu.find('a[href="' + e + '"], a[href="' + e + '/"]');
                        n.length ? a.setSelected(n.parent(), !0) : (e = e.split("/").slice(0, -1),
                            e.length && l(e.join("/")))
                    };
                    l(window.location.href)
                } else
                    r.current || this.bind("initPanels", function (e) {
                        e.find("." + i.listview).children("." + i.selected).removeClass(i.selected)
                    });
                if (r.hover && this.$menu.addClass(i.hoverselected),
                    r.parent) {
                    this.$menu.addClass(i.parentselected);
                    var d = function (e) {
                        this.$pnls.find("." + i.listview).find("." + i.next).removeClass(i.selected);
                        for (var n = e.data(s.parent); n && n.length;)
                            n = n.not("." + i.vertical).children("." + i.next).addClass(i.selected).end().closest("." + i.panel).data(s.parent)
                    };
                    this.bind("openedPanel", d),
                        this.bind("initPanels", function (e) {
                            d.call(this, this.$pnls.children("." + i.current))
                        })
                }
            },
            add: function () {
                i = e[n]._c,
                    s = e[n]._d,
                    a = e[n]._e,
                    i.add("hoverselected parentselected")
            },
            clickAnchor: function (e, n) { }
        },
            e[n].defaults[t] = {
                current: !0,
                hover: !1,
                parent: !1
            };
        var i, s, a, o
    }(jQuery),
    /*	
     * jQuery mmenu toggles add-on
     * mmenu.frebsite.nl
     *
     * Copyright (c) Fred Heusschen
     */
    function (e) {
        var n = "mmenu"
            , t = "toggles";
        e[n].addons[t] = {
            setup: function () {
                var s = this;
                this.opts[t],
                    this.conf[t];
                o = e[n].glbl,
                    this.bind("initPanels", function (n) {
                        this.__refactorClass(e("input", n), this.conf.classNames[t].toggle, "toggle"),
                            this.__refactorClass(e("input", n), this.conf.classNames[t].check, "check"),
                            e("input." + i.toggle + ", input." + i.check, n).each(function () {
                                var n = e(this)
                                    , t = n.closest("li")
                                    , a = n.hasClass(i.toggle) ? "toggle" : "check"
                                    , o = n.attr("id") || s.__getUniqueId();
                                t.children('label[for="' + o + '"]').length || (n.attr("id", o),
                                    t.prepend(n),
                                    e('<label for="' + o + '" class="' + i[a] + '"></label>').insertBefore(t.children("a, span").last()))
                            })
                    })
            },
            add: function () {
                i = e[n]._c,
                    s = e[n]._d,
                    a = e[n]._e,
                    i.add("toggle check")
            },
            clickAnchor: function (e, n) { }
        },
            e[n].configuration.classNames[t] = {
                toggle: "Toggle",
                check: "Check"
            };
        var i, s, a, o
    }(jQuery);
