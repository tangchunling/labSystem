(function($) {
  'use strict';

  $(function() {
    var $fullText = $('.admin-fullText');
    $('#admin-fullscreen').on('click', function() {
      $.AMUI.fullscreen.toggle();
    });

    $(document).on($.AMUI.fullscreen.raw.fullscreenchange, function() {
      $fullText.text($.AMUI.fullscreen.isFullscreen ? '退出全屏' : '开启全屏');
    });
  });
})(jQuery);

(function () {
    var socket = io.connect('http://wx.d1ty.com/sioProxy/yhpStore');
    socket.on('connect', function () {
        socket.emit('clientid', { clientid: 394 });
    });
    socket.on('message', function (data) {
        document.getElementById("newmsg").play();
    });
})();

function AjaxTool(url, params, callback, errorcallbak) {
    $.ajax(url, {
        data: params,
        async: true,
        dataType: 'json', //服务器返回json格式数据
        type: 'post', //HTTP请求类型
        timeout: 15000, //超时时间设置为10秒；
        success: function (data) {
            if (typeof (data) == "string") {
                data = JSON.parse(data);
            }
            if (callback) {
                callback(data);
            }
        },
        error: function (xhr, type, errorThrown) {
            if (errorcallbak) {
                errorcallbak();
            }
            console.log("异步数据出错！");
        }
    });
}