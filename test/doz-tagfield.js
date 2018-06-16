const DozTagfield = require('../src/doz-tagfield');
const be = require('bejs');


describe('doz-tagfield', function () {

    this.timeout(5000);

    before(function () {
        this.jsdom = require('jsdom-global')();
        DozTagfield.onAppReady();
    });

    after(function () {
        setTimeout(()=>{
            this.jsdom()
        },100);
    });

    beforeEach(function () {
        //document.body.innerHTML = '';
    });
});
