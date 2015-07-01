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
