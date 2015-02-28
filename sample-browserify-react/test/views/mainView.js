'use strict';

var aero = require('aero.js');
var React = require('react');

var mainView = aero.view.extend ({

    init: function () {
        this.render();
    },

    render: function () {
        var View = React.createClass({displayName: "View",
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
                    React.createElement("main", null, 
                        React.createElement("h1", null, "Main view with React"), 
                        React.createElement("button", {className: "btnHi", onClick: this.btnHiHandler}, "Say hi!"), 
                        React.createElement("button", {className: "btnSecondPage", onClick: this.btnSecondPageHandler}, "Go to second page")
                    )
                );
            }
        });
        React.render(React.createElement(View, null), document.getElementById('content'));
    }

});

module.exports = mainView;
