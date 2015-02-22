//     Aero.js 1.0.0
//     (c) 2014 Thibaud Bourgeois
//     Aero.js may be freely distributed under the MIT license.
//     For documentation please refer to :
//     http://teabow.github.io/aero.js/

'use strict';
var $ = require('browserify-zepto');
var _ = require('lodash');

var aero = {};

/**
 * Aero abstract view
 * @type {{render: Function, renderArray: Function, getElement: Function, addEvent: Function, removeEvent: Function, extend: Function}}
 */
aero.view = {

    /**
     * Renders an object into the specified selector
     * @param containerSelector the container selector
     * @param templateUrl the template url used to generate display
     * @param data the data to display
     */
    render: function (containerSelector, templateUrl, data) {
        aero.templateManager.get(templateUrl, function (template) {
            $(containerSelector).html(_.template(template, data));
        });
    },

    /**
     * Renders an array into the specified selector
     * @param containerSelector the container selector
     * @param templateUrl the template url used to generate display
     * @param dataArray the data array to display
     * @param iterator the iterator used to modify array element before injection
     */
    renderArray: function (containerSelector, templateUrl, dataArray, iterator) {
        var tmp = '';
        aero.templateManager.get(templateUrl, function (template) {
            for (var i = 0; i < dataArray.length; i++) {
                if (iterator) {
                    iterator(dataArray[i]);
                }
                tmp += _.template(template, dataArray[i]);
            }
            $(containerSelector).html(tmp);
        });
    },

    /**
     * Gets an element of the view
     * @param selector the element selector
     * @returns {*|jQuery|HTMLElement} the related jquery element
     */
    getElement: function (selector) {
        return $(selector);
    },

    /**
     * Binds an event to the view
     * @param key the key representing the event name and selector
     * @param handler the event handler
     */
    addEvent: function (key, handler) {
        var self = this;
        var event = null, element = null;
        var sepIndex = key.indexOf(' ');
        if (sepIndex > 0) {
            event = key.substr(0, sepIndex);
            element = key.substr(sepIndex + 1);
            this.removeEvent(key);
            $(element).on(event, function (e) {
                handler.call(self, e.currentTarget);
                return false;
            });
        }
    },

    /**
     * Unbinds an event from the view
     * @param key the key representing the event name and selector
     */
    removeEvent: function (key) {
        var event = null, element = null;
        var sepIndex = key.indexOf(' ');
        if (sepIndex > 0) {
            event = key.substr(0, sepIndex);
            element = key.substr(sepIndex + 1);
            $(element).off(event);
        }
    },

    /**
     * Allows view inheritance
     * @param data the data to inherit from
     * @returns {Object} an extended object
     */
    extend: function (data) {
        var clone = _.clone(this);
        return _.merge(clone, data);
    }

};

/**
 * Aero template manager
 * @type {{templates: {}, get: Function}}
 */
aero.templateManager = {

    /**
     * Templates store
     */
    templates: {},

    /**
     * Gets a template from specified name|url
     * @param name the name|url of the template
     * @param callback the handler called when template is loaded
     */
    get: function (name, callback) {

        var template = this.templates[name];

        if (template) {
            callback(template);
        }
        else {
            var self = this;
            $.get(name, function (template) {
                self.templates[name] = template;
                if (callback) {
                    callback(template);
                }
            });
        }
    }
};

/**
 * Aero views controller
 * @returns {Controller|*|Controller._singletonInstance}
 * @constructor
 */
function Controller() {

    if (Controller.prototype._singletonInstance) {
        return Controller.prototype._singletonInstance;
    }

    var self = this;

    if (typeof self === 'undefined') {
        self = new Controller();
    }

    Controller.prototype._singletonInstance = self;
}

/**
 * Initializes Aero views
 * @param views the defined Aero views
 * @returns {Controller}
 */
Controller.prototype.init = function (views) {
    this.views = views;
    this.first = true;
    return this;
};

/**
 * Preloads all registered views templates
 */
Controller.prototype.preload = function () {
    for (var i = 0; i < this.views.length; i++) {
        if (this.views[i].ref.template) {
            aero.templateManager.get(this.views[i].ref.template);
        }
    }
};

/**
 * Shows the specified view
 * @param viewName the name of the view to show
 * @param data the data view to display
 * @param noHistory true if view must not be registered in location.history
 */
Controller.prototype.showView = function (viewName, data, noHistory) {
    var view = null;
    for (var i = 0; i < this.views.length; i++) {
        if (this.views[i].name === viewName) {
            view = this.views[i];
            break;
        }
    }

    if (window.history.pushState && !noHistory && !view.subView) {
        if (this.first) {
            window.history.replaceState({name: viewName, data: data}, viewName, '/#/' + viewName);
            this.first = false;
        }
        else {
            window.history.pushState({name: viewName, data: data}, viewName, '/#/' + viewName);
        }
    }

    if (view.ref.template) {
        aero.templateManager.get(view.ref.template, function (template) {
            $(view.ref.container).html(_.template(template, data));
            if (window.aero && window.aero._initObservables) {
                window.aero._initObservables(view.ref);
            }
            view.ref.init(data);
        });
    }
    else {
        if (window.aero && window.aero._initObservables) {
            window.aero._initObservables(view.ref);
        }
        view.ref.init(data);
    }
};
aero.controller = new Controller();

if (window.history.pushState) {
    window.onpopstate = function (event) {
        if (event.state && event.state.name) {
            aero.controller.showView(event.state.name, event.state.data, true);
        }
    };
}

module.exports = aero;