//     Aero.js 0.7.0

//     (c) 2014 Thibaud Bourgeois
//     Aero.js may be freely distributed under the MIT license.
//     For documentation please refer to :
//     http://teabow.github.io/aero.js/

(function () {

    window.aero = window.aero || {};

    window.aero.view = {

        addEvent: function (key, funct) {
            var self = this;
            var event = null, element = null;
            var sepIndex = key.indexOf(' ');
            if (sepIndex > 0) {
                event = key.substr(0, sepIndex);
                element = key.substr(sepIndex + 1);
                this.removeEvent(key);
                $(element).on(event, function (e) {
                    funct.call(self, e.currentTarget);
                    return false;
                });
            }
        },

        removeEvent: function (key) {
            var event = null, element = null;
            var sepIndex = key.indexOf(' ');
            if (sepIndex > 0) {
                event = key.substr(0, sepIndex);
                element = key.substr(sepIndex + 1);
                $(element).off(event);
            }
        },

        extend: function (data) {
            var clone = _.clone(this);
            return _.merge(clone, data);
        }

    };

    // Template manager
    window.aero.templateManager = {

        templates: {},

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

    // Controller
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

    Controller.prototype.init = function (views) {
        this.views = views;
        this.first = true;
        return this;
    };

    Controller.prototype.preload = function () {
        for (var i = 0; i < this.views.length; i++) {
            if (this.views[i].ref.template) {
                window.aero.templateManager.get(this.views[i].ref.template);
            }
        }
    };

    Controller.prototype.showView = function (viewName, data, noHistory) {
        var view = null;
        for (var i = 0; i < this.views.length; i++) {
            if (this.views[i].name === viewName) {
                view = this.views[i];
                break;
            }
        }

        if (window.history.pushState && !noHistory) {
            if (this.first) {
                window.history.replaceState({name: viewName, data: data}, viewName, '/#/' + viewName);
                this.first = false;
            }
            else {
                window.history.pushState({name: viewName, data: data}, viewName, '/#/' + viewName);
            }
        }

        if (view.ref.template) {
            window.aero.templateManager.get(view.ref.template, function (template) {
                $(view.ref.container).html(_.template(template, data));
                if (window.aero._initObservables) {
                    window.aero._initObservables(view.ref);
                }
                view.ref.init(data);
            });
        }
        else {
            if (window.aero._initObservables) {
                window.aero._initObservables(view.ref);
            }
            view.ref.init(data);
        }
    };
    window.aero.controller = new Controller();

    if (window.history.pushState) {
        window.onpopstate = function (event) {
            if (event.state && event.state.name) {
                window.aero.controller.showView(event.state.name, event.state.data, true);
            }
        };
    }

})();
