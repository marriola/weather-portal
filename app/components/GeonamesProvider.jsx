import React from "react";
import { ParamType } from "web-service";
import WebService from "web-service";
import autobind from "autobind-decorator";

const API_BASE = "http://api.geonames.org";
const API_USERNAME = "z500";
const SEARCH_RADIUS = 0.1;

const FeatureCode = {
    City: {
        Place: "PPL",
        AdministrativeSeat: "PPLA",
        AdministrativeSeat2: "PPLA2",
        AdministrativeSeat3: "PPLA3",
        AdministrativeSeat4: "PPLA4",
        Capital: "PPLC",
        HistoricalCapital: "PPLCH",
        FarmVillage: "PPLF",
        SeatOfGovernment: "PPLG",
        Historical: "PPLH",
        Locality: "PPLL", // similar to populated place, but with few dwellings
        Abandoned: "PPLQ",
        Religious: "PPLR",
        Places: "PPLS",
        Destroyed: "PPLW",
        Section: "PPLX",
        IsraeliSettlement: "STLMT"
    }
};

const PLACES = [
    FeatureCode.City.Capital,
    FeatureCode.City.AdministrativeSeat,
    FeatureCode.City.AdministrativeSeat2,
    FeatureCode.City.AdministrativeSeat3,
    FeatureCode.City.AdministrativeSeat4,
    FeatureCode.City.Place
];

export {
    FeatureCode
};

@autobind
export default class GeonamesProvider extends React.Component {
    constructor(props) {
        super(props);

        let services = {
            postalCodeLookup: {
                params: ParamType.QUERY_STRING
            },

            search: {
                params: ParamType.QUERY_STRING
            },

            /* get: {
             *     params: [
             *         { name: "geonameId", type: ParamType.QUERY_STRING },
             *         { name: "lang", type: ParamType.QUERY_STRING },
             *         { name: "style", type: ParamType.QUERY_STRING }
             *     ]
             * }*/
        };

        this.service = new WebService({
            baseUrl: API_BASE,
            suffix: "JSON",
            defaultParameterType: ParamType.QUERY_STRING,
            services,
            preRequest: builder => builder.queryString.username = API_USERNAME
        });
        
        this.api = this.service.api;
        
        window.geonames = this.api;
   }

    findNearby(city, state, country, numResults = 15) {
        let api = this.api;

        return api.search({
            name_equals: city,
            adminCode1: state,
            adminCode2: country,
            featureCode: PLACES,
            maxRows: 1
        }).then(response => {
            if (response.data.geonames.length == 0)
                return;
            
            let { name, lat, lng } = response.data.geonames[0];

            return api.search({
                north: +lat + SEARCH_RADIUS,
                south: +lat - SEARCH_RADIUS,
                east: +lng + SEARCH_RADIUS,
                west: +lng - SEARCH_RADIUS,
                featureCode: PLACES,
                maxRows: numResults
            });
        });
    }
    
    render() {
        if (!this.props.children)
            return null;
        
        let children = React.Children.map(
            this.props.children,
            x => x.props.geonames ?
               React.cloneElement(x, {
                   geonames: this
               }) :
               x);
        
        if (children.length == 1) {
            return children[0];
        }
        else {
            return (
                <div>
                    {children}
                </div>
            );
       }
   }
}
