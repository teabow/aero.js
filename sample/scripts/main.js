(function () {
    'use strict';

    var views = [
        {
            name: 'main',
            ref: window.app.views.main
        },
        {
            name: 'second',
            ref: window.app.views.second
        }
    ];

    window.aero.controller.init(views);
    window.aero.controller.showView('main');

})();
