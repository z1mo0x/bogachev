!function (d, l) {
    "use strict";
    var e = !1
        , n = !1;
    if (l.querySelector)
        if (d.addEventListener)
            e = !0;
    if (d.wp = d.wp || {},
        !d.wp.receiveEmbedMessage)
        if (d.wp.receiveEmbedMessage = function (e) {
            var t = e.data;
            if (t.secret || t.message || t.value)
                if (!/[^a-zA-Z0-9]/.test(t.secret)) {
                    for (var r, a, i, s = l.querySelectorAll('iframe[data-secret="' + t.secret + '"]'), n = l.querySelectorAll('blockquote[data-secret="' + t.secret + '"]'), o = new RegExp("^https?:$", "i"), c = 0; c < n.length; c++)
                        n[c].style.display = "none";
                    for (c = 0; c < s.length; c++)
                        if (r = s[c],
                            e.source === r.contentWindow) {
                            if (r.removeAttribute("style"),
                                "height" === t.message) {
                                if (1e3 < (i = parseInt(t.value, 10)))
                                    i = 1e3;
                                else if (~~i < 200)
                                    i = 200;
                                r.height = i
                            }
                            if ("link" === t.message)
                                if (a = l.createElement("a"),
                                    i = l.createElement("a"),
                                    a.href = r.getAttribute("src"),
                                    i.href = t.value,
                                    o.test(i.protocol))
                                    if (i.host === a.host)
                                        if (l.activeElement === r)
                                            d.top.location.href = t.value
                        }
                }
        }
            ,
            e)
            d.addEventListener("message", d.wp.receiveEmbedMessage, !1),
                l.addEventListener("DOMContentLoaded", t, !1),
                d.addEventListener("load", t, !1);
    function t() {
        if (!n) {
            n = !0;
            for (var e, t, r = -1 !== navigator.appVersion.indexOf("MSIE 10"), a = !!navigator.userAgent.match(/Trident.*rv:11\./), i = l.querySelectorAll("iframe.wp-embedded-content"), s = 0; s < i.length; s++) {
                if (!(e = i[s]).getAttribute("data-secret"))
                    t = Math.random().toString(36).substr(2, 10),
                        e.src += "#?secret=" + t,
                        e.setAttribute("data-secret", t);
                if (r || a)
                    (t = e.cloneNode(!0)).removeAttribute("security"),
                        e.parentNode.replaceChild(t, e)
            }
        }
    }
}(window, document);
