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

    // 自定义校验规则
    // 通过layui  获取form对象
    let form = layui.form
    // 通过form.vairfy()函数 自定义校验规则
    form.verify({
        // 未加英文 因此添加因为只给你算空格 必须是数字才可以
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 通过形参拿到的是确认密码框中的内容
        // 还需要拿到密码框中的内容
        // 然后进行一次等于的判断
        // 如果判断失败，则 return 一个提示消息即可
        repwd: function (value) {
            let pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) return '两次输入的密码不一致！'
        }
    })

    // 注册功能, 监听注册表单提交事件
    $('#form-reg').on('submit', function (e) {
        // 阻止表单默认提交行为
        e.preventDefault()
        // 提取表单数据
        let data = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val()
        }
        // 通过post 提交数据 请求服务器
        $.post('http://ajax.frontend.itheima.net/api/reguser',
            data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg('注册失败！', res.message);
                }
                layer.msg('注册成功,请登录！');
                // 注册触发点击登录事件
                $('#link_login').click()
            }
        )
    })

    // 登录功能, 监听登录表单提交事件
    $('#form-login').on('submit', function (e) {
        // 阻止表单默认提交行为
        e.preventDefault()
        // 获取表单的提交信息 $(this).serialize()
        console.log($(this).serialize());
        // 通过ajax发送请求
        $.ajax({
            method: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    // layer.msg layui框架 独特提示框的方法
                    return layer.msg('登录失败！')
                }
                layer.msg('登陆成功')
                // 存储
                localStorage.setItem('token', res.token)
                // 跳转到index 主页
                location.href = "/index.html"
            }
        })
    })
}) 