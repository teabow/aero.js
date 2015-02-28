'use strict';

var aero = require('aero.js');
var React = require('react');

var secondView = aero.view.extend ({

    init: function () {
        this.render();
    },

    render: function () {
        var View = React.createClass({displayName: "View",
            btnThirdPageHandler: function(e) {
                e.preventDefault();
                aero.controller.showView('third');
            },
            render: function () {
                return (
                    React.createElement("main", null, 
                        React.createElement("h1", null, "Second view"), 
                        React.createElement("button", {className: "btnThirdPage", onClick: this.btnThirdPageHandler}, "Go to third page")
                    )
                );
            }
        });
        React.render(React.createElement(View, null), document.getElementById('content'));
    }

});

module.exports = secondView;
