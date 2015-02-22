(function () {
    'use strict';

    var views = [
        {
            name: 'main',
            ref: window.app.views.main
        },
        {
            name: 'mainSub',
            ref: window.app.views.mainSub,
            subView: true
        },
        {
            name: 'second',
            ref: window.app.views.second
        },
        {
            name: 'third',
            ref: window.app.views.third
        }
    ];

    window.aero.controller.init(views).preload();
    window.aero.controller.showView('main', {title: 'Aero Main View'});

})();
