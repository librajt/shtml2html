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

        var setNum = new Numberic({
            el: '.num',
            max: 35,
            valid: function() {
                var msg = [];
                if (!$('.orderItems .color .value input:checked').val()) msg.push('color');
                if (!$('.orderItems .size .value input:checked').val()) msg.push('size');
                if (msg.length > 0) {
                    alert(msg.join(', ') + ' required!');
                    return false;
                }
                else return true;
            }
        });
    },
    
    init: function() {
        var page = window.location.href.match(/html\/(\w*)\.html/)[1];

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







