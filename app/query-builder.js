export default class QueryBuilder {
    queryString = {};
    path = [];

    constructor(base, suffix) {
        this.base = base;
        this.suffix = suffix || "";
    }
    
    toString() {
        let url = this.base;

        for (let param of this.path) {
            url += "/" + encodeURIComponent(param);
        }

        url += this.suffix;

        if (Object.getOwnPropertyNames(this.queryString).length > 0) {
            url += "?";
            
            for (let key in this.queryString) {
                let value = this.queryString[key];

                if (Array.isArray(value)) {
                    for (let item of value) {
                        url += `${key}=${encodeURIComponent(item)}&`;
                    }
                }
                else {
                    url += `${key}=${encodeURIComponent(value)}&`;
                }                
            }

            url = url.substr(0, url.length - 1);
        }

        return url;
    }
}
