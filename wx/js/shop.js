;$(document).ready(function() {

var page;

switch (page) {
    case 'home':
        new LoadMore({
            el: '.loadmore',
            successFn: function(list) {
                _.template(TEMPLATES.home.loadmore, list);
            }
        });
        break;
    case 'home':
        
        break;
    case 'detail':
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
        break;
}

};







