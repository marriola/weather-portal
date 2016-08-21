import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
// You can go and see the code for this middleware, it's not very complicated and makes a good
// exercise to sharpen your understanding on middlewares.
import promiseMiddleware from './promise-middleware'
import activePlace from 'reducers/active-place';
import content from 'reducers/content';
import errors from 'reducers/errors';
import places from 'reducers/places';
import satellite from 'reducers/satellite';
import ui from 'reducers/ui';

// The data parameter that we see here is used to initialize our redux store with data. We didn't
// talk about this yet for simplicity but thanks to it your reducers can be initialized
// with real data if you already have some. For example in an isomorphic/universal app where you
// fetch data server-side, serialize and pass it to the client, your Redux store can be
// initialized with that data.
// We're not passing any data here but it's good to know about this createStore's ability.
export default function(data) {
    var reducer = combineReducers({ activePlace, content, errors, places, satellite, ui });
    /* var finalCreateStore = applyMiddleware(promiseMiddleware)(createStore)
     * var store = finalCreateStore(reducer, data)*/
    var store = createStore(reducer, data, compose(
        applyMiddleware(...promiseMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
    return store
}
