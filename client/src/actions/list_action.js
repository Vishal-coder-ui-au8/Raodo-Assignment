import { addNewWord, getAllWords } from "../utils/util";

export const RECEIVE_WORDS = 'RECEIVE_WORDS'
export const ADD_NEW_WORD = 'ADD_NEW_WORD'

export const receiveWords = (words) => {
    return {
        type: RECEIVE_WORDS,
        words
    }
}

export const addWord = (word) => {
    return {
        type: ADD_NEW_WORD,
        word
    }
}

export const handleAddWord = (word) => {
    //dispatch() is the method used to dispatch actions and trigger state changes to the store.
    //With React Redux, your components never access the store directly - connect does it for you
    return dispatch => {
        return addNewWord(word)
            .then(word => dispatch(addWord(word)))
    }
}

export const handleInitialData = (words) => {
    return dispatch => {
        return getAllWords()
            .then(words => dispatch(receiveWords(words)))
    }
}