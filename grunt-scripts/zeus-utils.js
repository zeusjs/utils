/*!
 * Copyright (C) 2015, Symantec Corporation
 * All rights reserved.
 * zeus-utils v0.0.1
 */
/**
 * Copyright 2015, Symantec Corporation
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 */

'use strict';

angular.module( 'zeus.utils', [] );

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

/**
 * Copyright 2015, Symantec Corporation
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 */
'use strict';

/**
 *  @ngdoc filter
 *  @name zeus.utils.filter:bytes
 *
 *
 *  @description
 *  Converts a number bytes to a string kilo/mega/giga/tera or peta bytes
 *
 *  @param { number } size Size in bytes
 *  @param { number=} precision Number of decimals to round off to
 *
 *  @returns { string } Bytes represented as kilo/mega/giga/tera or peta bytes
 *
 *  @example
 <example module="zeus.utils">
    <file name="index.html">
        <ul>
            <li> 23 bytes = <b>{{ 23 | bytes }}</b> </li>
            <li> 1024 bytes = <b>{{ 1024 | bytes }}</b> </li>
            <li> 1245237 bytes = <b>{{ 1245237 | bytes }}</b> </li>
            <li> 9899956 bytes = <b>{{ 9899956 | bytes }}</b> </li>
            <li> 5678753190 bytes = <b>{{ 5678753190 | bytes }}</b> </li>
            <li> 3212798762 bytes = <b>{{ 3212798762 | bytes }}</b> </li>
            <li> 6743129076349 bytes = <b>{{ 6743129076349 | bytes }}</b> </li>
        </ul>
    </file>
 </example>
 **/
