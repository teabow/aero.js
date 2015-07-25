'use strict';

var aero = require('../../lib/aero');
var React = require('react');

var secondView = aero.view.extend ({

    init: function () {
        this.render();
    },

    render: function () {
        var View = React.createClass({
            btnThirdPageHandler: function(e) {
                e.preventDefault();
                aero.controller.showView('third');
            },
            render: function () {
                return (
                    <main>
                        <h1>Second view</h1>
                        <button className="btnThirdPage" onClick={this.btnThirdPageHandler}>Go to third page</button>
                    </main>
                );
            }
        });
        React.render(<View />, document.getElementById('content'));
    }

});

module.exports = secondView;
