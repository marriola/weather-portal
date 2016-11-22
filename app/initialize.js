import React from 'react';
import ReactDOM from 'react-dom';
import createStore from 'create-store';
import Application from 'components/Application';

const store = createStore();

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<Application store={ store } />, document.getElementById("app"));
});

export default store;
