;$(document).ready(function() {

var SHOP = {

    common: {
        initCall: function() {
            var calls = $('a.call, .call a.btn');
            calls.on('click', function(e) {
                var tel = $(e.currentTarget).attr('href');
                if (/tel\:/ig.test(tel)) {
                    tel = tel.split(':')[1];
                    return confirm('确认拨打电话 ' + tel);
                }
            });
        }
    },
    
    home: function() {
        $('.sellPics .picWrap').bxSlider({
            controls: false,
            slideWidth: 280,
            infiniteLoop: false
        });
        
        new LoadMore({
            el: '.loadmore',
            successFn: function(list) {
                _.template(TEMPLATES.home.loadmore, list);
            }
        });
        
    },
    
    category: function() {
        var more = new LoadMore({
            el: '.loadmore',
            successFn: function(list) {
                _.template(TEMPLATES.home.loadmore, list);
            }
        });
    
    },

    aboutSeller: function() {
        
    },

    orders: function() {
        new LoadMore({
            el: '.loadmore',
            successFn: function(list) {
                _.template(TEMPLATES.home.loadmore, list);
            }
        });
    },
    
    detail: function() {
        $('.sellPics .picWrap').bxSlider({
            controls: false,
            slideWidth: 280,
            infiniteLoop: false
        });
        
        var setNum, choices = $('.orderItem .choice input'), color = -1, size = -1, addToCart = $('.addToCart'), cartList = $('.cartList .cartItemWrap');
        setNum = new Numberic({
            el: '.num',
            valid: function() {
                var msg = [];
                if (color < 0) msg.push('color');
                if (size < 0) msg.push('size');
                if (msg.length > 0) {
                    alert(msg.join(', ') + ' required!');
                    return false;
                }
                else return true;
            },
            callback: function(val) {
                if (!window.detailOrder) return;
                window.detailOrder.count = val;
            }
        });
        
        window.detailCount = [
            [12, 23, 34, 45, 56],
            [21, 32, 43, 54, 65]
        ];
        
        choices.on('click', function(e) {
            var el = $(e.currentTarget), name = el.attr('name'), index = el.parent('.choice').index();
            if (name === 'color') color = index;
            else if (name === 'size') size = index;
            
            window.detailOrder = window.detailOrder || {};
            if (color >= 0) window.detailOrder.color = $('.orderItem.color .choice').eq(color).find('.cnt').html();
            if (size >= 0) window.detailOrder.size = $('.orderItem.size .choice').eq(size).find('.cnt').html();
            if (color >= 0 && size >= 0) {
                setNum.update(window.detailCount[color][size]);
                window.detailOrder.count = 0;
            }
        });
        
        addToCart.on('click', function(e) {
            e.preventDefault();
            if (!window.detailOrder) alert('selece first');
            else if (!window.detailOrder.color) alert('color need');
            else if (!window.detailOrder.size) alert('size need');
            else if (window.detailOrder.count <= 0) alert('zero');
            else {
                // TODO add
                choices.attr('checked', false);
                setNum.update(0);
                window.detailOrder = {};
            }
            e.stopPropagation();
        });
        
        cartList.on('click', '.cartItem .delete', function(e) {
            // TODO remove
            e.stopPropagation();
        });
        
        var sellIntro = $('.sellIntro'), sellIntroStatus = sellIntro.find('.status'), sellIntroCnt = sellIntro.find('.cnt');
        sellIntroStatus.on('click', function(e) {
            var cls = 'on';
            sellIntroStatus.toggleClass(cls);
            if (sellIntroStatus.hassClass(cls)) sellIntroCnt.show();
            else sellIntroCnt.hide();
        });

    },
    
    init: function() {
        var page = window.location.href.match(/s?html\/\d+(\w*)\.s?html/)[1];

        switch (page) {
            case 'home':
                this.home();
                break;
            case 'catetory':
                this.category();
                break;
            case 'orders':
                this.orders();
                break;
            case 'detail':
                this.detail();
                break;
        }
        
        this.common.initCall();
    }
};

SHOP.init();

});







