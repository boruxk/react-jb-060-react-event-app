export const ACTIONS = {
    'FILTER': 'FILTER'
}

const createStore = (reducer) => {
    let internalState = { //model
        requestedData: []
    };
    const handlers = [];

    return {
        dispatch: (action, params) => {
            internalState = reducer(internalState, action, params);
            handlers.forEach(h => h());
        },
        subscribe: (h) => {
            handlers.push(h);
        },
        getState: () => internalState
    }
}

const reducer = (model, action, params) => {
    const updates = {
        "FILTER": (model, params) => {
            model.requestedData = [];
            model.requestedData.push(params);
            return model;
        }
    }
    return updates[action](model, params);
}

export const container = createStore(reducer);