'use strict';

var aero = require('../../lib/aero');
var React = require('react');

var mainView = aero.view.extend ({

    init: function () {
        this.render();
    },

    render: function () {
        var View = React.createClass({
            getInitialState: function() {
                return {name: 'Teab'};
            },
            btnHiHandler: function(e) {
                e.preventDefault();
                window.alert('Hi ' + this.state.name);
            },
            btnSecondPageHandler: function(e) {
                e.preventDefault();
                aero.controller.showView('second');
            },
            render: function() {
                return (
                    <main>
                        <h1>Main view with React</h1>
                        <button className="btnHi" onClick={this.btnHiHandler}>Say hi!</button>
                        <button className="btnSecondPage" onClick={this.btnSecondPageHandler}>Go to second page</button>
                    </main>
                );
            }
        });
        React.render(<View />, document.getElementById('content'));
    }

});

module.exports = mainView;
