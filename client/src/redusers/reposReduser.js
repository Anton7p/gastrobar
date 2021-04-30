const SET_COUNT = 'SET_COUNT'


let initialState = {
    items: [],
    isFetching: true,
    count: null
}

export const reposReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COUNT:
            return {
                ...state,
                count: action.payload
            }
        default: {
            return state
        }
    }
};


export function setCount(count) {
    return {
        type: SET_COUNT,
        payload: count
    }
}

