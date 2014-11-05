(function () {
    'use strict';

    window.app = window.app || {};
    window.app.views = window.app.views || {};

    window.app.views.main = window.aero.view.extend ({

        template: 'templates/main.html',

        container: '#content',

        init: function (data) {
            this.addEvent('click button.btnHi', this.btnHiHandler);
            this.addEvent('click button.btnSecondPage', this.btnSecondPageHandler);
        },

        btnHiHandler: function () {
            window.alert('Hi');
        },

        btnSecondPageHandler: function () {
            window.aero.controller.showView('second');
        }

    });

})();
