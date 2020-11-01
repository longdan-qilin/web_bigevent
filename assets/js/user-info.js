$(function () {
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称必须在 1 ~ 6 个字符之间';
            }
        }
    });
});