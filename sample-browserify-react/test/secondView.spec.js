var chai = require('chai');
var expect = chai.expect;
var SecondView = require('./views/secondView');

describe('SecondView Test', function() {
    describe('#init()', function() {
        it('should have init and render functions', function() {

            expect(SecondView.init).to.be.a('function');
            expect(SecondView.render).to.be.a('function');

        });
    });
});
