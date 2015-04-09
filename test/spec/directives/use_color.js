'use strict';

describe( 'Directive: useColor', function () {


    var element, domStr,
        scope, colors;

    // load the directive's module
    beforeEach( module( 'zeus.utils' ) );

    beforeEach( function () {

        var COLOR_MAP = {
            FOO: '#f00f00',
            BAR: '#ba5ba5',
            YA_COLOR: '#10c10c'
        };

        colors = jasmine.createSpyObj( '$zsColor', [ 'getColor' ] );

        colors.getColor.and.callFake( function ( key ) {
            return COLOR_MAP[ key ];
        } );

        module( function ( $provide ) {
            $provide.value( '$zsColor', colors );
        } );
    } );

    beforeEach( inject( function ( $rootScope ) {

        domStr = __html__[ 'test/mock_views/use_color_1.html' ];

        scope = $rootScope.$new();
        scope.fubar = 'FOO';
        scope.baz = 'YA_COLOR';

    } ) );

    it( 'should set correct color', inject( function ( $compile ) {

        element = angular.element( domStr );
        element = $compile( element )( scope );
        expect( element.attr( 'my-color' ) ).toBe( '#f00f00' );
        expect( element.attr( 'another-color' ) ).toBe( '#ba5ba5' );
        expect( element.attr( 'yet-another-color' ) ).toBe( '#10c10c' );

    } ) );
} );
