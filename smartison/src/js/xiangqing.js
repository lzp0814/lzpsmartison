$(function() {
    var id = location.search.split('=')[1];
    $.ajax({
        type: "get",
        url: "../php/getAproduct.php",
        data: {
            id: id
        },
        dataType: "JSON",
        success: function(res) {
            // 回调函数里面写dom操作代码
            console.log(res);
            var src = JSON.parse(res.src);
            console.log(src[0].src);
            $('#p-title').text(res.title);
            $('.p-prices').text(res.prices);
            $('.p-img').attr('src', src[0].src);
            // 计算总价
            var num = Number($('.num').html())
            var sum = Number($('.bar - price span').html())
            $('.up').on('click', function() {

                num += 1
                $('.num').html(num)
                $('.down').removeClass('disabled')
                sum = num * res.prices;
                $('.bar-price span').html(sum)

            })
            $('.down').on('click', function() {
                num -= 1
                if (num <= 1) {
                    num = 1
                }
                if (num <= 1) {
                    $('.down').addClass('disabled')
                }
                $('.num').html(num)
                sum = num * res.prices
                $('.bar-price span').html(sum)
            });

            // cookie
            $('#addCar').click(function() {
                var shopStep = {
                        id: id,
                        num: num
                    },
                    shop = cookie.get('shop');
                if (!shop) {
                    shop = [];
                } else {
                    shop = JSON.parse(shop);
                    shop = shop.filter((elm) => id != elm.id);
                }
                shop.push(shopStep);
                shop = JSON.stringify(shop);
                cookie.set('shop', shop);
                alert('加入购物车成功');
                location.href = "smartisan-shaoopcar.html";
            });

        }
    });




})