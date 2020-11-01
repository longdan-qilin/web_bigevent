//入口函数
$(function () {
     // 获取用户的的基本信息
    getuserinfo()

    // 退出功能
    let layer = layui.layer 
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            // 1. 清空本地 token
            localStorage.removeItem('token');
            // 2. 跳转到登录页
            location.href = '/login.html';
            // 3. 关闭确认框
            layer.close(index);
        });
    }); 
})

// 获取用户信息 通过ajax
function getuserinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers  请求头配置
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 获取成功  调用 渲染页面 函数 renderuser（）
            renderuser(res.data)
        }
    })
}

// 通过获取的数据 渲染头像页面
function renderuser(user) {
    // 获取用户的名称
    let name = user.usernike || user.username
    // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 获取用户头像 （如果用户有头像显示头像，否则显示用户的名称第一字大写 文字头像）
    if (user.user_pic !== null) {
        // 显示用户头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        // 文字头像隐藏
        $('.tetx-avatar').hide()
    } else {
        // 隐藏用户头像
        $('.layui-nav-img').hide()
        // 文字头像显示
        let first = name[0].toUppercase
        $('.tetx-avatar').html(first).show()
    }
}

