(function () {
    'use strict';

    window.app = window.app || {};
    window.app.views = window.app.views || {};

    window.app.views.main = window.aero.view.extend ({

        template: 'templates/main.html',

        container: '#content',

        init: function (data) {

            this.addTouchEvent('button.btnHi', this.btnHiHandler);
            this.addEvent('click button.btnSecondPage', this.btnSecondPageHandler);

            this.findElement('button.btnHi').css('color', 'red');

            // View injection
            window.aero.controller.showView('mainSub');

            // Array injection
            var array = [{name: 'item list 1'}, {name: 'item list 2'}, {name: 'item list 3'}];
            this.renderArray('main ul', 'templates/mainList.html', array, function (element) {
                element.name = 'Aero ' + element.name;
            });

            // Object injection
            var author = {firstname: 'Thibaud', lastname: 'Bourgeois'};
            this.render('footer', 'templates/mainFooter.html', author);
        },

        btnHiHandler: function () {
            window.alert('Hi');
        },

        btnSecondPageHandler: function () {
            window.aero.controller.showView('second');
        }

    });

})();
