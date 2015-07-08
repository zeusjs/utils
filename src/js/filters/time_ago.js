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
