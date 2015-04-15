'use strict';

describe( 'Provider: colorsProvider', function () {


    var fakeModule, injectedColorProvider, colorsProviderInstance;

    beforeEach( function () {

        fakeModule = angular.module( 'zeus.fake', function () {} );
        fakeModule.config( function ( $zsColorProvider ) {
            injectedColorProvider = $zsColorProvider;

            $zsColorProvider.
                setColor( 'FOO', '#f00f00' ).
                setColor( 'BAR', '#ba5ba5' );

        } );

        module( 'zeus.utils', 'zeus.fake' );
        inject( function () {} );
    } );

    it( 'should set-get color values correctly', function () {
        colorsProviderInstance = injectedColorProvider.$get();

        expect( colorsProviderInstance.getColor( 'FOO' ) ).toEqual( '#f00f00' );
        expect( colorsProviderInstance.getColor( 'BAR' ) ).toEqual( '#ba5ba5' );
    } );


    it( 'should return `undefined` for color key that have not been defined', function () {
        colorsProviderInstance = injectedColorProvider.$get();

        expect( colorsProviderInstance.getColor( 'ZAP' ) ).toBeUndefined();
    } );


} );
