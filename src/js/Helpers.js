export default class Helpers {
    static getKeyByValue(obj, value) {
        for( var prop in obj ) {
            if( obj.hasOwnProperty( prop ) ) {
                if( obj[ prop ] === value )
                    return prop;
            }
        }
    }
}