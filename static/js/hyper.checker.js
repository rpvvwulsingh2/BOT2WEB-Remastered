$(document).ready(() => {
    var e = new Hyperbot({
        timeOut: 5e3,
        runCallBacks: !0
    });
    e.log("\n  KINGSLAVER"), console.log("checker.js loaded");
    var t = $("#message"),
        a = $("#ccnList"),
        n = $("#cvvList"),
        c = $("#deadList"),
        i = $("#amount"),
        l = $("#showCvv"),
        s = $("#showCcn"),
        o = $("#showDead"),
        r = $("#hyper_progress"),
        d = $("#saveCvv"),
        h = $("#saveCcn");
    d.hide(), h.hide();
    $("#lista_con"), $("#lista_leb"), $("#amount_container");
    n.hide(), a.hide(), c.hide(), l.click(() => {
        n.slideToggle()
    }), s.click(() => {
        a.slideToggle()
    }), o.click(() => {
        c.slideToggle()
    });
    var m = $("#startbtn"),
        v = $("#stopbtn");

    function p() {
        var e = t.val().split("\n");
        e.splice(0, 1), t.val(e.join("\n"))
    }
    v.hide(), m.click(() => {
        m.html("Please wait..."), async function (l = 500) {
            var s = i.val() ? i.val() : .8,
                o = $("#curr").val(),
                gate = o = $("#fwtype").val(),
                tg_id = $("#tg_id").val(),
                u = t.val(),
                k = u.split("\n"),
                f = k.length,
                g = o || "usd",
                y = 0,
                C = 0,
                w = 0;
            void 0 === Array.prototype.sameAs && (Array.prototype.sameAs = function () {
                for (let e = 1; e < this.length; e++)
                    if (this[e].startsWith(this[0].slice(0, 6))) return !0;
                return !1
            });
            const _ = e => null !== e ? e.sameAs() : null;
            var x = u.match(/(\d{16,18})[\/\s:|]*?(\d\d)[\/\s|]*?(\d{2,4})[\/\s|-]*?(\d{3,4})/gm);
            _(x), x[0].slice(0, 6);
            
            f ? f <= 5e3 ?  k.forEach(function (t, i) {
                setTimeout(function () {
                    $.ajax({
                        url: "http://localhost:5000/process?cc=" + t+'&gate='+gate,
                        type: "GET",
                        async: true,
                        success: function (t) {
                            var i;
                            t.match("Successful" || "Approved") ? (p(), y++, i = t + "", n.append("<span>" + i + "<br>"), notify.success(t, "", {
                                duration: 3e3
                            })) : t.match("#CCN") ? (p(), C++, function (e) {
                                a.append("<span>" +e + "<br>")
                            }(t + "")) : (p(), w++, function (e) {
                                c.append("<span>" + e + "<br>")
                            }(t + "")), $("#totalCount").html(f);
                            var l = parseInt(y) + parseInt(C) + parseInt(w);
                            $("#cvvCount").html(y), $("#ccnCount").html(C), $("#deadCount").html(w), $("#totalChecked").html(l), $("#cLive2").html(y), $("#cWarn2").html(C), $("#cDie2").html(w);
                            var s = l / f * 100;
                            0 !== parseInt(y) && 100 === s && (d.show(), d.click(async () => {
                                var t = $("#cvvList").text();
                                return e.saveFile({
                                    fileName: "x" + y + "_KING_cvv",
                                    fileExten: "txt",
                                    fileData: ["ᴄʜᴇᴄᴋᴇʀ: REALM's checker\nɢᴀᴛᴇ: sᴛʀɪᴘᴇ ᴄᴜsᴛᴏᴍ\n--------------\n".replace(/^\s*\n/gm, "") + t.replaceAll("#CVV", "\n").replace(/^\s*\n/gm, "")],
                                    saveData: !0
                                })
                            })), 0 !== parseInt(C) && 100 === s && (h.show(), h.click(async () => {
                                var t = $("#ccnList").text();
                                return e.saveFile({
                                    fileName: "x" + C + "_KING_ccn",
                                    fileExten: "txt",
                                    fileData: ["ᴄʜᴇᴄᴋᴇʀ: REALM's Checker\nɢᴀᴛᴇ: sᴛʀɪᴘᴇ ᴄᴜsᴛᴏᴍ\n--------------\n".replace(/^\s*\n/gm, "") + t.replaceAll("#CCN", "\n").replace(/^\s*\n/gm, "")],
                                    saveData: !0
                                })
                            })), r.css({
                                width: `${s.toFixed(0)+"%"}`,
                                height: "3px"
                            }), r.addClass("animate__animated animate__lightSpeedInLeft");
                            var o = "Processing..." + s.toFixed(0) + "%";
                            m.html(o), m.addClass(" animate__animated animate__flip "), 100 === s && (m.css({
                                color: "#0d8f3b",
                                background: "#0eab450d"
                            }), m.html("Checking completed!"), setTimeout(() => {
                                m.html("Loading...")
                            }, 1500), setTimeout(() => {
                                m.hide(), v.show(), v.html("Reload checker")
                            }, 5500), v.click(() => {
                                window.location.reload()
                            }))
                        }
                    })
                }, 2e2 * i)
            }) : window.location.replace("./") : notify.error("Please add a cc!", "", {
                duration: 5e3
            })
        }()
    })
});