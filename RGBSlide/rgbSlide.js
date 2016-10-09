(function ($) {
    $.fn.rgbslide = function (slideInterval) {
        var numSlides = 0;
        $(this).children().each(function () {
            numSlides++;
            $(this).prop("class", "sliderBox");
            $(this).prop("id", "sl" + numSlides);
        });

        slideInterval = slideInterval || 3300;
        $("head").prepend('<style>.sliderBox{background-color:#222;z-index:-1;margin:0;position:absolute;left:0;top:0;width:100%;height:80vh;}'
            + '#sliderControl{padding:0;text-align:center;z-index:100;height:22px;width:100%;position:absolute;left:0;bottom:0;background:rgba(0,0,0,0.4)}'
            + '.sliderBull{transition:color 0.2s;cursor:pointer;highlight:none;color:#aaa;padding-left:4px;padding-right:4px;margin:0;text-align:center;display:inline;font-size:37px;position:relative;top:-16px;}'
            + '.sliderArr{transition:background 0.2s;z-index:100;position:absolute;top:32vh;bottom:48vh;width:50px;height:50px;padding:8px;background:rgba(0,0,0,0.05);border-radius:0px 5px 5px 0px;cursor:pointer;}'
            + '.sliderArr:hover{background:rgba(0,0,0,0.4)}'
            + 'body{overflow-x:hidden}'
            + '#' + $(this).prop("id") + '{margin: 0; background: #ddd; width: 100vw;height: 80vh;overflow: hidden; position: relative;font-family: "Quicksand","Segoe UI", Tahoma, Geneva, Verdana, sans-serif"; color:#eee}'
            + '</style>'
            + '<link href="https://fonts.googleapis.com/css?family=Quicksand:300" rel="stylesheet"> ');
        $(this).append('<div id="sliderControl"></div>');
        $(this).append('<img class="sliderArr" id="sliderLeft" style="left:-5px;" src="http://i.imgur.com/5aJOioi.png"/>');
        $(this).append('<img class="sliderArr" style="transform:rotate(180deg);right:-5px;" id="sliderRight" src="http://i.imgur.com/5aJOioi.png"/>');
        for (i = 1; i <= numSlides; i++) {
            $("#sliderControl").append('<p class="sliderBull" id="sb' + i + '"> &bull; </p>');
        };

        $("#sliderControl").hover(function () {
            sliding = !sliding;
        });
        $(".sliderArr").hover(function () {
            sliding = !sliding;
        });

        var sliding = true,
            slideNum = 1,
            bullNumm,
            justChanged = false;

        $("#sl1").css("z-index", "1");
        $("#sb1").css("color", "#fff");

        $("#sliderLeft").click(function () {
            $(".sliderBox").css("z-index", "0");
            $(".sliderBox").css("left", "0");
            $(".sliderBull").css("color", "#aaa");

            slideNum--;
            if (slideNum == 0) {
                slideNum = numSlides;
            }

            if (slideNum == numSlides) {
                $("#sl1").css("z-index", "1");
                $("#sl" + numSlides).css("z-index", "2");
                $("#sl" + numSlides).css("left", "-100%");
                $("#sl" + numSlides).animate({ left: "0" }, 500);
                $("#sb" + numSlides).css("color", "#fff");
            } else {
                $("#sl" + (slideNum + 1)).css("z-index", "1");
                $("#sl" + slideNum).css("z-index", "2");
                $("#sl" + slideNum).css("left", "-100%" );
                $("#sl" + slideNum).animate({ left: "0" }, 500);
                $("#sb" + slideNum).css("color", "#fff");
            };
            justChanged = true;
            window.setTimeout(function () {
                justChanged = false;
            }, slideInterval);
        });
        $("#sliderRight").click(function () {
            $(".sliderBox").css("z-index", "0");
            $(".sliderBox").css("left", "0");
            $(".sliderBull").css("color", "#aaa");

            if (slideNum == numSlides) {
                slideNum = 0;
            }
            slideNum++;

            if (slideNum == 1) {
                $("#sl" + numSlides).css("z-index", "2");
                $("#sl1").css("z-index", "1");
                $("#sl" + numSlides).animate({ left: "-100%" }, 500);
                $("#sb1").css("color", "#fff");
            } else {
                $("#sl" + (slideNum - 1)).css("z-index", "2");
                $("#sl" + slideNum).css("z-index", "1");
                $("#sl" + (slideNum - 1)).animate({ left: "-100%" }, 500);
                $("#sb" + slideNum).css("color", "#fff");
            };
            justChanged = true;
            window.setTimeout(function () {
                justChanged = false;
            }, slideInterval);
        });

        $(".sliderBull").click(function () {
            bullNum = parseInt($(this).prop("id").replace("sb", ""));
            if (bullNum != slideNum - 1) {
                $(".sliderBull").css("color", "#aaa");
                $($(this)).css("color", "#fff");
                $(".sliderBox").css("left", "0");

                for (var i = 1; i <= numSlides; i++) {
                    if ($("#sl" + i).css("z-index") == "1") {
                        var currSl = $("#sl" + i);
                        break;
                    };
                };

                $(".sliderBox").css("z-index", "0");
                currSl.css("z-index", "2");
                $("#sl" + bullNum).css("z-index", "1");
                currSl.animate({ left: "-100%" }, 500);

                if (bullNum == numSlides) {
                    slideNum = 0;
                } else {
                    slideNum = bullNum;
                }

                justChanged = true;
                window.setTimeout(function () {
                    justChanged = false;
                },slideInterval)
            };
        });
        window.setInterval(function () {
            if (sliding && !justChanged) {

                if (slideNum == numSlides) {
                    slideNum = 0;
                };

                slideNum++;

                $(".sliderBox").css("z-index", "0");
                $(".sliderBox").css("left", "0");
                $(".sliderBull").css("color", "#aaa");

                if (slideNum == 1) {
                    $("#sl" + numSlides).css("z-index", "2");
                    $("#sl1").css("z-index", "1");
                    $("#sl" + numSlides).animate({ left: "-100%" }, 500);
                    $("#sb1").css("color", "#fff");
                } else {
                    $("#sl" + (slideNum - 1)).css("z-index", "2");
                    $("#sl" + slideNum).css("z-index", "1");
                    $("#sl" + (slideNum - 1)).animate({ left: "-100%" }, 500);
                    $("#sb" + slideNum).css("color", "#fff");
                }
            };
        }, slideInterval);

        return this;
    };
}(jQuery));

//  Made with ♥ by RGBPlaza © 2016