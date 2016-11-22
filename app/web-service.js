import QueryBuilder from "query-builder";
import autobind from "autobind-decorator";
import Axios from "axios";

const ParamType = {
    PATH: 0,
    QUERY_STRING: 1
};

export { ParamType };

@autobind
export default class WebService {
    constructor({ baseUrl, suffix, services, preRequest, postRequest }) {
        this.baseUrl = baseUrl;
        this.suffix = suffix;
        this.services = services;
        this.serviceNames = Object.getOwnPropertyNames(services);
        this.preRequest = preRequest;
        this.postRequest = postRequest;

        this.api = new Proxy({}, {
            get: function get(target, prop, receiver) {
                if (this.serviceNames.includes(prop)) {
                    return function() {
                        return this.retrieve(prop, arguments);
                    }.bind(this);
                }
            }.bind(this)
        });
    }

    retrieve(serviceName, args) {
        let service = this.services[serviceName];
        let builder = new QueryBuilder(this.baseUrl, this.suffix);

        builder.path.push(serviceName);

        let defaultType = typeof service.params == "number" ? service.params : null;
        
        if (!args[1] && typeof args[0] == "object") {
            // A single argument dictionary is provided
            for (let param of Object.getOwnPropertyNames(args[0])) {
                let type = defaultType || service.params.find(x => x.name == param).type;
                let arg = args[0][param];

                if (typeof arg != "undefined") {
                    if (type == ParamType.PATH) {
                        builder.path.push(arg);
                    }
                    else {
                        builder.queryString[param] = arg;
                    }
                }                
            }
        }
        else {
            // An argument list is provided
            let paramNames = service.params.map(x => x.name);

            for (let i = 0; i < args.length; i++) {
                let name = paramNames[i];
                let arg = args[i];
                let type = defaultType || service.params[i].type;
                
                if (type == ParamType.PATH) {
                    builder.path.push(arg);
                }
                else {
                    builder.queryString[name] = arg;
                }
            }
        }

        if (this.preRequest)
            this.preRequest(builder);

        let promise = Axios.get(builder.toString());

        let postRequest = this.postRequest;
        if (postRequest) {
            return promise.then(function(response) {
                postRequest(response);
            });
        }
        else {
            return promise;
        }
    }
}
