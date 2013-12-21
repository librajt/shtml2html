/**
 *  
 *  args: {
 *      el: 'css selector'
 *      max: number
 *      valid: function, return bool value
 *      callback: function, set final value
 *  }
 *  
 *  update(max)
 *  
 */
var Numberic = function(args) {
    var me = this;
    args = args || {};
    for (var o in args) {
        me[o] = args[o];
    }
    
    me.el = document.querySelector(me.el);
    if (me.el) me.init();
};

Numberic.prototype = {
    init: function() {
        var me = this;
        
        me.btnMinus = me.el.querySelector('.minus');
        me.btnPlus = me.el.querySelector('.plus');
        me.inputVal = me.el.querySelector('.cnt');
        me.desVal = me.el.querySelector('.des b');
        
        me.lastVal = 0;
        
        me.val = me.val || 0;
        me.min = me.min || 0;
        me.max = me.max || 0;
        me.valid = me.valid || function() {return true;};
        
        me.setVal(me.val);
        me.setDesVal(me.max);

        me.btnMinus.addEventListener('click', function(e) {
            me.onMinusClick(e);
        }, false);
        me.btnPlus.addEventListener('click', function(e) {
            me.onPlusClick(e);
        }, false);
        me.inputVal.addEventListener('focus', function(e) {
            me.onInputFocus(e);
        }, false);
        me.inputVal.addEventListener('blur', function(e) {
            me.onInputBlur(e);
        }, false);
    },
    
    onMinusClick: function(e) {
        var me = this;
        if (me.valid()) {
            if (me.btnMinus.className.match(/disable/g)) return false;
            me.minus();
        }
    },
    
    onPlusClick: function(e) {
        var me = this;
        if (me.valid()) {
            if (me.btnPlus.className.match(/disable/g)) return false;
            me.plus();
        }
    },
    
    onInputFocus: function(e) {
        var me = this;
        if (!me.valid()) {
            e.target.blur();
        }
    },
    
    onInputBlur: function(e) {
        var me = this, val = me.inputVal.value;
        if (/\D/.test(val)) {
            alert('请输入整数');
            me.inputVal.value = me.val;
        }
        else {
            me.setVal(me.inputVal.value);
        }
    },
    
    minus: function(v) {
        var me = this;
        me.setVal(me.val - 1);
    },
    
    plus: function() {
        var me = this;
        me.setVal(me.val + 1);
    },
    
    setVal: function(v) {
        var me = this;
        me.lastVal = me.val;
        me.val = parseInt(v, 10);
        me.val = me.max < me.val  ? me.max : (me.min > me.val ? me.min : me.val);

        me.inputVal.value = me.val;
        me.checkEnable();
        me.callback(me.val);
    },
    
    setDesVal: function(v) {
        this.desVal.innerHTML = v;
    },
    
    checkEnable: function() {
        var me = this;
        if (me.val <= me.min) me.btnMinus.className = 'btn minus disable';
        else me.btnMinus.className = 'btn minus';

        if (me.val >= me.max) me.btnPlus.className = 'btn plus disable';
        else me.btnPlus.className = 'btn plus';
    },
    
    update: function(max) {
        var me = this;
        me.max = max;
        me.lastVal = 0;
        me.val = 0;

        me.setVal(me.val);
        me.setDesVal(me.max);
    }
};

