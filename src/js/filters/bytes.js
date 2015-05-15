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
        units = [ 'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB' ],
        bytes;

    bytes = function ( num, precision ) {
        var temp = num,
            i, decimals, result;

        precision = precision || 1;

        for ( i = 0; i < units.length; i++ ) {
            if ( temp >= CONVERSION_MULTIPLIER ) {
                decimals = temp % CONVERSION_MULTIPLIER;
                temp = temp / CONVERSION_MULTIPLIER;
            } else {
                break;
            }
        }


        if ( decimals > 0 ) {
            decimals = +( decimals / CONVERSION_MULTIPLIER ).toFixed( precision );
            result = ( Math.floor( temp ) + decimals ) +
                ' ' + units[ i ];
        } else {
            result = Math.round( temp ) + ' ' + units[ i ];
        }

        return result;
    };

    return bytes;

} );
