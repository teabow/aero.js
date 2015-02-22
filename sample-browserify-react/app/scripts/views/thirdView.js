'use strict';

var aero = require('aero.js');
var React = require('react');

var secondView = aero.view.extend ({

    init: function () {
        this.render();
    },

    render: function () {
        var View = React.createClass({
            render: function () {
                return (
                    <main>
                        <h1>Third view</h1>
                    </main>
                );
            }
        });
        React.render(<View />, document.getElementById('content'));
    }

});

module.exports = secondView;
