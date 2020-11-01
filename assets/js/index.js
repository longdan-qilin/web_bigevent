//入口函数
$(function () {
    getuserinfo()
})

// 获取用户信息 通过ajax
function getuserinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers  请求头配置
        headers: {
            Authorization : localStorage.getItem('token') || ''
        },
        success: function (res) { 
            console.log(res);
        }
    })
}

