'use strict';

var aero = require('aero.js');
var React = require('react');

var secondView = aero.view.extend ({

    init: function () {
        this.render();
    },

    render: function () {
        var View = React.createClass({displayName: "View",
            render: function () {
                return (
                    React.createElement("main", null, 
                        React.createElement("h1", null, "Third view")
                    )
                );
            }
        });
        React.render(React.createElement(View, null), document.getElementById('content'));
    }

});

module.exports = secondView;
