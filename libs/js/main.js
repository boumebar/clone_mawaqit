
        console.log('je suis le script'),
        function u(t) {
            var e = localStorage.getItem(t);
            if (!e)
                return null;
            var n = JSON.parse(e);
            return (new Date).getTime() > n.expiry ? null : n.value
        }
        function d() {
            var t = !1;
            return $.ajax({
                async: !1,
                url: "https://mawaqit.net/status/health",
                type: "HEAD",
                timeout: 5e3,
                success: function(e) {
                    t = !0
                },
                error: function(e) {
                    t = !1
                }
            }),
            t
        }
        String.prototype.firstCapitalize = function() {
            return this.charAt(0).toUpperCase() + this.slice(1)
        }
        ,
        String.prototype.matchTime = function() {
            return /^\d{2}:\d{2}$/g.test(this)
        }
        ,
        String.prototype.hashCode = function() {
            var t = 0;
            if (0 == this.length)
                return t;
            for (i = 0; i < this.length; i++)
                char = this.charCodeAt(i),
                t = (t << 5) - t + char,
                t &= t;
            return t
        }
        ,
        Date.prototype.stdTimezoneOffset = function() {
            var t = new Date(this.getFullYear(),0,1)
              , e = new Date(this.getFullYear(),6,1);
            return Math.max(t.getTimezoneOffset(), e.getTimezoneOffset())
        }
        ,
        Date.prototype.dst = function() {
            return this.getTimezoneOffset() < this.stdTimezoneOffset()
        }
        ,
    9467: (t,e,n)=>{
        "use strict";
        n.d(e, {
            Z: ()=>a
        });
        const a = {
            show: function() {
                $(".flashMessage").length > 0 && ($(".flashMessage").removeClass("hidden"),
                $("footer .info").addClass("hidden"))
            },
            hide: function() {
                $(".flashMessage").addClass("hidden"),
                $("footer .info").removeClass("hidden")
            }
        }
    }
    ,
    3380: (t,e,n)=>{
        "use strict";
        n.d(e, {
            Z: ()=>r
        });
        n(3710),
        n(2772),
        n(6699),
        n(2023);
        var a = n(9437)
          , i = {
            getCurrentMinute: function() {
                var t = new Date;
                return (0,
                a.vL)(t.getMinutes())
            },
            getCurrentHour: function() {
                var t = new Date;
                return (0,
                a.vL)(t.getHours())
            },
            getCurrentDay: function() {
                return (new Date).getDate()
            },
            getTomorrowDay: function() {
                return this.tomorrow().getDate()
            },
            getCurrentMonth: function() {
                return (new Date).getMonth()
            },
            getCurrentMonthText: function() {
                var t = new Date;
                return (0,
                a.vL)(t.getMonth() + 1)
            },
            getTomorrowMonth: function() {
                return this.tomorrow().getMonth()
            },
            getCurrentYear: function() {
                return (new Date).getFullYear()
            },
            getCurrentTime: function(t) {
                t = void 0 !== t && t;
                var e = new Date
                  , n = (0,
                a.vL)(e.getSeconds())
                  , i = this.getCurrentHour() + ":" + this.getCurrentMinute();
                return !0 === t && (i += ":" + n),
                i
            },
            getCurrentDate: function(t, e, n, i, r) {
                e = e || "long",
                n = n || "numeric",
                i = i || "short",
                r = r || "numeric";
                var o = new Date
                  , s = {
                    weekday: e,
                    year: n,
                    month: i,
                    day: r
                };
                if (0 === t.indexOf("ar"))
                    return s = {
                        month: "short"
                    },
                    "ar-FR" === t && (t = "ar-DZ"),
                    "ar-SA" === t && (t = "ar-QA"),
                    (0,
                    a.vL)(o.getDate()) + " " + o.toLocaleDateString(t, s) + " " + o.getFullYear();
                try {
                    return o.toLocaleDateString(t, s).firstCapitalize()
                } catch (t) {
                    return o.toLocaleDateString("fr-FR", s).firstCapitalize()
                }
            },
            getLastSundayOfMonth: function(t) {
                var e = new Date;
                return e.setMonth(t),
                e.setDate(31),
                e.setDate(e.getDate() - e.getDay()),
                e.getDate()
            },
            isDst: function(t) {
                var e = new Date;
                return !0 === t && (e = i.tomorrow()),
                e.setHours(4),
                e.dst()
            },
            tomorrow: function() {
                var t = new Date;
                return t.setDate(t.getDate() + 1),
                t.setHours(3),
                t
            },
            formatTime: function(t, e) {
                if (!t.includes(":"))
                    return t;
                var n = (t = t.split(":"))[0]
                  , a = t[1]
                  , i = t[2] ? t[2] : null
                  , r = "";
                "12" === e && (r = n >= 12 ? "P" : "A",
                n = (n %= 12) || 12);
                var o = "<div>" + n + ":" + a + "</div>";
                return i && "12" === e ? o += '<div><div class="sec">:' + i + '</div><div class="ampm">' + r + "M</div></div>" : i ? o += '<div class="sec" style="font-size: 100%">:' + i + "</div>" : ("12" === e && (o += '<div class="ampm"><div>' + r + "</div><div>M</div></div>"),
                o)
            }
        };
        const r = i
    }
    ,
    5459: (t,e,n)=>{
        "use strict";
        n.d(e, {
            Z: ()=>d
        });
        n(3710),
        n(2564),
        n(2772),
        n(1058),
        n(9826),
        n(1539),
        n(4916);
        var a = n(9437)
          , i = n(3380)
          , r = n(9156)
          , o = n(6136)
          , s = n(9467)
          , u = {
            times: [],
            iqamas: [],
            oneMinute: 6e4,
            oneSecond: 1e3,
            isMosque,
            confData,
            loadData: function() {
                this.loadTimes();
                var t = new Date;
                if (0 !== t.getHours()) {
                    var e = this.getCurrentDateForPrayerTime(this.getIshaTime());
                    if (0 !== e.getHours()) {
                        var n = u.getWaitingByIndex(4) + 5;
                        e.setMinutes(e.getMinutes() + n),
                        t > e && this.loadTimes(!0)
                    }
                }
            },
            updateStatus: function(t) {
                $(".screen-status").addClass("hidden"),
                $(".screen-status." + t).removeClass("hidden")
            },
            initAutoOfflineSync: function() {
                isLocal && (u.updateStatus("offline"),
                offlineSyncCookie && setInterval((function() {
                    $.ajax({
                        url: site + "/id/" + JSON.parse(offlineSyncCookie).id + "/has-been-updated?lastUpdatedDate=" + lastUpdated,
                        success: function(t) {
                            u.updateStatus("online"),
                            !0 === t.hasBeenUpdated && (window.location.href = $("#sync_form_action").data("remote") + "?validate")
                        },
                        error: function() {
                            u.updateStatus("offline")
                        }
                    })
                }
                ), 3 * u.oneMinute))
            },
            initUpdateConfData: function() {
                if (!isLocal) {
                    u.updateStatus("online");
                    var t = 3;
                    isMosque || (t = 5);
                    var e = $(".main").data("remote");
                    setInterval((function() {
                        $.ajax({
                            url: e + "?lastUpdatedDate=" + lastUpdated,
                            success: function(t) {
                                u.updateStatus("online"),
                                !0 === t.hasBeenUpdated && $.ajax({
                                    url: location.href,
                                    method: "HEAD",
                                    success: function(t) {
                                        location.reload()
                                    }
                                })
                            },
                            error: function() {
                                u.updateStatus("offline")
                            }
                        })
                    }
                    ), u.oneMinute * t)
                }
            },
            loadTimes: function(t) {
                this.loadTimesFromCalendar(t)
            },
            loadTimesFromCalendar: function(t) {
                var e = i.Z.getCurrentMonth()
                  , n = i.Z.getCurrentDay();
                "boolean" == typeof t && !0 === t && (e = i.Z.getTomorrowMonth(),
                n = i.Z.getTomorrowDay()),
                u.times = u.confData.calendar[e][n],
                u.iqamas = u.confData.iqamaCalendar[e][n]
            },
            getTimes: function() {
                return [this.times[0], this.times[2], this.times[3], this.times[4], this.times[5]]
            },
            getTimeByIndex: function(t) {
                return this.getTimes()[t]
            },
            getWaitingByIndex: function(t) {
                var e = this.getWaitingTimes()[t];
                return e <= 2 && (e = 2,
                u.isMosque || (e = 4)),
                e
            },
            waitings: [],
            getWaitingTimes: function() {
                if (0 !== u.waitings.length)
                    return u.waitings;
                var t, e, n = u.getTimes();
                return $.each(u.iqamas, (function(a, i) {
                    -1 !== i.indexOf("+") && (u.waitings[a] = parseInt(i)),
                    -1 === i.indexOf("+") && (t = u.getCurrentDateForPrayerTime(n[a]),
                    e = u.getCurrentDateForPrayerTime(i),
                    u.waitings[a] = Math.floor(Math.abs(e - t) / 1e3 / 60))
                }
                )),
                u.waitings
            },
            nextPrayerCountdown: function() {
                var t, e = new Date, n = u.getCurrentDateForPrayerTime(u.getTimeByIndex(0));
                n.setDate(n.getDate() + 1);
                var a = n
                  , i = $(".prayers>div")
                  , r = $(".next-prayer span")
                  , o = i.eq(0).find(".name").text();
                r.text(o),
                $.each(u.times, (function(n, s) {
                    if (n--,
                    u.isJumua(n) && (s = u.getJumuaTime()),
                    0 !== (t = u.getCurrentDateForPrayerTime(s)).getHours() && e < t)
                        return a = t,
                        o = i.eq(n).find(".name").text(),
                        -1 === n && (o = i.eq(0).find(".name").text()),
                        0 === n && (o = $(".chourouk .name").text()),
                        u.isJumua(n) && (o = $(".joumouaa .name").text()),
                        r.text(o),
                        !1
                }
                )),
                $(".next-prayer .countdown").countdown(a).on("update.countdown", (function(t) {
                    var e = "%H:%M";
                    t.offset.totalSeconds < 60 && (e = "%H:%M:%S"),
                    $(this).text(t.strftime(e))
                }
                )).on("finish.countdown", (function(t) {
                    setTimeout((function() {
                        u.nextPrayerCountdown()
                    }
                    ), 2e3)
                }
                ))
            },
            formatTime: function(t) {
                if (t) {
                    var e = u.confData.timeDisplayFormat;
                    return i.Z.formatTime(t, e)
                }
            },
            getCurrentDateForPrayerTime: function(t) {
                var e = new Date;
                return t = t.split(":"),
                e.setHours(t[0]),
                e.setMinutes(t[1]),
                e.setSeconds(0),
                e
            },
            getIshaTime: function() {
                return this.getTimes()[4]
            },
            getChouroukTime: function() {
                return this.times[1]
            },
            getImsak: function() {
                var t = this.getTimeByIndex(0)
                  , e = this.getCurrentDateForPrayerTime(t)
                  , n = e.setMinutes(e.getMinutes() - this.confData.imsakNbMinBeforeFajr);
                return n = new Date(n),
                (0,
                a.vL)(n.getHours()) + ":" + (0,
                a.vL)(n.getMinutes())
            },
            initCronHandlingTimes: function() {
                setInterval((function() {
                    var t = new Date;
                    0 === t.getHours() && 0 === t.getMinutes() && (u.setDate(),
                    u.loadTimes(),
                    u.setTimes(),
                    u.initNextTimeHighlight(),
                    u.setSpecialTimes()),
                    u.showSpecialTimes()
                }
                ), u.oneMinute)
            },
            initCronReloadPage: function() {
                setInterval((function() {
                    2 === (new Date).getHours() && (0,
                    a.Sv)()
                }
                ), 60 * u.oneMinute)
            },
            iqama: {
                flash: function(t) {
                    !0 === u.confData.iqamaBip && u.playSound(),
                    u.switchLayer("main", "iqama");
                    var e = $(".iqama .image")
                      , n = setInterval((function() {
                        e.toggleClass("hidden")
                    }
                    ), u.oneSecond);
                    setTimeout((function() {
                        u.iqama.stopFlashing(n)
                    }
                    ), u.confData.iqamaDisplayTime * u.oneSecond),
                    setTimeout((function() {
                        void 0 !== o.V && o.V.show(t),
                        s.Z.show()
                    }
                    ), u.confData.duaAfterPrayerShowTimes[t] * u.oneMinute)
                },
                stopFlashing: function(t) {
                    $(".iqama").fadeOut(500, (function() {
                        u.confData.blackScreenWhenPraying && !isMobile ? $("#black-screen").fadeIn(500) : $(".main").fadeIn(500)
                    }
                    )),
                    clearInterval(t)
                },
                countdown: function(t) {
                    if (u.confData.iqamaEnabled) {
                        var e = u.getTimeByIndex(t)
                          , n = $(".wait").eq(t)
                          , a = n.html()
                          , i = u.getCurrentDateForPrayerTime(e)
                          , r = i.setMinutes(i.getMinutes() + u.getWaitingByIndex(t))
                          , o = "%M:%S";
                        $(n).countdown(r).on("update.countdown", (function(e) {
                            u.getWaitingByIndex(t) > 60 && (o = "%H:%M:%S"),
                            $(".main-iqama-countdown .countdown, .mobile .wait:eq(" + t + ")").text(e.strftime(o)),
                            !1 === u.confData.iqamaFullScreenCountdown && $(this).text(e.strftime(o))
                        }
                        )).on("finish.countdown", (function() {
                            $(".main-iqama-countdown").addClass("hidden"),
                            $("footer, .prayers .name, .top-content .content, .header").removeClass("hidden"),
                            $(".top-content").css("height", "54%"),
                            u.iqama.flash(t),
                            $(n).html(a)
                        }
                        ))
                    }
                }
            },
            adhan: {
                isFlashing: !1,
                hasNotified: !1,
                initFlash: function() {
                    setInterval((function() {
                        if (!u.adhan.isFlashing) {
                            var t = i.Z.getCurrentTime();
                            $(u.getTimes()).each((function(e, n) {
                                if (n === t)
                                    return u.isJumua(e) && u.isMosque || (u.adhan.isFlashing = !0,
                                    u.adhan.flash(e)),
                                    !1
                            }
                            ))
                        }
                    }
                    ), u.oneSecond)
                },
                flash: function(t) {
                    void 0 !== o.j && o.j.hide(),
                    s.Z.hide(),
                    u.setNextTimeHighlight(t),
                    u.iqama.countdown(t),
                    u.adhan.playAdhan(t),
                    $(".top-content .content").addClass("hidden");
                    var e = $(".top-content .adhan-flash");
                    e.removeClass("hidden");
                    var n = $(".mobile .prayers .adhan-signal").eq(t)
                      , a = $(".mobile .prayers .time").eq(t)
                      , i = setInterval((function() {
                        e.toggleClass("hidden"),
                        n.toggleClass("hidden"),
                        a.toggleClass("hidden")
                    }
                    ), u.oneSecond);
                    setTimeout((function() {
                        u.adhan.stopFlashing(i, t)
                    }
                    ), u.adhan.getDuration(t))
                },
                stopFlashing: function(t, e) {
                    if (clearInterval(t),
                    u.adhan.isFlashing = !1,
                    $(".top-content .adhan-flash").addClass("hidden"),
                    $(".mobile .prayers .adhan-signal").eq(e).addClass("hidden"),
                    $(".mobile .prayers .time").eq(e).removeClass("hidden"),
                    u.duaAfterAdhan.handle(e),
                    u.confData.iqamaEnabled && !0 === u.confData.iqamaFullScreenCountdown)
                        return $(".main-iqama-countdown").removeClass("hidden"),
                        $("footer, .prayers .name, .top-content .content, .header").addClass("hidden"),
                        void $(".top-content").css("height", "75%");
                    $(".top-content .content").removeClass("hidden")
                },
                getAdhan: function(t) {
                    if (!u.confData.adhanVoice)
                        return null;
                    if ("" === u.confData.adhanEnabledByPrayer[t])
                        return null;
                    var e = u.confData.adhanVoice;
                    return "bip" !== e && 0 === t && $.ajax({
                        async: !1,
                        url: "/static/mp3/" + e + "-fajr.mp3",
                        method: "HEAD",
                        success: function() {
                            e += "-fajr"
                        }
                    }),
                    e
                },
                playAdhan: function(t) {
                    var e = u.adhan.getAdhan(t);
                    e && u.playSound(e)
                },
                getDuration: function(t) {
                    var e = 90;
                    if (u.getWaitingByIndex(t) <= 2)
                        return u.oneSecond * e;
                    if (e = 150,
                    !u.isMosque && u.confData.adhanVoice)
                        switch (u.adhan.getAdhan(t)) {
                        case "adhan-afassy":
                            e = 154;
                            break;
                        case "adhan-afassy-fajr":
                            e = 182;
                            break;
                        case "adhan-algeria":
                            e = 173;
                            break;
                        case "adhan-egypt":
                            e = 221;
                            break;
                        case "adhan-egypt-fajr":
                            e = 245;
                            break;
                        case "adhan-madina":
                            e = 213;
                            break;
                        case "adhan-madina-fajr":
                            e = 253;
                            break;
                        case "adhan-maquah":
                            e = 203;
                            break;
                        case "adhan-maquah-fajr":
                            e = 251;
                            break;
                        case "adhan-quds":
                            e = 185
                        }
                    return u.oneSecond * e
                }
            },
            fajrWakeAdhanIsPlaying: !1,
            initWakupFajr: function() {
                setInterval((function() {
                    if (!u.isMosque && !1 === u.fajrWakeAdhanIsPlaying && u.confData.adhanVoice && parseInt(u.confData.wakeForFajrTime) > 0) {
                        var t = new Date
                          , e = u.getTimeByIndex(0);
                        if (Math.floor((t - u.getCurrentDateForPrayerTime(e)) / u.oneMinute) === -parseInt(u.confData.wakeForFajrTime)) {
                            var n = $(".top-content .content")
                              , a = $(".alarm-flash");
                            u.fajrWakeAdhanIsPlaying = !0,
                            u.playSound(u.confData.adhanVoice),
                            n.addClass("hidden");
                            var i = setInterval((function() {
                                a.toggleClass("hidden")
                            }
                            ), u.oneSecond);
                            setTimeout((function() {
                                u.fajrWakeAdhanIsPlaying = !1,
                                n.removeClass("hidden"),
                                a.addClass("hidden"),
                                clearInterval(i)
                            }
                            ), 200 * u.oneSecond)
                        }
                    }
                }
                ), u.oneMinute)
            },
            jumuaHandler: {
                init: function() {
                    u.getJumuaTime() && setInterval((function() {
                        if (5 === (new Date).getDay() && i.Z.getCurrentTime() === u.getJumuaTime()) {
                            u.setNextTimeHighlight(1);
                            var t = $("#streamer");
                            0 === t.length || !(0,
                            a.PP)() || !isSecondaryScreen && isMosque ? !0 === u.confData.jumuaDhikrReminderEnabled ? ((0,
                            a.e6)(".jumua-dhikr-reminder"),
                            u.jumuaHandler.showFrame(".jumua-dhikr-reminder")) : !0 === u.confData.jumuaBlackScreenEnabled && u.jumuaHandler.showFrame("#black-screen") : (t.attr("src", t.data("url")),
                            t.removeClass("hidden"),
                            u.jumuaHandler.showFrame("#streamer"))
                        }
                    }
                    ), u.oneMinute)
                },
                showFrame: function(t) {
                    $(".main").fadeOut(500, (function() {
                        $(t).fadeIn(500)
                    }
                    )),
                    setTimeout((function() {
                        var e = $("#streamer");
                        e.addClass("hidden"),
                        e.attr("src", ""),
                        $(t).fadeOut(500, (function() {
                            $(".main").fadeIn(),
                            o.j.run()
                        }
                        ))
                    }
                    ), u.confData.jumuaTimeout * u.oneMinute)
                }
            },
            switchLayer: function(t, e, n) {
                isMobile || (!0 === n && (0,
                a.e6)("." + e),
                $("." + t).fadeOut(500, (function() {
                    $("." + e).fadeIn(500)
                }
                )))
            },
            playSound: function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                void 0 === t && (t = "bip");
                var n = new Audio("/static/mp3/" + t + ".mp3");
                return n.loop = e,
                n.play(),
                n
            },
            initNextTimeHighlight: function() {
                var t, e = new Date;
                u.highlightByIndex(0);
                var n = this.getTimes();
                $.each(n, (function(n, a) {
                    0 !== (t = u.getCurrentDateForPrayerTime(a)).getHours() && e > t && (5 === ++n && (n = 0),
                    u.highlightByIndex(n))
                }
                ))
            },
            highlightByIndex: function(t) {
                $(".prayer-highlighted").removeClass("prayer-highlighted"),
                u.isJumua(t) && ($(".joumouaa").addClass("prayer-highlighted"),
                u.isMosque) || $(".prayers > div").eq(t).addClass("prayer-highlighted")
            },
            setNextTimeHighlight: function(t) {
                var e = t + 1;
                5 === e && (e = 0),
                setTimeout((function() {
                    u.highlightByIndex(e);
                    var t = new Date;
                    0 === e && 0 !== t.getHours() && (u.loadTimes(!0),
                    u.setTimes(!0))
                }
                ), u.oneMinute * u.getWaitingByIndex(t) + 1)
            },
            duaAfterAdhan: {
                showAdhanDua: function() {
                    u.switchLayer("main", "adhan", !0)
                },
                hideAdhanDua: function() {
                    u.switchLayer("adhan", "main")
                },
                showHadith: function() {
                    u.switchLayer("main", "douaa-between-adhan-iqama", !0)
                },
                hideHadith: function() {
                    u.switchLayer("douaa-between-adhan-iqama", "main")
                },
                handle: function(t) {
                    if (u.duaAfterAdhan.isDuaaAfterAthanEnabled(t)) {
                        var e = u.getWaitingByIndex(t);
                        u.isMosque || u.playSound("duaa-after-adhan"),
                        u.duaAfterAdhan.showAdhanDua();
                        var n = u.isMosque ? 2 : 4;
                        setTimeout((function() {
                            u.duaAfterAdhan.hideAdhanDua(),
                            e > n && setTimeout((function() {
                                u.duaAfterAdhan.showHadith(),
                                setTimeout((function() {
                                    u.duaAfterAdhan.hideHadith()
                                }
                                ), 30 * u.oneSecond)
                            }
                            ), 10 * u.oneSecond)
                        }
                        ), (e > n ? 30 : 20) * u.oneSecond)
                    }
                },
                isDuaaAfterAthanEnabled: function(t) {
                    return !1 !== u.confData.duaAfterAzanEnabled && "" !== u.confData.adhanEnabledByPrayer[t]
                }
            },
            setTime: function() {
                var t, e, n = $(".currentTime"), a = $(".currentTimeShort");
                t = i.Z.getCurrentTime(!0),
                e = u.formatTime(i.Z.getCurrentTime()),
                n.html(u.formatTime(t)),
                a.html(e)
            },
            setTimeInterval: function() {
                setInterval((function() {
                    u.setTime()
                }
                ), u.oneSecond)
            },
            setDate: function() {
                $("#gregorianDate").text(i.Z.getCurrentDate(locale)),
                this.setCurrentHijriDate()
            },
            alternateDates: function() {
                !1 !== u.confData.hijriDateEnabled && setInterval((function() {
                    $("#hijriDate, #gregorianDate").toggleClass("fadeOut fadeIn")
                }
                ), 10 * u.oneSecond)
            },
            setCurrentHijriDate: function() {
                if (!0 === u.confData.hijriDateEnabled) {
                    var t = u.confData.hijriAdjustment;
                    $("#hijriDate span").text((0,
                    r.Px)(u.confData, lang));
                    var e = (0,
                    r.FL)(t);
                    $("#hijriDate img").addClass("hidden"),
                    -1 !== $.inArray(e[5], [13, 14, 15]) && $("#hijriDate img").removeClass("hidden")
                }
            },
            getJumuaTime: function() {
                return this.confData.jumua
            },
            isJumua: function(t) {
                var e = new Date;
                return u.getJumuaTime() && 5 === e.getDay() && 1 === t
            },
            isJumuaMoment: function() {
                var t = new Date;
                if (!u.getJumuaTime())
                    return !1;
                if (5 !== t.getDay())
                    return !1;
                var e = u.getCurrentDateForPrayerTime(u.getJumuaTime()).getTime()
                  , n = new Date(e);
                return n.setMinutes(n.getMinutes() + u.confData.jumuaTimeout),
                !(t.getTime() < e || t.getTime() > n)
            },
            showSpecialTimes: function() {
                if ($(".custom-time").hide(),
                this.confData.aidPrayerTime && this.aidIsComingSoon())
                    return $(".aid").addClass("prayer-highlighted"),
                    void $(".aid").show();
                if (this.confData.imsakNbMinBeforeFajr) {
                    var t = new Date
                      , e = new Date;
                    if (e.setHours(0),
                    e.setMinutes(0),
                    e.setSeconds(0),
                    t < u.getCurrentDateForPrayerTime(u.getTimeByIndex(0)) && t > e)
                        $(".imsak").show();
                    else {
                        var n = u.getCurrentDateForPrayerTime(u.getChouroukTime());
                        if (n = n.setHours(n.getHours() + 1),
                        t.getTime() > n)
                            return $(".imsak").show(),
                            void (this.isRamadan() && $(".imsak-id").addClass("important"));
                        $(".chourouk").show()
                    }
                } else
                    $(".chourouk").show()
            },
            setSpecialTimes: function() {
                $(".joumouaa-id").html(u.formatTime(this.getJumuaTime())),
                $(".joumouaa2-id").html(u.formatTime(u.confData.jumua2)),
                $(".aid-time").html(u.formatTime(this.confData.aidPrayerTime)),
                $(".aid-time2").html(u.formatTime(this.confData.aidPrayerTime2)),
                $(".chourouk-id").html(u.formatTime(this.getChouroukTime())),
                $(".imsak-id").html(u.formatTime(this.getImsak()))
            },
            setTimes: function(t) {
                var e = this.getTimes(t);
                $.each(e, (function(t, e) {
                    $(".prayers .time").eq(t).html(u.formatTime(e))
                }
                ))
            },
            setWaitings: function() {
                u.confData.iqamaEnabled && (u.confData.iqamaMoreImportant && ($(".prayers .wait").css("font-size", "4.5vw"),
                $(".prayers .time").css("font-size", "3.5vw")),
                $.each(u.iqamas, (function(t, e) {
                    var n = $(".prayers .wait").eq(t);
                    n.html(u.formatTime(e)),
                    -1 !== e.indexOf(":") && n.css("direction", "ltr")
                }
                )))
            },
            hideSpinner: function() {
                setTimeout((function() {
                    $("#spinner").fadeOut(500, (function() {
                        $(".main").fadeIn(500)
                    }
                    ))
                }
                ), 500)
            },
            initEvents: function() {
                $(".version").click((function() {
                    u.test()
                }
                ))
            },
            isPrayingMoment: function() {
                var t, e, n, a = !1, i = new Date;
                return !!u.isJumuaMoment() || ($(u.getTimes()).each((function(r, o) {
                    if (n = u.getCurrentDateForPrayerTime(o),
                    t = new Date(n.getTime()),
                    e = new Date(n.getTime()),
                    t.setMinutes(t.getMinutes() - 10),
                    e.setMinutes(e.getMinutes() + u.getWaitingByIndex(r) + 11),
                    i > t && i < e)
                        return a = !0,
                        !1
                }
                )),
                a)
            },
            isRamadan: function() {
                return 8 === (0,
                r.FL)(u.confData.hijriAdjustment)[6]
            },
            aidIsComingSoon: function() {
                var t = (0,
                r.FL)(u.confData.hijriAdjustment);
                return 8 === t[6] && t[5] >= 23 || (9 === t[6] && 1 === t[5] || 11 === t[6] && t[5] >= 3 && t[5] <= 10)
            },
            isAidDay: function() {
                var t = (0,
                r.FL)(u.confData.hijriAdjustment);
                return 9 === t[6] && 1 === t[5] || 11 === t[6] && 10 === t[5]
            },
            initAidTakbir: function() {
                u.isAidDay() && (isMosque || setInterval((function() {
                    var t = new Date
                      , e = u.getCurrentDateForPrayerTime(u.getTimeByIndex(0));
                    if (t.getHours() === e.getHours() + 1 && t.getMinutes() === e.getMinutes()) {
                        var n = u.playSound("takbir-aid", !0);
                        setTimeout((function() {
                            n.pause()
                        }
                        ), 120 * u.oneMinute)
                    }
                }
                ), u.oneMinute))
            }
        };
        const d = u
    }
    ,
    9241: (t,e,n)=>{
        "use strict";
        n.d(e, {
            Z: ()=>o
        });
        n(2564),
        n(4916),
        n(1058),
        n(3710),
        n(9826),
        n(1539);
        var a = n(9437)
          , i = n(5459)
          , r = {
            isVisible: !1,
            init: function() {
                i.Z.confData.randomHadithEnabled && setInterval((function() {
                    r.get()
                }
                ), 4 * i.Z.oneMinute)
            },
            isAllowed: function() {
                if (!i.Z.confData.randomHadithEnabled)
                    return !1;
                if (!$(".sub-main").is(":visible"))
                    return !1;
                if (i.Z.isJumuaMoment())
                    return !1;
                if (i.Z.isPrayingMoment())
                    return !1;
                if (/^\d\-\d$/.test(i.Z.confData.randomHadithIntervalDisabling)) {
                    var t = i.Z.confData.randomHadithIntervalDisabling.split("-")
                      , e = i.Z.getTimeByIndex(parseInt(t[0]))
                      , n = i.Z.getTimeByIndex(parseInt(t[1]))
                      , a = i.Z.getCurrentDateForPrayerTime(e)
                      , r = i.Z.getCurrentDateForPrayerTime(n)
                      , o = new Date;
                    if (o > a && o < r)
                        return !1
                }
                return !0
            },
            get: function() {
                setTimeout((function() {
                    if (r.isAllowed()) {
                        var t = $(".random-hadith")
                          , e = t.find(".text")
                          , n = (0,
                        a.E2)("hadith");
                        n && (e.html(n),
                        r.show()),
                        n || $.ajax({
                            url: t.data("remote"),
                            success: function(t) {
                                t.text && (e.find("div").text(t.text),
                                r.show((function() {
                                    r.setFontSize(),
                                    (0,
                                    a.HS)("hadith", e.html(), 36e5)
                                }
                                )))
                            },
                            error: function() {
                                "" !== e.find("div").text() && r.show()
                            }
                        })
                    }
                }
                ), 5e3)
            },
            show: function(t) {
                r.isVisible = !0,
                $(".top-content").fadeOut(500, (function() {
                    $("footer, .prayers .name, .prayers .wait").hide(),
                    $(".random-hadith").fadeIn(500),
                    void 0 !== t && t()
                }
                )),
                setTimeout((function() {
                    r.hide()
                }
                ), 90 * i.Z.oneSecond)
            },
            hide: function() {
                r.isVisible = !1,
                $(".random-hadith").fadeOut(500, (function() {
                    $("footer, .prayers .name, .prayers .wait").show(),
                    $(".top-content").fadeIn(500)
                }
                ))
            },
            setFontSize: function() {
                (0,
                a.e6)(".random-hadith .text div")
            }
        };
        const o = r
    }
    ,
    6136: (t,e,n)=>{
        "use strict";
        n.d(e, {
            V: ()=>s,
            j: ()=>o
        });
        n(2564),
        n(9826),
        n(1539),
        n(2707);
        var a = n(9437)
          , i = n(9241)
          , r = n(5459)
          , o = {
            isShowing: !1,
            interval: null,
            sliderHtmlContent: "",
            initCronMessageInfo: function() {
                setInterval((function() {
                    if (r.Z.isPrayingMoment())
                        return !1;
                    !1 === o.isShowing && o.run()
                }
                ), 9 * r.Z.oneMinute)
            },
            run: function() {
                if ($(".sub-main").is(":visible") && !i.Z.isVisible) {
                    var t = $(".message-slider li").length;
                    if (0 !== t) {
                        var e = $(window).width();
                        $(".message-slider li").width(e);
                        var n = t * e;
                        $(".message-slider ul").css({
                            width: n
                        }),
                        o.sliderHtmlContent = $(".message-slider .messageContent").html(),
                        $(".sub-main").fadeOut(500),
                        $(".message-slider").show(),
                        o.setFontSize(),
                        $("footer .info").hide(),
                        o.isShowing = !0,
                        o.interval = setInterval((function() {
                            o.moveRight()
                        }
                        ), 1e3 * $(".message-slider li:eq(0)").data("duration")),
                        $(".flashMessage").addClass("bg-black"),
                        setTimeout((function() {
                            o.hide()
                        }
                        ), o.getTotalDuration())
                    }
                }
            },
            updateInterval: function(t) {
                clearInterval(o.interval),
                o.interval = setInterval((function() {
                    o.moveRight()
                }
                ), t)
            },
            isVisibleSlide: function(t) {
                return Math.ceil($(t).offset().left) === $(window).width()
            },
            isYoutubeSlide: function(t) {
                return 1 === $(t).find("iframe").length
            },
            postMessageToYoutubePlayer: function(t, e) {
                t.contentWindow.postMessage(JSON.stringify(e), "*")
            },
            controleYoutube: function(t, e) {
                if (void 0 !== t)
                    switch (e) {
                    case "play":
                        this.postMessageToYoutubePlayer(t, {
                            event: "command",
                            func: "playVideo"
                        }),
                        this.postMessageToYoutubePlayer(t, {
                            event: "command",
                            func: "seekTo",
                            args: [0, !0]
                        });
                        break;
                    case "stop":
                        this.postMessageToYoutubePlayer(t, {
                            event: "command",
                            func: "stopVideo"
                        })
                    }
            },
            getTotalDuration: function() {
                var t = 0;
                return $(".message-slider li").each((function(e, n) {
                    t += $(n).data("duration")
                }
                )),
                1e3 * t
            },
            hide: function() {
                o.isShowing && (clearInterval(o.interval),
                $(".message-slider").fadeOut(500, (function() {
                    $(".flashMessage").removeClass("bg-black"),
                    $(".sub-main").fadeIn(500)
                }
                )),
                $(".message-slider li").sort((function(t, e) {
                    return $(t).data("position") < $(e).data("position") ? -1 : 1
                }
                )).appendTo(".message-slider ul"),
                $("footer .info").show(),
                o.isShowing = !1)
            },
            moveRight: function() {
                var t = $(window).width();
                $(".message-slider ul").animate({
                    left: -t
                }, 200, (function() {
                    $(".message-slider li:first-child").appendTo(".message-slider ul"),
                    $(".message-slider ul").css("left", "")
                }
                )),
                $(".message-slider li").each((function(t, e) {
                    if (o.isVisibleSlide(e) && (o.updateInterval(1e3 * $(e).data("duration")),
                    o.isYoutubeSlide(e))) {
                        var n = $(e).find("iframe").get(0);
                        o.controleYoutube(n, "play")
                    }
                }
                ))
            },
            setFontSize: function() {
                $(".message-slider .text > div").each((function(t, e) {
                    (0,
                    a.e6)(e)
                }
                ))
            }
        }
          , s = {
            oneDouaaShowingTime: 2e4,
            sliderHtmlContent: "",
            init: function() {
                if (!isMobile) {
                    var t = $(window).width()
                      , e = $(".adhkar-after-prayer ul")
                      , n = e.children("li");
                    n.width(t);
                    var a = n.length * t;
                    e.css({
                        width: a
                    }),
                    this.sliderHtmlContent = $(".adhkar-after-prayer").html()
                }
            },
            show: function(t) {
                if (!r.Z.isJumua(t) || !r.Z.isMosque)
                    if (r.Z.confData.duaAfterPrayerEnabled) {
                        $("#black-screen, .main").fadeOut(500),
                        $(".adhkar-after-prayer").show(),
                        s.setFontSize();
                        var e = setInterval((function() {
                            s.moveRight()
                        }
                        ), s.oneDouaaShowingTime);
                        setTimeout((function() {
                            clearInterval(e),
                            $(".adhkar-after-prayer").fadeOut(500, (function() {
                                $(".main").fadeIn(500)
                            }
                            )),
                            setTimeout((function() {
                                o.run()
                            }
                            ), 120 * r.Z.oneSecond)
                        }
                        ), s.getTimeForShow())
                    } else
                        $("#black-screen").fadeOut(500, (function() {
                            $(".main").fadeIn(500)
                        }
                        )),
                        setTimeout((function() {
                            o.run()
                        }
                        ), 2 * r.Z.oneMinute)
            },
            getTimeForShow: function() {
                return $(".adhkar-after-prayer li").length * s.oneDouaaShowingTime
            },
            moveRight: function() {
                var t = $(window).width()
                  , e = $(".adhkar-after-prayer ul");
                e.not(":animated").prepend($("li:last-child", e)).css({
                    left: -t
                }).animate({
                    left: 0
                }, 200)
            },
            setFontSize: function() {
                $(".duaa li > div").each((function(t, e) {
                    (0,
                    a.e6)(e)
                }
                ))
            }
        }
    }
    ,
    9156: (t,e,n)=>{
        "use strict";
        n.d(e, {
            FL: ()=>r,
            Px: ()=>o
        });
        n(3710);
        var a = n(9437);
        function i(t, e) {
            return (t % e + e) % e
        }
        function r(t) {
            var e = new Date;
            if (t) {
                var n = 864e5 * t
                  , a = e.getTime() + n;
                e = new Date(a)
            }
            var r = e.getDate()
              , o = e.getMonth()
              , s = e.getFullYear()
              , u = o + 1
              , d = s;
            u < 3 && (d -= 1,
            u += 12);
            var c = Math.floor(d / 100)
              , h = 2 - c + Math.floor(c / 4);
            d < 1583 && (h = 0),
            1582 == d && (u > 10 && (h = -10),
            10 == u && (h = 0,
            r > 4 && (h = -10)));
            var f = Math.floor(365.25 * (d + 4716)) + Math.floor(30.6001 * (u + 1)) + r + h - 1524;
            h = 0,
            f > 2299160 && (h = 1 + (c = Math.floor((f - 1867216.25) / 36524.25)) - Math.floor(c / 4));
            var l = f + h + 1524
              , m = Math.floor((l - 122.1) / 365.25)
              , g = Math.floor(365.25 * m)
              , v = Math.floor((l - g) / 30.6001);
            r = l - g - Math.floor(30.6001 * v),
            o = v - 1,
            v > 13 && (m += 1,
            o = v - 13),
            s = m - 4716;
            var p = null;
            p = t ? i(f + 1 - t, 7) + 1 : i(f + 1, 7) + 1;
            var w = 10631 / 30
              , D = .1335
              , y = f - 1948084
              , T = Math.floor(y / 10631);
            y -= 10631 * T;
            var $ = Math.floor((y - D) / w)
              , M = 30 * T + $;
            y -= Math.floor($ * w + D);
            var S = Math.floor((y + 28.5001) / 29.5);
            13 == S && (S = 12);
            var C = y - Math.floor(29.5001 * S - 29)
              , I = new Array(8);
            return I[0] = r,
            I[1] = o - 1,
            I[2] = s,
            I[3] = f - 1,
            I[4] = p - 1,
            I[5] = C,
            I[6] = S - 1,
            I[7] = M,
            I
        }
        function o(t, e) {
            var n = ["Muharam", "Safar", "Rabīʿ al-awwal", "Rabīʿ ath-thānī", "Jumādá al-ūlá", "Jumādá al-ākhirah", "Rajab", "Shaʿabān", "Ramaḍān", "Shawwāl", "Dhū al-Qaʿdah", "Dhū al-Ḥijjah"];
            if ("ar" === e) {
                var i = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
                n = ["محرم", "صفر", "ربيع الأول", "ربيع الثاني", "جمادى الأولى", "جمادى الثانية", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"]
            }
            var o = r(t.hijriAdjustment)
              , s = o[5];
            t.hijriDateForceTo30 && (s = 30);
            var u = (0,
            a.vL)(s) + " " + n[o[6]] + " " + o[7];
            return "ar" === e && (u = i[o[4]] + " " + (0,
            a.vL)(s) + " " + n[o[6]] + " " + o[7]),
            u
        }
    }
    ,
    8637: (t,e,n)=>{
        var a, i, r;
        n(3710),
        n(4916),
        n(4723),
        n(9653),
        n(5306),
        n(1539),
        n(9714),
        n(4603),
        n(3123),
        n(9600),
        n(2564),
        n(7042),
        function(o) {
            "use strict";
            i = [n(5311)],
            a = function(t) {
                function e(t) {
                    if (t instanceof Date)
                        return t;
                    if (String(t).match(o))
                        return String(t).match(/^[0-9]*$/) && (t = Number(t)),
                        String(t).match(/\-/) && (t = String(t).replace(/\-/g, "/")),
                        new Date(t);
                    throw new Error("Couldn't cast `" + t + "` to a date object.")
                }
                function n(t) {
                    var e = t.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
                    return new RegExp(e)
                }
                function a(t) {
                    return function(e) {
                        var a = e.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
                        if (a)
                            for (var r = 0, o = a.length; r < o; ++r) {
                                var s = a[r].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/)
                                  , d = n(s[0])
                                  , c = s[1] || ""
                                  , h = s[3] || ""
                                  , f = null;
                                s = s[2],
                                u.hasOwnProperty(s) && (f = u[s],
                                f = Number(t[f])),
                                null !== f && ("!" === c && (f = i(h, f)),
                                "" === c && f < 10 && (f = "0" + f.toString()),
                                e = e.replace(d, f.toString()))
                            }
                        return e.replace(/%%/, "%")
                    }
                }
                function i(t, e) {
                    var n = "s"
                      , a = "";
                    return t && (1 === (t = t.replace(/(:|;|\s)/gi, "").split(/\,/)).length ? n = t[0] : (a = t[0],
                    n = t[1])),
                    Math.abs(e) > 1 ? n : a
                }
                var r = []
                  , o = []
                  , s = {
                    precision: 100,
                    elapse: !1,
                    defer: !1
                };
                o.push(/^[0-9]*$/.source),
                o.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),
                o.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),
                o = new RegExp(o.join("|"));
                var u = {
                    Y: "years",
                    m: "months",
                    n: "daysToMonth",
                    d: "daysToWeek",
                    w: "weeks",
                    W: "weeksToMonth",
                    H: "hours",
                    M: "minutes",
                    S: "seconds",
                    D: "totalDays",
                    I: "totalHours",
                    N: "totalMinutes",
                    T: "totalSeconds"
                }
                  , d = function(e, n, a) {
                    this.el = e,
                    this.$el = t(e),
                    this.interval = null,
                    this.offset = {},
                    this.options = t.extend({}, s),
                    this.instanceNumber = r.length,
                    r.push(this),
                    this.$el.data("countdown-instance", this.instanceNumber),
                    a && ("function" == typeof a ? (this.$el.on("update.countdown", a),
                    this.$el.on("stoped.countdown", a),
                    this.$el.on("finish.countdown", a)) : this.options = t.extend({}, s, a)),
                    this.setFinalDate(n),
                    !1 === this.options.defer && this.start()
                };
                t.extend(d.prototype, {
                    start: function() {
                        null !== this.interval && clearInterval(this.interval);
                        var t = this;
                        this.update(),
                        this.interval = setInterval((function() {
                            t.update.call(t)
                        }
                        ), this.options.precision)
                    },
                    stop: function() {
                        clearInterval(this.interval),
                        this.interval = null,
                        this.dispatchEvent("stoped")
                    },
                    toggle: function() {
                        this.interval ? this.stop() : this.start()
                    },
                    pause: function() {
                        this.stop()
                    },
                    resume: function() {
                        this.start()
                    },
                    remove: function() {
                        this.stop.call(this),
                        r[this.instanceNumber] = null,
                        delete this.$el.data().countdownInstance
                    },
                    setFinalDate: function(t) {
                        this.finalDate = e(t)
                    },
                    update: function() {
                        if (0 !== this.$el.closest("html").length) {
                            var e, n = void 0 !== t._data(this.el, "events"), a = new Date;
                            e = this.finalDate.getTime() - a.getTime(),
                            e = Math.ceil(e / 1e3),
                            e = !this.options.elapse && e < 0 ? 0 : Math.abs(e),
                            this.totalSecsLeft !== e && n && (this.totalSecsLeft = e,
                            this.elapsed = a >= this.finalDate,
                            this.offset = {
                                seconds: this.totalSecsLeft % 60,
                                minutes: Math.floor(this.totalSecsLeft / 60) % 60,
                                hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                                days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                                daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                                daysToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 % 30.4368),
                                weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                                weeksToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7) % 4,
                                months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
                                years: Math.abs(this.finalDate.getFullYear() - a.getFullYear()),
                                totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                                totalHours: Math.floor(this.totalSecsLeft / 60 / 60),
                                totalMinutes: Math.floor(this.totalSecsLeft / 60),
                                totalSeconds: this.totalSecsLeft
                            },
                            this.options.elapse || 0 !== this.totalSecsLeft ? this.dispatchEvent("update") : (this.stop(),
                            this.dispatchEvent("finish")))
                        } else
                            this.remove()
                    },
                    dispatchEvent: function(e) {
                        var n = t.Event(e + ".countdown");
                        n.finalDate = this.finalDate,
                        n.elapsed = this.elapsed,
                        n.offset = t.extend({}, this.offset),
                        n.strftime = a(this.offset),
                        this.$el.trigger(n)
                    }
                }),
                t.fn.countdown = function() {
                    var e = Array.prototype.slice.call(arguments, 0);
                    return this.each((function() {
                        var n = t(this).data("countdown-instance");
                        if (void 0 !== n) {
                            var a = r[n]
                              , i = e[0];
                            d.prototype.hasOwnProperty(i) ? a[i].apply(a, e.slice(1)) : null === String(i).match(/^[$A-Z_][0-9A-Z_$]*$/i) ? (a.setFinalDate.call(a, i),
                            a.start()) : t.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, i))
                        } else
                            new d(this,e[0],e[1])
                    }
                    ))
                }
            }
            ,
            void 0 === (r = "function" == typeof a ? a.apply(e, i) : a) || (t.exports = r)
        }()
    }
    ,
    4964: (t,e,n)=>{
        var a = n(5112)("match");
        t.exports = function(t) {
            var e = /./;
            try {
                "/./"[t](e)
            } catch (n) {
                try {
                    return e[a] = !1,
                    "/./"[t](e)
                } catch (t) {}
            }
            return !1
        }
    }
    ,
    3929: (t,e,n)=>{
        var a = n(7850)
          , i = TypeError;
        t.exports = function(t) {
            if (a(t))
                throw i("The method doesn't accept regular expressions");
            return t
        }
    }
    ,
    6699: (t,e,n)=>{
        "use strict";
        var a = n(2109)
          , i = n(1318).includes
          , r = n(7293)
          , o = n(1223);
        a({
            target: "Array",
            proto: !0,
            forced: r((function() {
                return !Array(1).includes()
            }
            ))
        }, {
            includes: function(t) {
                return i(this, t, arguments.length > 1 ? arguments[1] : void 0)
            }
        }),
        o("includes")
    }
    ,
    9653: (t,e,n)=>{
        "use strict";
        var a = n(9781)
          , i = n(7854)
          , r = n(1702)
          , o = n(4705)
          , s = n(8052)
          , u = n(2597)
          , d = n(9587)
          , c = n(7976)
          , h = n(2190)
          , f = n(7593)
          , l = n(7293)
          , m = n(8006).f
          , g = n(1236).f
          , v = n(3070).f
          , p = n(863)
          , w = n(3111).trim
          , D = "Number"
          , y = i[D]
          , T = y.prototype
          , $ = i.TypeError
          , M = r("".slice)
          , S = r("".charCodeAt)
          , C = function(t) {
            var e = f(t, "number");
            return "bigint" == typeof e ? e : I(e)
        }
          , I = function(t) {
            var e, n, a, i, r, o, s, u, d = f(t, "number");
            if (h(d))
                throw $("Cannot convert a Symbol value to a number");
            if ("string" == typeof d && d.length > 2)
                if (d = w(d),
                43 === (e = S(d, 0)) || 45 === e) {
                    if (88 === (n = S(d, 2)) || 120 === n)
                        return NaN
                } else if (48 === e) {
                    switch (S(d, 1)) {
                    case 66:
                    case 98:
                        a = 2,
                        i = 49;
                        break;
                    case 79:
                    case 111:
                        a = 8,
                        i = 55;
                        break;
                    default:
                        return +d
                    }
                    for (o = (r = M(d, 2)).length,
                    s = 0; s < o; s++)
                        if ((u = S(r, s)) < 48 || u > i)
                            return NaN;
                    return parseInt(r, a)
                }
            return +d
        };
        if (o(D, !y(" 0o1") || !y("0b1") || y("+0x1"))) {
            for (var b, x = function(t) {
                var e = arguments.length < 1 ? 0 : y(C(t))
                  , n = this;
                return c(T, n) && l((function() {
                    p(n)
                }
                )) ? d(Object(e), n, x) : e
            }, F = a ? m(y) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","), A = 0; F.length > A; A++)
                u(y, b = F[A]) && !u(x, b) && v(x, b, g(y, b));
            x.prototype = T,
            T.constructor = x,
            s(i, D, x, {
                constructor: !0
            })
        }
    }
    ,
    2023: (t,e,n)=>{
        "use strict";
        var a = n(2109)
          , i = n(1702)
          , r = n(3929)
          , o = n(4488)
          , s = n(1340)
          , u = n(4964)
          , d = i("".indexOf);
        a({
            target: "String",
            proto: !0,
            forced: !u("includes")
        }, {
            includes: function(t) {
                return !!~d(s(o(this)), s(r(t)), arguments.length > 1 ? arguments[1] : void 0)
            }
        })
    }
}]);
