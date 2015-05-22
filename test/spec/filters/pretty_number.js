'use strict';

describe( 'Filter: prettyNumber', function () {

    // load the filter's module
    beforeEach( module( 'zeus.utils' ) );

    // initialize a new instance of the filter before each test
    var prettyNumber;
    beforeEach( inject( function ( $filter ) {
        prettyNumber = $filter( 'prettyNumber' );
    } ) );

    it( 'should produce the same number if number is less than 1000',
        function () {
            var num = 999;
            expect( prettyNumber( num, 1 ) ).toBe( '999' );
        }
    );

    it( 'should produce 1K if input is 1000',
        function () {
            var num = 1000;
            expect( prettyNumber( num, 1 ) ).toBe( '1K' );
        }
    );

    it( 'should produce 10K if input is 10000',
        function () {
            var num = 10000;
            expect( prettyNumber( num, 1 ) ).toBe( '10K' );
        }
    );

    it( 'should produce 10K if input is 10049',
        function () {
            var num = 10049;
            expect( prettyNumber( num, 1 ) ).toBe( '10K' );
        }
    );

    it( 'should produce 10.1K if input is 10051',
        function () {
            var num = 10051;
            expect( prettyNumber( num, 1 ) ).toBe( '10.1K' );
        }
    );

    it( 'should round of 2 decimal places and produce 10K if input is 9989',
        function () {
            var num = 9999;
            expect( prettyNumber( num ) ).toBe( '10K' );

        }
    );

    it( 'should produce 10.5K if input is 10500',
        function () {
            var num = 10500;
            expect( prettyNumber( num, 1 ) ).toBe( '10.5K' );

        }
    );

    it( 'should round off 3460 to 3.5K',
        function () {
            var num = 3460;
            expect( prettyNumber( num, 1 ) ).toBe( '3.5K' );

        }
    );

    it( 'should produce 2M if input is 2000000',
        function () {
            var num = 2000000;
            expect( prettyNumber( num ) ).toBe( '2M' );

        }
    );

} );
