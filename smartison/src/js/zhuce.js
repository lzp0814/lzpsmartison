$(function() {

    $('.checkbox').on('click', function() {
            $('.checkbox').toggleClass('checked')
        })
        // $('.input').on('click', function() {


    // })
    // console.log($('#register'))
    $('.btn-wrapper .btn').on('click', function(e) {
        let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
        let passwordReg = /\w{6,16}/;
        let num = 0;
        if (phoneReg.test($('#phone').val())) {
            num++;
        } else {
            alert('手机号填写有误');
            return;
        }
        if (passwordReg.test($('#password').val())) {
            num++;
        } else {
            alert('密码填写有误');
            return;
        }
        if ($('#password').val() == $('#password2').val()) {
            num++;
        } else {
            alert('密码不一致');
            return;
        }
        if (num != 3) return;
        console.log($('#phone').val())
        console.log($('#password').val())
        $.ajax({
            type: "get",
            url: "../php/register.php",
            data: {
                "phone": $('#phone').val(),
                "password": $('#password').val()
            },
            dataType: "JSON",
            success: function(res) {
                if (res.err) {
                    alert(res.msg);
                } else {
                    alert(res.msg);
                    location.href = "smartisan.html";
                }

            },
            error: function(xhr) {
                console.log(xhr);
            }
        });
        e.preventDefault();
    })
})