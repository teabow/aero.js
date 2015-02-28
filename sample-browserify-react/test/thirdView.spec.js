var chai = require('chai');
var expect = chai.expect;
var ThirdView = require('./views/thirdView');

describe('ThirdView Test', function() {
    describe('#init()', function() {
        it('should have init and render functions', function() {

            expect(ThirdView.init).to.be.a('function');
            expect(ThirdView.render).to.be.a('function');

        });
    });
});