angular.module( 'zeus.utils' )
  .filter( 'bytes', function () {


    var CONVERSION_MULTIPLIER = 1024,
        bytes;

    bytes = function ( num, precision ) {

        precision = precision || 1;
        num = +num;

        if ( !angular.isNumber( num ) ) {
            throw new TypeError( 'Expected a number' );
        }

        var exponent, unit,
            neg = num < 0,
            units = [ 'Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ];

        if ( neg ) {
            num = -num;
        }

        if ( num < 1 ) {
            return ( neg ? '-' : '' ) + num + ' B';
        }

        exponent = Math.min( Math.floor( Math.log( num ) / Math.log( CONVERSION_MULTIPLIER ) ),
                    units.length - 1 );
        num = ( num / Math.pow( CONVERSION_MULTIPLIER, exponent ) ).toFixed( precision ) * 1;
        unit = units[ exponent ];

        return ( neg ? '-' : '' ) + num + ' ' + unit;
    };

    return bytes;

} );

/**
 * Copyright 2015, Symantec Corporation
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 */
'use strict';

/**
 *  @ngdoc filter
 *  @name zeus.utils.filter:prettyNumber
 *
 *  @description
 *  Converts large numbers to human readable strings
 *
 *  @param { number } num The large number
 *  @param { number=} precision The numeric precision
 *
 *  @returns { string } Human readable format of the large number
 *
 *  @example
 <example module="zeus.utils">
    <file name="index.html">
        <ul>
            <li> {{ 1407919200 | prettyNumber }} </li>
            <li> {{ 158291 | prettyNumber }} </li>
            <li> {{ 1397828100000 | prettyNumber }} </li>
            <li> {{ 14079192 | prettyNumber }} </li>
        </ul>
    </file>
 </example>
 **/
angular.module( 'zeus.utils' )
    .filter( 'prettyNumber', function () {

        var units = [ '', 'K', 'M', 'B', 'T' ],
            prettyNumber;

        prettyNumber = function ( num, precision ) {

            var temp = num,
                i, decimals, result;

            precision = precision || 1;

            for ( i = 0; i < units.length; i++ ) {
                if ( temp >= 1000 ) {
                    decimals = temp % 1000;
                    temp = temp / 1000;
                } else {
                    break;
                }
            }


            if ( decimals > 0 ) {
                decimals = +( decimals / 1000 ).toFixed( precision );
                result = ( Math.floor( temp ) + decimals ) +
                    '' + units[ i ];
            } else {
                result = Math.round( temp ) + '' + units[ i ];
            }

            return result;


        };

        return prettyNumber;
    }
);

/**
 * Copyright 2015, Symantec Corporation
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 */
'use strict';

/**
 *  @ngdoc filter
 *  @name zeus.utils.filter:prettyTime
 *
 *  @description
 *  Converts a date represented by numeric epoch to a human readable string.
 *
 *  @param { number } timeInMillis Date as numeric epoch( in milliseconds )
 *
 *  @returns { string } The date as a human readable string
 *
 *  @example
 <example module="zeus.utils">
    <file name="index.html">
        <ul>
            <li> {{ 1407919200 | prettyTime }} </li>
            <li> {{ 158291 | prettyTime }} </li>
            <li> {{ 1397828100000 | prettyTime }} </li>
            <li> {{ 1407919200000 | prettyTime }} </li>
        </ul>
    </file>
 </example>
 **/
angular.module( 'zeus.utils' )
    .filter( 'prettyTime', function () {
        return function ( timeInMillis ) {

            var ONE_DAY = 24 * 3600 * 1000,
                ONE_YEAR = 365 * ONE_DAY,
                ONE_MONTH = 30 * ONE_DAY,

                result = '',
                units = [ 'millisecs', 'secs', 'mins', 'hours', 'days', 'months', 'years' ],
                divisor = [ 1000, 60, 60, 24, 30, 365 ],
                lv = -1,
                uv = -1,
                upperUnit = 0,
                uMultiplier = 1,
                i, d;


            uv = timeInMillis;

            if ( uv >= ONE_YEAR ) {
                uv = uv / ONE_YEAR;
                uMultiplier = ONE_YEAR;
                upperUnit = 6;
            } else if ( uv >= ONE_MONTH ) {
                uv = uv / ONE_MONTH;
                uMultiplier = ONE_MONTH;
                upperUnit = 5;
            } else {
                for ( i = 0; i < 4; i++ ) {
                    d = divisor[ i ];

                    // Stop processing if value in less than divisor
                    if ( d > uv ) { break; }

                    uMultiplier *= d;
                    uv = uv / d;
                }

                upperUnit = i;
            }

            uv = Math.floor( uv );
            lv = timeInMillis - ( uMultiplier * uv );

            if ( lv >= ONE_MONTH ) {
                lv = Math.floor( lv / ONE_MONTH );
                i = 5;
            } else {
                for ( i = 0; i < 4; i++ ) {
                    d = divisor[ i ];

                    // Stop processing if value in less than divisor
                    if ( d > lv ) { break; }

                    lv = Math.round( lv / d );
                }
            }

            lv = Math.floor( lv );

            // Check if result is whole number
            // And is more than a minute
            if ( lv > 0 ) {
                result = ' ' + lv + ' ' + units[ i ];
            }

            result = Math.floor( uv ) + ' ' + units[ upperUnit ] + result;

            return result;

        };
    }
);

/**
 * Copyright 2015, Symantec Corporation
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 */
'use strict';

/**
 *  @ngdoc filter
 *  @name zeus.utils.filter:timeAgo
 *
 *  @description
 *  Provides human readable string representing the time elapsed
 *  since the event occurred.
 *
 *  @param { number } eventTime Time when event occurred in millisec
 *  @param { number=} refTime Reference time
 *
 *  @returns { string } Human readable format of the event time
 *
 *  @example
 <example module="zeus.utils">
    <file name="index.html">
        <ul>
            <li> {{ 1435720957000 | timeAgo:1435924487865 }} </li>
            <li> {{ 1432351357016 | timeAgo:1435924487865 }} </li>
            <li> {{ 1435872647865 | timeAgo:1435924487865 }} </li>
            <li> {{ 1401247357016 | timeAgo:1435924487865 }} </li>
            <li> {{ 1435807357016 | timeAgo:1435924487865 }} </li>
        </ul>
    </file>
 </example>
 **/
 angular.module( 'zeus.utils' )
    .filter( 'timeAgo', function () {

        var timeAgo;

        timeAgo = function ( eventTime, refTime ) {

            var curDate = refTime ? new Date( refTime ) : new Date(),
                eventDate = new Date( eventTime ),
                yDiff = curDate.getFullYear() - eventDate.getFullYear(),
                mDiff = curDate.getMonth() - eventDate.getMonth(),
                dDiff = curDate.getDate() - eventDate.getDate(),
                result;

            if ( yDiff > 0 ) {
                if ( yDiff === 1 ) {
                    result = 'last year';
                } else {
                    result = yDiff + ' years ago';
                }
            } else if ( mDiff > 0 ) {
                if ( mDiff === 1 ) {
                    result = 'last month';
                } else {
                    result = mDiff + ' months ago';
                }
            } else if ( dDiff > 0 ) {
                if ( dDiff === 1 ) {
                    result = 'yesterday';
                } else {
                    result = dDiff + ' days ago';
                }
            } else {
                result = 'today';
            }

            return result;
        };

        return timeAgo;
    } );

/**
 * Copyright 2015, Symantec Corporation
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 */
'use strict';

angular.module( 'zeus.utils' )
    .provider( '$zsColor', [ function () {

        var colorIndex = {};

        this.setColor = function ( key, color ) {
            colorIndex[ key ] = color;
            return this;
        };

        this.$get = function () {
            return {
                getColor: function ( key ) {
                    return colorIndex[ key ];
                }
            };
        };
    }
] );
