var _ = require('lodash');

var operators = {
  '==': function (l, r) { return l == r; },
  '===': function (l, r) { return l === r; },
  '!=': function (l, r) { return l != r; },
  '!==': function (l, r) { return l !== r; },
  '<': function (l, r) { return l < r; },
  '>': function (l, r) { return l > r; },
  '<=': function (l, r) { return l <= r; },
  '>=': function (l, r) { return l >= r; },
  'typeof': function (l, r) { return typeof l == r; }
};

var helpers = {
  is: function() {
    var args = arguments, left = args[0], operator = args[1] , right = args[2] , options = args[3];

    if (args.length == 2) {
      options = args[1];
      if (left) {
        return options.fn(this);
      }
      else{
        return options.inverse(this);
      }
    }

    if (args.length == 3) {
      right = args[1];
      options = args[2];
      if (left == right) {
        return options.fn(this);
      }
      else{
        return options.inverse(this);
      }
    }

    if (!operators[operator]) {
      throw new Error("Handlerbars Helper 'is' doesn't know the operator " + operator);
    }

    if (operators[operator](left, right)) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  isnt: function() {
    var args = arguments, left = args[0], operator = args[1] , right = args[2] , options = args[3];

    if (args.length == 2) {
      options = args[1];
      if (left) {
        return options.inverse(this);
      }
      else{
        return options.fn(this);
      }
    }

    if (args.length == 3) {
      right = args[1];
      options = args[2];
      if (left == right) {
        return options.inverse(this);
      }
      else{
        return options.fn(this);
      }
    }

    if (!operators[operator]) {
      throw new Error("Handlerbars Helper 'is' doesn't know the operator " + operator);
    }

    if (operators[operator](left, right)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  }
};

var register = function(Handlebars, options) {
  options = options || {};
  _.each(helpers, function(fn, name) {
    Handlebars.registerHelper(name, fn);
  }, this);
};

module.exports = register;