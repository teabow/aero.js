module.exports = function(config) {
    config.set({

        basePath: '',
        // frameworks to use
        frameworks: ['browserify', 'jasmine'],

        // list of files / patterns to load in the browser
        files: [],

        reporters: ['mocha'],

        port: 9876,

        colors: true,

        browsers: ['Chrome'],

        preprocessors: {
            'test/**/*.js': ['browserify']
        }

    });
};