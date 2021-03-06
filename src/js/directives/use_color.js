/**
 * Copyright 2015, Symantec Corporation
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 */
'use strict';

/**
 *  @ngdoc directive
 *  @name zeus.utils.directive:useColor
 *
 *  @restrict A
 *
 *  @requires zeus.utils.Colors
 *
 *  @description
 *  A directive that assigns a color value to a particular attribute of
 *  a directive
 *
 *
 *  @param {object} useColor An object literal containing the attribute name (key) to
 *  which a color (value) may be assigned
 *
 *  @example
 <example module="zeus.demo">
    <file name="index.html">
        <div ng-controller="myCtrl">
            <colored-square text="Hobbit"
                use-color="{'bgColor': 'HOBBIT'}">
            </colored-square>

            <colored-square text="Wizard"
                use-color="{'bgColor': race}">
            </colored-square>
        </div>
    </file>
    <file name="app.js">
        angular.module( 'zeus.demo', [ 'zeus.utils' ] );
        angular.module( 'zeus.demo' ).config( function ( $zsColorProvider ) {
                $zsColorProvider.
                    setColor( 'HOBBIT', '#8bc34a' ).
                    setColor( 'WIZARD', '#ffc107' );
            }
        );
    </file>

    <file name="color_square.js">
        angular.module( 'zeus.demo' ).directive( 'coloredSquare',
            function () {

                return {
                    template: '<div style="width:100px;height:100px;padding:10px;' +
                        'display:inline-block">Hello</div>',
                    replace: true,
                    link: function ( scope, el ) {
                        el.css( { backgroundColor: scope.bgColor } ).text( scope.text );
                    },
                    scope: {
                        bgColor: '@',
                        text: '@'
                    }

                };
            }
        );
    </file>

    <file name="myCtrl.js">
        angular.module( 'zeus.demo' ).controller( 'myCtrl', function ( $scope ) {
            $scope.race = 'WIZARD';
        } );
    </file>
 </example>
 **/
angular.module( 'zeus.utils' )
    .directive( 'useColor', [ '$zsColor', function ( $zsColor ) {

        var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g,
            MOZ_HACK_REGEXP = /^moz([A-Z])/,
            rAttrComponent = /((?:'(?:[\w\-]+)')|(?:'{0}\w+'{0}))\s*:\s*(?:\w+|(?:'\w+'))\s*,?/g,
            rColorComponent = /(?:(?:'(?:[\w\-])+')|(?:(?:[\w\-]+)))\s*:\s*(\w+|(?:'\w+'))\s*,?/g,
            camelCase, findColorAttrs, findColorValues, extractColorAttrName,
            compileFn, preLinkFn;

        // Borrowed from https://github.com/angular/angular.js/blob/master/src/jqLite.js
        camelCase = function ( name ) {
            return name.replace( SPECIAL_CHARS_REGEXP,
                        function ( _, separator, letter, offset ) {
                            return offset ? letter.toUpperCase() : letter;
                        } ).
                        replace( MOZ_HACK_REGEXP, 'Moz$1' );
        };

        findColorAttrs = function ( str ) {
            var result = [],
                matches;

            while ( ( matches = rAttrComponent.exec( str ) ) !== null ) {
                result.push( matches[ 1 ] );
            }

            return result;
        };

        findColorValues = function ( str ) {
            var result = [],
            matches;

            while ( ( matches = rColorComponent.exec( str ) ) !== null ) {
                result.push( matches[ 1 ] );
            }

            return result;
        };

        extractColorAttrName = function ( attrName ) {
            var rActualColorAttrName = /'?([\w\-]+)'?/,
                attr;

            attr = rActualColorAttrName.exec( attrName );
            if ( attr && attr[ 1 ] ) {
                return attr[ 1 ];
            }
        };

        compileFn = function ( element, attrs ) {
            var colorAttrsList, colorKeysList, colorAttr,
                a, k, i, len;

            colorAttrsList = findColorAttrs( attrs.useColor );
            colorKeysList = findColorValues( attrs.useColor );


            i = 1;
            len = colorAttrsList.length;

            for ( i = 0; i < len; i++ ) {
                a = colorAttrsList[ i ];
                k = colorKeysList[ i ];

                colorAttr = extractColorAttrName( a );
                attrs.$set( camelCase( colorAttr ), k );

            }

            return {
                pre: preLinkFn
            };
        };

        preLinkFn = function ( scope, element, attrs ) {
            var colorAttrsList,
                a, c, k, i, len;

            colorAttrsList = findColorAttrs( attrs.useColor );

            i = 1;
            len = colorAttrsList.length;

            for ( i = 0; i < len; i++ ) {
                a = extractColorAttrName( colorAttrsList[ i ] );
                a = camelCase( a );
                k = scope.$eval( attrs[ a ] );
                c = $zsColor.getColor( k );
                if ( c ) {
                    attrs.$set( a, c );
                }
            }

        };

        return {
            restrict: 'A',
            priority: 1001,
            compile: compileFn
        };
    }
] );
