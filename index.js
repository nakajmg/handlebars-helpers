var Handlebars = require('Handlebars');
var fs = require('fs-extra');
var helperRegister = require("./lib/index");
helperRegister(Handlebars);

var src = fs.readFileSync('./index.html', 'utf8');
var template = Handlebars.compile(src);
var context = {test: "test", num: 10};
var html = template(context);

console.log(html);