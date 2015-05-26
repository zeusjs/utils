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
