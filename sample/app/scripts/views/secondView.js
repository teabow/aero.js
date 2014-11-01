(function () {
    'use strict';

    window.app = window.app || {};
    window.app.views = window.app.views || {};

    window.app.views.second = window.aero.view.extend ({

        template: 'templates/second.html',

        container: '#content',

        init: function () {
            this.addEvent('click button.btnThirdPage', this.btnThirdPageHandler);
        },

        btnThirdPageHandler: function () {
            window.aero.controller.showView('third');
        }

    });

})();
