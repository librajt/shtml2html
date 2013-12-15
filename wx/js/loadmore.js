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
    var me = this;
    args = args || {};
    for (var o in args) {
        me[o] = args[o];
    }
    
    me.el = document.querySelector(me.el);
    if (me.el) me.init();
};

loadmore.prototype = {
    init: function() {
        var me = this;
        
        me.page = 2;
        
        me.el.addEventListener('click', function(e) {
            me.onClick(e);
        }, false);
    },
    
    onClick: function(e) {
        var me = this;
        
        me.loadData(me.page + 1);
    },
    
    loadData: function(p) {
        var me = this;
        $.ajax({
            type: "GET",
            url: url,
            data: data,
            success: function(data) {
                _.template(TEMPLATES.home.loadmore, data);
            },
            dataType: 'json'
        });
    }
    
};











