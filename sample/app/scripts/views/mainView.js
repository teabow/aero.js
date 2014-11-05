(function () {
    'use strict';

    window.app = window.app || {};
    window.app.views = window.app.views || {};

    window.app.views.main = window.aero.view.extend ({

        template: 'templates/main.html',

        container: '#content',

        init: function (data) {
            this.addEvent('click button.btnHiTo', this.btnHiToHandler);
            this.addEvent('click button.btnHiTony', this.btnHiTonyHandler);
            this.addEvent('click button.btnSecondPage', this.btnSecondPageHandler);

            this.observables.user = {name: 'everyone'};
            this.observables.others = [
                {
                    name: 'Lebron'
                },
                {
                    name: 'Kobe'
                }
            ]
        },

        btnHiToHandler: function () {
            this.observables.user.name = this.observables.userName.value;
            this.observables.others.push({name: this.observables.user.name});
        },

        btnHiTonyHandler: function () {
            this.observables.user.name = 'Tony';
            this.observables.others.push({name: this.observables.user.name});
        },

        btnSecondPageHandler: function () {
            window.aero.controller.showView('second');
        }

    });

})();
