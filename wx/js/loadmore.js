/**
 *  
 *  args: {
 *      el: 'css selector'
 *      page: number
 *  }
 *  
 *  
 */
var loadmore = function(args) {
    var _ = this;
    args = args || {};
    for (var o in args) {
        _[o] = args[o];
    }
    
    _.el = document.querySelector(_.el);
    if (_.el) _.init();
};

loadmore.prototype = {
    init: function() {
        var _ = this;
        

        _.btnMinus.addEventListener('click', function(e) {
            _.onMinusClick(e);
        }, false);
    },
    
    onMinusClick: function(e) {
        var _ = this;
        if (_.valid()) {
            if (_.btnMinus.className.match(/disable/g)) return false;
            _.minus();
        }
    },
    
    minus: function(v) {
        var _ = this;
        this.setVal(_.val - 1);
    }
    
};

