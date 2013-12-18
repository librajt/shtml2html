/**
 *  
 *  args: {
 *      el: 'css selector'
 *      url: string
 *      data: {}
 *      page: number
 *      maxPage: number
 *      successFn: function
 *  }
 *  
 *  
 */
var Loadmore = function(args) {
    var me = this;
    args = args || {};
    for (var o in args) {
        me[o] = args[o];
    }
    
    me.el = document.querySelector(me.el);
    if (me.el) me.init();
};

Loadmore.prototype = {
    init: function() {
        var me = this;
        
        me.page = me.page || 2;
        
        me.el.addEventListener('click', function(e) {
            me.onClick(e);
        }, false);
    },
    
    onClick: function(e) {
        var me = this;
        
        me.loadData();
    },
    
    loadData: function(p) {
        var me = this;
        $.ajax({
            type: "GET",
            url: me.url,
            data: me.data,
            success: function(response) {
                if (response.status === 1) {
                    me.successFn(response.data);
                    me.page += 1;
                    if (me.page >= me.maxPage) {
                        // TODO
                    }
                }
                else {
                    // error
                }
            },
            dataType: 'json'
        });
    }
    
};











