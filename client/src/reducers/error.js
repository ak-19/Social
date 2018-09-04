const {ERRORS} = require('../actions/types');

const initialState = {
    error: undefined
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ERRORS:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}
