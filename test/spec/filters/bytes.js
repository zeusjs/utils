'use strict';

describe( 'Filter: bytes', function () {

    // load the filter's module
    beforeEach( module( 'zeus.utils' ) );

    // initialize a new instance of the filter before each test
    var bytes;
    beforeEach( inject( function ( $filter ) {
        bytes = $filter( 'bytes' );
    } ) );


    it( 'should return 1KB for 1024 value"', function () {
        var num = 1024;
        expect( bytes( num ) ).toBe( '1 KB' );
    } );

    it( 'should return same number with unit Bytes for value less than 1024"', function () {
        var num = 1023;
        expect( bytes( num ) ).toBe( '1023 Bytes' );
    } );

    it( 'should return 1MB for 1048576 value"', function () {
        var num = 1048576;
        expect( bytes( num ) ).toBe( '1 MB' );
    } );

    it( 'should return 1GB for 1073741824 value"', function () {
        var num = 1073741824;
        expect( bytes( num ) ).toBe( '1 GB' );
    } );

    it( 'should return 19.9KB for 20367 value"', function () {
        var num = 20367;
        expect( bytes( num ) ).toBe( '19.9 KB' );
    } );

    it( 'should return 19.89KB for 20367 value with precision as 2"', function () {
        var num = 20367;
        expect( bytes( num, 2 ) ).toBe( '19.89 KB' );
    } );

} );
