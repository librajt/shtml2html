window.TEMPLATES = {
    home: {
        list: [
            '<% _.each(list, function(data) { %>',
            '<div class="sell">',
                '<a href="#3" class="main">',
                    '<div class="pic"><div class="img"><img src="http://placehold.it/200x200&amp;text=." alt=""></div></div>',
                    '<div class="name">',
                        '<h4>正品新款格子大码针织连衣裙针织连衣裙</h4>',
                    '</div>',
                    '<div class="price">',
                        '<div class="status discount">批发<b>￥1236</b></div>',
                        '<div class="status whole">零售<b>￥836</b></div>',
                    '</div>',
                '</a>',
            '</div>',
            '<% } %>',
            ].join('')
    },
    category: {
        list: [
            '<% _.each(list, function(data) { %>',
            '<div class="sell">',
                '<a href="#3" class="main">',
                    '<div class="pic pic_cover"><div class="img"><img src="http://placehold.it/200x200&amp;text=." alt=""></div></div>',
                    '<div class="name">',
                        '<h4>正品新款格子大码针织连衣裙针织连衣裙</h4>',
                    '</div>',
                    '<div class="price">',
                        '<div class="status discount">批发<b>￥1236</b></div>',
                        '<div class="status whole">零售<b>￥836</b></div>',
                    '</div>',
                '</a>',
            '</div>',
            '<% } %>',
            ].join('')
    },
    orders: {
        list: [
            '<% _.each(list, function(data) { %>',
            '<div class="order">',
                '<a href="#3" class="main">',
                    '<div class="name"><h4>正品新款格子大码针织连衣裙</h4></div>',
                    '<div class="pic pic_cover"><div class="img"><img src="http://placehold.it/160x210/AAAAAA/&amp;text=." alt=""></div></div>',
                    '<div class="date">2014/1/15</div>',
                    '<div class="count">购买数：<b>2</b></div>',
                    '<div class="sid">商品号：<b>87164</b></div>',
                    '<div class="price">共支付：<b>￥1236</b></div>',
                    '<div class="oid">订单号：<b>1236</b></div>',
                '</a>',
            '</div>',
            '<% } %>',
            ].join('')
    }
}