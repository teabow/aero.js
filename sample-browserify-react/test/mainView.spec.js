var chai = require('chai');
var expect = chai.expect;
var MainView = require('./views/mainView');

beforeEach(function() {
    // Called before each test
});

describe('MainView Test', function() {
    describe('#init()', function() {
        it('should have init and render functions', function() {

            expect(MainView.init).not.to.be.null;
            expect(MainView.render).not.to.be.null;

            expect(MainView.init).to.be.a('function');
            expect(MainView.render).to.be.a('function');

        });
    });
});
