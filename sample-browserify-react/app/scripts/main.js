'use strict';

var aero = require('../lib/aero');
var mainView = require('./views/mainView');
var secondView = require('./views/secondView');

var views = [
    {
        name: 'main',
        ref: mainView
    },
    {
        name: 'second',
        ref: secondView
    }
];

aero.controller.init(views);
aero.controller.showView('main');