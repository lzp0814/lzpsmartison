$(function() {
    $('.checkbox').on('click', function() {
        $('.checkbox').toggleClass('checked')
    });

    $('#login').click(function(e) {
        $.ajax({
            type: "get",
            url: "../php/login.php",
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
            }
        });
        e.preventDefault();
    })

})