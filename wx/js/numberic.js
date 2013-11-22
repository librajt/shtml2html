/**
 *  
 *  args: {
 *      el: 'css selector'
 *      max: number
 *      valid: function, return bool value
 *  }
 *  
 *  update(max)
 *  
 */
var numberic = function(args) {
    var _ = this;
    args = args || {};
    for (var o in args) {
        _[o] = args[o];
    }
    
    _.el = document.querySelector(_.el);
    if (_.el) _.init();
};

numberic.prototype = {
    init: function() {
        var _ = this;
        
        _.btnMinus = _.el.querySelector('.minus');
        _.btnPlus = _.el.querySelector('.plus');
        _.inputVal = _.el.querySelector('.cnt');
        _.desVal = _.el.querySelector('.des b');
        
        _.lastVal = 0;
        
        _.val = _.val || 0;
        _.min = _.min || 0;
        _.max = _.max || 0;
        _.valid = _.valid || function() {return true;};
        
        _.setVal(_.val);
        _.setDesVal(_.max);

        _.btnMinus.addEventListener('click', function(e) {
            _.onMinusClick(e);
        }, false);
        _.btnPlus.addEventListener('click', function(e) {
            _.onPlusClick(e);
        }, false);
        _.inputVal.addEventListener('focus', function(e) {
            _.onInputFocus(e);
        }, false);
        _.inputVal.addEventListener('blur', function(e) {
            _.onInputBlur(e);
        }, false);
    },
    
    onMinusClick: function(e) {
        var _ = this;
        if (_.valid()) {
            if (_.btnMinus.className.match(/disable/g)) return false;
            _.minus();
        }
    },
    
    onPlusClick: function(e) {
        var _ = this;
        if (_.valid()) {
            if (_.btnPlus.className.match(/disable/g)) return false;
            _.plus();
        }
    },
    
    onInputFocus: function(e) {
        var _ = this;
        if (!_.valid()) {
            e.target.blur();
        }
    },
    
    onInputBlur: function(e) {
        var _ = this, val = _.inputVal.value;
        if (/\D/.test(val)) {
            alert('请输入整数');
            _.inputVal.value = _.val;
        }
        else {
            _.setVal(_.inputVal.value);
        }
    },
    
    minus: function(v) {
        var _ = this;
        this.setVal(_.val - 1);
    },
    
    plus: function() {
        var _ = this;
        this.setVal(_.val + 1);
    },
    
    setVal: function(v) {
        var _ = this;
        _.lastVal = _.val;
        _.val = parseInt(v, 10);
        _.val = _.max < _.val  ? _.max : (_.min > _.val ? _.min : _.val);

        _.inputVal.value = _.val;
        _.checkEnable();
    },
    
    setDesVal: function(v) {
        this.desVal.innerHTML = v;
    },
    
    checkEnable: function() {
        var _ = this;
        if (_.val <= _.min) _.btnMinus.className = 'btn minus disable';
        else _.btnMinus.className = 'btn minus';

        if (_.val >= _.max) _.btnPlus.className = 'btn plus disable';
        else _.btnPlus.className = 'btn plus';
    },
    
    update: function(max) {
        var _ = this;
        _.max = max;
        _.lastVal = 0;
        _.val = 0;

        _.setVal(_.val);
        _.setDesVal(_.max);
    }
};

