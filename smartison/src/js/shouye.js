$(function() {
    $.ajax({
        type: "get",
        url: "../php/pro_list.php",
        dataType: "JSON",
        success: function(res) {
            console.log(res)
            res.forEach((elm, i) => {
                var src = JSON.parse(elm.src);
                console.log(elm.id)
                console.log(src[0].src);
                var stepLi = `
                    <li class="main-main-li">
                        <a href="smartisan-xiangqing.html?id=${elm.id}">
                        <div class="main-main-wai">
                                <div class="img-border"><img src="${src[0].src}" alt="坚果r1"></div>
                                <h4>${elm.title}</h4>
                                <h6>1848 年 5 月 23 日</h6>
                                <div class="params-colors">
                                    <ul class="colors-list">
                                        <li>
                                            <div>
                                                <img src="../images/origin.png" alt="">

                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <img src="../images/origin (1).png" alt="">
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <img src="../images/origin (2).png" alt="">
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <img src="../images/origin (3).png" alt="">
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="item-price">
                                    <span class="item-price-1">
                                    <i>￥</i>
                                    <span>${elm.prices}</span>
                                    </span>
                                    <button id="btn">查看详情</button>
                                </div>
                            </div>
                            </a>
                        </li>
                `;
                $('#sjk').append(stepLi);
            });

        }
    });
    //吸顶导航
    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            $('.nav-sub-border').addClass('fixed')
            $('.sousuo').addClass('nomo')
            $('.nav-sub-wrapper>ul>li').html()
        } else {
            $('.nav-sub-border').removeClass('fixed')
            $('.sousuo').removeClass('nomo')
        }
    });


    //轮播图
    var index = 0;
    var timer = null;
    auto()
        //设置鼠标滑过悬停离开启动
    $(".banner").hover(function() {
            clearInterval(timer)
        },
        function() {
            auto()
        }

    )


    function auto() {
        timer = setInterval(function() {
            index++;
            if (index > 2) {
                index = 0;
            }
            $(".banner>a").eq(index).addClass("hover").siblings().removeClass("hover");

        }, 2000);
    }


    //热门商品按钮

    $('.main-main-btn>a').eq(1).on('click', function() {
        $('.main-main-rolling').css({
            'margin-left': '-1220px'
        })
        $(this).addClass('desable').siblings().removeClass("desable");
        return false;
    })
    $('.main-main-btn>a').eq(0).on('click', function() {
        $('.main-main-rolling').css({
            'margin-left': '0'
        })
        $(this).addClass('desable').siblings().removeClass("desable");
        return false;
    })

});