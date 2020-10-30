$(function () {
    // 去注册
    $('#link_reg').on('click', function () {
        // 登录框隐藏
        $('.login-box').hide()
        // 注册框显示
        $('.reg-box').show()
    })
    // 去登录
    $('#link_login').on('click', function () {
        // 登录框显示
        $('.login-box').show()
        // 注册框隐藏
        $('.reg-box').hide()
    })
}) 