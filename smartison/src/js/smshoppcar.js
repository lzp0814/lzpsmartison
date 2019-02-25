$(function() {
    // 读取cookie
    var shop = cookie.get("shop");

    shop = JSON.parse(shop);

    var id_list = shop.map(elm => elm.id).join();
    // [{id:3,…}, {id:4,…}] .map   elm elm.id=>[3,4]
    // [3, 4].jion === > '3,4'
    $.ajax({
        type: "get",
        url: "../php/getSomeProduct.php",
        data: {
            "idlist": id_list
        },
        dataType: "JSON",
        success: function(res) {
            // 在回调函数里面做dom操作---》前提：通过数据
            // 1. 遍历数组--》数据的dom操作
            res.forEach((elm, i) => {
                var src = JSON.parse(elm.src)
                var shop2 = shop.filter(val => val.id == elm.id);
                var p_num = shop2[0].num;
                var temDiv = `
                    <div _ngcontent-c5="" class="cart-group" id="pro-${elm.id}">
                    <div _ngcontent-c5="">
                        <div _ngcontent-c5="" class="cart-items">
                            <new-cart-item _ngcontent-c5="" _nghost-c6="">
                                <div _ngcontent-c6="" class="cart-item">
                                    <div _ngcontent-c6="" class="checkbox-container">
                                        <ui-checkbox _ngcontent-c6="" _nghost-c7="">
                                            <span _ngcontent-c7="" class="m-blue-checkbox-new checkbox-on "> </span>
                                        </ui-checkbox>
                                    </div>
                                    <div _ngcontent-c6="" class="item-wrapper">
                                        <div _ngcontent-c6="" class="items-thumb">
                                            <img _ngcontent-c6="" height="80" width="80" src="${src[0].src}" alt="${elm.title}">
                                            <a _ngcontent-c6="" target="_blank" title="${elm.title}" href="/item/100048801"></a>
                                        </div>
                                        <div _ngcontent-c6="" class="name hide-row">
                                            <div _ngcontent-c6="" class="name-table {'package': !!item.isPackage}" ngclass="{'package': !!item.isPackage}">
                                                <a _ngcontent-c6="" target="_blank" title="${elm.title}" href="/item/100048801">${elm.title}</a>
                                                <ul _ngcontent-c6="" class="attribute clearfix">
                                                    <li _ngcontent-c6="">滑翔机</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div _ngcontent-c6="" class="operation">
                                            <a _ngcontent-c6="" class="items-delete-btn"></a>
                                        </div>
                                        <div _ngcontent-c6="">
                                            <div _ngcontent-c6="" class="subtotal"><i>¥</i> <span class="p-sum">${(elm.prices*p_num).toFixed(2)}</span></div>
                                            <div _ngcontent-c6="" class="item-cols-num">
                                                <cart-quantity _ngcontent-c6="" _nghost-c12="">
                                                    <div _ngcontent-c12="" class="quantity"> <span _ngcontent-c12="" class="button down disabled jian">-</span>
                                                        <span _ngcontent-c12="" class="num">
                                                        <input _ngcontent-c12="" name="" readonly="readonly" type="number" class="ng-untouched ng-pristine ng-valid p-num" value="${p_num}"> 
                                                        </span> <span _ngcontent-c12="" class="button up jia">+</span>
                                                    </div>
                                                </cart-quantity>
                                            </div>
                                            <div _ngcontent-c6="" class="price"><i>¥</i> <span id="p_prices">${elm.prices}</span></div>
                                        </div>
                                    </div>
                                </div>
                            </new-cart-item>
                        </div>
                    </div>
                    <div _ngcontent-c5="" class="gifts"></div>
                    <div _ngcontent-c5="" class="gifts"></div>
                </div>`;
                $('#father').append(temDiv);
            });
            // 2.功能的完善==》完善数据的动态变化

            // .cart-group是每一个产品最大的盒子
            // 2.1加减数量计价操作
            $('.m-blue-checkbox-new').on('click', function() {
                $(this).toggleClass('checkbox-on');
            })

            $('.items-delete-btn').on('click', function() {
                var id = $(this).parents('.cart-group')[0].id.split('-')[1];
                console.log(id)
                shop = shop.filter(elms => elms.id != id);
                cookie.set('shop', JSON.stringify(shop));
                $(this).parents(".cart-group").remove();
                jisuan();
            })

            $('.quantity >.jia').on('click', function() {

                let num = Number($(this).parents('.cart-group').find('.num>input').val());
                $(this).parents('.cart-group').find('.num > input').val(++num);
                $(this).parents('.cart-group').find('.quantity >.button').eq(0).removeClass('disabled').css({
                    'background-position': '0 -60px'
                })
                let sum = (num * $(this).parents('.cart-group').find('#p_prices').text()).toFixed(2);
                $(this).parents('.cart-group').find('.subtotal > span').html(sum)
                jisuan();
            })
            $('.quantity >.jian').on('click', function() {
                let num = Number($(this).parents('.cart-group').find('.num>input').val());
                if (num <= 1) {
                    num = 2
                }
                $(this).parents('.cart-group').find('.num > input').val(--num)
                let sum = (num * $(this).parents('.cart-group').find('#p_prices').text()).toFixed(2);
                $(this).parents('.cart-group').find('.subtotal > span').html(sum)
                    // $('.shipping-num i').html(num)
                    // $('.shipping-price i').html(sum)
                if (num == 1) {
                    $('.quantity >.button').eq(0).addClass('disabled').css({
                        'background-position': '-1px -299px'
                    })
                }
                jisuan();
            });
            // 2.2全选的复选按钮的功能
            $('.m-blue-checkbox-new').last().click(function() {
                if ($(this).hasClass('checkbox-on')) {
                    $('.m-blue-checkbox-new').addClass('checkbox-on');
                } else {
                    $('.m-blue-checkbox-new').removeClass('checkbox-on');
                }
            });

            jisuan();
            $('.m-blue-checkbox-new').click(jisuan);

            function jisuan() {
                var gj = 0,
                    yxz = 0,
                    yf = 0;
                Array.from($('.p-num')).forEach((elm) => {
                    gj += Number($(elm).val());
                });
                Array.from($('.checkbox-on:not(:last)').parents('.cart-group').find('.p-num')).forEach((elm) => {
                    yxz += Number($(elm).val());
                });
                Array.from($('.checkbox-on:not(:last)').parents('.cart-group').find('.p-sum')).forEach((elm) => {
                    yf += Number($(elm).text());
                });

                $('#yxz').text(yxz);
                $('#gj').text(gj);
                $('#yf').text(yf);
            }
        }
    });









})