'use strict';

var aero = require('../../lib/aero');
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
                        <h1>Second view</h1>
                    </main>
                );
            }
        });
        React.render(<View />, document.getElementById('content'));
    }

});

module.exports = secondView;
