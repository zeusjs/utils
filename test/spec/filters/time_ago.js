'use strict';

describe( 'A filter to show human redable time elapsed',
    function () {

        // load the filter's module
        beforeEach( module( 'zeus.utils' ) );

        // initialize a new instance of the filter before each test
        var cTime = 1437652487865,//Thu Jul 23 2015
            tod = 1437641687865,//Thu Jul 23 2015
            yes = 1437562487865,//Wed Jul 22 2015
            dayAgo = 1437479687865,//Tue Jul 21 2015
            lastMnth = 1435060487865,//Tue Jun 23 2015
            threeMnth = 1429876487865,//Fri Apr 24 2015
            lastYr = 1411732487865,//Fri Sep 26 2014
            twoYr = 1385812487865,//Sat Nov 30 2013

            timeAgo;

        beforeEach( inject( function ( $filter ) {
            timeAgo = $filter( 'timeAgo' );
        } ) );

        it( 'should return "Today" is event occurred today', function () {
            expect( timeAgo( tod, cTime ) ).toBe( 'today' );
        } );

        it( 'should return "Yesterday" is event occurred Yesterday', function () {
            expect( timeAgo( yes, cTime ) ).toBe( 'yesterday' );
        } );

        it( 'should return correct string if event occurred 2 days back', function () {
            expect( timeAgo( dayAgo, cTime ) ).toBe( '2 days ago' );
        } );

        it( 'should return correct string if event occurred last month', function () {
            expect( timeAgo( lastMnth, cTime ) ).toBe( 'last month' );
        } );

        it( 'should return correct string if event occurred 3 months back', function () {
            expect( timeAgo( threeMnth, cTime ) ).toBe( '3 months ago' );
        } );

        it( 'should return correct string if event occurred last year', function () {
            expect( timeAgo( lastYr, cTime ) ).toBe( 'last year' );
        } );

        it( 'should return correct string if event occurred 2 years back', function () {
            expect( timeAgo( twoYr, cTime ) ).toBe( '2 years ago' );
        } );

    } );
