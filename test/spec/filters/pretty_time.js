'use strict';

describe( 'A filter for formatting time into pretty strings',
    function () {

        // load the filter's module
        beforeEach( module( 'zeus.utils' ) );

        // initialize a new instance of the filter before each test
        var prettyTime;

        beforeEach( inject( function ( $filter ) {
            prettyTime = $filter( 'prettyTime' );
        } ) );


    it( 'should return values less than a second suffixed with millisecs',
        function () {
        var t = 999;
        expect( prettyTime( t ) ).toBe( '999 millisecs' );
    } );

    it( 'should return 1 secs if value is 1000',
        function () {
        var t = 1000;
        expect( prettyTime( t ) ).toBe( '1 secs' );
    } );

    it( 'should return 59 secs for 59000',
        function () {
        var t = 59000;
        expect( prettyTime( t ) ).toBe( '59 secs' );
    } );

    it( 'should return print lower units if resultant has decimals ',
        function () {
        var t = 63000;
        expect( prettyTime( t ) ).toBe( '1 mins 3 secs' );
    } );

    it( 'should work if time is in order of days',
        function () {
        var t = 3600 * 24 * 1000;
        expect( prettyTime( t ) ).toBe( '1 days' );
    } );

    it( 'should work if time is an hour more than a day',
        function () {
        var t = ( 3600 * 24 * 1000 ) + ( 3600000 - 1 );
        expect( prettyTime( t ) ).toBe( '1 days 1 hours' );
    } );

    it( 'should work if time is in order of months',
        function () {
        var t = 3600 * 24 * 1000 * 32;
        expect( prettyTime( t ) ).toBe( '1 months 2 days' );
    } );

    it( 'should work if time is in order of years',
        function () {
        var t = 1945 * 24 * 3600 * 1000;

        expect( prettyTime( t ) ).toBe( '5 years 4 months' );
    } );


    it( 'should work if time is in order one year',
        function () {
        var years = 2 * 365 * 24 * 3600 * 1000,
            months = 10 * 24 * 3600 * 1000,
            t = years + months;

        expect( prettyTime( t ) ).toBe( '2 years 10 days' );
    } );

} );
