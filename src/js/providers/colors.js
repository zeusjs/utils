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
