 import { ADD_NEW_WORD, RECEIVE_WORDS } from "../actions/list_action";

export default (state = [], action) => {
    switch (action.type) {
        case RECEIVE_WORDS:
            return [
                ...state,
                ...action.words
            ]
        case ADD_NEW_WORD:
            return [
                ...state,
                action.word
            ]
        default:
            return state
    }
}