export default class Helpers {
    static getKeyByValue(obj, value) {
        for( var prop in obj ) {
            if( obj.hasOwnProperty( prop ) ) {
                if( obj[ prop ] === value )
                    return prop;
            }
        }
    }

    static getColors() {
        return [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#A8161C",
            "#00ffcc",
            "#99ff33",
            "#6600cc",
            "#cc9900",
            "#0000ff",
            "#800000",
            "#339966",
            "#333399",
            "#ffccff",
            "#33cc33",
            "#cc6600",
            "#006666",
            "#0066cc",
            "#666699",
            "#666600",
            "#ff0000"
        ];
    }
}