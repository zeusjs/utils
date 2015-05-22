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
